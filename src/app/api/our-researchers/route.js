// app/api/our-researchers/route.js
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
	const xlsxPath = path.join(
		process.cwd(),
		"public",
		"ppi-star-researchers.xlsx",
	)

	try {
		const fileBuffer = fs.readFileSync(xlsxPath)
		const workbook = XLSX.read(fileBuffer, { type: "buffer" })

		// The data is in "Sheet3"
		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]

		const range = XLSX.utils.decode_range(worksheet["!ref"])

		// Read headers from first row
		const headers = []
		for (let col = range.s.c; col <= range.e.c; col++) {
			const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
			const cell = worksheet[cellAddress]
			headers.push(cell ? cell.v.toString() : "")
		}

		// Map column indices
		const srNoIndex = headers.findIndex(h => h.toLowerCase().includes("sr. no"))
		const photoIdIndex = headers.findIndex(h =>
			h.toLowerCase().includes("photo id"),
		)
		const authorIndex = headers.findIndex(h =>
			h.toLowerCase().includes("author"),
		)
		const alphaCountIndex = headers.findIndex(h =>
			h.toLowerCase().includes("no. of alpha papers"),
		)
		const currentAffiliationIndex = headers.findIndex(h =>
			h.toLowerCase().includes("current affiliation"),
		)
		const paperAffiliationIndex = headers.findIndex(h =>
			h.toLowerCase().includes("paper affiliation"),
		)
		const linkIndex = headers.findIndex(h => h.toLowerCase() === "link")
		// "Papers" column is where references start
		const papersStartIndex = headers.findIndex(
			h => h.toLowerCase() === "papers",
		)

		const researchers = []

		for (let row = range.s.r + 1; row <= range.e.r; row++) {
			const getVal = colIndex => {
				if (colIndex === -1) return ""
				const addr = XLSX.utils.encode_cell({ r: row, c: colIndex })
				const cell = worksheet[addr]
				return cell ? cell.v.toString().trim() : ""
			}

			const srNo = getVal(srNoIndex)
			const author = getVal(authorIndex)
			if (!author) continue

			const photoId = getVal(photoIdIndex)
			const alphaCount = parseInt(getVal(alphaCountIndex)) || 0
			const currentAffiliation = getVal(currentAffiliationIndex)
			const paperAffiliation = getVal(paperAffiliationIndex)
			const link = getVal(linkIndex)

			// Collect papers from "Papers" column onward (until empty cell)
			const papers = []
			if (papersStartIndex !== -1) {
				for (let col = papersStartIndex; col <= range.e.c; col++) {
					const addr = XLSX.utils.encode_cell({ r: row, c: col })
					const cell = worksheet[addr]
					if (cell && cell.v) {
						const value = cell.v.toString().trim()
						if (value.length > 0) {
							papers.push(value)
						}
					} else {
						break // stop at first empty cell
					}
				}
			}

			researchers.push({
				id: parseInt(srNo) || row,
				photoId: photoId || null,
				author,
				alphaCount,
				currentAffiliation,
				paperAffiliation,
				link,
				papers,
				slug: generateSlug(author),
			})
		}

		// Sort by alpha paper count descending
		researchers.sort((a, b) => b.alphaCount - a.alphaCount)

		return NextResponse.json({
			researchers,
			totalCount: researchers.length,
		})
	} catch (error) {
		console.error("Error loading star researchers:", error)
		return NextResponse.json(
			{
				error: "Failed to load star researchers",
				details: error.message,
			},
			{ status: 500 },
		)
	}
}
