"use client"
import { useMemo } from "react"
import { BookOpen, FileText } from "lucide-react"
import { useJournals } from "@/context/journalsContext"
import { useEffect, useRef, useState } from "react"

const humanizeCount = (value, type) => {
	if (type === "journals") {
		return `${Math.floor(value / 100) * 100}+`
	}

	if (type === "papers") {
		const millions = Math.floor(value / 1_000_000)
		return `${millions}M+`
	}

	return `${value}+`
}

const StatCard = ({ icon: Icon, value, label, type }) => {
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

		if (ref.current) observer.observe(ref.current)
		return () => ref.current && observer.unobserve(ref.current)
	}, [])

	useEffect(() => {
		if (!isVisible) return

		const duration = 2000
		const increment = value / (duration / 16)
		let current = 0

		const timer = setInterval(() => {
			current += increment
			if (current >= value) {
				setCount(value)
				clearInterval(timer)
			} else {
				setCount(current)
			}
		}, 16)

		return () => clearInterval(timer)
	}, [isVisible, value])

	return (
		<div ref={ref} className="flex flex-col items-center gap-4">
			<div className="w-16 h-16 rounded-full border flex items-center justify-center mb-4 border-primary/70">
				<Icon className="w-7 h-7 text-primary" />
			</div>

			<div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
				{humanizeCount(count, type)}
			</div>

			<div className="text-sm text-gray-600 text-center">{label}</div>
		</div>
	)
}

export default function StatsSection() {
	const { journals } = useJournals()

	const { totalJournals, totalPapers } = useMemo(() => {
		return {
			totalJournals: journals.length,
			totalPapers: journals.reduce((sum, j) => sum + (j.totalPapers || 0), 0),
		}
	}, [journals])

	return (
		<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col gap-8 items-center text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
						Supported by numbers
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl">
						PPI analyzes where researchers from top-tier institutions choose to
						publish, revealing true academic prestige beyond citation counts.
					</p>
				</div>

				<div className="w-full bg-blue-50 p-16 lg:py-24 rounded-4xl">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 place-items-center">
						<StatCard
							icon={BookOpen}
							value={totalJournals}
							type="journals"
							label="Journals Analyzed"
						/>

						<StatCard
							icon={FileText}
							value={totalPapers}
							type="papers"
							label="Papers Indexed"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
