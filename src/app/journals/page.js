"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
	processJournals,
	getCategories,
	paginateJournals,
} from "@/lib/journalData"
import JournalFilters from "@/components/JournalFilters"
import JournalTable from "@/components/JournalTable"
import Pagination from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import ProductCTA from "@/components/shared/productCTA"
import { useJournals } from "@/context/journalsContext"

const humanizeJournalsCount = count => {
	if (!count) return "0+"
	return `${Math.floor(count / 100) * 100}+`
}

// Loading fallback component
function JournalsLoading({ allJournals }) {
	return (
		<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto mt-12">
				<div className="text-center">
					<h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-8">
						Journal / Conference Directory
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Search and filter academic journals / conference by Peer Perception
						Index, category, discipline, and geographic distribution.
					</p>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="bg-white rounded-lg border p-16 flex flex-col items-center justify-center">
					<Loader2 className="h-16 w-16 animate-spin text-blue-600 mb-4" />
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

function JournalsContent() {
	const router = useRouter()
	const searchParams = useSearchParams()

	// Get data from context instead of fetching again
	const { journals: allJournals, loading: contextLoading } = useJournals()

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
		ppiSort: "high_to_low",
	})

	// Load and process journals when context data is ready
	useEffect(() => {
		if (contextLoading || allJournals.length === 0) return

		const loadData = async () => {
			setIsInitialLoading(true)

			// Get search parameter from URL
			const urlSearchParam = searchParams.get("search") || ""

			setCategories(getCategories(allJournals))

			// If URL has search parameter, use it as initial keyword
			if (urlSearchParam) {
				setCurrentKeyword(urlSearchParam)

				// Apply search with URL parameter
				const sorted = processJournals(allJournals, {
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
				router.replace("/journals", { scroll: false })
			} else {
				// Apply initial sort without search
				const sorted = processJournals(allJournals, {
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

			setIsInitialLoading(false)
		}

		loadData()
	}, [allJournals, contextLoading])

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

	if (contextLoading || isInitialLoading) {
		return <JournalsLoading />
	}

	return (
		<div>
			<div className="px-10 md:px-16 lg:px-24 pt-16 md:pt-24">
				<div className=" max-w-7xl mx-auto mt-12">
					{/* Header */}
					<div className="text-center">
						<h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-8">
							Journal / Conference Directory
						</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Search and filter over{" "}
							<span>{humanizeJournalsCount(allJournals.length)}</span> academic
							journals / conferences by Peer Perception Index, category,
							discipline, and geographic distribution.
						</p>
					</div>

					<div className="mt-8">
						{/* Search and Filters */}
						<JournalFilters
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
								<Loader2 className="h-5 w-5 animate-spin text-blue-600" />
								<span className="text-blue-700 font-medium">
									Searching journals...
								</span>
							</div>
						)}

						{isFiltering && (
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center gap-3">
								<Loader2 className="h-5 w-5 animate-spin text-blue-600" />
								<span className="text-blue-700 font-medium">
									Applying filters...
								</span>
							</div>
						)}

						{/* Table */}
						{!isSearching && !isFiltering && (
							<>
								{paginatedJournals.length > 0 ? (
									<JournalTable journals={paginatedJournals} />
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
export default function JournalsPage() {
	return (
		<Suspense fallback={<JournalsLoading />}>
			<JournalsContent />
		</Suspense>
	)
}
