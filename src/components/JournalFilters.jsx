"use client"

import { useEffect, useState } from "react"
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

export default function JournalFilters({
	categories,
	onSearch,
	onApplyFilters,
	onReset,
	isSearching,
	isFiltering,
	initialKeyword = "",
}) {
	const [keyword, setKeyword] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [ppiSort, setPpiSort] = useState("high_to_low")

	useEffect(() => {
		setKeyword(initialKeyword)
	}, [initialKeyword])

	const handleSearch = () => {
		onSearch(keyword)
	}

	const handleApplyFilters = () => {
		onApplyFilters({
			category: selectedCategory,
			ppiSort: ppiSort,
		})
	}

	const handleReset = () => {
		setSelectedCategory("all")
		setPpiSort("high_to_low")
		onReset()
	}

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			handleSearch()
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

	return (
		<div>
			{/* Search Bar - Separate Section */}
			<div className=" max-w-3xl mx-auto">
				<div className="flex gap-3 items-center ">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input
							type="text"
							placeholder="Search by journal name, ISSN, or topic..."
							value={keyword}
							onChange={e => {
								const value = e.target.value
								setKeyword(value)
								handleSearch(value) // Trigger search on every keystroke
							}}
							onKeyPress={handleKeyPress}
							className="pl-10 h-10"
						/>
					</div>
					<Button
						onClick={handleSearch}
						className="h-10 bg-primary hover:bg-primary/90 cursor-pointer"
						disabled={isSearching}
					>
						{isSearching ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Searching...
							</>
						) : (
							"Search Journals"
						)}
					</Button>
				</div>
				<p className="text-xs text-gray-500 mt-2">
					Try examples: "nature", "ISSN 0028-0836", "computer science"
				</p>
			</div>

			{/* Filter Section - Separate */}
			<div className="mt-12">
				<div className="flex gap-3 items-center flex-wrap">
					{/* Category Filter */}
					<Select
						value={selectedCategory}
						onValueChange={setSelectedCategory}
						disabled={isFiltering}
					>
						<SelectTrigger className="w-[200px] h-9">
							<SelectValue placeholder="All Categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							{categories.map(cat => (
								<SelectItem key={cat} value={cat}>
									{getCategorySymbol(cat)} - {cat}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* PPI Sort */}
					<Select
						value={ppiSort}
						onValueChange={setPpiSort}
						disabled={isFiltering}
					>
						<SelectTrigger className="w-[180px] h-9">
							<SelectValue placeholder="PPI: High to Low" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="high_to_low">PPI: High to Low</SelectItem>
							<SelectItem value="low_to_high">PPI: Low to High</SelectItem>
						</SelectContent>
					</Select>

					{/* Apply Filters Button */}
					<Button
						onClick={handleApplyFilters}
						className="h-9 min-w-[120px] bg-primary cursor-pointer"
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

					{/* Reset Button */}
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
