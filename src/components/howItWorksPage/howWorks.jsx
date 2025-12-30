import Image from "next/image"
import React from "react"

const HowWeWorks = () => {
	return (
		<section className="	">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between  mb-12 ">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
						How the Peer <br /> Perception Index Works
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl">
						A transparent, reproducible approach to measuring academic journal
						prestige based on where top researchers actually choose to publish.
					</p>
				</div>
				<div className=" h-100 bg-gray-200 rounded-2xl overflow-hidden relative  ">
					<Image
						src={"/how-it-works.png"}
						alt="how we work"
						fill
						className=" absolute object-cover"
						style={{ objectPosition: "0% 100%" }}
					/>
				</div>
				<div className="text-2xl text-gray-700 font-medium max-w-5xl text-center mx-auto mt-12 space-y-6">
					<p>
						Traditional metrics like Impact Factor measure citation counts — how
						often papers are cited. The Peer Perception Index takes a different
						approach: it measures where top researchers publish.
					</p>
					<p>
						The premise is simple: researchers at elite institutions have the
						most options for where to publish. When they consistently choose
						certain journals, those journals demonstrate genuine prestige within
						the research community. This "revealed preference" provides a
						complementary signal to citation-based metrics.
					</p>
				</div>
			</div>
		</section>
	)
}

export default HowWeWorks
