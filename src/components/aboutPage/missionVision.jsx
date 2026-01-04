import { Target, Crosshair } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function MissionVision() {
	return (
		<div className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-linear-to-b from-blue-50/40 to-blue-50">
			<div className="max-w-7xl mx-auto  rounded-4xl ">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
					{/* Left Side - Heading */}
					<div className="flex flex-col justify-between items-start space-y-6">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 ">
							What can you do
							<br />
							with Peer
							<br />
							Perception Index?
						</h2>
						<p className="text-gray-600 text-base md:text-lg">
							A comprehensive toolkit for researchers, academics, and
							institutions to evaluate journal quality.
						</p>

						{/* Backed By Section */}
						<Card className="bg-white border-none shadow-sm mt-8">
							<CardContent className="p-6 py-0">
								<p className="font-semibold text-gray-600 mb-4">Backed by</p>
								<div className="flex flex-col md:flex-row items-start justify-start gap-12">
									<div className="w-20 h-20 relative">
										<Image
											src={"/logos/nust.png"}
											alt=""
											fill
											className="absolute object-contain"
										/>
									</div>
									<div className="w-20 h-20 relative">
										<Image
											src={"/logos/nstp.png"}
											alt=""
											fill
											className="absolute object-contain"
										/>
									</div>
									<div className="w-20 h-20 relative">
										<Image
											src={"/logos/seecs.png"}
											alt=""
											fill
											className="absolute object-contain"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Right Side - Mission & Vision Cards */}
					<div className="space-y-12">
						{/* Mission Card */}
						<Card className="bg-transparent shadow-none border-none p-0">
							<CardContent className="space-y-4">
								{/* Icon */}
								<Image
									src={"/icons/Mission.png"}
									alt="vision"
									width={60}
									height={60}
								/>

								{/* Content */}
								<h3 className="text-2xl font-bold text-gray-900">
									Our mission
								</h3>
								<p className="text-gray-600 text-base leading-relaxed">
									To provide a transparent, quality-centric evaluation of
									academic journals by focusing on where leading researchers and
									institutions choose to publish, rather than relying on easily
									manipulated metrics.
								</p>
							</CardContent>
						</Card>

						{/* Vision Card */}
						<Card className="bg-transparent shadow-none border-none p-0">
							<CardContent className="space-y-4">
								{/* Icon */}
								<Image
									src={"/icons/Vision.png"}
									alt="vision"
									width={60}
									height={60}
								/>
								{/* Content */}
								<h3 className="text-2xl font-bold text-gray-900">Our vision</h3>
								<p className="text-gray-600 text-base leading-relaxed">
									To become a trusted global reference for assessing scholarly
									prestige and promoting a healthier, more rigorous academic
									publishing ecosystem.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
