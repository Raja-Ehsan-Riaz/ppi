"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Search, Loader2 } from "lucide-react"

export default function StarResearcherFilters({
	onSearch,
	onApplyFilters,
	onReset,
	isSearching,
	isFiltering,
	initialKeyword = "",
}) {
	const [keyword, setKeyword] = useState("")
	const [alphaSort, setAlphaSort] = useState("most_papers")
	const debounceTimerRef = useRef(null)

	useEffect(() => {
		setKeyword(initialKeyword)
	}, [initialKeyword])

	const debouncedSearch = useCallback(
		(searchTerm) => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
			debounceTimerRef.current = setTimeout(() => {
				onSearch(searchTerm)
			}, 300)
		},
		[onSearch]
	)

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
		}
	}, [])

	const handleSearch = () => {
		if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
		onSearch(keyword)
	}

	const handleInputChange = (e) => {
		const value = e.target.value
		setKeyword(value)
		debouncedSearch(value)
	}

	const handleApplyFilters = () => {
		onApplyFilters({ alphaSort })
	}

	const handleReset = () => {
		setKeyword("")
		setAlphaSort("most_papers")
		if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
		onReset()
	}

	const handleKeyPress = (e) => {
		if (e.key === "Enter") handleSearch()
	}

	return (
		<div>
			{/* Search Bar */}
			<div className="max-w-3xl mx-auto">
				<div className="flex gap-3 items-center">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input
							type="text"
							placeholder="Search by researcher name or affiliation..."
							value={keyword}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
							className="pl-10 h-10"
						/>
					</div>
					<Button
						onClick={handleSearch}
						className="h-10 bg-[#007856] hover:bg-[#007856]/80 cursor-pointer"
						disabled={isSearching}
					>
						{isSearching ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Searching...
							</>
						) : (
							"Search Researchers"
						)}
					</Button>
				</div>
				<p className="text-xs text-gray-500 mt-2">
					Try examples: "Bhutta", "NUST", "University of Toronto"
				</p>
			</div>

			{/* Filter Section */}
			<div className="mt-12">
				<div className="flex gap-3 items-center flex-wrap">
					{/* Sort Select */}
					<Select
						value={alphaSort}
						onValueChange={setAlphaSort}
						disabled={isFiltering}
					>
						<SelectTrigger className="w-[240px] h-9">
							<SelectValue placeholder="Most Alpha Papers" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="most_papers">Most Alpha Papers</SelectItem>
							<SelectItem value="least_papers">Least Alpha Papers</SelectItem>
						</SelectContent>
					</Select>

					{/* Apply Filters */}
					<Button
						onClick={handleApplyFilters}
						className="h-9 min-w-[120px] bg-[#007856] hover:bg-[#007856]/80 cursor-pointer"
						disabled={isFiltering}
					>
						{isFiltering ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Applying...
							</>
						) : (
							"Apply Filters"
						)}
					</Button>

					{/* Reset */}
					<Button
						onClick={handleReset}
						variant="outline"
						className="h-9 min-w-[100px]"
						disabled={isFiltering || isSearching}
					>
						Reset All
					</Button>
				</div>
			</div>
		</div>
	)
}