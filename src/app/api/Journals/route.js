// app/api/Journals/route.js
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
	const xlsxPath = path.join(process.cwd(), "public", "journals.xlsx") // Changed to .xlsx

	try {
		// Read the Excel file
		const fileBuffer = fs.readFileSync(xlsxPath)
		const workbook = XLSX.read(fileBuffer, { type: "buffer" })

		// Get the first sheet
		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]

		// Convert to JSON
		const rawJournals = XLSX.utils.sheet_to_json(worksheet, {
			raw: false,
			defval: "",
		})

		const journals = rawJournals.map((row, index) => {
			const name = (row["Journal/Conference _x"] || "").trim()
			const slug = generateSlug(name)

			return {
				id: `journal-${index + 1}`,
				name: name,
				abbreviation: (row["Abbreviated Journal"] || "").trim(),
				publisher: (row["Publisher"] || "").trim(),
				issn: (row["ISSN"] || "").trim(),
				eissn: (row["eISSN"] || "").trim(),
				category: (row["PPI Category"] || "").trim(),
				ppi: parseFloat(row["PPI"]) || 0,
				totalPapers:
					parseInt(row["Total Papers Published (2008 onwards)"]) || 0,
				tier1Papers:
					parseInt(
						row[
							"No. of First Auther Papers from Universities/Organizations ranked 1-50."
						]
					) || 0,
				tier2Papers:
					parseInt(
						row[
							"No. of First Auther Papers from Universities/Organizations ranked 51-100."
						]
					) || 0,
				tier3Papers:
					parseInt(
						row[
							"No. of First Auther Papers from Universities/Organizations ranked 101-150."
						]
					) || 0,
				tier4Papers:
					parseInt(
						row[
							"No. of First Auther Papers from Universities/Organizations ranked 151-200."
						]
					) || 0,
				slug,
			}
		})

		return NextResponse.json({ journals })
	} catch (error) {
		console.error("Error loading journals:", error)
		return NextResponse.json(
			{ error: "Failed to load journals" },
			{ status: 500 }
		)
	}
}
