import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import {
	CheckCircle2,
	Database,
	TrendingUp,
	Calculator,
	ArrowUpDown,
	ArrowRight,
} from "lucide-react"

const PPIMethodologyCarousel = () => {
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

	return (
		<section className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
						Understanding Peer Perception Index
					</h2>
					<p className="text-gray-600 text-lg max-w-3xl mx-auto">
						PPI analyzes where researchers from top-tier institutions choose to
						publish, revealing true academic prestige beyond citation counts.
					</p>
				</div>

				{/* Carousel */}
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{steps.map((step, index) => {
							const Icon = step.icon
							return (
								<CarouselItem
									key={index}
									className="pl-2 md:pl-4 md:basis-1/2 mb-2 "
								>
									<Card className="border transition-all duration-300 h-full bg-gray-50/40 rounded-[40px]">
										<CardContent className="flex flex-col justify-between items-start p-8 h-full">
											<div>
												{/* Icon */}
												<div className="flex justify-between mb-4 w-full">
													{/* Number and Title */}
													<div>
														<span className="text-5xl font-bold text-gray-800 ">
															{step.number}
														</span>
														<h3 className="text-3xl font-bold text-gray-800 mt-2">
															{step.title}
														</h3>
													</div>

													<Icon size={70} className="text-primary" />
												</div>

												{/* Description */}
												<p className="text-gray-500  mb-6 leading-relaxed">
													{step.description}
												</p>

												{/* Checklist */}
												<ul className="space-y-3 mb-6">
													{step.items.map((item, idx) => (
														<li
															key={idx}
															className="flex  items-start gap-2 text-gray-500"
														>
															<CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
															<span>{item}</span>
														</li>
													))}
												</ul>
											</div>
											{/* Learn More Button */}
											<Button
												variant="outline"
												className="border border-primary h-auto font-medium text-primary hover:text-primary text-base hover:bg-gray-50 mt-auto"
											>
												Learn more
												<ArrowRight className="w-4 h-4 ml-1" />
											</Button>
										</CardContent>
									</Card>
								</CarouselItem>
							)
						})}
					</CarouselContent>
					<CarouselPrevious className="flex" />
					<CarouselNext className="flex" />
				</Carousel>
			</div>
		</section>
	)
}

export default PPIMethodologyCarousel
