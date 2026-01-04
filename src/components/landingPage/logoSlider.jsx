"use client"

const LogoSlider = () => {
	const partners = [
		"/nust.png",
		"/nstp.png",
		"/seecs.png",
		"/nust.png",
		"/nstp.png",
		"/seecs.png",
	]
	const sizes = [
		"w-32 h-24",
		"w-48 h-20",
		"w-40 h-20",
		"w-32 h-24",
		"w-48 h-20",
		"w-40 h-20",
	]

	return (
		<div className=" relative w-full overflow-hidden pt-2 pb-24">
			<div className="flex animate-scroll items-center ">
				{/* First set of logos */}
				{partners.map((logo, index) => (
					<div
						key={`logo-1-${index}`}
						className={`shrink-0 mx-8 md:mx-12 flex items-center justify-center ${sizes[index]}`}
					>
						<img
							src={`/logos/${logo}`}
							alt={`Partner ${index + 1}`}
							className="max-w-full max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
						/>
					</div>
				))}
				{/* Duplicate set for seamless loop */}
				{partners.map((logo, index) => (
					<div
						key={`logo-2-${index}`}
						className={`shrink-0 mx-8 md:mx-12 flex items-center justify-center ${sizes[index]}`}
					>
						<img
							src={`/logos/${logo}`}
							alt={`Partner ${index + 1}`}
							className="max-w-full max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
						/>
					</div>
				))}
			</div>
			<style jsx>{`
				@keyframes scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}

				.animate-scroll {
					animation: scroll 30s linear infinite;
				}

				.animate-scroll:hover {
					animation-play-state: paused;
				}

				.delay-200 {
					transition-delay: 200ms;
				}

				.delay-400 {
					transition-delay: 400ms;
				}

				.duration-600 {
					transition-duration: 600ms;
				}

				.scale-80 {
					transform: scale(0.8);
				}
			`}</style>
		</div>
	)
}

export default LogoSlider
