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
    const xlsxPath = path.join(process.cwd(), "public", "saheb-i-ejaad v2.xlsx")

    try {
        // Read Excel file
        const fileBuffer = fs.readFileSync(xlsxPath)
        const workbook = XLSX.read(fileBuffer, { type: "buffer" })

        // Get first sheet
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        // Get the range of the worksheet
        const range = XLSX.utils.decode_range(worksheet["!ref"])

        // Read headers from first row
        const headers = []
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
            const cell = worksheet[cellAddress]
            headers.push(cell ? cell.v : "")
        }

        // Find column indices
        const pakistanColumnIndex = headers.findIndex(
            h => h && h.toString().toLowerCase().includes("no. of first author papers from pakistan")
        )
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

        const finalNameIndex = nameIndex !== -1 ? nameIndex : 0

        let foundJournal = null

        // Process each data row (skip header row 0)
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            // Get journal name
            const nameCellAddress = XLSX.utils.encode_cell({
                r: row,
                c: finalNameIndex,
            })
            const nameCell = worksheet[nameCellAddress]
            const name = nameCell ? nameCell.v.toString().trim() : ""

            if (!name) continue

            const journalSlug = generateSlug(name)

            if (journalSlug === slug) {
                // Helper function to get field value
                const getFieldValue = colIndex => {
                    if (colIndex === -1) return ""
                    const cellAddress = XLSX.utils.encode_cell({ r: row, c: colIndex })
                    const cell = worksheet[cellAddress]
                    return cell ? cell.v.toString().trim() : ""
                }

                // Get Pakistani papers count
                const pakistanCellAddress = XLSX.utils.encode_cell({
                    r: row,
                    c: pakistanColumnIndex,
                })
                const pakistanCell = worksheet[pakistanCellAddress]
                const pakistaniPapers = pakistanCell ? parseInt(pakistanCell.v) || 0 : 0

                // Collect references from columns AFTER Pakistani papers column
                const references = []
                for (let col = pakistanColumnIndex + 1; col <= range.e.c; col++) {
                    const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
                    const cell = worksheet[cellAddress]

                    if (cell && cell.v) {
                        const value = cell.v.toString().trim()

                        if (value.length > 0) {
                            // Check if it's not a duplicate of basic info
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
                        // Stop at first empty cell
                        break
                    }
                }

                foundJournal = {
                    id: `journal-${row}`,
                    name,
                    abbreviation: getFieldValue(abbrevIndex),
                    publisher: getFieldValue(publisherIndex),
                    issn: getFieldValue(issnIndex),
                    eissn: getFieldValue(eissnIndex),
                    category: getFieldValue(categoryIndex),
                    ppi: ppiIndex !== -1 ? parseFloat(getFieldValue(ppiIndex)) || 0 : 0,
                    totalPakistaniPapers: pakistaniPapers,
                    references: references,
                    slug: journalSlug,
                }
                break
            }
        }

        if (!foundJournal) {
            return NextResponse.json({ error: "Journal not found" }, { status: 404 })
        }


        return NextResponse.json({ journal: foundJournal })
    } catch (error) {
        console.error("Error loading journal:", error)
        return NextResponse.json(
            { error: "Failed to load journal" },
            { status: 500 }
        )
    }
}