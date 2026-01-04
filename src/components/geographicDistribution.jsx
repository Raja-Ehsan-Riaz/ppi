"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, TrendingUp, MapPin } from "lucide-react"

const GeographicDistribution = ({ locationData }) => {
	const [showAll, setShowAll] = useState(false)

	if (
		!locationData ||
		!locationData.countries ||
		locationData.countries.length === 0
	) {
		return null
	}

	const { countries, totalPapers, topCountries } = locationData
	const displayCountries = showAll ? countries : topCountries

	// Calculate top 3 for highlights
	const top3 = countries.slice(0, 3)

	return (
		<Card className="mb-8">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2">
							<Globe className="h-5 w-5 text-blue-600" />
							Geographic Distribution of Authors
						</CardTitle>
						<p className="text-sm text-gray-500 mt-1">
							Distribution of papers by author country/region (
							{totalPapers.toLocaleString()} total papers analyzed)
						</p>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{/* Top 3 Highlights */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					{top3.map((item, index) => (
						<div
							key={item.country}
							className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4"
						>
							<div className="flex items-start justify-between mb-2">
								<div className="flex items-center gap-2">
									<div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
										{index + 1}
									</div>
									<MapPin className="h-4 w-4 text-blue-600" />
								</div>
								<Badge variant="secondary" className="text-xs">
									{item.percentage.toFixed(1)}%
								</Badge>
							</div>
							<h3 className="font-semibold text-gray-900 mb-1">
								{item.country}
							</h3>
							<p className="text-2xl font-bold text-blue-600">
								{item.papers.toLocaleString()}
								<span className="text-sm text-gray-600 font-normal ml-1">
									papers
								</span>
							</p>
						</div>
					))}
				</div>

				{/* All Countries List */}
				<div className="space-y-3">
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
							<TrendingUp className="h-4 w-4" />
							All Countries ({countries.length})
						</h4>
						{countries.length > 10 && (
							<button
								onClick={() => setShowAll(!showAll)}
								className="text-sm text-blue-600 hover:text-blue-700 font-medium"
							>
								{showAll ? "Show Top 10" : `Show All ${countries.length}`}
							</button>
						)}
					</div>

					{displayCountries.map((item, index) => (
						<div key={item.country} className="flex items-center gap-3">
							<div className="w-8 text-right text-sm font-medium text-gray-500">
								#{index + 1}
							</div>
							<div className="flex-1">
								<div className="flex justify-between items-center mb-1">
									<span className="text-sm font-medium text-gray-900">
										{item.country}
									</span>
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-600">
											{item.papers.toLocaleString()}
										</span>
										<span className="text-xs text-gray-500 w-12 text-right">
											{item.percentage.toFixed(1)}%
										</span>
									</div>
								</div>
								<div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
									<div
										className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
										style={{ width: `${Math.min(item.percentage, 100)}%` }}
									/>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Summary Stats */}
				<div className="mt-6 pt-6 border-t border-gray-200">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div>
							<p className="text-xs text-gray-500 mb-1">Total Countries</p>
							<p className="text-2xl font-bold text-gray-900">
								{countries.length}
							</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 mb-1">Top Country Share</p>
							<p className="text-2xl font-bold text-blue-600">
								{countries[0]?.percentage.toFixed(1)}%
							</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 mb-1">Top 3 Combined</p>
							<p className="text-2xl font-bold text-blue-600">
								{top3.reduce((sum, c) => sum + c.percentage, 0).toFixed(1)}%
							</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 mb-1">Papers Analyzed</p>
							<p className="text-2xl font-bold text-gray-900">
								{totalPapers.toLocaleString()}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default GeographicDistribution
