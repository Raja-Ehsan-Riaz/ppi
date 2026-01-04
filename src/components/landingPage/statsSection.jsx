"use client"
import { useEffect, useRef, useState } from "react"
import { BookOpen, FileText, Globe, Building2 } from "lucide-react"

const StatCard = ({
	icon: Icon,
	about,
	value,
	suffix,
	label,
	duration = 2000,
}) => {
	const [count, setCount] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef(null)
	const hasAnimated = useRef(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated.current) {
					setIsVisible(true)
					hasAnimated.current = true
				}
			},
			{ threshold: 0.3 }
		)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current)
			}
		}
	}, [])

	useEffect(() => {
		if (!isVisible) return

		const numericValue =
			typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value

		const increment = numericValue / (duration / 16)
		let current = 0

		const timer = setInterval(() => {
			current += increment
			if (current >= numericValue) {
				setCount(numericValue)
				clearInterval(timer)
			} else {
				setCount(current)
			}
		}, 16)

		return () => clearInterval(timer)
	}, [isVisible, value, duration])

	const formatNumber = num => {
		return Math.floor(num).toLocaleString()
	}

	return (
		<div ref={ref} className="flex flex-col items-center gap-4">
			<div
				className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 border-primary/70`}
			>
				<Icon className={`w-7 h-7 text-primary`} />
			</div>
			<div className="text-4xl font-bold text-gray-800 mb-2">
				{formatNumber(count)}
				{suffix}
			</div>
			<div className="text-sm text-gray-600">{label}</div>
		</div>
	)
}

export default function StatsSection() {
	const stats = [
		{
			icon: BookOpen,
			value: 48000,
			suffix: "+",
			label: "Journals Analyzed",
		},
		{
			icon: FileText,
			value: 12,
			suffix: "M+",
			label: "Papers Indexed",
		},
		{
			icon: Globe,
			value: 195,
			suffix: "",
			label: "Countries Represented",
		},
		{
			icon: Building2,
			value: 8500,
			suffix: "+",
			label: "Institutions Mapped",
		},
	]

	return (
		<div className={`px-10 md:px-16 lg:px-24 py-16 md:py-24 `}>
			<div className="max-w-7xl mx-auto ">
				<div className="flex flex-col gap-8 items-center text-center justify-between  mb-12 ">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
						Supported by numbers
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl">
						PPI analyzes where researchers from top-tier institutions choose to
						publish, revealing true academic prestige beyond citation counts.
					</p>
				</div>
				<div className="w-full bg-blue-50 p-16 lg:py-24 rounded-4xl">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
						{stats.map((stat, index) => (
							<StatCard
								key={index}
								about
								icon={stat.icon}
								value={stat.value}
								suffix={stat.suffix}
								label={stat.label}
								duration={2000}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
