import { notFound } from "next/navigation"
import Link from "next/link"
import { fetchJournalBySlug, findJournalBySlug } from "@/lib/journalData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, BarChart3, Globe, Building2 } from "lucide-react"
import { Dot } from "lucide-react"

export default async function JournalDetailPage({ params }) {
	// Await params in Next.js 15
	const { slug } = await params

	// Find journal by slug
	const journal = await fetchJournalBySlug(slug)

	if (!journal) {
		console.log("Journal not found for slug:", slug)
		notFound()
	}

	const getCategoryBadgeColor = category => {
		const colors = {
			Alpha: "bg-blue-100 text-blue-700 border-blue-300",
			Beta: "bg-green-100 text-green-700 border-green-300",
			Gamma: "bg-yellow-100 text-yellow-700 border-yellow-300",
			Delta: "bg-purple-100 text-purple-700 border-purple-300",
		}
		return colors[category] || "bg-gray-100 text-gray-700 border-gray-300"
	}

	// const totalAuthors =
	// 	journal.tier1Papers +
	// 	journal.tier2Papers +
	// 	journal.tier3Papers +
	// 	journal.tier4Papers

	return (
		<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24 ">
			{/* Header */}
			<div className="bg-white border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-start justify-between gap-6">
						<div className="flex-1">
							<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 max-w-2xl">
								{journal.name}
								{journal.abbreviation && (
									<span className="text-gray-600 text-sm pl-2 font-normal">
										({journal.abbreviation})
									</span>
								)}
							</h1>
							<div className="flex items-center gap-2 mb-3">
								<div className="flex text-gray-600 gap-6">
									<div className="flex gap-1">
										<span className="font-medium">Publisher: </span>
										<span>{journal.publisher || "N/A"}</span>
									</div>
									<div className="flex gap-1">
										<span className="font-medium">ISSN: </span>
										<span>{journal.issn || "N/A"}</span>
									</div>
									<div className="flex gap-1">
										<span className="font-medium">eISSN: </span>
										<span>{journal.eissn || "N/A"}</span>
									</div>
								</div>
							</div>{" "}
							{journal.category && journal.category.trim() !== "" ? (
								<Badge
									variant="outline"
									className={`text-xs px-3 rounded-sm ${getCategoryBadgeColor(
										journal.category
									)}`}
								>
									{journal.category}
								</Badge>
							) : (
								<span className="text-sm text-gray-400">-</span>
							)}
						</div>

						{/* PPI Score Card */}
						<div className="bg-blue-50 border-2 border-blue-200 text-primary rounded-lg p-6 text-center min-w-[160px]">
							<div className="text-gray-800 text-sm font-medium opacity-90 mb-1">
								Peer Perception Index
							</div>
							<div className="text-6xl font-semibold mb-1">
								{journal.ppi.toFixed(1)}
							</div>
							<div className="text-gray-800 text-sm opacity-90">out of 100</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Total Papers
							</CardTitle>
							<FileText className="h-5 w-5 text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">
								{journal.totalPapers.toLocaleString()}
							</div>
							<p className="text-xs text-gray-500 mt-1">Since 2008</p>
						</CardContent>
					</Card>

					{/* <Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								Contributing Authors
							</CardTitle>
							<BarChart3 className="h-5 w-5 text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">
								{totalAuthors.toLocaleString()}
							</div>
							<p className="text-xs text-gray-500 mt-1">
								From top institutions
							</p>
						</CardContent>
					</Card> */}

					{/* <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Countries</CardTitle>
              <Globe className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{journal.countries}</div>
              <p className="text-xs text-gray-500 mt-1">Geographic distribution</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Institutions</CardTitle>
              <Building2 className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{journal.contributingInstitutions.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Contributing worldwide</p>
            </CardContent>
          </Card> */}
				</div>

				{/* Author Affiliations by University Tier */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Author Affiliations by University Tier</CardTitle>
						<p className="text-sm text-gray-500 mt-1">
							Distribution of first authors based on their institution&apos;s
							global ranking
						</p>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm font-medium">
										Top 50 Universities
									</span>
									<span className="text-sm font-semibold">
										{journal.tier1Papers}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-blue-600 h-3 rounded-full transition-all"
										style={{
											width: `${
												(journal.tier1Papers / journal.totalPapers) * 100
											}%`,
										}}
									/>
								</div>
							</div>

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm font-medium">Ranked 51-100</span>
									<span className="text-sm font-semibold">
										{journal.tier2Papers}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-blue-500 h-3 rounded-full transition-all"
										style={{
											width: `${
												(journal.tier2Papers / journal.totalPapers) * 100
											}%`,
										}}
									/>
								</div>
							</div>

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm font-medium">Ranked 101-150</span>
									<span className="text-sm font-semibold">
										{journal.tier3Papers}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-blue-400 h-3 rounded-full transition-all"
										style={{
											width: `${
												(journal.tier3Papers / journal.totalPapers) * 100
											}%`,
										}}
									/>
								</div>
							</div>

							<div>
								<div className="flex justify-between mb-2">
									<span className="text-sm font-medium">Ranked 151-200</span>
									<span className="text-sm font-semibold">
										{journal.tier4Papers}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-3">
									<div
										className="bg-blue-300 h-3 rounded-full transition-all"
										style={{
											width: `${
												(journal.tier4Papers / journal.totalPapers) * 100
											}%`,
										}}
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Additional Info */}
				{/* <Card>
					<CardHeader>
						<CardTitle>About This Journal</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 mb-4">
							{journal.name}{" "}
							{journal.category && `is a ${journal.category} journal`} published
							by {journal.publisher || "various publishers"}. It has published{" "}
							{journal.totalPapers.toLocaleString()} papers since 2008, with
							contributions from researchers at top-ranked universities
							worldwide.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
							<div>
								<h4 className="font-semibold text-gray-900 mb-2">
									Publication Details
								</h4>
								<dl className="space-y-1 text-sm">
									{journal.category && (
										<div className="flex justify-between">
											<dt className="text-gray-600">Category:</dt>
											<dd className="font-medium">{journal.category}</dd>
										</div>
									)}
									{journal.issn && (
										<div className="flex justify-between">
											<dt className="text-gray-600">ISSN:</dt>
											<dd className="font-medium">{journal.issn}</dd>
										</div>
									)}
									{journal.eissn && (
										<div className="flex justify-between">
											<dt className="text-gray-600">eISSN:</dt>
											<dd className="font-medium">{journal.eissn}</dd>
										</div>
									)}
									{!journal.issn && !journal.eissn && (
										<div className="flex justify-between">
											<dt className="text-gray-600">ISSN:</dt>
											<dd className="font-medium text-gray-400">
												Not available
											</dd>
										</div>
									)}
								</dl>
							</div>

							<div>
								<h4 className="font-semibold text-gray-900 mb-2">
									Impact Metrics
								</h4>
								<dl className="space-y-1 text-sm">
									<div className="flex justify-between">
										<dt className="text-gray-600">PPI Score:</dt>
										<dd className="font-medium">{journal.ppi.toFixed(2)}</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-gray-600">Total Publications:</dt>
										<dd className="font-medium">
											{journal.totalPapers.toLocaleString()}
										</dd>
									</div>
									<div className="flex justify-between">
										<dt className="text-gray-600">Global Reach:</dt>
										<dd className="font-medium">
											{journal.countries} countries
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</CardContent>
				</Card> */}
			</div>
		</div>
	)
}
