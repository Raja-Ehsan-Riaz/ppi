// components/ResearchTeam.tsx
import { Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
	{
		name: "Dr Muhammad Latif Anjum",
		role: "Team Lead",
		image: "/team/member1.jpg", // Replace with actual image path
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
		image: "/team/member2.jpg", // Replace with actual image path
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
		image: "/team/member3.jpg", // Replace with actual image path
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
		<section className="py-16 px-6 bg-white">
			<div className="max-w-7xl mx-auto">
				{/* Section Title */}
				<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
					Research Team
				</h2>

				{/* Team Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3  gap-8">
					{teamMembers.map((member, index) => (
						<div key={index} className="flex flex-col">
							{/* Profile Image */}
							<div className="relative w-20 h-20 rounded-full bg-gray-400 mb-4 overflow-hidden">
								<Image
									src={member.image}
									alt={""} //member.nam
									className=" object-cover"
									fill
								/>
							</div>

							{/* Name */}
							<h3 className="text-xl font-semibold text-gray-900 mb-1">
								{member.name}
							</h3>

							{/* Role */}
							<p className="text-primary font-medium mb-3">{member.role}</p>

							{/* Social Links */}
							<div className="flex gap-3 mb-4 text-gray-700 hover:text-gray-800">
								<Link
									href={member.social.twitter}
									className=" transition-colors"
									aria-label="Twitter"
								>
									<Twitter className="w-5 h-5" />
								</Link>
								<Link
									href={member.social.instagram}
									className=" transition-colors"
									aria-label="Instagram"
								>
									<Instagram className="w-5 h-5" />
								</Link>
								<Link
									href={member.social.linkedin}
									className=" transition-colors"
									aria-label="LinkedIn"
								>
									<Linkedin className="w-5 h-5" />
								</Link>
							</div>

							{/* Description */}
							<p className="text-gray-600 leading-relaxed">
								{member.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
