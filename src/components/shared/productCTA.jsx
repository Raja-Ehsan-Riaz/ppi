import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ProductCTA = () => {
	return (
		<section className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto bg-blue-50 rounded-4xl p-16 lg:py-24">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 max-w-2xl mx-auto">
						Apply the Methodology to Real-World Data
					</h1>
					<p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
						Peer Perception offers a transparent framework for evaluating
						scholarly prestige. Explore the journal directory to see how the
						methodolgy translates into measurable insights.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link href={"/how-it-works"}>
							<Button
								size="lg"
								className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base rounded-lg shadow-md cursor-pointer"
							>
								How it works
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProductCTA
