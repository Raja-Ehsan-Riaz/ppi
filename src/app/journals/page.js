"use client"

import { useState, useEffect } from "react"
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
import CTASection from "@/components/shared/ctaSection"

export default function JournalsPage() {
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
		ppiSort: "high_to_low",
	})
	// Load journals on mount
	useEffect(() => {
		const loadData = async () => {
			setIsInitialLoading(true)
			console.log("asd")
			const response = await fetch("/api/Journals")
			const journals = await response.json()
			console.log(journals.journals)
			setAllJournals(journals.journals)
			setCategories(getCategories(journals.journals))

			// Apply initial sort
			const sorted = processJournals(journals.journals, {
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

			setIsInitialLoading(false)
		}

		loadData()
	}, [])

	// Handle search separately
	const handleSearch = async keyword => {
		setIsSearching(true)
		setCurrentKeyword(keyword)

		// Small delay to show loading
		await new Promise(resolve => setTimeout(resolve, 300))

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
		setCurrentFilters({
			category: "all",
			ppiSort: "high_to_low",
		})

		await new Promise(resolve => setTimeout(resolve, 300))

		// Reset to all journals with default sort
		const sorted = processJournals(allJournals, {
			keyword: currentKeyword,
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
		return (
			<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
				<div className="max-w-7xl mx-auto  mt-12">
					{/* Header */}
					<div className="flex justify-between ">
						<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
							Journal Directory
						</h1>
						<p className="text-gray-600 max-w-2xl">
							Search and filter over 12,000 academic journals by Peer Perception
							Index score, category, discipline, and geographic distribution.
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

	return (
		<div>
			<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
				<div className="max-w-7xl mx-auto  mt-12">
					{/* Header */}
					<div className="flex justify-between ">
						<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
							Journal Directory
						</h1>
						<p className="text-gray-600 max-w-2xl">
							Search and filter over 12,000 academic journals by Peer Perception
							Index score, category, discipline, and geographic distribution.
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
						/>

						{/* Results Header */}
						<div className="mt-8 mb-4 flex items-center justify-between">
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
			<CTASection />
		</div>
	)
}
