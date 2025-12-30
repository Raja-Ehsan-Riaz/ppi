import Image from "next/image"
import React from "react"

const AboutUs = () => {
	return (
		<section className="px-10 md:px-16 lg:px-24 py-16 md:py-24 mt-12">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between  mb-12 gap-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
						About us
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl">
						Building transparent infrastructure for understanding academic
						journal prestige.
					</p>
				</div>
				<div className="relative w-full h-100 bg-gray-200 rounded-2xl overflow-hidden  ">
					<Image
						src={"/about-us.png"}
						alt="about us"
						fill
						className="object-cover"
						style={{ objectPosition: "0% 100%" }}
					/>
				</div>
				<div className="text-2xl text-gray-700 font-medium max-w-5xl text-center mx-auto mt-12 space-y-6">
					<p>
						<span className="text-primary">Peer Perception Index</span> emerged
						from repeated discussions among researchers at the
						<span className="text-primary">
							NUST School of Electrical Engineering and Computer Science (SEECS)
						</span>{" "}
						. Like many in the academic community, the team grew increasingly
						concerned with the widespread misuse of traditional journal-ranking
						metrics particularly the Journal Impact Factor which often fails to
						reflect genuine scholarly prestige.
					</p>
				</div>
			</div>
		</section>
	)
}

export default AboutUs
