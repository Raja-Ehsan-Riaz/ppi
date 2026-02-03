// app/api/Journals/[slug]/route.js
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import * as XLSX from "xlsx"
import { getJournalLocationData } from "@/lib/googleDrive"

function generateSlug(name) {
	if (!name) return "unknown"
	return name
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_]+/g, "-")
		.replace(/^-+|-+$/g, "")
}

// GET journal by slug
export async function GET(request, { params }) {
	const { slug } = await params
	const xlsxPath = path.join(process.cwd(), "public", "journals-data.xlsx")

	try {
		// Read Excel file
		const fileBuffer = fs.readFileSync(xlsxPath)
		const workbook = XLSX.read(fileBuffer, { type: "buffer" })

		// Get first sheet
		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]

		// Convert to JSON
		const rawJournals = XLSX.utils.sheet_to_json(worksheet, {
			raw: false,
			defval: "",
		})

		let foundJournal = null

		for (let i = 0; i < rawJournals.length; i++) {
			const row = rawJournals[i]
			const name = (row["Journal/Conference _x"] || "").trim()
			const journalSlug = generateSlug(name)

			if (journalSlug === slug) {
				foundJournal = {
					id: `journal-${i + 1}`,
					name,
					abbreviation: (row["Abbreviated Journal"] || "").trim(),
					publisher: (row["Publisher"] || "").trim(),
					issn: (row["ISSN"] || "").trim(),
					eissn: (row["eISSN"] || "").trim(),
					category: (row["PPI Category"] || "").trim(),
					link: (row["Official Page Link"] || "").trim(),
					ppi: parseFloat(row["PPI"]) || 0,
					totalPapers:
						parseInt(row["Total Papers Published (2008 onwards)"]) || 0,
					tier1Papers:
						parseInt(
							row[
								"No. of First Auther Papers from Universities/Organizations ranked 1-50."
							],
						) || 0,
					tier2Papers:
						parseInt(
							row[
								"No. of First Auther Papers from Universities/Organizations ranked 51-100."
							],
						) || 0,
					tier3Papers:
						parseInt(
							row[
								"No. of First Auther Papers from Universities/Organizations ranked 101-150."
							],
						) || 0,
					tier4Papers:
						parseInt(
							row[
								"No. of First Auther Papers from Universities/Organizations ranked 151-200."
							],
						) || 0,
					slug: journalSlug,
				}
				break
			}
		}

		if (!foundJournal) {
			return NextResponse.json({ error: "Journal not found" }, { status: 404 })
		}

		// Fetch geographic data from Google Drive (optional)
		try {
			const locationData = await getJournalLocationData(foundJournal.name)
			if (locationData) {
				foundJournal.locationData = locationData
			}
		} catch (error) {
			console.error("Error fetching location data:", error)
		}

		return NextResponse.json({ journal: foundJournal })
	} catch (error) {
		console.error("Error loading journal:", error)
		return NextResponse.json(
			{ error: "Failed to load journal" },
			{ status: 500 },
		)
	}
}
