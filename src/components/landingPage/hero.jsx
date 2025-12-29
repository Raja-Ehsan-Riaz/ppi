"use client"
import React, { useState } from "react"
import { Search, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"

const Hero = () => {
	const [searchQuery, setSearchQuery] = useState("")
	const [journals, setJournals] = useState([
		{
			id: "journal-1",
			name: "QUARTERLY JOURNAL OF ECONOMICS",
			abbreviation: "Q J ECON",
			publisher: "OXFORD UNIV PRESS INC",
			issn: "0033-5533",
			eissn: "1531-4650",
			category: "Alpha",
			ppi: 30.91,
			totalPapers: 1068,
			tier1Papers: 613,
			tier2Papers: 76,
			tier3Papers: 17,
			tier4Papers: 21,
			slug: "quarterly-journal-of-economics",
		},
		{
			id: "journal-2",
			name: "Journal of Causal Inference",
			abbreviation: "J CAUSAL INFERENCE",
			publisher: "DE GRUYTER POLAND SP Z O O",
			issn: "2193-3677",
			eissn: "2193-3685",
			category: "Alpha",
			ppi: 28.96,
			totalPapers: 332,
			tier1Papers: 173,
			tier2Papers: 29,
			tier3Papers: 12,
			tier4Papers: 6,
			slug: "journal-of-causal-inference",
		},
		{
			id: "journal-3",
			name: "Foundations and Trends in Machine Learning",
			abbreviation: "FOUND TRENDS MACH LE",
			publisher: "NOW PUBLISHERS INC",
			issn: "1935-8237",
			eissn: "1935-8245",
			category: "Alpha",
			ppi: 27.43,
			totalPapers: 103,
			tier1Papers: 49,
			tier2Papers: 12,
			tier3Papers: 3,
			tier4Papers: 3,
			slug: "foundations-and-trends-in-machine-learning",
		},
		{
			id: "journal-4",
			name: "Foundations and Trends in Machine Learning",
			abbreviation: "FOUND TRENDS MACH LE",
			publisher: "NOW PUBLISHERS INC",
			issn: "1935-8237",
			eissn: "1935-8245",
			category: "Alpha",
			ppi: 27.43,
			totalPapers: 103,
			tier1Papers: 49,
			tier2Papers: 12,
			tier3Papers: 3,
			tier4Papers: 3,
			slug: "foundations-and-trends-in-machine-learning",
		},
	])
	const [loading, setLoading] = useState(false)

	// Data is now hardcoded above, no need to fetch
	// useEffect removed

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

	return (
		<div className="relative mt-12">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24  ">
				<div className="text-center ">
					{/* Badge */}
					<div className="inline-flex items-center bg-white/60 p-2 rounded-full font-medium border border-gray-200  space-x-2 mb-6">
						<div className="w-2 h-2 bg-blue-600 rounded-full"></div>
						<span className="text-xs text-gray-600">
							Academic Journal Intelligence
						</span>
					</div>

					{/* Main Heading */}
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
						Measure True
						<br />
						Academic Prestige
					</h1>

					{/* Subheading */}
					<p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
						The Peer Perception Index analyzes where top researchers actually
						publish, providing a transparent metric for journal quality beyond
						traditional impact factors.
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
									placeholder="Search by journal name, ISSN, or topic..."
									className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
								/>
							</div>
							<button
								type="submit"
								className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
							>
								Search Journals
							</button>
						</form>
					</div>

					{/* Example searches */}
					<p className="text-sm text-gray-500">
						Try searching: "Nature", "IEEE 0018-9375", or "computer science"
					</p>
				</div>

				{/* Journals Preview Table Section */}
				<div className="mt-20 relative">
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
						{/* Table Header */}
						<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
							<h2 className="text-lg font-semibold text-gray-900">Journals</h2>
							<div className="flex items-center space-x-3">
								<button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
									<Filter className="w-4 h-4" />
									<span>Filters</span>
								</button>
								<button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
									<span>Export data</span>
								</button>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b border-gray-200">
									<tr>
										<th className="w-12 px-6 py-3"></th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Journal
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Abbreviation
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Publisher
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											ISSN
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											eISSN
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											PPI Score
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Category
										</th>
										<th className="w-12 px-6 py-3"></th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{journals.map((journal, index) => (
										<tr
											key={journal.id}
											className="hover:bg-gray-50 transition-colors pointer-events-none"
											style={{
												opacity: 1 - index * 0.25,
											}}
										>
											<td className="px-6 py-4">
												<input
													type="checkbox"
													className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
													disabled
												/>
											</td>
											<td className="px-6 py-4 text-sm font-medium text-gray-900">
												{journal.name}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{journal.abbreviation}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{journal.publisher}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{journal.issn || "-"}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{journal.eissn || "-"}
											</td>
											<td className="px-6 py-4 text-sm text-gray-900 font-medium">
												{journal.ppi}
											</td>
											<td className="px-6 py-4">
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
													{journal.category}
												</span>
											</td>
											<td className="px-6 py-4">
												<ExternalLink className="w-4 h-4 text-gray-400" />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Fade overlay */}
						<div className="absolute bottom-20 left-0 right-0 h-60 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
					</div>

					{/* Explore Button */}
					<div className="flex justify-center mt-8 relative z-10">
						<Link
							href="/journals"
							className="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
						>
							Explore full directory
						</Link>
					</div>
				</div>
			</main>
			<div className="absolute bottom-1/5 left-0 w-full h-4/5 -z-10  bg-linear-to-b from-white via-primary/30 via-70% to-white "></div>
		</div>
	)
}

export default Hero
