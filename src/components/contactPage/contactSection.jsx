import React from "react"
import { MapPin, Mail } from "lucide-react"

const ContactSection = () => {
	return (
		<section className="px-10 md:px-16 lg:px-24 py-16 md:py-24 mt-12">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-between  mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
						Get in Touch
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl">
						We welcome questions, feedback, and collaboration inquiries from the
						research community.
					</p>
				</div>

				{/* Contact Cards */}
				<div className="grid md:grid-cols-2 gap-12">
					{/* Our Office Card */}
					<div className="bg-gray-50 rounded-2xl border p-8">
						<div className="mb-8">
							<MapPin size={40} className=" text-gray-700 mb-2" />
							<h3 className="text-2xl font-semibold text-gray-700">
								Our Office
							</h3>
						</div>

						<div className="space-y-4">
							<div>
								<h4 className="font-medium text-gray-900 mb-1 text-lg">
									Our Office
								</h4>
								<p className="text-gray-600">NUST, M &T, H-12</p>
								<p className="text-gray-600">Islamabad</p>
							</div>

							<div>
								<h4 className="font-medium text-gray-900 mb-1 text-lg">
									Institution
								</h4>
								<p className="text-gray-600">NUST, H-12</p>
								<p className="text-gray-600">Islamabad</p>
							</div>
						</div>
					</div>

					{/* Emails Card */}
					<div className="bg-gray-50 rounded-2xl border p-8">
						<div className="mb-8">
							<Mail size={40} className=" text-gray-700 mb-2" />
							<h3 className="text-2xl font-semibold text-gray-700">Emails</h3>
						</div>

						<div className="space-y-4">
							<div>
								<h4 className="font-medium text-gray-900 mb-1 text-lg">
									General Inquiries
								</h4>
								<a
									href="mailto:contact@peerperceptionindex.org"
									className="text-gray-600 transition-colors"
								>
									contact@peerperceptionindex.org
								</a>
							</div>

							<div>
								<h4 className="font-medium text-gray-900 mb-1 text-lg">
									Technical Support
								</h4>
								<a
									href="mailto:support@peerperceptionindex.org"
									className="text-gray-600 transition-colors"
								>
									support@peerperceptionindex.org
								</a>
							</div>

							<div>
								<h4 className="font-medium text-gray-900 mb-1 text-lg">
									Media Inquiries
								</h4>
								<a
									href="mailto:media@peerperceptionindex.org"
									className="text-gray-600 transition-colors"
								>
									media@peerperceptionindex.org
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactSection
