import FeaturesSection from "@/components/landingPage/featuresSection"
import Hero from "@/components/landingPage/hero"
import LogoSlider from "@/components/landingPage/logoSlider"
import PPICategoriesExplained from "@/components/landingPage/ppiCategories"
import PPIMethodologyCarousel from "@/components/landingPage/ppiMethodology"
import StatsSection from "@/components/landingPage/statsSection"
import CTASection from "@/components/shared/ctaSection"

export default function HomePage() {
	return (
		<div>
			<Hero />
			<FeaturesSection />
			<PPIMethodologyCarousel />
			<StatsSection />
			<PPICategoriesExplained />
			<CTASection />
		</div>
	)
}

