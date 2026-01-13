"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink } from "lucide-react"

export default function JournalTable({ journals }) {
	const [selectedJournals, setSelectedJournals] = useState([])

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

	return (
		<div className="rounded-lg border overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b">
						<tr>
							{/* <th className="w-12 px-4 py-3">
								<Checkbox
									checked={
										selectedJournals.length === journals.length &&
										journals.length > 0
									}
									onCheckedChange={handleSelectAll}
								/>
							</th> */}
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
							<th className="w-12 px-4 py-3"></th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{journals.map(journal => (
							<tr
								key={journal.id}
								className="hover:bg-gray-50 transition-colors"
							>
								{/* <td className="px-4 py-4">
									<Checkbox
										checked={selectedJournals.includes(journal.id)}
										onCheckedChange={checked =>
											handleSelectJournal(journal.id, checked)
										}
									/>
								</td> */}
								<td className="px-4 py-4">
									<Link
										href={`/journals/${journal.slug}`}
										className="text-xs font-semibold text-gray-900 hover:text-blue-600"
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
									<span className="text-xs font-semibold text-blue-600">
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
								<td className="px-4 py-4">
									<Link
										href={`/journals/${journal.slug}`}
										className="text-gray-400 hover:text-blue-600"
									>
										<ExternalLink className="h-4 w-4" />
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
