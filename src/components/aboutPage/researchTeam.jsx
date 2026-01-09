"use client"

import { Mail, Linkedin, SquareArrowOutUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
	{
		name: "Dr Muhammad Latif Anjum",
		role: "Team Lead",
		image: "/team/latif.jpg",
		description:
			"Assistant Professor of Electrical Engineering at SEECS-NUST, Head of AI & Autonomous Systems, and lead of the Robotics and Machine Intelligence (ROMI) Lab. His research focuses on robotics, computer vision, machine intelligence, and scientometrics.",
		social: {
			seecs: "https://seecs.nust.edu.pk/faculty/muhammad-latif-anjum/",
			email: "latif.anjum@seecs.edu.pk",
			linkedin: "#",
		},
	},
	{
		name: "Dr Wajahat Hussain",
		role: "Team Lead",
		image: "/team/wajahat.jpg",
		description:
			"Associate Professor at NUST, Pakistan. His research interests include data-driven scene understanding, robotics, and computer vision.",
		social: {
			seecs: "https://seecs.nust.edu.pk/faculty/muhammad-wajahat-hussain/",
			email: "wajahat.hussain@seecs.edu.pk",
			linkedin: "#",
		},
	},
	{
		name: "Dr. Syed Taha Ali",
		role: "Researcher",
		image: "/team/syed-taha.jpg",
		description:
			"Associate Professor of Electrical Engineering at SEECS-NUST. His research focuses on network security, distributed systems, and applied cryptography.",
		social: {
			seecs: "https://seecs.nust.edu.pk/faculty/syed-taha-ali/",
			email: "taha.ali@seecs.edu.pk",
			linkedin: "https://au.linkedin.com/in/syed-taha-ali-5a030a65",
		},
	},
]

export default function ResearchTeam() {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24" id="team">
			<div className="max-w-7xl mx-auto">
				{/* Section Title */}
				<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
					Research Team
				</h2>
				<p className="text-gray-600 text-base md:text-lg mb-12">
					Researchers at NUST SEECS focused on evaluating journal and conference
					quality through the Peer Perception Index.
				</p>

				{/* Team Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{teamMembers.map((member, index) => (
						<div
							key={index}
							className="group relative rounded-3xl overflow-hidden aspect-[4/5]"
						>
							{/* Image */}
							<Image
								src={member.image}
								alt={member.name}
								fill
								className="object-cover transition-transform duration-500 md:group-hover:scale-105"
							/>

							{/* Overlay Gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

							{/* DEFAULT CONTENT (Desktop Only) */}
							<div
								className="
									absolute bottom-0 left-0 right-0 p-6 text-white
									opacity-0 md:opacity-100
									md:group-hover:opacity-0
									transition-opacity duration-300
								"
							>
								<h3 className="text-xl font-semibold mb-1">
									{member.name}
								</h3>
								<p className="text-sm text-gray-200 mb-3">
									{member.role}
								</p>

								<div className="flex gap-3">
									<Link
										href={`mailto:${member.social.email}`}
										className="hover:text-pink-400"
									>
										<Mail size={20} />
									</Link>
									<Link
										href={member.social.linkedin}
										className="hover:text-blue-400"
										target="_blank"
									>
										<Linkedin size={20} />
									</Link>
								</div>
							</div>

							{/* HOVER CONTENT (Mobile Default) */}
							<div
								className="
									absolute inset-0 p-6 text-white flex flex-col justify-end
									opacity-100 md:opacity-0
									md:group-hover:opacity-100
									transition-opacity duration-300
								"
							>
								<Link
									href={member.social.seecs}
									target="_blank"
									className="absolute top-6 right-6 hover:text-blue-300"
								>
									<SquareArrowOutUpRight size={20} />
								</Link>

								<h3 className="text-xl font-semibold mb-1">
									{member.name}
								</h3>
								<p className="text-sm text-gray-200 mb-3">
									{member.role}
								</p>

								<div className="flex gap-3">
									<Link
										href={`mailto:${member.social.email}`}
										className="hover:text-pink-400"
									>
										<Mail size={20} />
									</Link>
									<Link
										href={member.social.linkedin}
										className="hover:text-blue-400"
										target="_blank"
									>
										<Linkedin size={20} />
									</Link>
								</div>

								<p className="text-sm text-gray-100 leading-relaxed mt-4">
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
