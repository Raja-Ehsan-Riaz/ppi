import { google } from "googleapis"
import * as XLSX from "xlsx"
import path from "path"

function initializeDrive() {
	try {
		let auth

		const credsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS

		if (!credsEnv) {
			throw new Error("GOOGLE_APPLICATION_CREDENTIALS not set")
		}

		// Check if it's a JSON string or file path
		if (credsEnv.trim().startsWith("{")) {
			// It's a JSON string - clean and parse it
			try {
				// Remove any potential whitespace or newlines
				const cleanedJson = credsEnv.trim()

				// Find the first { and last }
				const firstBrace = cleanedJson.indexOf("{")
				const lastBrace = cleanedJson.lastIndexOf("}")

				if (firstBrace === -1 || lastBrace === -1) {
					throw new Error("Invalid JSON structure")
				}

				// Extract only the JSON object
				const jsonOnly = cleanedJson.substring(firstBrace, lastBrace + 1)

				const credentials = JSON.parse(jsonOnly)

				auth = new google.auth.GoogleAuth({
					credentials: credentials,
					scopes: ["https://www.googleapis.com/auth/drive.readonly"],
				})

				console.log("✓ Successfully parsed JSON credentials")
			} catch (parseError) {
				console.error("JSON Parse Error:", parseError.message)
				throw new Error(
					"Failed to parse GOOGLE_APPLICATION_CREDENTIALS as JSON. " +
						"Make sure it contains valid JSON with no extra characters."
				)
			}
		} else {
			// It's a file path
			auth = new google.auth.GoogleAuth({
				keyFile: credsEnv,
				scopes: ["https://www.googleapis.com/auth/drive.readonly"],
			})

			console.log("✓ Using credentials from file:", credsEnv)
		}

		return google.drive({ version: "v3", auth })
	} catch (error) {
		console.error("Error initializing Google Drive:", error.message)
		throw error
	}
}
/**
 * Search for a file in Google Drive by name
 * @param {string} fileName - The name of the file to search for
 * @param {string} folderId - Optional folder ID to search within
 * @returns {Promise<string|null>} - The file ID or null if not found
 */
export async function findFileByName(fileName, folderId = null) {
	try {
		const drive = initializeDrive()

		// Build search query
		let query = `name='${fileName}' and mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' and trashed=false`

		// If folder ID is provided, search only within that folder
		if (folderId) {
			query += ` and '${folderId}' in parents`
		}

		const response = await drive.files.list({
			q: query,
			fields: "files(id, name, parents)",
			spaces: "drive",
			pageSize: 1, // We only need the first match
		})

		if (response.data.files && response.data.files.length > 0) {
			console.log(
				`Found file: ${fileName} with ID: ${response.data.files[0].id}`
			)
			return response.data.files[0].id
		}

		console.log(`File not found: ${fileName}`)
		return null
	} catch (error) {
		console.error("Error finding file:", error.message)
		return null
	}
}

/**
 * Download and parse Excel file from Google Drive
 * @param {string} fileId - The Google Drive file ID
 * @returns {Promise<Array>} - Parsed data from the Excel file
 */
export async function getExcelData(fileId) {
	try {
		const drive = initializeDrive()

		const response = await drive.files.get(
			{ fileId: fileId, alt: "media" },
			{ responseType: "arraybuffer" }
		)

		// Parse Excel file
		const workbook = XLSX.read(response.data, { type: "buffer" })
		const firstSheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[firstSheetName]
		const data = XLSX.utils.sheet_to_json(worksheet)

		console.log(`Successfully parsed Excel file with ${data.length} rows`)
		return data
	} catch (error) {
		console.error("Error getting Excel data:", error.message)
		return []
	}
}

/**
 * Get geographic data for a journal
 * @param {string} journalName - The name of the journal
 * @returns {Promise<Object>} - Geographic data organized by country
 */
export async function getJournalLocationData(journalName) {
	try {
		const fileName = `${journalName} Locations.xlsx`

		// Get folder ID from environment variable (optional)
		const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || null

		console.log(
			`Searching for: ${fileName}${folderId ? " in folder: " + folderId : ""}`
		)

		const fileId = await findFileByName(fileName, folderId)

		if (!fileId) {
			console.log(`Location file not found for journal: ${journalName}`)
			return null
		}

		const rawData = await getExcelData(fileId)

		if (!rawData || rawData.length === 0) {
			console.log(`No data found in Excel file for: ${journalName}`)
			return null
		}

		// Process and organize the data
		const locationData = processLocationData(rawData)

		console.log(
			`Successfully processed location data for ${journalName}: ${locationData.countries.length} countries`
		)

		return locationData
	} catch (error) {
		console.error("Error getting journal location data:", error)
		return null
	}
}

/**
 * Process raw location data into organized structure
 * @param {Array} rawData - Raw data from Excel
 * @returns {Object} - Processed location data
 */
function processLocationData(rawData) {
	const countryData = {}
	let totalPapers = 0
	let totalCitations = 0

	rawData.forEach(row => {
		// Try different possible column names for country
		const country =
			row["Name"] ||
			row["Country"] ||
			row["country"] ||
			row["COUNTRY"] ||
			row["Country Name"] ||
			row["Location"] ||
			"Unknown"

		// Try different possible column names for paper count
		const papers = parseInt(
			row["Web of Science Documents"] ||
				row["Papers"] ||
				row["papers"] ||
				row["Count"] ||
				row["count"] ||
				row["Number of Papers"] ||
				row["Total Papers"] ||
				row["Paper Count"] ||
				0
		)
		const citations = parseInt(row["Times Cited"] || 0)

		if (country && country !== "Unknown" && papers > 0) {
			if (!countryData[country]) {
				countryData[country] = 0
			}
			countryData[country] += papers
			totalPapers += papers
			totalCitations += citations
		}
	})

	// Convert to array and sort by paper count
	const sortedCountries = Object.entries(countryData)
		.map(([country, papers]) => ({
			country,
			papers,
			percentage: totalPapers > 0 ? (papers / totalPapers) * 100 : 0,
		}))
		.sort((a, b) => b.papers - a.papers)

	return {
		countries: sortedCountries,
		totalPapers,
		topCountries: sortedCountries.slice(0, 10),
		totalCitations,
	}
}
/**
 * List all Excel files in a folder (useful for debugging)
 * @param {string} folderId - The Google Drive folder ID
 * @returns {Promise<Array>} - Array of file names
 */
export async function listFilesInFolder(folderId) {
	try {
		const drive = initializeDrive()

		const response = await drive.files.list({
			q: `'${folderId}' in parents and mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' and trashed=false`,
			fields: "files(id, name)",
			spaces: "drive",
		})

		return response.data.files || []
	} catch (error) {
		console.error("Error listing files:", error)
		return []
	}
}
