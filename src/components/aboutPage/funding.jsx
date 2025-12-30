import React from "react"
import { BookOpen, Globe, Target, TrendingUp } from "lucide-react"

const Funding = () => {
	const items = [
		{
			title: "Funding Agency:",
			description: "Pakistan Institute of Development Economics (PIDE)",
		},
		{
			title: "Funding Stream:",
			description:
				"Competitive Research Grants for Policy Oriented Research (RASTA)",
		},
		{
			title: "Funding Cycle: ",
			description: "RASTA CGP 7.0",
		},
		{
			title: "Project Title: ",
			description:
				"Evaluating Our Higher Education Experiment: A Rigorous Quality-centric Appraisal of Pakistan's Research Publication Landscape",
		},
	]

	return (
		<div className=" px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-left mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
						Funding & Support
					</h1>
					<p className="text-gray-600 text-lg mb-2 ">
						This project is supported by funding from the Pakistan Institute of
						Development Economics (PIDE) under the Competitive Research Grants
						for Policy Oriented Research (RASTA) program.
					</p>
					<p className="text-gray-600 text-lg ">
						The team gratefully acknowledges this support, which made the
						development of Peer Perception Index possible.
					</p>
				</div>

				{/* Grid */}
				<div className="grid md:grid-cols-2 gap-6">
					{items.map((item, index) => {
						return (
							<div
								key={index}
								className="bg-blue-50 border border-blue-200 rounded-xl p-8  transition-shadow duration-300 "
							>
								<h3 className="text-2xl font-semibold text-gray-900 mb-3">
									{item.title}
								</h3>
								<p className="text-gray-600 leading-relaxed mb-8">
									{item.description}
								</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Funding
