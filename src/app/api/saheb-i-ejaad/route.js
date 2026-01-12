// app/api/saheb-i-ejad/route.js
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import * as XLSX from "xlsx"

function generateSlug(name) {
	if (!name) return "unknown"
	return name
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_]+/g, "-")
		.replace(/^-+|-+$/g, "")
}

export async function GET() {
	const xlsxPath = path.join(process.cwd(), "public", "saheb-i-ejaad.xlsx")

	try {
		const fileBuffer = fs.readFileSync(xlsxPath)
		const workbook = XLSX.read(fileBuffer, { type: "buffer" })

		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]

		// Get the range of the worksheet
		const range = XLSX.utils.decode_range(worksheet["!ref"])

		// Read headers from first row (row 0)
		const headers = []
		for (let col = range.s.c; col <= range.e.c; col++) {
			const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
			const cell = worksheet[cellAddress]
			headers.push(cell ? cell.v : "")
		}

		// Find the index of "No. of First Author Papers from Pakistan"
		const pakistanColumnIndex = headers.findIndex(
			h =>
				h &&
				h
					.toString()
					.toLowerCase()
					.includes("no. of first author papers from pakistan")
		)

		if (pakistanColumnIndex === -1) {
			console.error("Pakistani papers column not found")
			return NextResponse.json(
				{
					error: "Pakistani papers column not found in Excel file",
				},
				{ status: 500 }
			)
		}

		// Find other standard column indices by looking at headers
		const nameIndex = headers.findIndex(
			h => h && h.toString().toLowerCase().includes("journal/conference")
		)
		const abbrevIndex = headers.findIndex(
			h => h && h.toString().toLowerCase().includes("abbreviated")
		)
		const publisherIndex = headers.findIndex(
			h => h && h.toString().toLowerCase().includes("publisher")
		)
		const issnIndex = headers.findIndex(
			h => h && h.toString().toLowerCase() === "issn"
		)
		const eissnIndex = headers.findIndex(
			h => h && h.toString().toLowerCase() === "eissn"
		)
		const categoryIndex = headers.findIndex(
			h => h && h.toString().toLowerCase().includes("category")
		)
		const ppiIndex = headers.findIndex(
			h => h && h.toString().toLowerCase() === "ppi"
		)

		// Use first column if journal name not found
		const finalNameIndex = nameIndex !== -1 ? nameIndex : 0

		// Process each data row (skip header row 0)
		const journals = []

		for (let row = range.s.r + 1; row <= range.e.r; row++) {
			// Get Pakistani papers count
			const pakistanCellAddress = XLSX.utils.encode_cell({
				r: row,
				c: pakistanColumnIndex,
			})
			const pakistanCell = worksheet[pakistanCellAddress]
			const pakistaniPapers = pakistanCell ? parseInt(pakistanCell.v) || 0 : 0

			// Only process if Pakistani papers > 0
			if (pakistaniPapers === 0) continue

			// Get journal name
			const nameCellAddress = XLSX.utils.encode_cell({
				r: row,
				c: finalNameIndex,
			})
			const nameCell = worksheet[nameCellAddress]
			const name = nameCell ? nameCell.v.toString().trim() : ""

			if (!name) continue

			// Helper function to get field value
			const getFieldValue = colIndex => {
				if (colIndex === -1) return ""
				const cellAddress = XLSX.utils.encode_cell({ r: row, c: colIndex })
				const cell = worksheet[cellAddress]
				return cell ? cell.v.toString().trim() : ""
			}

			const slug = generateSlug(name)

			// CRITICAL: Collect references from columns AFTER Pakistani papers column
			// These columns have NO headers - they just contain reference data
			const references = []

			// Start from column immediately after Pakistani papers count
			// Only collect non-empty cells that contain actual reference text
			for (let col = pakistanColumnIndex + 1; col <= range.e.c; col++) {
				const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
				const cell = worksheet[cellAddress]

				if (cell && cell.v) {
					const value = cell.v.toString().trim()

					// Only add non-empty values
					// Skip if it looks like it might be from standard columns (very short or matches existing data)
					if (value.length > 0) {
						// Additional check: make sure it's not accidentally picking up data from other standard columns
						// by checking if it matches any of the journal's basic info
						const isDuplicate =
							value === name ||
							value === getFieldValue(abbrevIndex) ||
							value === getFieldValue(publisherIndex) ||
							value === getFieldValue(issnIndex) ||
							value === getFieldValue(eissnIndex)

						if (!isDuplicate) {
							references.push(value)
						}
					}
				} else {
					// If we hit an empty cell after Pakistani papers column, stop looking
					// (references should be consecutive)
					break
				}
			}

			journals.push({
				id: `journal-${row}`,
				name: name,
				abbreviation: getFieldValue(abbrevIndex),
				publisher: getFieldValue(publisherIndex),
				issn: getFieldValue(issnIndex),
				eissn: getFieldValue(eissnIndex),
				category: getFieldValue(categoryIndex),
				ppi: ppiIndex !== -1 ? parseFloat(getFieldValue(ppiIndex)) || 0 : 0,
				pakistaniPapers: pakistaniPapers,
				references: references,
				slug,
			})
		}

		console.log(`Processed ${journals.length} journals with Pakistani papers`)

		return NextResponse.json({
			journals,
			totalCount: journals.length,
		})
	} catch (error) {
		console.error("Error loading Pakistani journals:", error)
		return NextResponse.json(
			{
				error: "Failed to load Pakistani journals",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
