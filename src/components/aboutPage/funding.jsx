import React from "react"
import { GraduationCap, Building2, Banknote, Globe } from "lucide-react"
import FundingIllustration from "./illustrations/fundingIllustration"

const Funding = () => {
	const items = [
		{
			icon: <GraduationCap className="w-6 h-6" />,
			title: "Project Title:",
			description:
				"Evaluating Our Higher Education Experiment: A Rigorous Quality-centric Appraisal of Pakistan's Research Publication Landscape",
		},
		{
			icon: <Building2 className="w-6 h-6" />,
			title: "Funding Agency:",
			description: "Pakistan Institute of Development Economics (PIDE)",
		},
		{
			icon: <Banknote className="w-6 h-6" />,
			title: "Funding Stream:",
			description:
				"Competitive Research Grants for Policy Oriented Research (RASTA)",
		},
		{
			icon: <Globe className="w-6 h-6" />,
			title: "Funding Cycle:",
			description: "RASTA CGP 7.0",
		},
	]

	return (
		<div className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Side - Text Content */}
					<div>
						{/* Header */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
							Funding &<br />Support
						</h1>
						<div className="space-y-4 mb-12">
							<p className="text-gray-600 text-base md:text-lg leading-relaxed">
								This project is supported by funding from the Pakistan Institute
								of Development Economics (PIDE) under the Competitive Research
								Grants for Policy Oriented Research (RASTA) program.
							</p>
							<p className="text-gray-600 text-base md:text-lg leading-relaxed">
								The team gratefully acknowledges this support, which made the
								development of Peer Perception Index possible.
							</p>
						</div>
					</div>

					{/* Right Side - Illustration */}
					<div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
						<FundingIllustration  />
					</div>
				</div>

				{/* Grid - Full Width Below */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
					{items.map((item, index) => (
						<div
							key={index}
							className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 shadow-sm transition-shadow duration-300"
						>
							{/* Icon */}
							<div className="w-12 h-12 rounded-xl bg-blue-1	00 flex items-center justify-center text-primary mb-4">
								{item.icon}
							</div>

							{/* Title */}
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								{item.title}
							</h3>

							{/* Description */}
							<p className="text-sm text-gray-600 leading-relaxed">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Funding