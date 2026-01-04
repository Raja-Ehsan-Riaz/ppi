"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, TrendingUp } from "lucide-react"
import { Database } from "lucide-react"
import { Calculator } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

const PPIMethodologySteps = () => {
	const [activeStep, setActiveStep] = useState(0)

	const steps = [
		{
			number: "01",
			title: "Collect Author Data",
			icon: Database,
			description:
				"We analyze millions of papers to identify author affiliations and institutional rankings.",
			items: [
				"Parse author metadata from academic publications",
				"Extract institutional affiliations from paper records",
				"Normalize institution names for consistency",
			],
		},
		{
			number: "02",
			title: "Weight by Prestige",
			icon: TrendingUp,
			description:
				"Author affiliations are cross-referenced against major university ranking systems to categorize institutions into prestige tiers.",
			items: [
				"Top 100 globally ranked universities",
				"Top 500 globally ranked universities",
				"Other ranked institutions",
				"Unranked/regional institutions",
			],
		},
		{
			number: "03",
			title: "Calculate Index",
			icon: Calculator,
			description:
				"The final PPI score reflects where elite researchers choose to publish their work.",
			items: [
				"Top 100: Weight factor of 1.0",
				"Top 500: Weight factor of 0.6",
				"Other Ranked: Weight factor of 0.3",
				"Unranked: Weight factor of 0.1",
			],
		},
		{
			number: "04",
			title: "Calculate Final PPI",
			icon: ArrowUpDown,
			description:
				"The weighted scores are aggregated and normalized to produce the final Peer Perception Index score on a 0-100 scale.",
			items: [
				"Aggregate weighted author contributions",
				"Normalize against reference distributions",
				"Apply temporal smoothing for stability",
				"Assign categorical tier (Alpha through None)",
			],
		},
	]
	const currentStep = steps[activeStep]
	const Icon = currentStep.icon

	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
						Understanding Peer Perception Index
					</h2>
					<p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
						PPI analyzes where researchers from top-tier institutions choose to
						publish, revealing true academic prestige beyond citation counts.
					</p>
				</div>

				{/* Step Indicator */}
				<div className="flex justify-between items-start mb-12 gap-4">
					{steps.map((step, index) => (
						<div
							key={index}
							className="flex flex-col items-center flex-1  border-b-2 pb-4 group"
							onClick={() => setActiveStep(index)}
						>
							<button
								className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all duration-300 ${
									index === activeStep
										? "bg-primary text-white"
										: "bg-white border-2 border-gray-300 text-gray-400"
								}`}
							>
								{step.number}
							</button>
							<div className="mt-3 flex flex-col items-center w-full">
								<p
									className={`text-xs md:text-sm font-medium text-center group-hover:text-primary transition-colors duration-300 ${
										index === activeStep ? "text-primary " : "text-gray-600"
									}`}
								>
									{step.title}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Content Area */}
				<div className=" max-w-6xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12 relative">
					<div className="flex flex-col md:flex-row gap-8 md:gap-12">
						{/* Left Content */}
						<div className="flex-1">
							<h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								{currentStep.title}
							</h3>
							<p className="text-gray-600 text-base mb-8 leading-relaxed">
								{currentStep.description}
							</p>

							{/* Checklist */}
							<ul className="space-y-3 mb-8">
								{currentStep.items.map((item, idx) => (
									<li key={idx} className="flex items-start gap-3">
										<CheckCircle className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
										<span className="text-gray-700 text-sm">{item}</span>
									</li>
								))}
							</ul>

							{/* Learn More Button */}
							<Link href={`/how-it-works#${currentStep.title}`}>
								{" "}
								<Button
									variant="outline"
									className="border-2 border-primary text-primary hover:bg-blue-50 hover:text-blue-700 rounded-lg px-6 py-5"
								>
									Learn more
									<ArrowRight />
								</Button>
							</Link>
						</div>

						{/* Right Illustration */}
						<div className="flex-shrink-0 flex items-center justify-center md:w-64">
							<Icon className="w-48 h-48 text-blue-300 opacity-50" />
						</div>
					</div>
				</div>

				{/* Navigation Dots (Mobile) */}
				<div className="flex justify-center gap-2 mt-8 md:hidden">
					{steps.map((_, index) => (
						<button
							key={index}
							onClick={() => setActiveStep(index)}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								index === activeStep ? "bg-primary w-8" : "bg-gray-300"
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default PPIMethodologySteps
