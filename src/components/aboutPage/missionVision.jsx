// components/MissionVision.tsx
import { Target, Crosshair } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function MissionVision() {
	return (
		<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
				{" "}
				{/* Mission Card */}
				<Card className="bg-blue-50 border-none shadow-lg  transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
					<CardContent className=" space-y-4 p-8">
						{/* Icon */}
						<Image
							src={"/icons/Mission.png"}
							alt="vision"
							width={60}
							height={60}
						/>

						{/* Content */}
						<h2 className="text-3xl font-bold text-gray-700 mb-4 relative z-10">
							Our mission
						</h2>
						<p className="text-gray-700 text-lg relative z-10">
							To provide a transparent, quality-centric evaluation of academic
							journals by focusing on where leading researchers and institutions
							choose to publish, rather than relying on easily manipulated
							metrics.
						</p>
						<Image
							src={"/icons/Mission-bg.png"}
							alt="vision"
							width={200}
							height={200}
							className="absolute  bottom-0 right-0 opacity-50 "
						/>
					</CardContent>
				</Card>
				{/* Vision Card */}
				<Card className="bg-blue-50 border-none shadow-lg  transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
					<CardContent className=" space-y-4 p-8">
						{/* Icon */}
						<Image
							src={"/icons/Vision.png"}
							alt="vision"
							width={60}
							height={60}
						/>
						{/* Content */}
						<h2 className="text-3xl font-bold text-gray-700 mb-4 relative z-10">
							Our vision
						</h2>
						<p className="text-gray-700 text-lg relative z-10">
							To become a trusted global reference for assessing scholarly
							prestige and promoting a healthier, more rigorous academic
							publishing ecosystem.
						</p>
						<Image
							src={"/icons/Vision-bg.png"}
							alt="vision"
							width={200}
							height={200}
							className="absolute  bottom-0 right-0"
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
