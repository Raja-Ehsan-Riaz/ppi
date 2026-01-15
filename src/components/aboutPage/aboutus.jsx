import React from "react"
import ResearchIllustration from "./illustrations/researchIllustration"

const AboutUs = () => {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 pt-32">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 lg:gap-16 items-center">
					{/* Left Content */}
					<div
						className="space-y-6"
						data-aos="fade-right"
						data-aos-duration="500"
						data-aos-easing="ease-out-cubic"
					>
						<h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 leading-tight">
							Peer Perception
							<br />
							Index
						</h2>
						<p className="text-gray-600 text-base md:text-lg leading-relaxed">
							The Peer Perception Index (PPI) emerged from ongoing discussions
							among researchers at the NUST School of Electrical Engineering and
							Computer Science (SEECS). The team was concerned with the
							limitations of traditional journal-ranking metrics, particularly
							the Journal Impact Factor, which often fails to reflect genuine
							scholarly prestige. PPI provides a quality-focused and
							perception-based measure  of journals and conferences, showing
							where top researchers and institutions choose to publish.
						</p>
					</div>

					{/* Right Illustration */}
					<div
						className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
						data-aos="fade-left"
						data-aos-duration="500"
						data-aos-easing="ease-out-cubic"
					>
						<ResearchIllustration />
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUs
