"use client"
import React from "react"
import { Database, TrendingUp, Globe, Filter } from "lucide-react"

const FeaturesSection = () => {
	const features = [
		{
			icon: <Database className="w-8 h-8 text-purple-600" />,
			title: "Search Journals",
			description:
				"Access a comprehensive directory of 12,000+ journals with detailed PPI scores and metrics.",
			bgColor: "bg-purple-50",
			iconBg: "bg-purple-100",
		},
		{
			icon: <TrendingUp className="w-8 h-8 text-green-600" />,
			title: "Evaluate PPI Scores",
			description:
				"Understand journal prestige through data-driven analysis of author affiliations and rankings.",
			bgColor: "bg-green-50",
			iconBg: "bg-green-100",
		},
		{
			icon: <Globe className="w-8 h-8 text-pink-600" />,
			title: "Analyze Geography",
			description:
				"Explore global distribution of authors and identify regional publication patterns.",
			bgColor: "bg-pink-50",
			iconBg: "bg-pink-100",
		},
		{
			icon: <Filter className="w-8 h-8 text-yellow-600" />,
			title: "Identify Quality",
			description:
				"Filter journals by PPI category to distinguish high-quality from low-quality publications.",
			bgColor: "bg-yellow-50",
			iconBg: "bg-yellow-100",
		},
	]

	return (
		<section className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
						What can you do with Peer
						<br className="hidden sm:block" />
						Perception Index?
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						A comprehensive toolkit for researchers, academics, and institutions
						to evaluate journal quality.
					</p>
				</div>

				{/* Feature Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((feature, index) => (
						<div
							key={index}
							className={`bg-white border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}
						>
							{/* Icon */}
							<div
								className={` w-14 h-14 rounded-xl flex items-center justify-center mb-4`}
							>
								{feature.icon}
							</div>

							{/* Title */}
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								{feature.title}
							</h3>

							{/* Description */}
							<p className="text-sm text-gray-600 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default FeaturesSection
