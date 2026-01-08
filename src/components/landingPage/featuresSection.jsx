"use client"
import React from "react"
import { Database, TrendingUp, Globe, Filter } from "lucide-react"

const FeaturesSection = () => {
	const features = [
		{
			icon: <Database className="w-6 h-6 text-primary" />,
			title: "Search Journals",
			description:
				"Access a comprehensive directory of 1,000+ journals with detailed PPI and metrics.",
			iconBg: "bg-blue-100",
		},
		{
			icon: <TrendingUp className="w-6 h-6 text-primary" />,
			title: "Evaluate PPI",
			description:
				"Understand journal prestige through data-driven analysis of first author affiliations and rankings.",
			iconBg: "bg-blue-100",
		},
		{
			icon: <Globe className="w-6 h-6 text-primary" />,
			title: "Analyze Geography",
			description:
				"Explore global distribution of first authors and identify regional publication patterns.",
			iconBg: "bg-blue-100",
		},
		{
			icon: <Filter className="w-6 h-6 text-primary" />,
			title: "Identify Quality",
			description:
				"Filter journals by PPI category to distinguish high-quality from low-quality publications.",
			iconBg: "bg-blue-100",
		},
	]

	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-blue-50">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6  rounded-4xl  ">
				{/* Header */}
				<div
					className="mb-12"
					data-aos="fade"
					data-aos-duration="1000"
					data-aos-easing="ease-out-cubic"
				>
					<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight max-w-md ">
						What can you do with Peer Perception Index?
					</h2>
					<p className="text-base md:text-lg text-gray-600 max-w-md">
						A quality-centric framework for researchers, academics, and
						institutions to evaluate the <b> true prestige</b> of journals and
						conferences beyond traditional metrics.
					</p>
				</div>

				{/* Feature Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{features.map((feature, index) => (
						<div
							key={index}
							className="p-4 "
							data-aos="fade-up"
							data-aos-duration="1000"
							data-aos-easing="ease-out-cubic"
						>
							{/* Icon */}
							<div
								className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-5 border border-primary/60`}
							>
								{feature.icon}
							</div>

							{/* Title */}
							<h3 className="text-xl font-semibold text-gray-900 mb-3">
								{feature.title}
							</h3>

							{/* Description */}
							<p className="text-gray-600 leading-relaxed">
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
