import React from "react"
import { BookOpen, Globe, Target, TrendingUp } from "lucide-react"

const AssumptionsLimitations = () => {
	const items = [
		{
			icon: BookOpen,
			title: "Institutional Prestige Proxy",
			description:
				"We assume researchers at top-ranked universities are well-informed about journal prestige and have strong incentives to publish in the most respected venues. This may not hold equally across all disciplines or career stages.",
		},
		{
			icon: Globe,
			title: "Global Rankings Validity",
			description:
				"University rankings themselves have methodological limitations and may not perfectly capture research quality. We use composite rankings from multiple sources to mitigate individual ranking biases.",
		},
		{
			icon: Target,
			title: "Disciplinary Differences",
			description:
				"Publishing norms vary significantly across disciplines. PPI are normalized within disciplinary groups, but cross-discipline comparisons should be made cautiously.",
		},
		{
			icon: TrendingUp,
			title: "Complementary Metric",
			description:
				"PPI should be used alongside traditional metrics like impact factor, not as a replacement. It provides a different perspective on journal quality focused on institutional prestige rather than citations.",
		},
	]

	return (
		<div className=" px-10 md:px-16 lg:px-24 py-16 md:py-24 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
						Key Assumptions & Limitations
					</h1>
					<p className="text-gray-600 text-lg max-w-3xl mx-auto">
						The PPI methodology relies on several assumptions that users should
						understand when interpreting scores.
					</p>
				</div>

				{/* Grid */}
				<div className="grid md:grid-cols-2 gap-6">
					{items.map((item, index) => {
						const Icon = item.icon
						return (
							<div
								key={index}
								className="bg-white  rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
							>
								<div className="flex items-center gap-4 mb-6 ">
									<Icon className="w-7 h-7 text-primary" />
									<h3 className="text-xl font-semibold text-gray-900 ">
										{item.title}
									</h3>
								</div>
								<p className="text-gray-600 leading-relaxed">
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

export default AssumptionsLimitations
