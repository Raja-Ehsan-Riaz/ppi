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
			question: "How often is the PPI database updated?",
			answer:
				"The PPI database is updated quarterly to ensure the most current and accurate information for researchers.",
		},
		{
			question: "Can journals request to be added to PPI?",
			answer:
				"Yes, journals can submit a request through our contact form. We evaluate all submissions based on our methodology criteria.",
		},
		{
			question: "Is API access available?",
			answer:
				"Yes, we offer API access for institutional subscribers. Please contact us for more information about API documentation and access.",
		},
		{
			question: "How can I cite the PPI in my work?",
			answer:
				"You can cite the PPI using our standard citation format available in our documentation section.",
		},
		{
			question: "Do you offer institutional subscriptions?",
			answer:
				"Yes, we offer institutional subscriptions with additional features and bulk access. Contact our team for pricing details.",
		},
		{
			question: "How can I contribute to the project?",
			answer:
				"We welcome feedback on our methodology and are open to research collaborations. For specific opportunities, contact us at research@peerperceptionindex.org.",
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
						Quick answers to common questions about the PPI platform and
						methodology.
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
							className="border rounded-lg px-6 data-[state=open]:border-blue-200 bg-gray-50 data-[state=open]:bg-blue-50 px-6 py-2 last:border"
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
