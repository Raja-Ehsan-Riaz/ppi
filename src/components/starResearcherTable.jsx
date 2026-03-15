// components/StarResearcherTable.jsx
"use client"

import React, { useState } from "react"
import { ExternalLink, FileText, User } from "lucide-react"
import Image from "next/image"

export default function StarResearcherTable({ researchers }) {
	const [expandedRow, setExpandedRow] = useState(null)

	const toggleRow = (e, id) => {
		e.preventDefault()
		e.stopPropagation()
		setExpandedRow(expandedRow === id ? null : id)
	}

	/**
	 * Build the photo URL from a photoId.
	 * Adjust the path to wherever you store researcher images.
	 * Expected file names: 1.jpg, 2.png, etc.
	 */
	const getPhotoUrl = photoId => {
		if (!photoId || photoId === "0" || photoId.toString().trim() === "")
			return null
		return `/Author Images/${photoId}.jpg`
	}

	return (
		<div className="rounded-lg border overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b">
						<tr>
							<th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider w-12">
								No.
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider w-28">
								Photo
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
								Researcher
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
								Current Affiliation
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
								Paper Affiliation
							</th>
							<th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider w-32">
								Alpha Papers
							</th>
							<th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider w-32">
								Papers
							</th>
							<th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider w-16">
								Profile
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{researchers.map(researcher => {
							const photoUrl = getPhotoUrl(researcher.author)
							const isExpanded = expandedRow === researcher.id

							return (
								<React.Fragment key={researcher.id}>
									<tr className="hover:bg-gray-50 transition-colors group align-center">
										{/* Sr. No. */}
										<td className="px-4 py-4 text-xs font-semibold text-gray-500">
											{researcher.id}
										</td>

										{/* Photo */}
										<td className="px-4 py-4">
											<div className="w-20 h-20 rounded-lg overflow-hidden relative border border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0">
												{photoUrl ? (
													<Image
														src={photoUrl}
														alt={researcher.author}
														className="w-full h-full object-cover"
														fill
														onError={e => {
															e.currentTarget.style.display = "none"
															e.currentTarget.nextSibling.style.display = "flex"
														}}
													/>
												) : null}
												<div
													className={`w-full h-full flex items-center justify-center ${photoUrl ? "hidden" : "flex"}`}
												>
													<User className="h-8 w-8 text-gray-400" />
												</div>
											</div>
										</td>

										{/* Author Name */}
										<td className="px-4 py-4">
											<p className="text-sm font-semibold text-gray-900 group-hover:text-[#007856] transition-colors">
												{researcher.author}
											</p>
										</td>

										{/* Current Affiliation */}
										<td className="px-4 py-4 text-xs text-gray-600 max-w-[220px]">
											{researcher.currentAffiliation || "-"}
										</td>

										{/* Paper Affiliation */}
										<td className="px-4 py-4 text-xs text-gray-600 max-w-[220px]">
											{researcher.paperAffiliation || "-"}
										</td>

										{/* Alpha Papers Count */}
										<td className="px-4 py-4 text-center">
											<span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold bg-blue-100 text-blue-700 border border-blue-300">
												{researcher.alphaCount}
											</span>
										</td>

										{/* Papers toggle */}
										<td className="px-4 py-4 text-center">
											{researcher.papers && researcher.papers.length > 0 ? (
												<button
													onClick={e => toggleRow(e, researcher.id)}
													className="inline-flex items-center gap-1 px-2 py-1 cursor-pointer text-xs font-medium text-[#007856] hover:bg-green-50 rounded transition-colors"
												>
													<FileText className="h-3.5 w-3.5" />
													{isExpanded ? (
														<>Hide ({researcher.papers.length})</>
													) : (
														<>View ({researcher.papers.length})</>
													)}
												</button>
											) : (
												<span className="text-xs text-gray-400">-</span>
											)}
										</td>

										{/* Profile link */}
										<td className="px-4 py-4 text-center">
											{researcher.link ? (
												<a
													href={researcher.link}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center justify-center text-gray-400 hover:text-[#007856] transition-colors"
													onClick={e => e.stopPropagation()}
												>
													<ExternalLink className="h-4 w-4" />
												</a>
											) : (
												<span className="text-xs text-gray-400">-</span>
											)}
										</td>
									</tr>

									{/* Expanded Papers Row */}
									{isExpanded &&
										researcher.papers &&
										researcher.papers.length > 0 && (
											<tr>
												<td
													colSpan="8"
													className="px-4 py-4 bg-blue-50 border-t border-blue-100"
												>
													<div className="space-y-2">
														<h4 className="font-semibold text-xs text-gray-900 mb-3 flex items-center gap-2">
															<FileText className="h-4 w-4 text-[#007856]" />
															Alpha Publications ({researcher.papers.length})
														</h4>
														<ol className="space-y-3 list-decimal list-outside ml-5">
															{researcher.papers.map((paper, idx) => (
																<li
																	key={idx}
																	className="text-xs text-gray-800 leading-relaxed pl-1"
																>
																	{paper}
																</li>
															))}
														</ol>
													</div>
												</td>
											</tr>
										)}
								</React.Fragment>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
