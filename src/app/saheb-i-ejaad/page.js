"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import PakistaniJournalTable from "@/components/pakistaniJournalTable"
import PakistaniJournalFilters from "@/components/pakistaniJournalFilters"
import Pagination from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import ProductCTA from "@/components/shared/productCTA"
import Image from "next/image"

const humanizeJournalsCount = count => {
	if (!count) return "0+"
	return `${Math.floor(count / 100) * 100}+`
}

// Helper functions for filtering and sorting
function processJournals(journals, filters = {}) {
	let filtered = [...journals]

	// Apply keyword search filter
	if (filters.keyword && filters.keyword.trim() !== "") {
		const searchLower = filters.keyword.toLowerCase().trim()
		filtered = filtered.filter(
			j =>
				j.name.toLowerCase().includes(searchLower) ||
				j.abbreviation.toLowerCase().includes(searchLower) ||
				j.publisher.toLowerCase().includes(searchLower) ||
				j.issn.toLowerCase().includes(searchLower) ||
				j.eissn.toLowerCase().includes(searchLower) ||
				j.category.toLowerCase().includes(searchLower)
		)
	}

	// Apply category filter
	if (filters.category && filters.category !== "all") {
		filtered = filtered.filter(j => j.category === filters.category)
	}

	// Apply sorting
	const sortOrder = filters.ppiSort || "most_papers"
	switch (sortOrder) {
		case "most_papers":
			filtered.sort((a, b) => b.pakistaniPapers - a.pakistaniPapers)
			break
		case "least_papers":
			filtered.sort((a, b) => a.pakistaniPapers - b.pakistaniPapers)
			break
		case "high_to_low":
			filtered.sort((a, b) => b.ppi - a.ppi)
			break
		case "low_to_high":
			filtered.sort((a, b) => a.ppi - b.ppi)
			break
	}

	return filtered
}

function getCategories(journals) {
	const categories = new Set(
		journals.map(j => j.category).filter(cat => cat && cat.trim() !== "")
	)
	return Array.from(categories).sort()
}

function paginateJournals(journals, page = 1, perPage = 10) {
	const totalPages = Math.ceil(journals.length / perPage)
	const startIndex = (page - 1) * perPage
	const endIndex = startIndex + perPage
	const paginatedJournals = journals.slice(startIndex, endIndex)

	return {
		journals: paginatedJournals,
		totalPages,
		currentPage: page,
		totalResults: journals.length,
	}
}

// Loading fallback component
function SahebIEjadLoading() {
	return (
		<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto mt-12">
				<div className="text-center">
					<h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-8">
						Saheb-i-Ejaad
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Pakistani Research Publications Directory
					</p>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="bg-white rounded-lg border p-16 flex flex-col items-center justify-center">
					<Loader2 className="h-16 w-16 animate-spin text-[#007856] mb-4" />
					<p className="text-gray-600 text-lg font-medium">
						Loading journals...
					</p>
					<p className="text-gray-500 text-sm mt-2">
						Please wait while we fetch the data
					</p>
				</div>
			</div>
		</div>
	)
}

// Main content component that uses useSearchParams
function SahebIEjadContent() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [allJournals, setAllJournals] = useState([])
	const [displayedJournals, setDisplayedJournals] = useState([])
	const [paginatedJournals, setPaginatedJournals] = useState([])
	const [categories, setCategories] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [perPage, setPerPage] = useState(10)

	// Separate loading states
	const [isInitialLoading, setIsInitialLoading] = useState(true)
	const [isSearching, setIsSearching] = useState(false)
	const [isFiltering, setIsFiltering] = useState(false)

	// Current filters state
	const [currentKeyword, setCurrentKeyword] = useState("")
	const [currentFilters, setCurrentFilters] = useState({
		category: "all",
		ppiSort: "most_papers",
	})

	// Load and process journals
	useEffect(() => {
		const loadData = async () => {
			setIsInitialLoading(true)

			try {
				const response = await fetch("/api/saheb-i-ejaad")
				const data = await response.json()

				if (data.journals) {
					setAllJournals(data.journals)

					// Get search parameter from URL
					const urlSearchParam = searchParams.get("search") || ""

					setCategories(getCategories(data.journals))

					// If URL has search parameter, use it as initial keyword
					if (urlSearchParam) {
						setCurrentKeyword(urlSearchParam)

						// Apply search with URL parameter
						const sorted = processJournals(data.journals, {
							keyword: urlSearchParam,
							category: "all",
							ppiSort: "high_to_low",
						})

						setDisplayedJournals(sorted)

						// Paginate
						const { journals: paginated, totalPages: pages } = paginateJournals(
							sorted,
							1,
							perPage
						)
						setPaginatedJournals(paginated)
						setTotalPages(pages)
						setCurrentPage(1)

						// Remove search parameter from URL
						router.replace("/saheb-i-ejad", { scroll: false })
					} else {
						// Apply initial sort without search
						const sorted = processJournals(data.journals, {
							keyword: "",
							category: "all",
							ppiSort: "high_to_low",
						})

						setDisplayedJournals(sorted)

						// Paginate
						const { journals: paginated, totalPages: pages } = paginateJournals(
							sorted,
							1,
							perPage
						)
						setPaginatedJournals(paginated)
						setTotalPages(pages)
						setCurrentPage(1)
					}
				}
			} catch (error) {
				console.error("Error loading journals:", error)
			} finally {
				setIsInitialLoading(false)
			}
		}

		loadData()
	}, [])

	// Handle search separately
	const handleSearch = keyword => {
		setIsSearching(true)
		setCurrentKeyword(keyword)

		// Apply search with current filters
		const filtered = processJournals(allJournals, {
			keyword: keyword,
			category: currentFilters.category,
			ppiSort: currentFilters.ppiSort,
		})

		setDisplayedJournals(filtered)

		// Reset to page 1
		const { journals: paginated, totalPages: pages } = paginateJournals(
			filtered,
			1,
			perPage
		)
		setPaginatedJournals(paginated)
		setTotalPages(pages)
		setCurrentPage(1)

		setIsSearching(false)
	}

	// Handle apply filters separately
	const handleApplyFilters = async filters => {
		setIsFiltering(true)
		setCurrentFilters(filters)

		// Small delay to show loading
		await new Promise(resolve => setTimeout(resolve, 300))

		// Apply filters with current keyword
		const filtered = processJournals(allJournals, {
			keyword: currentKeyword,
			category: filters.category,
			ppiSort: filters.ppiSort,
		})

		setDisplayedJournals(filtered)

		// Reset to page 1
		const { journals: paginated, totalPages: pages } = paginateJournals(
			filtered,
			1,
			perPage
		)
		setPaginatedJournals(paginated)
		setTotalPages(pages)
		setCurrentPage(1)

		setIsFiltering(false)
	}

	// Handle reset
	const handleReset = async () => {
		setIsSearching(true)
		setCurrentKeyword("")
		setCurrentFilters({
			category: "all",
			ppiSort: "high_to_low",
		})

		await new Promise(resolve => setTimeout(resolve, 300))

		// Reset to all journals with default sort
		const sorted = processJournals(allJournals, {
			keyword: "",
			category: "all",
			ppiSort: "high_to_low",
		})

		setDisplayedJournals(sorted)

		const { journals: paginated, totalPages: pages } = paginateJournals(
			sorted,
			1,
			perPage
		)
		setPaginatedJournals(paginated)
		setTotalPages(pages)
		setCurrentPage(1)

		setIsSearching(false)
	}

	// Handle page change
	const handlePageChange = page => {
		setCurrentPage(page)
		const { journals: paginated } = paginateJournals(
			displayedJournals,
			page,
			perPage
		)
		setPaginatedJournals(paginated)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	const handlePerPageChange = perPage => {
		const { journals: paginated, totalPages: pages } = paginateJournals(
			displayedJournals,
			1,
			perPage
		)
		setPaginatedJournals(paginated)
		setTotalPages(pages)
		setCurrentPage(1)
		setPerPage(perPage)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	if (isInitialLoading) {
		return <SahebIEjadLoading />
	}

	return (
		<div>
			<div className="bg-gray-200 h-[90vh] max-w-400  relative overflow-hidden mx-auto  mt-20 ">
				<Image
					src="/Saheb-i-Ejaad Hero.jpg"
					alt=""
					fill
					className="object-cover"
				/>
			</div>
			<div className="px-10 md:px-16 lg:px-24 pt-16 md:pt-24">
				<div className="max-w-7xl mx-auto ">
					{/* Header */}
					<div className="text-center">
						<h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-8">
							Saheb-e-Ejaad
						</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Journals / Conferences featuring research publications from
							Pakistani first authors. Explore over{" "}
							<span>{humanizeJournalsCount(allJournals.length)}</span> journals
							/ conferences with contributions from Pakistan.
						</p>
					</div>

					<div className="mt-8">
						{/* Search and Filters */}
						<PakistaniJournalFilters
							categories={categories}
							onSearch={handleSearch}
							onApplyFilters={handleApplyFilters}
							onReset={handleReset}
							isSearching={isSearching}
							isFiltering={isFiltering}
							initialKeyword={currentKeyword}
						/>

						{/* Results Header */}
						<div className="mt-10 mb-4 flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Showing results:{" "}
									<span className="font-semibold">
										{displayedJournals.length.toLocaleString()}
									</span>
								</p>
								{currentKeyword && (
									<p className="text-xs text-gray-500 mt-1">
										Search term:{" "}
										<span className="font-medium">"{currentKeyword}"</span>
									</p>
								)}
							</div>
							<Button variant="outline" size="sm" className="gap-2">
								<Download className="h-4 w-4" />
								Export data
							</Button>
						</div>

						{/* Loading States */}
						{isSearching && (
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center gap-3">
								<Loader2 className="h-5 w-5 animate-spin text-[#007856]" />
								<span className="text-[#007856] font-medium">
									Searching journals...
								</span>
							</div>
						)}

						{isFiltering && (
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center gap-3">
								<Loader2 className="h-5 w-5 animate-spin text-[#007856]" />
								<span className="text-[#007856] font-medium">
									Applying filters...
								</span>
							</div>
						)}

						{/* Table */}
						{!isSearching && !isFiltering && (
							<>
								{paginatedJournals.length > 0 ? (
									<PakistaniJournalTable journals={paginatedJournals} />
								) : (
									<div className="bg-white rounded-lg border p-12 text-center">
										<p className="text-gray-500 text-lg mb-4">
											No journals found matching your criteria.
										</p>
										<Button onClick={handleReset}>Reset All Filters</Button>
									</div>
								)}
							</>
						)}

						{/* Pagination */}
						{displayedJournals.length > 0 && !isSearching && !isFiltering && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								perPage={perPage}
								handlePerPage={handlePerPageChange}
								onPageChange={handlePageChange}
							/>
						)}
					</div>
				</div>
			</div>
			<ProductCTA />
		</div>
	)
}

// Main page component with Suspense wrapper
export default function SahebIEjadPage() {
	return (
		<Suspense fallback={<SahebIEjadLoading />}>
			<SahebIEjadContent />
		</Suspense>
	)
}
