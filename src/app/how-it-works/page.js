import AssumptionsLimitations from "@/components/howItWorksPage/assumptionsLimitations"
import PPIExplanation from "@/components/howItWorksPage/ppiExplanation"
import CTASection from "@/components/shared/ctaSection"

export default function HowItWorks() {
	return (
		<div>
			<PPIExplanation />
            <AssumptionsLimitations/>
            <CTASection/>
		</div>
	)
}
