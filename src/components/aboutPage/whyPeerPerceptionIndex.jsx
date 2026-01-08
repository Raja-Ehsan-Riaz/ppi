import React from "react"
import { CheckCircle } from "lucide-react"

export default function WhyPeerPerceptionIndex() {
	const features = [
		{
			title: "Unbiased Assessment",
			description:
				"The Peer Perception Index (PPI) was developed to address the limitations of traditional journal-ranking metrics and to provide a quality-centric view of journal and conference prestige.",
		},
		{
			title: "Peer Perspective",
			description:
				"The index reflects collective peer perception by analyzing publication patterns of first authors affiliated with globally ranked universities and organizations.",
		},
		{
			title: "Quality over Metrics",
			description:
				"By focusing on institutional affiliation and publication behavior, PPI helps distinguish prestigious venues from low-quality and borderline predatory journals, including so-called “pink horses.”",
		},
		{
			title: "Meaningful Insight",
			description:
				"PPI provides clarity on journal and conference standing by categorizing venues into Alpha, Beta, Gamma, Delta, or None, clearly separating the good, the bad, and the ugly.",
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
							The Peer Perception Index (PPI) was developed to address the
							limitations of traditional journal-ranking metrics and to provide
							a quality-centric view of journal and conference prestige.
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
