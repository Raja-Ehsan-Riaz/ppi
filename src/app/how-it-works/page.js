import AssumptionsLimitations from "@/components/howItWorksPage/assumptionsLimitations"
import HowWeWorks from "@/components/howItWorksPage/howWorks"
import PPIExplanation from "@/components/howItWorksPage/ppiExplanation"
import CTASection from "@/components/shared/ctaSection"

export default function HowItWorks() {
	return (
		<div>
			<HowWeWorks />
			<PPIExplanation />
			<AssumptionsLimitations />
			<CTASection />
		</div>
	)
}
