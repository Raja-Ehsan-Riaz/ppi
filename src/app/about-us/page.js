import AboutUs from "@/components/aboutPage/aboutus"
import Backedby from "@/components/aboutPage/backedBy"
import Funding from "@/components/aboutPage/funding"
import MissionVision from "@/components/aboutPage/missionVision"
import ResearchTeam from "@/components/aboutPage/researchTeam"
import WhyPeerPerceptionIndex from "@/components/aboutPage/whyPeerPerceptionIndex"
import StatsSection from "@/components/landingPage/statsSection"
import CTASection from "@/components/shared/ctaSection"

export default function AboutPage() {
	return (
		<div>
			<AboutUs />
			<MissionVision />
			<ResearchTeam />
			<WhyPeerPerceptionIndex/>
			<StatsSection about />
			{/* <Backedby /> */}
			<Funding />
			<CTASection />
		</div>
	)
}
