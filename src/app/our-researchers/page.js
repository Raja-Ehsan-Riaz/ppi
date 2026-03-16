// app/our-researchers/page.jsx
"use client"

import { useState, useEffect, useCallback } from "react"
import StarResearcherTable from "@/components/starResearcherTable"
import StarResearcherFilters from "@/components/starResearcherFilters"
import Pagination from "@/components/Pagination"
import { Loader2 } from "lucide-react"

const PER_PAGE = 100

export default function OurResearchersPage() {
	const [allResearchers, setAllResearchers] = useState([])
	const [filteredResearchers, setFilteredResearchers] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isSearching, setIsSearching] = useState(false)
	const [isFiltering, setIsFiltering] = useState(false)
	const [error, setError] = useState(null)

	// Current filter state (used to re-apply after search)
	const [currentFilters, setCurrentFilters] = useState({ alphaSort: "most_papers" })
	const [currentKeyword, setCurrentKeyword] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(PER_PAGE)

	useEffect(() => {
		fetchResearchers()
	}, [])

	async function fetchResearchers() {
		try {
			setIsLoading(true)
			const res = await fetch("/api/our-researchers")
			if (!res.ok) throw new Error("Failed to fetch researchers")
			const data = await res.json()
			setAllResearchers(data.researchers)
			setFilteredResearchers(data.researchers)
		} catch (err) {
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const applyFiltersAndSearch = useCallback(
		(researchers, keyword, filters) => {
			let result = [...researchers]

			// Keyword filter
			if (keyword && keyword.trim() !== "") {
				const kw = keyword.toLowerCase()
				result = result.filter(
					(r) =>
						r.author.toLowerCase().includes(kw) ||
						(r.currentAffiliation && r.currentAffiliation.toLowerCase().includes(kw)) ||
						(r.paperAffiliation && r.paperAffiliation.toLowerCase().includes(kw))
				)
			}

			// Sort
			if (filters.alphaSort === "most_papers") {
				result.sort((a, b) => b.alphaCount - a.alphaCount)
			} else if (filters.alphaSort === "least_papers") {
				result.sort((a, b) => a.alphaCount - b.alphaCount)
			}

			return result
		},
		[]
	)

	const handleSearch = useCallback(
		(keyword) => {
			setIsSearching(true)
			setCurrentKeyword(keyword)
			setCurrentPage(1)
			const result = applyFiltersAndSearch(allResearchers, keyword, currentFilters)
			setFilteredResearchers(result)
			setIsSearching(false)
		},
		[allResearchers, currentFilters, applyFiltersAndSearch]
	)

	const handleApplyFilters = useCallback(
		(filters) => {
			setIsFiltering(true)
			setCurrentFilters(filters)
			setCurrentPage(1)
			const result = applyFiltersAndSearch(allResearchers, currentKeyword, filters)
			setFilteredResearchers(result)
			setIsFiltering(false)
		},
		[allResearchers, currentKeyword, applyFiltersAndSearch]
	)

	const handleReset = useCallback(() => {
		setCurrentKeyword("")
		setCurrentFilters({ alphaSort: "most_papers" })
		setCurrentPage(1)
		setFilteredResearchers(
			[...allResearchers].sort((a, b) => b.alphaCount - a.alphaCount)
		)
	}, [allResearchers])

	return (
		<div className="min-h-screen bg-white">
			{/* Hero / Header */}
			<div className="bg-[#007856] text-white px-6 md:px-16 lg:px-24 py-16 md:py-24 pt-32">
				<div className="max-w-7xl mx-auto min-h-[40vh] flex flex-col items-start justify-center mt-5">
					<p className="text-lg font-medium text-green-200 mb-2 uppercase tracking-wider">
						PPI Star Researchers
					</p>
					<h1 className="text-4xl md:text-5xl font-bold ">
						Find out who has published the most Alpha papers in engineering and
						computer science with Pakistani affiliation
					</h1>
				</div>
			</div>

			<div className="max-w-7xl mx-auto">
				{/* Description Card */}
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-10 my-10 text-gray-700 leading-relaxed space-y-3">
					<p>
						Journals and conferences categorized as <strong>Alpha</strong> in the Peer Perception
						Index (PPI) are truly top-quality publication venues. Publishing in these venues is a
						great accomplishment. <em>Saheb-e-Ejaad</em> portal is a tribute to these star
						researchers who have aimed at the top and got there, despite a system that encourages
						low-quality publications in excessive quantity.
					</p>
					<ul className="list-disc list-outside ml-5 space-y-1">
						<li>This data shows publications in <strong>engineering &amp; computer science</strong> related journals/conferences.</li>
						<li>This data shows publications in <strong>Alpha journals/conferences only</strong>.</li>
						<li>
							In engineering &amp; computer science, there are <strong>1,425 journals/conferences</strong> that
							have been explored and assigned a PPI score. While the list is exhaustive, we do not
							claim to encompass all journals/conferences in the field.
						</li>
						<li>
							If a journal/conference is not included in our database, its publications are not
							considered for this analysis. However, the likelihood of a top-quality journal missing
							our analysis is extremely low.
						</li>
					</ul>
					<p className="text-xs text-gray-500">
						If your paper has not been considered, kindly contact us at{" "}
						<a
							href="mailto:contact@peerperceptionindex.com"
							className="text-[#007856] underline"
						>
							contact@peerperceptionindex.com
						</a>
						. We&apos;ll be happy to correct the data.
					</p>
				</div>

				{/* Filters */}
				<div className="mb-8">
					<StarResearcherFilters
						onSearch={handleSearch}
						onApplyFilters={handleApplyFilters}
						onReset={handleReset}
						isSearching={isSearching}
						isFiltering={isFiltering}
						initialKeyword={currentKeyword}
					/>
				</div>

				{/* Results count */}
				{!isLoading && !error && (
					<p className="text-sm text-gray-500 mb-4">
						Showing <strong>{Math.min(currentPage * perPage, filteredResearchers.length)}</strong> of{" "}
						<strong>{filteredResearchers.length}</strong> researchers
					</p>
				)}

				{/* Table */}
				{isLoading ? (
					<div className="flex items-center justify-center py-24 text-gray-500 gap-3">
						<Loader2 className="h-6 w-6 animate-spin" />
						<span>Loading researchers...</span>
					</div>
				) : error ? (
					<div className="flex items-center justify-center py-24 text-red-500">
						<p>Error: {error}</p>
					</div>
				) : filteredResearchers.length === 0 ? (
					<div className="flex items-center justify-center py-24 text-gray-400">
						<p>No researchers found matching your search.</p>
					</div>
				) : (
					<>
						<StarResearcherTable
							researchers={filteredResearchers.slice(
								(currentPage - 1) * perPage,
								currentPage * perPage
							)}
						/>
						<Pagination
							currentPage={currentPage}
							totalPages={Math.ceil(filteredResearchers.length / perPage)}
							perPage={perPage}
							handlePerPage={() => {}}
							onPageChange={(page) => {
								setCurrentPage(page)
								window.scrollTo({ top: 0, behavior: "smooth" })
							}}
						/>
					</>
				)}
			</div>
		</div>
	)
}