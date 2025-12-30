import Image from "next/image"
import React from "react"

const HowWeWorks = () => {
	return (
		<section className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto mt-12">
				{/* Header */}
				<div className="flex flex-col gap-8 items-center text-center justify-between  mb-12 ">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
						How the Peer <br /> Perception Index Works
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl">
						A transparent, reproducible approach to measuring academic journal
						prestige based on where top researchers actually choose to publish.
					</p>
				</div>
				<div className=" h-100 bg-gray-200 rounded-2xl overflow-hidden relative  mb-12 "></div>
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-8">
						<p className="text-xl text-gray-700 leading-relaxed">
							Traditional metrics like Impact Factor measure citation counts —
							how often papers are cited. The Peer Perception Index takes a
							different approach: it measures where top researchers publish.
						</p>
					</div>
					<div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
						<p className="text-xl text-gray-700 leading-relaxed">
							The premise is simple: researchers at elite institutions have the
							most options for where to publish. When they consistently choose
							certain journals, those journals demonstrate genuine prestige
							within the research community. This "revealed preference" provides
							a complementary signal to citation-based metrics.
						</p>
					</div>
				</div>{" "}
			</div>
		</section>
	)
}

export default HowWeWorks
