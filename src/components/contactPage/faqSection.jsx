import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

const FAQSection = () => {
	const faqs = [
		{
			question: "What is the Peer Perception Index (PPI)?",
			answer:
				"The Peer Perception Index is a metric used to assess the prestige of journals and conferences based on where researchers from top-ranked universities and organizations choose to publish.",
		},
		{
			question: "Why was the Peer Perception Index created?",
			answer:
				"PPI was developed by researchers at NUST SEECS in response to concerns that traditional metrics, particularly the Journal Impact Factor, do not reliably reflect true scholarly prestige.",
		},
		{
			question: "How does PPI measure journal and conference quality?",
			answer:
				"PPI analyzes first-author affiliations in research publications and weights them using Times Higher Education global university rankings.",
		},
		{
			question: "What does a high PPI score indicate?",
			answer:
				"A high PPI score indicates that a journal or conference attracts a larger share of publications from top-ranked universities and organizations.",
		},
		{
			question: "How are journals and conferences categorized using PPI?",
			answer:
				"Based on their PPI score, journals and conferences are classified as Alpha, Beta, Gamma, Delta, or None.",
		},
	]

	return (
		<section className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
						Frequently asked questions
					</h2>
					<p className="text-gray-600 text-lg">
						Here are <b>5 core</b> FAQs, refined for a website, using only your
						provided content and nothing else:
					</p>
				</div>

				{/* FAQ Accordion */}
				<Accordion
					type="single"
					collapsible
					defaultValue="item-5"
					className="space-y-4"
				>
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="border rounded-lg px-6 data-[state=open]:border-blue-200 bg-gray-50 data-[state=open]:bg-blue-50 px-6  last:border"
						>
							<AccordionTrigger className="text-left font-medium text-gray-900 text-base hover:no-underline py-5">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-gray-600 leading-relaxed pb-5">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}

export default FAQSection
