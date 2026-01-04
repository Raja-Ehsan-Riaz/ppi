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
		<div className="m-12 mt-24 my-0 ">
			<main className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-8 py-16 relative rounded-4xl overflow-hidden ">
				<div
					className="text-center "
					data-aos="fade"
					data-aos-duration="1500"
					data-aos-easing="ease-out-cubic"
				>
					{/* Badge */}
					<div className="inline-flex items-center bg-white/80 p-2 rounded-full font-medium border border-gray-200  space-x-2 mb-2">
						<div className="w-2 h-2 bg-gray-400 rounded-full"></div>
						<span className="text-xs text-gray-600">
							Academic Journal Intelligence
						</span>
					</div>

					{/* Main Heading */}
					<h1 className="text-[56px] font-bold text-gray-900 mb-4  mx-auto leading-tight max-w-xl ">
						Measure True Academic Prestige
					</h1>

					{/* Subheading */}
					<p className="text-lg text-gray-600 max-w-5xl mx-auto mb-8">
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
							<h2 className="text-xl font-bold text-gray-900">Journals</h2>
							<div className="flex items-center space-x-3">
								<button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
									<Filter className="w-4 h-4" />
									<span>Filters</span>
								</button>
								{/* <button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
									<span>Export data</span>
								</button> */}
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b border-gray-200">
									<tr>
										{/* <th className="w-12 px-4 py-"></th> */}
										<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Journal
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
											PPI Score
										</th>
										<th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
											Category
										</th>
										<th className="w-12 px-4 py-4"></th>
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
											{/* <td className="px-4 py-4">
												<input
													type="checkbox"
													className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
													disabled
												/>
											</td> */}
											<td className="px-4 py-4 text-xs font-medium text-gray-900">
												{journal.name}
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
												{journal.ppi}
											</td>
											<td className="px-4 py-4">
												<span className="inline-flex items-center px-4.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
													{journal.category}
												</span>
											</td>
											<td className="px-4 py-4">
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
							className="px-8 py-4 bg-black/80 hover:bg-black/90 text-white rounded-xl text-sm font-semibold transition-colors  shadow-lg hover:shadow-xl transform transition-transform"
						>
							Explore full directory
						</Link>
					</div>
				</div>
				<div className="absolute bottom-1/5 left-0 w-full h-4/5 -z-10  bg-linear-to-b from-blue-50/60 via-primary/60 via-60% to-white "></div>
			</main>
		</div>
	)
}

export default Hero
