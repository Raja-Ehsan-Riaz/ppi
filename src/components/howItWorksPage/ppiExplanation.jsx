import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, TrendingUp, Calculator, Award } from "lucide-react"
import { Dot } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { DotIcon } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

const CategoryCard = ({ icon, label, range, desc, color, index }) => {
	return (
		<div
			className={`bg-gray-50 rounded-lg p-8 border border-gray-200 transition-all duration-700 `}
		>
			<div className="flex items-start gap-8">
				<div
					className={`px-3  min-w-25 justify-start flex items-center rounded-md border  font-medium whitespace-nowrap ${color}`}
				>
					<Dot size={30} /> <span className="text-xs">{label}</span>
				</div>
				<div className="text-xl flex-1 font-bold text-center text-gray-800 mb-2">
					{range}
				</div>
				<p className="text-gray-600 flex-7 leading-relaxed">{desc}</p>
			</div>
		</div>
	)
}

const PPIExplanation = () => {
	const steps = [
		{
			number: "01",
			title: "Collect Author Data",
			description:
				"Aggregate author affiliation data from published research papers",
			details:
				"We collect comprehensive metadata from academic papers published over the past 5 years, including:",
			points: [
				"Author names and institutional affiliations at time of publication",
				"Journal identifiers (ISSN, eISSN) and publication metadata",
				"Geographic location of author institutions",
				"Disciplinary classification of journals and papers",
			],
			footer:
				"Data sources: Crossref, PubMed, arXiv, institutional repositories",
			icon: Database,
			iconColor: "text-blue-400",
		},
		{
			number: "02",
			title: "Weight by Prestige",
			description:
				"Classify institutions into five tiers based on global university rankings",
			details:
				"Each author's institutional affiliation is mapped to a ranking tier using composite scores from major global university rankings:",
			points: [
				"Author names and institutional affiliations at time of publication",
				"Journal identifiers (ISSN, eISSN) and publication metadata",
				"Geographic location of author institutions",
				"Disciplinary classification of journals and papers",
			],
			tiers: [
				{ name: "Tier 1", desc: "Top 50 universities globally" },
				{ name: "Tier 2", desc: "Ranked 51-200" },
				{ name: "Tier 3", desc: "Ranked 201-500" },
				{ name: "Tier 4", desc: "Ranked 501-1000" },
				{ name: "Tier 5", desc: "Ranked 1000+ or unranked" },
			],
			footer:
				"Rankings synthesized from: QS World University Rankings, Times Higher Education, Academic Ranking of World Universities (ARWU)",
			icon: TrendingUp,
			iconColor: "text-purple-400",
		},
		{
			number: "03",
			title: "Calculate Index",
			description: "Calculate journal scores using tier-based weighting system",
			details:
				"Each paper contributes to a journal's score based on the ranking tier of its authors' institutions. Papers from higher-tier universities receive greater weight:",
			points: [
				"Author names and institutional affiliations at time of publication",
				"Journal identifiers (ISSN, eISSN) and publication metadata",
				"Geographic location of author institutions",
				"Disciplinary classification of journals and papers",
			],
			formula: {
				title: "PPIraw = Σ (wtier × npapers)",
				weights: [
					{ tier: "wtier1 (Top 50):", value: "5.0" },
					{ tier: "wtier2 (51-200):", value: "3.0" },
					{ tier: "wtier3 (201-500):", value: "1.5" },
					{ tier: "wtier4 (501-1000):", value: "0.5" },
					{ tier: "wtier5 (1000+):", value: "0.1" },
				],
			},
			footer:
				"Papers with multiple authors from different tiers contribute fractionally to each tier's count.",
			icon: Calculator,
			iconColor: "text-green-400",
		},
		{
			number: "04",
			title: "Calculate Final PPI",
			description: "Normalize scores to 0-100 scale and assign category labels",
			details:
				"Raw scores are normalized to a 0-100 scale using percentile ranking within disciplinary groups, then classified into five categories:",
			categories: [
				{
					label: "Alpha",
					range: "80-100",
					desc: "Elite journals where the vast majority of authors are from top-tier research institutions. Represents the highest prestige in academic publishing.",
					color: "bg-blue-100 text-blue-700 border-blue-300",
				},
				{
					label: "Beta",
					range: "60-79",
					desc: "High-quality journals with strong representation from globally ranked universities. Well-regarded within their respective fields.",
					color: "bg-green-100 text-green-700 border-green-300",
				},
				{
					label: "Gamma",
					range: "40-59",
					desc: "Established journals with moderate top-tier representation. Recognized venues for solid academic work.",
					color: "bg-yellow-100 text-yellow-700 border-yellow-300",
				},
				{
					label: "Delta",
					range: "20-39",
					desc: "Journals with lower institutional prestige metrics. May serve regional or specialized audiences.",
					color: "bg-orange-100 text-orange-700 border-orange-300",
				},
				{
					label: "None",
					range: "0-19",
					desc: "Journals with minimal representation from ranked institutions. Requires careful evaluation before submission.",
					color: "bg-gray-100 text-gray-700 border-gray-300",
				},
			],
			footer:
				"Data sources: Crossref, PubMed, arXiv, institutional repositories",

			icon: ArrowUpDown,
			iconColor: "text-amber-400",
		},
	]

	return (
		<div className="bg-gray-50 px-10 md:px-16 lg:px-24 py-16 md:py-24 ">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
						Understanding Peer Perception Index
					</h1>
					<p className="text-gray-600 text-lg max-w-3xl mx-auto">
						PPI analyzes where researchers from top-tier institutions choose to
						publish, revealing true academic prestige beyond citation counts.
					</p>
				</div>

				{/* Steps */}
				<div className="space-y-8">
					{steps.map((step, index) => {
						const Icon = step.icon
						return (
							<Card
								key={index}
								className="overflow-hidden transition-shadow duration-300"
							>
								<CardContent className="p-10">
									<div className="flex items-start justify-between mb-6">
										<div>
											<div className="flex items-center gap-3 text-gray-700 mt-4">
												<div className=" h-2 w-2 rounded-full bg-gray-700 mt-1"></div>
												<span className="text-sm">How it works</span>
											</div>
											<Icon size={70} className="text-primary mt-12" />
										</div>
										<span className="text-6xl font-bold text-gray-800">
											{step.number}
										</span>
									</div>

									<h2 className="text-3xl font-bold text-gray-900 mb-6">
										{step.title}
									</h2>
									<p className="text-gray-600 ">{step.description}</p>
									<p className="text-gray-600 mb-8">{step.details}</p>

									{/* Points */}
									<div className="space-y-2 mb-6">
										{step.points?.map((point, i) => (
											<div
												key={i}
												className="flex text-gray-600 items-start gap-4"
											>
												<CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
												<p>{point}</p>
											</div>
										))}
									</div>

									{/* Tiers */}
									{step.tiers && (
										<div className="flex flex-wrap gap-3 mb-6">
											{step.tiers.map((tier, i) => (
												<div
													key={i}
													className="border border-gray-200 rounded-lg p-6 bg-gray-50 w-60"
												>
													<h4 className="font-semibold text-lg text-gray-900 mb-1">
														{tier.name}
													</h4>
													<p className="text-xs text-gray-600">{tier.desc}</p>
												</div>
											))}
										</div>
									)}

									{/* Formula */}
									{step.formula && (
										<div className="rounded-lg p-6 mb-6 border max-w-2xl bg-gray-50">
											<h4 className="font-semibold text-gray-900 mb-4">
												{step.formula.title}
											</h4>
											<div className="space-y-2">
												{step.formula.weights.map((weight, i) => (
													<div
														key={i}
														className="flex justify-between items-center"
													>
														<span className="text-sm text-gray-600">
															{weight.tier}
														</span>
														<span className="font-mono font-semibold text-gray-900">
															{weight.value}
														</span>
													</div>
												))}
											</div>
										</div>
									)}

									{/* Categories */}
									{step.categories && (
										<div className="space-y-3 mb-6">
											{step.categories.map((cat, i) => (
												<CategoryCard {...cat} key={i} />
											))}
										</div>
									)}

									{/* Footer */}
									{step.footer && (
										<p className="text-sm text-gray-500 italic mt-4">
											{step.footer}
										</p>
									)}
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default PPIExplanation
