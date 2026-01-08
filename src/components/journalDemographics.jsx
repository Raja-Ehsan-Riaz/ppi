"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, TrendingUp, Users, Building2 } from "lucide-react"

export default function JournalDemographics({ issn }) {
	const [metrics, setMetrics] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchMetrics() {
			try {
				const response = await fetch(`/api/journal-metrics?issn=${issn}`)
				const data = await response.json()

				if (data.success) {
					setMetrics(data.metrics)
				} else {
					setError(data.error)
				}
			} catch (err) {
				setError("Failed to load metrics")
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		if (issn) {
			fetchMetrics()
		}
	}, [issn])

	if (loading) {
		return (
			<div className="space-y-6">
				<Card>
					<CardContent className="p-8">
						<div className="text-center text-gray-500">
							Loading demographics...
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (error || !metrics) {
		return (
			<div className="space-y-6">
				<Card>
					<CardContent className="p-8">
						<div className="text-center text-gray-500">
							{error || "No demographic data available"}
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	// Split countries into three columns
	const countriesPerColumn = Math.ceil(metrics.countryDistribution.length / 3)
	const column1 = metrics.countryDistribution.slice(0, countriesPerColumn)
	const column2 = metrics.countryDistribution.slice(
		countriesPerColumn,
		countriesPerColumn * 2
	)
	const column3 = metrics.countryDistribution.slice(countriesPerColumn * 2)

	return (
		<div className="space-y-6">
			{/* Key Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Contributing First Authors
						</CardTitle>
						<Users className="h-5 w-5 text-gray-400" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">
							{metrics.contributingAuthors.toLocaleString()}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Countries
						</CardTitle>
						<Globe className="h-5 w-5 text-gray-400" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{metrics.countries}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Institutions
						</CardTitle>
						<Building2 className="h-5 w-5 text-gray-400" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">
							{metrics.institutions.toLocaleString()}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Total Citations
						</CardTitle>
						<TrendingUp className="h-5 w-5 text-gray-400" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">
							{metrics.timesCited.toLocaleString()}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Geographic Distribution */}
			<Card>
				<CardHeader>
					<CardTitle>Geographic Distribution</CardTitle>
					<p className="text-sm text-gray-500 mt-1">
						Top contributing countries by publication count
					</p>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
						{/* Column 1 */}
						<div className="space-y-4">
							{column1.map(item => (
								<div key={item.country} className="flex items-center justify-between gap-4">
									<div className="flex items-center gap-2 flex-1 min-w-0">
										<div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
										<span className="text-sm font-medium text-gray-900 truncate">
											{item.country}
										</span>
									</div>
									<div className="flex items-center gap-2 flex-shrink-0">
										<span className="text-sm font-semibold text-gray-700">
											{item.count}
										</span>
										<span className="text-sm text-gray-500">
											({item.percentage}%)
										</span>
									</div>
								</div>
							))}
						</div>

						{/* Column 2 */}
						<div className="space-y-4">
							{column2.map(item => (
								<div key={item.country} className="flex items-center justify-between gap-4">
									<div className="flex items-center gap-2 flex-1 min-w-0">
										<div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
										<span className="text-sm font-medium text-gray-900 truncate">
											{item.country}
										</span>
									</div>
									<div className="flex items-center gap-2 flex-shrink-0">
										<span className="text-sm font-semibold text-gray-700">
											{item.count}
										</span>
										<span className="text-sm text-gray-500">
											({item.percentage}%)
										</span>
									</div>
								</div>
							))}
						</div>

						{/* Column 3 */}
						<div className="space-y-4">
							{column3.map(item => (
								<div key={item.country} className="flex items-center justify-between gap-4">
									<div className="flex items-center gap-2 flex-1 min-w-0">
										<div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
										<span className="text-sm font-medium text-gray-900 truncate">
											{item.country}
										</span>
									</div>
									<div className="flex items-center gap-2 flex-shrink-0">
										<span className="text-sm font-semibold text-gray-700">
											{item.count}
										</span>
										<span className="text-sm text-gray-500">
											({item.percentage}%)
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Citation & Impact Metrics */}
			<Card>
				<CardHeader>
					<CardTitle>Citation & Impact Metrics</CardTitle>
					<p className="text-sm text-gray-500 mt-1">
						OpenAlex-derived performance indicators
					</p>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Left side - Progress bars */}
						<div className="space-y-6">
							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm font-medium text-gray-700">
										Documents with Citations
									</span>
									<span className="text-sm font-semibold text-gray-900">
										{metrics.percentDocsCited}%
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-green-500 h-3 rounded-full transition-all"
										style={{
											width: `${Math.min(metrics.percentDocsCited, 100)}%`,
										}}
									/>
								</div>
							</div>

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm font-medium text-gray-700">
										International Collaboration
									</span>
									<span className="text-sm font-semibold text-gray-900">
										{metrics.internationalCollaborationPercent}%
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-blue-500 h-3 rounded-full transition-all"
										style={{
											width: `${Math.min(
												metrics.internationalCollaborationPercent,
												100
											)}%`,
										}}
									/>
								</div>
							</div>
						</div>

						{/* Right side - Key metrics */}
						<div className="space-y-4">
							<div className="flex justify-between items-center py-2 border-b">
								<span className="text-sm font-medium text-gray-600">
									Total Citations
								</span>
								<span className="text-lg font-bold text-gray-900">
									{metrics.timesCited.toLocaleString()}
								</span>
							</div>

							<div className="flex justify-between items-center py-2 border-b">
								<span className="text-sm font-medium text-gray-600">
									H-Index
								</span>
								<span className="text-lg font-bold text-gray-900">
									{metrics.rank}
								</span>
							</div>

							<div className="flex justify-between items-center py-2 border-b">
								<span className="text-sm font-medium text-gray-600">
									Norm. Citation Impact
								</span>
								<span className="text-lg font-bold text-gray-900">
									{metrics.categoryNormalizedCitationImpact}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}