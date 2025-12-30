import Image from "next/image"
import React from "react"

const Backedby = () => {
	return (
		<div className="bg-gray-50 px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto rounded-2xl border-2 flex flex-col items-center bg-white p-16">
				<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 ">
					Backed By
				</h2>
				<div className="flex flex-col md:flex-row items-center justify-center gap-12">
					<div className="w-30 h-30 relative">
						<Image
							src={"/logos/nust.png"}
							alt=""
							fill
							className="absolute object-contain"
						/>
					</div>
					<div className="w-40 h-40 relative">
						<Image
							src={"/logos/nstp.png"}
							alt=""
							fill
							className="absolute object-contain"
						/>
					</div>
					<div className="w-40 h-40 relative">
						<Image
							src={"/logos/seecs.png"}
							alt=""
							fill
							className="absolute object-contain"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Backedby
