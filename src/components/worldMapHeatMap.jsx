"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps"
import { scaleQuantile } from "d3-scale"
import { useState } from "react"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Country name mapping to match topojson names
const countryNameMap = {
	USA: "United States of America",
	"UNITED KINGDOM": "United Kingdom",
	ENGLAND: "United Kingdom",
	SCOTLAND: "United Kingdom",
	"GERMANY (FED REP GER)": "Germany",
	FRANCE: "France",
	ITALY: "Italy",
	SPAIN: "Spain",
	CANADA: "Canada",
	AUSTRALIA: "Australia",
	JAPAN: "Japan",
	CHINA: "China",
	INDIA: "India",
	BRAZIL: "Brazil",
	RUSSIA: "Russia",
	"SOUTH KOREA": "South Korea",
	NETHERLANDS: "Netherlands",
	SWITZERLAND: "Switzerland",
	SWEDEN: "Sweden",
	BELGIUM: "Belgium",
	AUSTRIA: "Austria",
	DENMARK: "Denmark",
	FINLAND: "Finland",
	NORWAY: "Norway",
	POLAND: "Poland",
	PORTUGAL: "Portugal",
	GREECE: "Greece",
	ISRAEL: "Israel",
	TURKIYE: "Turkey",
	"SOUTH AFRICA": "South Africa",
	ARGENTINA: "Argentina",
	MEXICO: "Mexico",
	SINGAPORE: "Singapore",
	"HONG KONG": "China",
	TAIWAN: "Taiwan",
	IRELAND: "Ireland",
	"NEW ZEALAND": "New Zealand",
	"NETHERLANDS ANTILLES": "Netherlands",
	WALES: "United Kingdom",
	"NORTH IRELAND": "United Kingdom",
	"PEOPLES R CHINA": "China",
	"REP OF GEORGIA": "Georgia",
	KENYA: "Kenya",
	"COSTA RICA": "Costa Rica",
	BOLIVIA: "Bolivia",
	"SRI LANKA": "Sri Lanka",
}

// Blue color palette (10 shades from medium to dark - blue-500 to blue-900)
const colorPalette = [
	"#93C5FD", // blue-300 (lighter highlight)
	"#60A5FA", // blue-400
	"#3B82F6", // blue-500
	"#2563EB", // blue-600
	"#1D4ED8", // blue-700
	"#1E40AF", // blue-800
	"#1E3A8A", // blue-900
	"#172554", // blue-950 (deeper anchor)
]

export default function WorldMapHeatmap({ countries }) {
	const [tooltipContent, setTooltipContent] = useState("")

	// Create a map of country data by standardized name
	const countryDataMap = new Map()
	countries.forEach(country => {
		const standardName = countryNameMap[country.country] || country.country
		const existing = countryDataMap.get(standardName)

		if (existing) {
			// Merge data for countries like UK (England + Scotland + UK)
			existing.papers += country.papers
			existing.percentage += country.percentage
		} else {
			countryDataMap.set(standardName, { ...country })
		}
	})

	// Get max papers to determine ranges
	const maxPapers = Math.max(
		...Array.from(countryDataMap.values()).map(c => c.papers),
		1
	)

	// Create fixed ranges with 50-paper gaps
	const ranges = [
		0, // 0-50
		10, // 50-100
		20, // 100-150
		30, // 150-200
		40, // 200-250
		50, // 250-300
		60, // 300-350
	]

	// Function to get color based on paper count
	const getColorForPapers = papers => {
		for (let i = ranges.length - 1; i >= 0; i--) {
			if (papers >= ranges[i]) {
				return colorPalette[i]
			}
		}
		return colorPalette[0]
	}

	// Get color legend data with 50-paper ranges
	const getLegendData = () => {
		return ranges.map((range, index) => {
			if (index === ranges.length - 1) {
				return {
					color: colorPalette[index],
					label: `${range}+`,
				}
			}
			return {
				color: colorPalette[index],
				label: `${range}-${ranges[index + 1] - 1}`,
			}
		})
	}

	const legendData = getLegendData()

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
						className="w-full h-full cursor-grab active:cursor-grabbing rounded-4xl"
					>
						<ZoomableGroup center={[10, 20]} zoom={1.2}>
							<Geographies geography={geoUrl}>
								{({ geographies }) =>
									geographies.map(geo => {
										const countryName = geo.properties.name
										const countryData = countryDataMap.get(countryName)
										const fillColor = countryData
											? getColorForPapers(countryData.papers)
											: "#F3F4F6" // gray-100 for countries with no data

										return (
											<Geography
												key={geo.rsmKey}
												geography={geo}
												fill={fillColor}
												stroke="#FFFFFF"
												strokeWidth={0.5}
												onMouseEnter={() => {
													if (countryData) {
														setTooltipContent(
															`${countryName}: ${
																countryData.papers
															} papers (${countryData.percentage.toFixed(1)}%)`
														)
													}
												}}
												onMouseLeave={() => {
													setTooltipContent("")
												}}
												style={{
													default: { outline: "none" },
													hover: {
														fill: countryData ? "#1E3A8A" : "#E5E7EB",
														outline: "none",
														cursor: countryData ? "pointer" : "default",
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
				<div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-sm mb-6">
					{countries.map((country, index) => (
						<div key={index} className="flex justify-between items-center">
							<span className="text-gray-700">{country.country}</span>
							<span className="font-semibold text-gray-900">
								{country.percentage.toFixed(0)}%
							</span>
						</div>
					))}
				</div>

				{/* Enhanced Legend with Paper Count Ranges */}
				<div className="border-t pt-4">
					<div className="flex items-center justify-between mb-3">
						<span className="text-xs font-medium text-gray-700">
							Paper Distribution
						</span>
						<span className="text-xs text-gray-500">
							(Number of papers per country)
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
						<span>Fewer papers</span>
						<span>More papers</span>
					</div>

					{/* Quantile ranges */}
					{legendData.length > 0 && (
						<div className="mt-4 grid grid-cols-5 gap-2">
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
					)}
					{legendData.length > 5 && (
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
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
