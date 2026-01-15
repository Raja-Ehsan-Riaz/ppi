"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ProductCTA = () => {
	const pathname = usePathname()
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
			<div
				className={`max-w-7xl mx-auto  rounded-4xl p-8 md:p-16 lg:py-24 relative overflow-hidden shadow-lg  bg-linear-to-b ${
					pathname.includes("/saheb-i-ejaad")
						? "from-green-50/60 via-[#007856]/30  to-[#007856]/50"
						: "from-blue-50/60 via-primary/50  to-primary/20"
				}"`}
			>
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 max-w-2xl mx-auto">
						Prestige Through Choice, Not Metrics
					</h1>
					<p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
						The Peer Perception Index identifies journal/conference prestige by
						tracking where researchers at leading institutions choose to
						publish. These decisions reveal standing within the scholarly
						community beyond citation totals.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link href={"/how-it-works"}>
							<Button
								size="lg"
								className={`  ${
									pathname.includes("/saheb-i-ejaad")
										? "bg-[#007856] hover:bg-[#007856]/90"
										: "bg-primary hover:bg-primary/9"
								} text-white px-8 py-6 text-base rounded-lg shadow-md cursor-pointer`}
							>
								See how it works
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProductCTA
