import React from "react"
import { Button } from "@/components/ui/button"

const CTASection = () => {
	return (
		<section className="bg-blue-50 px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					Start Exploring the Journal Directory
				</h1>
				<p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
					Access comprehensive data on thousands of journals. Filter by
					discipline, PPI score, or geographic distribution.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button
						size="lg"
						className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base rounded-lg shadow-md"
					>
						Explore Journals Directory
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="text-primary hover:text-primary hover:bg-gray-50 px-8 py-6 text-base"
					>
						Learn more
					</Button>
				</div>
			</div>
		</section>
	)
}

export default CTASection
