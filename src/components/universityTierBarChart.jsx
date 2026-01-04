"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

export default function TopCountriesBarChart({ topCountries, totalPapers }) {
	const [isVisible, setIsVisible] = useState(false)
	const cardRef = useRef(null)

	// Get top 4 countries
	const top4Countries = topCountries.slice(0, 4)

	// Calculate "Other" countries
	const otherCountries = topCountries.slice(4)

	// Calculate top 4 percentage
	const top4Percentage = top4Countries.reduce(
		(sum, country) => sum + country.percentage,
		0
	)

	// Calculate "Other" percentage (100 - top 4)
	const otherPercentage = 100 - top4Percentage

	// Calculate "Other" papers count
	const otherTotal = top4Countries.reduce(
		(sum, country) => sum + country.papers,
		0
	)

	// Create chart data
	const chartData = [
		...top4Countries.map(country => ({
			label: country.country,
			value: country.papers,
			percentage: country.percentage,
			color: "#2563EB", // blue-600
		})),
	]

	// Add "Other" if there are more than 4 countries
	if (otherCountries.length > 0) {
		chartData.push({
			label: "Other",
			value: totalPapers - otherTotal,
			percentage: otherPercentage,
			color: "#93C5FD", // blue-300
		})
	}

	// Color gradient for top countries
	const colors = ["#1E40AF", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"]

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsVisible(true)
					}
				})
			},
			{ threshold: 0.4 }
		)

		if (cardRef.current) {
			observer.observe(cardRef.current)
		}

		return () => {
			if (cardRef.current) {
				observer.unobserve(cardRef.current)
			}
		}
	}, [])

	return (
		<Card ref={cardRef}>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					Top Contributing Countries
				</CardTitle>
				<p className="text-sm text-gray-600 mt-1">
					Distribution of papers by author country affiliation
				</p>
			</CardHeader>
			<CardContent className="space-y-6">
				{chartData.map((item, index) => {
					const actualWidth = isVisible ? item.percentage : 0
					const showPercentageInside = item.percentage >= 8
					const roundedPercentage = Math.round(item.percentage)

					return (
						<div key={index}>
							<div className="flex justify-between items-center mb-2">
								<span className="text-sm font-medium text-gray-700">
									{item.label}
								</span>
								<span className="text-sm font-semibold text-gray-900">
									{item.value.toLocaleString()}
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-10 relative overflow-hidden">
								<div
									className="h-10 rounded-full transition-all duration-1000 ease-out flex items-center"
									style={{
										width: `${actualWidth}%`,
										backgroundColor: colors[index] || colors[4],
									}}
								>
									{showPercentageInside && actualWidth > 0 && (
										<span
											className="ml-auto pr-3 text-white text-sm font-semibold whitespace-nowrap transition-opacity duration-300 ease-in"
											style={{
												transitionDelay: "600ms",
												opacity: actualWidth > 5 ? 1 : 0,
											}}
										>
											{roundedPercentage}%
										</span>
									)}
								</div>
								{!showPercentageInside && item.percentage > 0 && (
									<span
										className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm font-semibold whitespace-nowrap transition-opacity duration-300 ease-in"
										style={{
											transitionDelay: "600ms",
											opacity: isVisible ? 1 : 0,
										}}
									>
										{roundedPercentage}%
									</span>
								)}
							</div>
						</div>
					)
				})}
			</CardContent>
		</Card>
	)
}
