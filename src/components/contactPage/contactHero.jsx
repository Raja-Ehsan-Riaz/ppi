import React from "react"
import ContactIllustration from "./Illustrations/contactIllustration"

const ContactUs = () => {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24  md:pt-32">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left Content */}
					<div className="space-y-6" 
					data-aos="fade-right"
					data-aos-duration="500"
					data-aos-easing="ease-out-cubic">
						<h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 leading-tight">
							Get In Touch
						</h2>
						<p className="text-gray-600 text-base md:text-lg max-w-md leading-relaxed">
							We welcome questions, feedback, and collaboration inquiries from
							the research community.
						</p>
					</div>

					{/* Right Illustration */}
					<div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center" 
					data-aos="fade-left"
					data-aos-duration="500"
					data-aos-easing="ease-out-cubic">
						<ContactIllustration />
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactUs
