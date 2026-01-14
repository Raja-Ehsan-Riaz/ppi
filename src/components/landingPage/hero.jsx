"use client"
import React, { useState, useEffect } from "react"
import { Search, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useJournals } from "@/context/journalsContext" // Adjust path as needed
import { Badge } from "../ui/badge"

const Hero = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [previewJournals, setPreviewJournals] = useState([])

	const { journals, loading, searchJournals, getTopJournals } = useJournals()

	// Update preview journals when search query changes or data loads
	useEffect(() => {
		if (searchQuery.trim()) {
			// Show top 3 matching search results
			const filtered = searchJournals(searchQuery).slice(0, 3)
			setPreviewJournals(filtered)
		} else {
			// Show top 3 journals by PPI when no search query
			const top = getTopJournals(4)
			setPreviewJournals(top)
		}
	}, [searchQuery, journals])

	const handleSearch = e => {
		e.preventDefault()
		if (searchQuery.trim()) {
			window.location.href = `/journals?search=${encodeURIComponent(
				searchQuery
			)}`
		} else {
			window.location.href = "/journals"
		}
	}
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
		<div>
			<main className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-8 py-16 pt-24 relative rounded-4xl overflow-hidden mt-12 ">
				<div
					className="text-center "
					data-aos="fade"
					data-aos-duration="1500"
					data-aos-easing="ease-out-cubic"
				>
					{/* Main Heading */}
					<h1 className="text-[56px] font-bold text-gray-900 mb-4  mx-auto leading-tight max-w-xl ">
						Know Quality Perception of Peers
					</h1>

					{/* Subheading */}
					<p className="text-lg text-gray-600 max-w-5xl mx-auto mb-8">
						The Peer Perception Index analyzes where top researchers actually
						publish, providing a transparent metric for journal/conference
						quality beyond traditional impact factors.
					</p>

					{/* Search Bar */}
					<div className="max-w-2xl mx-auto mb-4">
						<form
							onSubmit={handleSearch}
							className="flex flex-col sm:flex-row gap-3"
						>
							<div className="relative flex-1">
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
									placeholder="Search by journal/conference name, ISSN, or topic..."
									className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								/>
							</div>
							<button
								type="submit"
								className="px-6 py-3 bg-blue-600/70 text-white rounded-lg hover:bg-blue-600/90 shadow-md cursor-pointer text-sm transition-colors font-medium whitespace-nowrap"
							>
								Search Journals
							</button>
						</form>
					</div>

					{/* Example searches */}
					<p className="text-xs text-gray-500">
						Try searching: "Nature", "IEEE 0018-9375", or "computer science"
					</p>
				</div>

				{/* Journals Preview Table Section */}
				<div
					className="mt-16 relative max-w-[1200px] mx-auto"
					data-aos="fade-up"
					data-aos-duration="500"
					data-aos-easing="ease-out-cubic"
				>
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-2">
						{/* Table Header */}
						<div className="px-4 py-4 border-b border-gray-200 flex justify-between items-center">
							<h2 className="text-xl font-bold text-gray-900">
								{searchQuery.trim()
									? "Search Preview"
									: "Top Journals / Conferences"}
							</h2>
							<div className="flex items-center space-x-3">
								<button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
									<Filter className="w-4 h-4" />
									<span>Filters</span>
								</button>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							{loading ? (
								<div className="px-4 py-12 text-center text-gray-500">
									Loading journals...
								</div>
							) : previewJournals.length === 0 ? (
								<div className="px-4 py-12 text-center text-gray-500">
									No journals found matching "{searchQuery}"
								</div>
							) : (
								<table className="w-full">
									<thead className="bg-gray-50 border-b border-gray-200">
										<tr>
											<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
												Journal / Conference
											</th>
											<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
												Abbreviation
											</th>
											<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
												Publisher
											</th>
											<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
												ISSN
											</th>
											<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
												eISSN
											</th>
											<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
												PPI
											</th>
											<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
												Category
											</th>
											<th className="w-12 px-4 py-4"></th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{previewJournals.map((journal, index) => (
											<tr
												key={journal.id}
												className="hover:bg-gray-50 transition-colors"
												style={{
													opacity: 1 - index * 0.25,
												}}
											>
												<td className="px-4 py-4 text-xs font-medium  text-gray-900">
													<Link
														href={`/journals/${journal.slug}`}
														className="hover:text-primary"
													>
														{journal.name}
													</Link>
												</td>
												<td className="px-4 py-4 text-xs text-gray-600">
													{journal.abbreviation}
												</td>
												<td className="px-4 py-4 text-xs text-gray-600">
													{journal.publisher}
												</td>
												<td className="px-4 py-4 text-xs text-gray-600">
													{journal.issn || "-"}
												</td>
												<td className="px-4 py-4 text-xs text-gray-600">
													{journal.eissn || "-"}
												</td>
												<td className="px-4 py-4 text-xs text-blue-600 font-semibold">
													{journal.ppi.toFixed(2)}
												</td>
												<td className="px-4 py-4">
													{journal.category &&
													journal.category.trim() !== "" ? (
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
													<Link href={`/journals/${journal.slug}`}>
														<ExternalLink className="w-4 h-4 text-gray-400" />
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>

						{/* Fade overlay */}
						<div className="absolute bottom-20 left-0 right-0 h-60 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
					</div>

					{/* Explore Button */}
					<div className="flex justify-center mt-8 relative z-10">
						<Link
							href={
								searchQuery.trim()
									? `/journals?search=${encodeURIComponent(searchQuery)}`
									: `/journals`
							}
							className="px-8 py-4 bg-black/80 hover:bg-black/90 text-white rounded-xl text-sm font-semibold transition-colors  shadow-lg hover:shadow-xl transform transition-transform"
						>
							Explore full directory
						</Link>
					</div>
				</div>
				<div className="absolute bottom-1/5 left-0 w-full h-4/5 -z-10  bg-linear-to-b from-white via-primary/50 via-60% to-white "></div>
			</main>
		</div>
	)
}

export default Hero
