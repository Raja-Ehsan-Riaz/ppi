import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const CTASection = () => {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 relative">
			<div className="max-w-7xl mx-auto rounded-4xl p-8 md:p-16 lg:py-24 relative overflow-hidden shadow-lg  bg-linear-to-b from-blue-50/60 via-primary/50  to-primary/20">
				{/* Content */}
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 max-w-2xl mx-auto">
						Start Exploring the Journals
					</h1>
					<p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
						Access comprehensive data on journals and conferences. Filter by
						discipline, PPI or author affiliation geography to evaluate
						prestige and quality.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link href={"/journals"}>
							<Button
								size="lg"
								className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base rounded-lg shadow-md"
							>
								Explore Journals
							</Button>
						</Link>
						<Link href={"/about-us"}>
							<Button
								size="lg"
								variant="outline"
								className="text-primary hover:text-primary hover:bg-gray-50 px-8 py-6 text-base"
							>
								Learn more
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CTASection
