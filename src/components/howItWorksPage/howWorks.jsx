import React from "react"
import HowWeWorkIllustration from "./illustrations/howWeWorkIllustration"

const HowWeWorks = () => {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 md:pt-32">
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
							Traditional metrics like Impact Factor measure citation counts —
							how often papers are cited. The Peer Perception Index takes a
							different approach: it measures where top researchers publish.
						</p>
						<p className="text-gray-600 text-base md:text-lg leading-relaxed mt-6">
							The premise is simple: researchers at elite institutions have the
							most options for where to publish. When they consistently choose
							certain journals, those journals demonstrate genuine prestige
							within the research community. This "revealed preference" provides
							a complementary signal to citation-based metrics.
						</p>
					</div>

					{/* Right Illustration */}
					<div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center" 
					data-aos="fade-left"
					data-aos-duration="500"
					data-aos-easing="ease-out-cubic">
						<HowWeWorkIllustration />
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowWeWorks
