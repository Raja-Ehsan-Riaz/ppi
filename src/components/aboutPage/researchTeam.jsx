// components/ResearchTeam.tsx
import { Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
	{
		name: "Dr Muhammad Latif Anjum",
		role: "Team Lead",
		image: "/team/syed-taha.png",
		description:
			"Assistant Professor of Electrical Engineering at SEECS-NUST, Head of AI & Autonomous Systems, and lead of the Robotics and Machine Intelligence (ROMI) Lab. His research focuses on robotics, computer vision, machine intelligence, and scientometrics.",
		social: {
			twitter: "#",
			instagram: "#",
			linkedin: "#",
		},
	},
	{
		name: "Dr Wajahat Hussain",
		role: "Team Lead",
		image: "/team/syed-taha.png",
		description:
			"Associate Professor at NUST, Pakistan. His research interests include data-driven scene understanding, robotics, and computer vision.",
		social: {
			twitter: "#",
			instagram: "#",
			linkedin: "#",
		},
	},
	{
		name: "Dr. Syed Taha Ali",
		role: "Researcher",
		image: "/team/syed-taha.png",
		description:
			"Associate Professor of Electrical Engineering at SEECS-NUST. His research focuses on network security, distributed systems, and applied cryptography.",
		social: {
			twitter: "#",
			instagram: "#",
			linkedin: "#",
		},
	},
]

export default function ResearchTeam() {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto">
				{/* Section Title */}
				<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
					Research Team
				</h2>

				{/* Team Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{teamMembers.map((member, index) => (
						<div
							key={index}
							className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer"
						>
							{/* Profile Image */}
							<Image
								src={member.image}
								alt={member.name}
								fill
								style={{ objectPosition: "0% 0%" }}
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>

							{/* Overlay gradient - always visible */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

							{/* Default Content (Name, Role, Social) */}
							<div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-opacity duration-300 group-hover:opacity-0">
								<h3 className="text-xl font-semibold mb-1">{member.name}</h3>
								<p className="text-sm text-gray-200 mb-3">{member.role}</p>

								{/* Social Links */}
								<div className="flex gap-3">
									<Link
										href={member.social.twitter}
										className="hover:text-blue-400 transition-colors"
										aria-label="Twitter"
									>
										<Twitter className="w-5 h-5" />
									</Link>
									<Link
										href={member.social.instagram}
										className="hover:text-pink-400 transition-colors"
										aria-label="Instagram"
									>
										<Instagram className="w-5 h-5" />
									</Link>
									<Link
										href={member.social.linkedin}
										className="hover:text-blue-500 transition-colors"
										aria-label="LinkedIn"
									>
										<Linkedin className="w-5 h-5" />
									</Link>
								</div>
							</div>

							{/* Hover Content (Description) */}
							<div className="absolute inset-0 p-6 text-white flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<h3 className="text-xl font-semibold mb-1">{member.name}</h3>
								<p className="text-sm text-gray-200 mb-3">{member.role}</p>

								{/* Social Links on Hover */}
								<div className="flex gap-3 mb-4">
									<Link
										href={member.social.twitter}
										className="hover:text-blue-400 transition-colors"
										aria-label="Twitter"
									>
										<Twitter className="w-5 h-5" />
									</Link>
									<Link
										href={member.social.instagram}
										className="hover:text-pink-400 transition-colors"
										aria-label="Instagram"
									>
										<Instagram className="w-5 h-5" />
									</Link>
									<Link
										href={member.social.linkedin}
										className="hover:text-blue-500 transition-colors"
										aria-label="LinkedIn"
									>
										<Linkedin className="w-5 h-5" />
									</Link>
								</div>

								{/* Description */}
								<p className="text-sm text-gray-100 leading-relaxed">
									{member.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
