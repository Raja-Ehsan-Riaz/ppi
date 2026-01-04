"use client"
import React, { useEffect, useRef, useState } from "react"
import {
	Database,
	TrendingUp,
	Calculator,
	ArrowUpDown,
	CheckCircle,
} from "lucide-react"

const CategoryCard = ({ label, range, desc, color, isVisible }) => {
	return (
		<div
			className={` ${
				isVisible ? `bg-white` : "bg-gray-50"
			}  rounded-lg p-6 border border-gray-200`}
		>
			<div className="flex items-start gap-6">
				<div
					className={`px-3 py-1 rounded-md border font-medium whitespace-nowrap text-xs ${color}`}
				>
					{label}
				</div>
				<div className="text-lg font-bold text-gray-800 min-w-[80px]">
					{range}
				</div>
				<p className="text-gray-600 text-sm leading-relaxed flex-1">{desc}</p>
			</div>
		</div>
	)
}

const StepCard = ({ step, index, isVisible }) => {
	const Icon = step.icon

	return (
		<div className="relative">
			{/* Timeline line */}
			{index < 3 && (
				<div className="absolute left-[35px] top-[40px] w-[1.5px] h-full">
					<div
						className={`h-full ${
							isVisible ? "bg-primary" : "bg-gray-300"
						} transition-colors duration-700`}
					></div>
				</div>
			)}

			<div className="flex gap-8 relative">
				{/* Number Circle */}
				<div className="flex-shrink-0">
					<div
						className={`w-18 h-18 rounded-full ${
							isVisible ? "bg-primary" : "bg-gray-300"
						} flex items-center justify-center text-white font-bold transition-colors duration-700 relative z-10`}
					>
						{String(index + 1).padStart(2, "0")}
					</div>
				</div>

				{/* Content Card */}
				<div
					className={`flex-1  rounded-2xl p-8 border-2 ${
						isVisible ? `bg-blue-50` : "bg-white"
					} transition-all duration-700`}
				>
					{/* Header */}
					<div className="mb-4">
						<div className="flex gap-4 items-center mb-4">
							<div>
								<Icon size={40} className={` transition-colors duration-700`} />
							</div>
							<h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
						</div>

						<p className="text-gray-600">{step.description}</p>
					</div>

					{/* Icon */}

					<p className="text-gray-600 mb-6">{step.details}</p>

					{/* Points */}
					{step.points && (
						<div className="space-y-3 mb-6">
							{step.points.map((point, i) => (
								<div key={i} className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
									<p className="text-gray-600 text-sm">{point}</p>
								</div>
							))}
						</div>
					)}

					{/* Tiers */}
					{step.tiers && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							{step.tiers.map((tier, i) => (
								<div
									key={i}
									className={`border border-gray-200 rounded-lg p-4 ${
										isVisible ? `bg-white` : "bg-gray-50"
									} `}
								>
									<h4 className="font-semibold text-gray-900 mb-1">
										{tier.name}
									</h4>
									<p className="text-xs text-gray-600">{tier.desc}</p>
								</div>
							))}
						</div>
					)}

					{/* Formula */}
					{step.formula && (
						<div
							className={`rounded-lg p-6 mb-6 border ${
								isVisible ? `bg-white` : "bg-gray-50"
							} max-w-2xl`}
						>
							<h4 className="font-semibold text-gray-900 mb-4">
								{step.formula.title}
							</h4>
							<div className="space-y-2">
								{step.formula.weights.map((weight, i) => (
									<div key={i} className="flex justify-between items-center">
										<span className="text-sm text-gray-600">{weight.tier}</span>
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
								<CategoryCard key={i} {...cat} isVisible />
							))}
						</div>
					)}

					{/* Footer */}
					{step.footer && (
						<p className="text-sm text-gray-500 italic mt-4">{step.footer}</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default function PPIExplanation() {
	const [visibleSteps, setVisibleSteps] = useState([])
	const observerRefs = useRef([])

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
					desc: "Elite journals where the vast majority of authors are from top-tier research institutions.",
					color: "bg-blue-100 text-blue-700 border-blue-300",
				},
				{
					label: "Beta",
					range: "60-79",
					desc: "High-quality journals with strong representation from globally ranked universities.",
					color: "bg-green-100 text-green-700 border-green-300",
				},
				{
					label: "Gamma",
					range: "40-59",
					desc: "Established journals with moderate top-tier representation.",
					color: "bg-yellow-100 text-yellow-700 border-yellow-300",
				},
				{
					label: "Delta",
					range: "20-39",
					desc: "Journals with lower institutional prestige metrics.",
					color: "bg-orange-100 text-orange-700 border-orange-300",
				},
				{
					label: "None",
					range: "0-19",
					desc: "Journals with minimal representation from ranked institutions.",
					color: "bg-gray-100 text-gray-700 border-gray-300",
				},
			],
			footer:
				"Normalization ensures fair comparison across disciplines with different publishing patterns.",
			icon: ArrowUpDown,
		},
	]

	useEffect(() => {
		const observers = observerRefs.current.map((ref, index) => {
			if (!ref) return null

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setVisibleSteps(prev => [...new Set([...prev, index])])
					}
				},
				{ threshold: 0.3 }
			)

			observer.observe(ref)
			return observer
		})

		return () => {
			observers.forEach(observer => observer?.disconnect())
		}
	}, [])

	return (
		<div className="bg-gradient-to-b from-gray-50 to-white px-6 md:px-16 lg:px-24 py-16 md:py-24 rounded-t-[5rem]">
			<div className="max-w-7xl mx-auto">
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
				<div className="space-y-16">
					{steps.map((step, index) => (
						<div
							key={index}
							ref={el => (observerRefs.current[index] = el)}
							id={step.title}
						>
							<StepCard
								step={step}
								index={index}
								isVisible={visibleSteps.includes(index)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
