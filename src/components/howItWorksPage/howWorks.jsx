import React from "react"
import HowWeWorkIllustration from "./illustrations/howWeWorkIllustration"

const HowWeWorks = () => {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 pt-32">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Content */}
					<div
						className="space-y-6"
						data-aos="fade-right"
						data-aos-duration="500"
						data-aos-easing="ease-out-cubic"
					>
						<h2 className="text-4xl md:text-5xl lg:text-[56px] max-w-2xl font-bold text-gray-900 leading-tight">
							How the Peer Perception Index Works
						</h2>
						<p className="text-gray-600 text-base md:text-lg leading-relaxed">
							The Peer Perception Index evaluates journal and conference
							prestige by analyzing where researchers from top-ranked
							universities choose to publish , rather than relying on
							citation-based metrics such as the Journal Impact Factor. By
							weighting first-author affiliations using Times Higher Education
							rankings, PPI provides a quality-centric view of academic
							reputation.
						</p>
					</div>

					{/* Right Illustration */}
					<div
						className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
						data-aos="fade-left"
						data-aos-duration="500"
						data-aos-easing="ease-out-cubic"
					>
						<HowWeWorkIllustration />
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowWeWorks
