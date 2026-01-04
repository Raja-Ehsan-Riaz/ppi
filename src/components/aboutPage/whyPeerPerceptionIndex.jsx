import React from "react"
import { CheckCircle } from "lucide-react"

export default function WhyPeerPerceptionIndex() {
	const features = [
		{
			title: "Unbiased Assessment",
			description:
				"We focus on institutional publishing behavior rather than citations, providing a more objective measure of prestige that isn't susceptible to citation rings or manipulation.",
		},
		{
			title: "Global Data Network",
			description:
				"Our platform covers over 12,000 journals globally, incorporating metadata from millions of papers to ensure a truly comprehensive overview across all academic disciplines.",
		},
		{
			title: "Academic Integrity",
			description:
				"Led by researchers from world-class institutions, PPI is maintained with a strict commitment to academic rigor and non-commercial independence.",
		},
		{
			title: "Strategic Insight",
			description:
				"Beyond just a number, PPI offers qualitative insights into the geographic and institutional distribution of a journal's authorship base.",
		},
	]

	return (
		<div className="bg-linear-to-b from-white to-gray-50 px-6 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-2 gap-12 items-start">
					{/* Left Column - Title */}
					<div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
							Why Peer Perception Index?
						</h1>
						<p className="mt-8 text-lg text-gray-600">
							A comprehensive toolkit for researchers, academics, and
							institutions to evaluate journal quality.
						</p>
					</div>

					{/* Right Column - Features */}
					<div className="space-y-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex gap-4 bg-gray-50 hover:bg-gray-100 border p-4 rounded-2xl"
							>
								<div className="flex-shrink-0">
									<CheckCircle className="w-6 h-6 text-blue-500" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
