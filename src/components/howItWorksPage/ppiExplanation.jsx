"use client"
import React, { useEffect, useRef, useState } from "react"
import {
	Database,
	TrendingUp,
	Calculator,
	ArrowUpDown,
	CheckCircle,
} from "lucide-react"

// Import KaTeX CSS
import "katex/dist/katex.min.css"

const CategoryCard = ({
	icon,
	label,
	range,
	description,
	color,
	iconColor,
	index,
}) => {
	return (
		<div
			className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-700 `}
		>
			<div className="flex flex-col md:flex-row items-start md:items-center gap-8">
				<div
					className={`px-3  py-1 min-w-28 justify-start  flex items-center rounded-md border  ${color}`}
				>
					<span className="text-sm mr-2">{label}</span>(
					<div className={`${iconColor} text-sm mb-0.5`}>{icon}</div>)
				</div>
				<div className="flex-2 font-semibold text-gray-600 mb-2">{range}</div>
				<p className="text-gray-500 flex-9 leading-relaxed">{description}</p>
			</div>
		</div>
	)
}

// KaTeX Formula Component
const MathFormula = ({ latex, block = false }) => {
	const containerRef = useRef(null)

	useEffect(() => {
		if (containerRef.current && typeof window !== "undefined") {
			const katex = require("katex")
			try {
				katex.render(latex, containerRef.current, {
					throwOnError: false,
					displayMode: block,
				})
			} catch (error) {
				console.error("KaTeX rendering error:", error)
			}
		}
	}, [latex, block])

	return (
		<span
			ref={containerRef}
			className={block ? "block my-4 overflow-x-auto" : "inline-block"}
		/>
	)
}

const StepCard = ({ step, index, isVisible }) => {
	const Icon = step.icon

	return (
		<div className="relative">
			{/* Timeline line */}
			{index < 3 && (
				<div className="absolute left-[35px] top-[40px] w-[1.5px] h-full hidden md:block">
					<div
						className={`h-full ${
							isVisible ? "bg-blue-600" : "bg-gray-300"
						} transition-colors duration-700`}
					></div>
				</div>
			)}

			<div className="flex gap-8 relative">
				{/* Number Circle */}
				<div className="flex-shrink-0 hidden md:block">
					<div
						className={`w-18 h-18 rounded-full ${
							isVisible ? "bg-blue-600" : "bg-gray-300"
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
							<h2 className="text-xl md:text-3xl font-bold text-gray-900">
								{step.title}
							</h2>
						</div>

						<p className="text-gray-600">{step.description}</p>
					</div>

					<p className="text-gray-600 mb-6">{step.details}</p>

					{/* Points */}
					{step.points && (
						<div className="space-y-3 mb-6">
							{step.points.map((point, i) => (
								<div key={i} className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-800" />
									<p className="text-gray-600">{point}</p>
								</div>
							))}
						</div>
					)}

					{/* Formula */}
					{step.formula && (
						<div
							className={`rounded-lg p-6 mb-6 border ${
								isVisible ? `bg-white` : "bg-gray-50"
							}`}
						>
							<h4 className="font-semibold text-gray-900 mb-4">Formula:</h4>
							<div className="text-center">
								<MathFormula latex={step.formula.latex} block={true} />
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
			title: "Collect First Author Data",
			description:
				"Identify first-author affiliations from research publications.",
			details:
				"We collect comprehensive metadata from academic papers published over the past 18 years (since 2008), including:",
			points: [
				"Analyze research publications published in journals and conferences",
				"Identify first authors and their affiliated universities or organizations",
			],
			footer: "Data source: Clarivate Insights, Web of Science (WoS)",
			icon: Database,
		},
		{
			number: "02",
			title: "Weight by Prestige",
			description:
				"Classify institutions using Times Higher Education (THE) global university rankings",
			details:
				"Each first-author affiliation is classified using the Times Higher Education (THE) global university rankings. Institutions are grouped into four prestige brackets:",
			points: [
				"λc₁ = No. of research publications in the journal/conference with first author affiliated to universities ranked 1ˢᵗ – 50ᵗʰ in THE global ranking.",
				"λc₂ = No. of research publications in the journal/conference with first author affiliated to universities ranked 51ˢᵗ – 100ᵗʰ in THE global ranking.",
				"λc₃ = No. of research publications in the journal/conference with first author affiliated to universities ranked 101ˢᵗ – 150ᵗʰ in THE global ranking.",
				"λc₄ = No. of research publications in the journal/conference with first author affiliated to universities ranked 151ˢᵗ – 200ᵗʰ in THE global ranking.",
			],
			footer:
				"These groups represent decreasing levels of institutional prestige, with higher-ranked universities given greater importance in the computation.",
			icon: TrendingUp,
		},
		{
			number: "03",
			title: "Calculate Index",
			description:
				"Compute the Peer Perception Index (PPI) using weighted formula",
			details:
				"The Peer Perception Index (PPI) is computed by assigning different weights to publications from each ranking bracket and normalizing them by the total number of publications. The weights reflect the relative importance of each prestige group.",
			formula: {
				latex:
					"PPI = \\left[0.5\\left(\\frac{\\lambda_{c1}}{\\lambda}\\right) + 0.25\\left(\\frac{\\lambda_{c2}}{\\lambda}\\right) + 0.15\\left(\\frac{\\lambda_{c3}}{\\lambda}\\right) + 0.1\\left(\\frac{\\lambda_{c4}}{\\lambda}\\right)\\right] \\times 100",
				weights: [
					{ tier: "λc₁/λ (Ranked 1-50):", value: "50% weight" },
					{ tier: "λc₂/λ (Ranked 51-100):", value: "25% weight" },
					{ tier: "λc₃/λ (Ranked 101-150):", value: "15% weight" },
					{ tier: "λc₄/λ (Ranked 151-200):", value: "10% weight" },
				],
			},
			footer:
				"This formulation assigns 50% of the total weight to publications originating from universities ranked 1–50, with progressively lower weights for lower-ranked brackets.",
			icon: Calculator,
		},
		{
			number: "04",
			title: "Categorize Journals / Conferences",
			description:
				"Based on the final PPI, journals and conferences are categorized to reflect their standing among academic peers:",
			details:
				"Raw scores are normalized to a 0-100 scale using percentile ranking within disciplinary groups, then classified into five categories:",
			categories: [
				{
					icon: "α",
					label: "Alpha",
					range: "PPI ≥ 15.00",
					description: "Most prestigious journals/conferences",
					color: "bg-blue-50 border-blue-300 text-blue-700",
					iconColor: "text-blue-700",
				},
				{
					icon: "β",
					label: "Beta",
					range: "(15.00 > PPI ≥ 10.00)",
					description: "Well-respected journals/conferences",
					color: "bg-green-50 border-green-300 text-green-700",
					iconColor: "text-green-700",
				},
				{
					icon: "γ",
					label: "Gamma",
					range: "(10.00 > PPI ≥ 5.00)",
					description: "Low-quality journals/conferences",
					color: "bg-orange-50 border-orange-300 text-orange-700",
					iconColor: "text-orange-700",
				},
				{
					icon: "δ",
					label: "Delta",
					range: "(5.00 > PPI ≥ 2.00)",
					description: "Borderline predatory journals/conferences",
					color: "bg-purple-50 border-purple-300 text-purple-700",
					iconColor: "text-purple-700",
				},
				{
					icon: "■",
					label: "None",
					range: "(PPI < 2.00)",
					description:
						"Journals/conferences with extremely negative peer perception",
					color: "bg-gray-50 border-gray-300 text-gray-700",
					iconColor: "text-gray-700",
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
		<div
			className="bg-gradient-to-b from-gray-50 to-white px-6 md:px-16 lg:px-24 py-16 md:py-24 rounded-t-[5rem]"
			id="methodology"
		>
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
