import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export default function Pagination({
	currentPage,
	totalPages,
	perPage,
	handlePerPage,
	onPageChange,
}) {
	const handlePerPageChange = value => {
		handlePerPage(value)
	}
	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages = []
		const maxVisible = 5

		if (totalPages <= maxVisible) {
			// Show all pages if total is small
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			// Always show first page
			pages.push(1)

			let start = Math.max(2, currentPage - 1)
			let end = Math.min(totalPages - 1, currentPage + 1)

			// Adjust if at beginning
			if (currentPage <= 3) {
				end = 4
			}

			// Adjust if at end
			if (currentPage >= totalPages - 2) {
				start = totalPages - 3
			}

			// Add ellipsis if needed
			if (start > 2) {
				pages.push("...")
			}

			// Add middle pages
			for (let i = start; i <= end; i++) {
				pages.push(i)
			}

			// Add ellipsis if needed
			if (end < totalPages - 1) {
				pages.push("...")
			}

			// Always show last page
			pages.push(totalPages)
		}

		return pages
	}

	return (
		<div className="mt-6 flex items-center justify-end bg-gray-50 px-4 py-3 rounded-lg border">
			{/* Left side - Per page selector */}
			{/* <div className="flex items-center gap-2 text-sm text-gray-600">
				<span>Showing</span>
				<Select value={perPage.toString()} onValueChange={handlePerPageChange}>
					<SelectTrigger className="w-20 h-8">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="25">25</SelectItem>
						<SelectItem value="50">50</SelectItem>
					</SelectContent>
				</Select>
			</div> */}

			{/* Right side - Page navigation */}
			<div className="flex items-center gap-4">
				{/* Page buttons */}
				<div className="flex items-center gap-2">
					{/* Previous button */}
					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === 1}
						onClick={() => onPageChange(currentPage - 1)}
						className="h-8"
					>
						Previous
					</Button>

					{/* Page number buttons */}
					{getPageNumbers().map((page, index) => {
						if (page === "...") {
							return (
								<span key={`ellipsis-${index}`} className="px-2 text-gray-500">
									...
								</span>
							)
						}

						return (
							<Button
								key={page}
								variant={currentPage === page ? "default" : "outline"}
								size="sm"
								onClick={() => onPageChange(page)}
								className={`h-8 w-8 p-0 ${
									currentPage === page
										? "bg-primary text-white hover:bg-primary/90"
										: ""
								}`}
							>
								{page}
							</Button>
						)
					})}

					{/* Next button */}
					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === totalPages}
						onClick={() => onPageChange(currentPage + 1)}
						className="h-8"
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
