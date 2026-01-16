"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps"
import { useState, useMemo } from "react"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Using i18n-iso-countries for proper country name mapping
// This library provides ISO 3166-1 standard country codes
const countries = require("i18n-iso-countries")
const enLocale = require("i18n-iso-countries/langs/en.json")
countries.registerLocale(enLocale)

// 10 shades of blue from light to dark
const colorPalette = [
	"#DBEAFE", // blue-100
	"#BFDBFE", // blue-200
	"#93C5FD", // blue-300
	"#60A5FA", // blue-400
	"#3B82F6", // blue-500
	"#2563EB", // blue-600
	"#1D4ED8", // blue-700
	"#1E40AF", // blue-800
	"#1E3A8A", // blue-900
	"#172554", // blue-950
]

export default function WorldMapHeatmap({ countries: countryData }) {
	const [tooltipContent, setTooltipContent] = useState("")

	// Process country data with ISO code mapping
	const processedData = useMemo(() => {
		const countryDataMap = new Map()
		
		countryData.forEach(country => {
			// Try to get ISO Alpha-2 code from country name
			let alpha2Code = countries.getAlpha2Code(country.country, "en")
			
			// If not found, try common variations
			if (!alpha2Code) {
				const variations = [
					country.country.toUpperCase(),
					country.country.toLowerCase(),
					country.country.replace(/[^a-zA-Z\s]/g, ''),
					// Handle specific cases
					country.country === "USA" ? "United States of America" : null,
					country.country === "UK" ? "United Kingdom" : null,
					country.country === "UNITED KINGDOM" ? "United Kingdom" : null,
					country.country === "ENGLAND" ? "United Kingdom" : null,
					country.country === "SCOTLAND" ? "United Kingdom" : null,
					country.country === "WALES" ? "United Kingdom" : null,
					country.country === "NORTH IRELAND" ? "United Kingdom" : null,
					country.country === "PEOPLES R CHINA" ? "China" : null,
					country.country === "HONG KONG" ? "China" : null,
					country.country === "TURKIYE" ? "Turkey" : null,
					country.country === "REP OF GEORGIA" ? "Georgia" : null,
					country.country === "SOUTH KOREA" ? "Korea, Republic of" : null,
					country.country === "GERMANY (FED REP GER)" ? "Germany" : null,
				].filter(Boolean)
				
				for (const variant of variations) {
					alpha2Code = countries.getAlpha2Code(variant, "en")
					if (alpha2Code) break
				}
			}
			
			if (alpha2Code) {
				// Get the official country name from ISO standard
				const officialName = countries.getName(alpha2Code, "en")
				
				const existing = countryDataMap.get(officialName)
				if (existing) {
					// Merge data for countries (e.g., UK regions)
					existing.papers += country.papers
					existing.percentage += country.percentage
				} else {
					countryDataMap.set(officialName, {
						...country,
						alpha2Code,
						officialName,
					})
				}
			} else {
				console.warn(`Could not map country: ${country.country}`)
			}
		})
		
		return countryDataMap
	}, [countryData])

	// Calculate min and max percentages for dynamic scaling
	const { minPercentage, maxPercentage } = useMemo(() => {
		const percentages = Array.from(processedData.values()).map(c => c.percentage)
		return {
			minPercentage: percentages.length > 0 ? Math.min(...percentages) : 0,
			maxPercentage: percentages.length > 0 ? Math.max(...percentages) : 100,
		}
	}, [processedData])

	// Function to get color based on percentage with dynamic scaling
	const getColorForPercentage = (percentage) => {
		if (processedData.size === 0) return colorPalette[0]
		
		// Normalize the percentage to 0-1 range based on actual data
		const normalized = (percentage - minPercentage) / (maxPercentage - minPercentage || 1)
		
		// Map to color palette index (0-9)
		const index = Math.min(Math.floor(normalized * 10), 9)
		return colorPalette[index]
	}

	// Get color legend data with actual data ranges
	const legendData = useMemo(() => {
		const range = maxPercentage - minPercentage
		const step = range / 10
		
		return colorPalette.map((color, index) => {
			const rangeStart = minPercentage + (index * step)
			const rangeEnd = minPercentage + ((index + 1) * step)
			
			if (index === 9) {
				return {
					color: color,
					label: `${rangeStart.toFixed(1)}-${maxPercentage.toFixed(1)}%`,
				}
			}
			return {
				color: color,
				label: `${rangeStart.toFixed(1)}-${rangeEnd.toFixed(1)}%`,
			}
		})
	}, [minPercentage, maxPercentage])

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					First Author Geographic Distribution
				</CardTitle>
				<p className="text-sm text-gray-600 mt-1">
					Where contributing first authors are based globally • Click and drag
					to explore • Scroll to zoom
				</p>
			</CardHeader>
			<CardContent>
				<div className="w-full h-[300px] md:h-[500px] mb-6 relative group">
					{/* Interactive Hint Overlay */}
					<div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-transparent to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
							<p className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
								<svg
									className="w-3.5 h-3.5 text-blue-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
									/>
								</svg>
								Drag to pan • Scroll to zoom
							</p>
						</div>
					</div>

					<ComposableMap
						projectionConfig={{
							scale: 300,
							center: [10, 20],
						}}
						className="w-full h-full cursor-grab active:cursor-grabbing"
					>
						<ZoomableGroup center={[10, 20]} zoom={1.2}>
							<Geographies geography={geoUrl}>
								{({ geographies }) =>
									geographies.map(geo => {
										const countryName = geo.properties.name
										const countryInfo = processedData.get(countryName)
										const fillColor = countryInfo
											? getColorForPercentage(countryInfo.percentage)
											: "#F3F4F6" // gray-100 for countries with no data

										return (
											<Geography
												key={geo.rsmKey}
												geography={geo}
												fill={fillColor}
												stroke="#FFFFFF"
												strokeWidth={0.5}
												onMouseEnter={() => {
													if (countryInfo) {
														setTooltipContent(
															`${countryName}: ${
																countryInfo.papers
															} papers (${countryInfo.percentage.toFixed(1)}%)`
														)
													}
												}}
												onMouseLeave={() => {
													setTooltipContent("")
												}}
												style={{
													default: { outline: "none" },
													hover: {
														fill: countryInfo ? "#1E3A8A" : "#E5E7EB",
														outline: "none",
														cursor: countryInfo ? "pointer" : "default",
													},
													pressed: { outline: "none" },
												}}
											/>
										)
									})
								}
							</Geographies>
						</ZoomableGroup>
					</ComposableMap>

					{/* Tooltip */}
					{tooltipContent && (
						<div className="absolute top-4 left-4 bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm font-medium z-10">
							{tooltipContent}
						</div>
					)}
				</div>

				{/* Country List */}
					{/* <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-sm mb-6">
						{countryData.map((country, index) => (
							<div key={index} className="flex justify-between items-center">
								<span className="text-gray-700">{country.country}</span>
								<span className="font-semibold text-gray-900">
									{country.percentage.toFixed(1)}%
								</span>
							</div>
						))}
					</div> */}

				{/* Enhanced Legend with Dynamic Percentage Ranges */}
				<div className="border-t pt-4">
					<div className="flex items-center justify-between mb-3">
						<span className="text-xs font-medium text-gray-700">
							Percentage Distribution
						</span>
						<span className="text-xs text-gray-500">
							(Range: {minPercentage.toFixed(1)}% - {maxPercentage.toFixed(1)}%)
						</span>
					</div>

					<div className="flex items-center gap-1 mb-2">
						{colorPalette.map((color, i) => (
							<div
								key={i}
								className="flex-1 h-6 first:rounded-l last:rounded-r"
								style={{ backgroundColor: color }}
							/>
						))}
					</div>

					<div className="flex justify-between text-xs text-gray-600">
						<span>Lower percentage</span>
						<span>Higher percentage</span>
					</div>

					{/* Percentage ranges */}
					{/* <div className="mt-4 grid grid-cols-5 gap-2">
						{legendData.slice(0, 5).map((item, index) => (
							<div key={index} className="flex items-center gap-1.5">
								<div
									className="w-3 h-3 rounded flex-shrink-0"
									style={{ backgroundColor: item.color }}
								/>
								<span className="text-xs text-gray-600">{item.label}</span>
							</div>
						))}
					</div>
					<div className="mt-2 grid grid-cols-5 gap-2">
						{legendData.slice(5).map((item, index) => (
							<div key={index} className="flex items-center gap-1.5">
								<div
									className="w-3 h-3 rounded flex-shrink-0"
									style={{ backgroundColor: item.color }}
								/>
								<span className="text-xs text-gray-600">{item.label}</span>
							</div>
						))}
					</div> */}
				</div>
			</CardContent>
		</Card>
	)
}