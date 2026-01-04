import Image from "next/image"
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
						<h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Journal Directory
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Methodology
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									About
								</a>
							</li>
						</ul>
					</div>

					{/* Resources Links */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Documentation
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Research
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									API Access
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Links */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Get in Touch
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Institutional Access
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
								>
									Feedback
								</a>
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
						<a
							href="#"
							className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
						>
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
