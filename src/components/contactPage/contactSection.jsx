import React from "react"
import { MapPin, Mail } from "lucide-react"

const ContactSection = () => {
	return (
		<section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex justify-center mb-12 ">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 ">
						Our Offices
					</h2>
				</div>

				{/* Contact Cards */}
				<div className="grid lg:grid-cols-3 gap-6">
					{/* Map Card */}
					<div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
						<div className="relative h-96 lg:h-full min-h-[450px]">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4433347693334!2d72.99597867549826!3d33.64567287331273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9573aecd2f93%3A0x1c7fdc5084512ca2!2sNational%20Science%20%26%20Technology%20Park%20(NSTP)!5e0!3m2!1sen!2s!4v1767529148539!5m2!1sen!2s"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="absolute inset-0"
							></iframe>
						</div>
					</div>

					{/* Contact Info Card */}
					<div className="bg-white/60 rounded-2xl shadow-md p-10 border border-gray-200  transition-shadow duration-300">
						<div className="mb-10">
							<div className="bg-gray-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
								<MapPin size={28} className="text-gray-700" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900">Visit Us</h3>
						</div>

						<div className="space-y-8">
							<div>
								<h4 className="font-semibold text-gray-900 mb-2 text-lg">
									Our Office
								</h4>
								<p className="text-gray-600 leading-relaxed">
									NSTP, NUST, H-12
								</p>
								<p className="text-gray-600 leading-relaxed">Islamabad</p>
							</div>

							<div>
								<h4 className="font-semibold text-gray-900 mb-2 text-lg">
									Institution
								</h4>
								<p className="text-gray-600 leading-relaxed">NUST, H-12</p>
								<p className="text-gray-600 leading-relaxed">Islamabad</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactSection
