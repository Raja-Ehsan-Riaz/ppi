// page.tsx - Journal Detail Page with react-simple-maps and shadcn/ui charts
import { notFound } from "next/navigation"
import { fetchJournalBySlug } from "@/lib/journalData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	FileText,
	TrendingUp,
	Globe,
	Building2,
	ExternalLink,
} from "lucide-react"
import InstitutionalPrestigeChart from "@/components/InstitutionalPrestidgeChart"
import WorldMapHeatmap from "@/components/worldMapHeatMap"
import UniversityTierBarChart from "@/components/universityTierBarChart"
import Link from "next/link"
import ProductCTA from "@/components/shared/productCTA"

export default async function JournalDetailPage({ params }) {
	const { slug } = await params
	const journal = await fetchJournalBySlug(slug)

	if (!journal) {
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

	// Calculate stats
	const totalAuthors = 42847 // You can calculate this from your data
	const totalCountries = journal.locationData?.countries?.length || 0
	const totalInstitutions = 3421 // You can calculate this from your data
	const totalRanked =
		journal.tier1Papers +
		journal.tier2Papers +
		journal.tier3Papers +
		journal.tier4Papers
	const unrankedPapers = journal.totalPapers - totalRanked

	return (
		<div>
			<div className="px-10 md:px-16 lg:px-24 pt-16 md:pt-32 bg-white">
				{/* Header Section */}
				<div className="bg-white rounded-lg py-8">
					<div className="max-w-7xl mx-auto ">
						<div className="flex items-start justify-between gap-8">
							<div
								className="flex-1"
								data-aos="fade"
								data-aos-duration="500"
								data-aos-easing="ease-out-cubic"
							>
								<h1 className="text-5xl font-bold text-gray-900 mb-2 max-w-xl leading-tight">
									{journal.name}
									{journal.abbreviation && (
										<span className="text-gray-500 text-lg font-normal ml-2">
											({journal.abbreviation})
										</span>
									)}
								</h1>

								<div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
									<div>
										<span className="font-semibold">Publisher:</span>{" "}
										{journal.publisher || "N/A"}
									</div>
									<div>
										<span className="font-semibold">ISSN:</span>{" "}
										{journal.issn || "N/A"}
									</div>
									<div>
										<span className="font-semibold">eISSN:</span>{" "}
										{journal.eissn || "N/A"}
									</div>
									{journal.abbreviation && (
										<div className="uppercase text-xs px-2 py-1 rounded bg-gray-100">
											{journal.abbreviation}
										</div>
									)}
								</div>

								<p className="text-gray-600 text-sm mb-4 max-w-3xl">
									Nature is a weekly international journal publishing the finest
									peer-reviewed research in all fields of science and
									technology. It is one of the most cited scientific journals in
									the world.
								</p>

								<div className="flex items-center gap-3">
									{journal.category && journal.category.trim() !== "" && (
										<Badge
											variant="outline"
											className={`text-sm px-3 rounded ${getCategoryBadgeColor(
												journal.category
											)}`}
										>
											{journal.category}
										</Badge>
									)}
								</div>
							</div>

							{/* PPI Score Card */}
							<div
								className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center min-w-[200px]"
								data-aos="fade-left"
								data-aos-duration="500"
								data-aos-easing="ease-out-cubic"
							>
								<div className="text-gray-700 text-sm font-medium mb-1">
									Peer Perception Index
								</div>
								<div className="text-6xl font-bold text-blue-600 mb-1">
									{journal.ppi.toFixed(1)}
								</div>
								<div className="text-gray-600 text-sm mb-4">out of 100</div>

								<div className="space-y-2 text-left text-sm border-t pt-4">
									<div className="flex justify-between">
										<span className="text-gray-600">Category</span>
										<span className="font-semibold">{journal.category}</span>
									</div>
									{/* <div className="flex justify-between">
									<span className="text-gray-600">Global Rank</span>
									<span className="font-semibold">#1</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Discipline Rank</span>
									<span className="font-semibold">#2345</span>
								</div> */}
								</div>

								<Button variant="outline" className="w-full mt-4" asChild>
									<Link href="#" rel="noopener noreferrer">
										Visit journal website
										<ExternalLink className="w-4 h-4 ml-2" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="max-w-7xl mx-auto  py-8">
					{/* Stats Grid */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<Card
							className={"bg-gray-50"}
							data-aos="fade-up"
							data-aos-delay="200"
							data-aos-duration="500"
							data-aos-easing="ease-out-cubic"
						>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium text-gray-600">
									Total Papers
								</CardTitle>
								<FileText className="h-5 w-5 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-gray-900 mb-1">
									{journal.totalPapers.toLocaleString()}
								</div>
								<p className="text-xs text-gray-500">
									Analyzed in PPI calculation
								</p>
							</CardContent>
						</Card>

						<Card
							className={"bg-gray-50"}
							data-aos="fade-up"
							data-aos-delay="300"
							data-aos-duration="500"
							data-aos-easing="ease-out-cubic"
						>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium text-gray-600">
									Contributing Authors
								</CardTitle>
								<TrendingUp className="h-5 w-5 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-gray-900 mb-1">
									{totalAuthors.toLocaleString()}
								</div>
								<p className="text-xs text-gray-500">
									Unique authors from tracked institutions
								</p>
							</CardContent>
						</Card>

						<Card
							className={"bg-gray-50"}
							data-aos="fade-up"
							data-aos-delay="400"
							data-aos-duration="500"
							data-aos-easing="ease-out-cubic"
						>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium text-gray-600">
									Countries
								</CardTitle>
								<Globe className="h-5 w-5 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-gray-900 mb-1">
									{totalCountries}
								</div>
								<p className="text-xs text-gray-500">
									Geographic distribution of authors
								</p>
							</CardContent>
						</Card>

						<Card
							className={"bg-gray-50"}
							data-aos="fade-up"
							data-aos-delay="500"
							data-aos-duration="500"
							data-aos-easing="ease-out-cubic"
						>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium text-gray-600">
									Institutions
								</CardTitle>
								<Building2 className="h-5 w-5 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-gray-900 mb-1">
									{totalInstitutions.toLocaleString()}
								</div>
								<p className="text-xs text-gray-500">
									Contributing academic institutions
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Two Column Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
						{/* Author Affiliations by University Tier */}
						<UniversityTierBarChart
							tier1Papers={journal.tier1Papers}
							tier2Papers={journal.tier2Papers}
							tier3Papers={journal.tier3Papers}
							tier4Papers={journal.tier4Papers}
							totalPapers={journal.totalPapers}
						/>

						{/* Author Contribution by Institutional Prestige - Use Component */}
						<InstitutionalPrestigeChart
							tier1Papers={journal.tier1Papers}
							tier2Papers={journal.tier2Papers}
							tier3Papers={journal.tier3Papers}
							tier4Papers={journal.tier4Papers}
							totalPapers={journal.totalPapers}
						/>
					</div>

					{/* Geographic Distribution - Use Component */}
					<WorldMapHeatmap countries={journal.locationData?.countries || []} />
				</div>
			</div>
			<ProductCTA />
		</div>
	)
}
