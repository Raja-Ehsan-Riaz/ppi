import Image from "next/image"
import Link from "next/link"
import React from "react"

const Footer = () => {
	return (
		<footer className="bg-white border-t border-gray-200/70">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="mb-8">
					<div className="flex items-center gap-2 mb-4">
						<Image src="/logo.png" alt="logo" width={200} height={200} />
					</div>
					<p className="text-sm text-gray-600 leading-relaxed max-w-md">
						A research infrastructure for evaluating academic journals based on
						true scholarly prestige.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{/* Logo and Description */}

					{/* Platform Links */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/journals"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Journal Directory
								</Link>
							</li>
							<li>
								<Link
									href="/how-it-works#methodology"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Methodology
								</Link>
							</li>
							<li>
								<Link
									href="/#categories"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Categories
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources Links */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">About</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/about-us#team"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Our Team
								</Link>
							</li>
							<li>
								<Link
									href="/about-us#whyppi"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Why PPI
								</Link>
							</li>
							<li>
								<Link
									href="/about-us#funding"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Funding & Support
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Links */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">
							Contact Details
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="tel:05190852123"
									target="_blank"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									05190852123
								</Link>
							</li>
							<li>
								<Link
									href="mailto:latif.anjum@seecs.edu.pk"
									target="_blank"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									latif.anjum@seecs.edu.pk
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-gray-600">
						© 2025 Peer Perception Index. All rights reserved.
					</p>
					<div className="flex gap-6">
						<Link
							href="#"
							className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="#"
							className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
