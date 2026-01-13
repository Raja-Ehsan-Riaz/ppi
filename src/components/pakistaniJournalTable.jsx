// components/PakistaniJournalTable.jsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText } from "lucide-react"

export default function PakistaniJournalTable({ journals }) {
	const [expandedRow, setExpandedRow] = useState(null)

	const getCategorySymbol = category => {
		const symbols = {
			Alpha: "α",
			Beta: "β",
			Gamma: "γ",
			Delta: "δ",
		}
		return symbols[category] || ""
	}

	const getCategoryBadgeColor = category => {
		const colors = {
			Alpha: "bg-blue-100 text-blue-700 border-blue-300",
			Beta: "bg-green-100 text-green-700 border-green-300",
			Gamma: "bg-yellow-100 text-yellow-700 border-yellow-300",
			Delta: "bg-purple-100 text-purple-700 border-purple-300",
		}
		return colors[category] || "bg-gray-100 text-gray-700 border-gray-300"
	}

	const toggleRow = journalId => {
		setExpandedRow(expandedRow === journalId ? null : journalId)
	}

	return (
		<div className="rounded-lg border overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b">
						<tr>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
								Journal / Conference
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
								Abbreviation
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
								Publisher
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
								ISSN
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
								eISSN
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
								PPI
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
								Category
							</th>
							<th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
								Pakistani Papers
							</th>
							<th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
								References
							</th>
							<th className="w-12 px-4 py-3"></th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{journals.map(journal => (
							<React.Fragment key={journal.id}>
								<tr className="hover:bg-gray-50 transition-colors">
									<td className="px-4 py-4">
										<Link
											href={`/journals/${journal.slug}`}
											className="text-xs font-semibold text-gray-900 hover:text-green-500"
										>
											{journal.name}
										</Link>
									</td>
									<td className="px-4 py-4 text-xs text-gray-700">
										{journal.abbreviation || "-"}
									</td>
									<td className="px-4 py-4 text-xs text-gray-700">
										{journal.publisher || "-"}
									</td>
									<td className="px-4 py-4 text-xs text-gray-600">
										{journal.issn || "-"}
									</td>
									<td className="px-4 py-4 text-xs text-gray-600">
										{journal.eissn || "-"}
									</td>
									<td className="px-4 py-4">
										<span className="text-xs font-semibold text-green-500">
											{journal.ppi.toFixed(1)}
										</span>
									</td>
									<td className="px-4 py-4">
										{journal.category && journal.category.trim() !== "" ? (
											<Badge
												variant="outline"
												className={`text-xs px-3 rounded-sm ${getCategoryBadgeColor(
													journal.category
												)}`}
											>
												<span className="flex items-center gap-1">
													<span>{journal.category}</span>
													<span className="text-sm">
														({getCategorySymbol(journal.category)})
													</span>
												</span>
											</Badge>
										) : (
											<span className="text-xs text-gray-400">-</span>
										)}
									</td>
									<td className="px-4 py-4 text-center">
										<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
											{journal.pakistaniPapers}
										</span>
									</td>
									<td className="px-4 py-4 text-center">
										{journal.references && journal.references.length > 0 ? (
											<button
												onClick={() => toggleRow(journal.id)}
												className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-500 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
											>
												<FileText className="h-3.5 w-3.5" />
												{expandedRow === journal.id ? (
													<>Hide ({journal.references.length})</>
												) : (
													<>View ({journal.references.length})</>
												)}
											</button>
										) : (
											<span className="text-xs text-gray-400">-</span>
										)}
									</td>
									<td className="px-4 py-4">
										<Link
											href={`/journals/${journal.slug}`}
											className="text-gray-400 hover:text-green-500"
										>
											<ExternalLink className="h-4 w-4" />
										</Link>
									</td>
								</tr>
								{expandedRow === journal.id &&
									journal.references &&
									journal.references.length > 0 && (
										<tr>
											<td
												colSpan="10"
												className="px-4 py-4 bg-blue-50 border-t border-blue-100"
											>
												<div className="space-y-2">
													<h4 className="font-semibold text-xs text-gray-900 mb-3 flex items-center gap-2">
														<FileText className="h-4 w-4 text-green-500" />
														References ({journal.references.length})
													</h4>
													<ol className="space-y-3 list-decimal list-outside ml-5">
														{journal.references.map((ref, idx) => (
															<li
																key={idx}
																className="text-xs text-gray-800 leading-relaxed pl-1"
															>
																{ref}
															</li>
														))}
													</ol>
												</div>
											</td>
										</tr>
									)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
