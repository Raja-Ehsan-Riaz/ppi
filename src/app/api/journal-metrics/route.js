// App Router API Route: app/api/journal-metrics/route.js

import { NextResponse } from "next/server"

export async function GET(request) {
	const searchParams = request.nextUrl.searchParams
	const issn = searchParams.get("issn")

	if (!issn) {
		return NextResponse.json({ error: "ISSN is required" }, { status: 400 })
	}

	try {
		// Fetch journal/source information from OpenAlex
		const sourceResponse = await fetch(
			`https://api.openalex.org/sources?filter=issn:${issn}`,
			{
				headers: {
					"User-Agent": "mailto:your-email@example.com", // Replace with your email
				},
			}
		)

		const sourceData = await sourceResponse.json()

		if (!sourceData.results || sourceData.results.length === 0) {
			return NextResponse.json({ error: "Journal not found" }, { status: 404 })
		}

		const journal = sourceData.results[0]

		// Fetch works (publications) for this journal
		const worksResponse = await fetch(
			`https://api.openalex.org/works?filter=primary_location.source.id:${journal.id}&per_page=200`,
			{
				headers: {
					"User-Agent": "mailto:your-email@example.com", // Replace with your email
				},
			}
		)

		const worksData = await worksResponse.json()

		// Calculate metrics similar to InCites format
		const metrics = calculateMetrics(journal, worksData.results)

		return NextResponse.json({
			success: true,
			journal: {
				name: journal.display_name,
				issn: journal.issn_l || issn,
				publisher: journal.host_organization_name,
			},
			metrics,
		})
	} catch (error) {
		console.error("Error fetching journal data:", error)
		return NextResponse.json(
			{ error: "Failed to fetch journal data" },
			{ status: 500 }
		)
	}
}

// Helper function to get country name from country code
function getCountryName(countryCode) {
	const countryNames = {
		US: "United States",
		GB: "United Kingdom",
		CN: "China",
		DE: "Germany",
		FR: "France",
		JP: "Japan",
		CA: "Canada",
		IT: "Italy",
		AU: "Australia",
		ES: "Spain",
		KR: "South Korea",
		NL: "Netherlands",
		BR: "Brazil",
		IN: "India",
		CH: "Switzerland",
		SE: "Sweden",
		PL: "Poland",
		BE: "Belgium",
		AT: "Austria",
		DK: "Denmark",
		NO: "Norway",
		FI: "Finland",
		IE: "Ireland",
		PT: "Portugal",
		GR: "Greece",
		CZ: "Czech Republic",
		IL: "Israel",
		NZ: "New Zealand",
		SG: "Singapore",
		HK: "Hong Kong",
		TW: "Taiwan",
		MY: "Malaysia",
		TH: "Thailand",
		ID: "Indonesia",
		PH: "Philippines",
		VN: "Vietnam",
		PK: "Pakistan",
		EG: "Egypt",
		NG: "Nigeria",
		ZA: "South Africa",
		SA: "Saudi Arabia",
		AE: "United Arab Emirates",
		TR: "Turkey",
		RU: "Russia",
		UA: "Ukraine",
		MX: "Mexico",
		AR: "Argentina",
		CL: "Chile",
		CO: "Colombia",
		IR: "Iran",
	}
	return countryNames[countryCode] || countryCode
}

function calculateMetrics(journal, works) {
	const totalDocuments = works.length

	// Calculate total citations
	const totalCitations = works.reduce(
		(sum, work) => sum + (work.cited_by_count || 0),
		0
	)

	// Calculate documents with citations
	const documentsWithCitations = works.filter(
		work => work.cited_by_count > 0
	).length
	const percentDocsCited =
		totalDocuments > 0
			? ((documentsWithCitations / totalDocuments) * 100).toFixed(2)
			: 0

	// Calculate collaboration metrics (international co-authorship)
	const collaborativeWorks = works.filter(work => {
		if (!work.authorships) return false
		const countries = new Set()
		work.authorships.forEach(authorship => {
			authorship.countries.forEach(country => countries.add(country))
		})
		return countries.size > 1
	})
	const collabCN = collaborativeWorks.length

	// Calculate average citations per document
	const avgCitations =
		totalDocuments > 0 ? (totalCitations / totalDocuments).toFixed(2) : 0

	// Calculate Category Normalized Citation Impact (approximation)
	const validPercentiles = works
		.filter(w => w.cited_by_percentile_year?.min)
		.map(w => w.cited_by_percentile_year.min)

	const cnci =
		validPercentiles.length > 0
			? (
					validPercentiles.reduce((a, b) => a + b, 0) /
					validPercentiles.length /
					100
			  ).toFixed(2)
			: 0

	// Calculate h-index approximation
	const citationCounts = works
		.map(w => w.cited_by_count || 0)
		.sort((a, b) => b - a)

	let hIndex = 0
	for (let i = 0; i < citationCounts.length; i++) {
		if (citationCounts[i] >= i + 1) {
			hIndex = i + 1
		} else {
			break
		}
	}

	// FIXED: Calculate country distribution using WHOLE COUNTING (InCites methodology)
	// Each paper contributes 1 count to each unique country that appears in its authorships
	const countryPaperCount = {} // Count of papers per country
	const institutionSet = new Set()
	const uniqueAuthors = new Set()

	works.forEach(work => {
		// Track unique countries per paper (whole counting)
		const uniqueCountriesInPaper = new Set()

		if (work.authorships) {
			work.authorships.forEach(authorship => {
				// Collect unique countries for this paper
				authorship.countries.forEach(country => {
					uniqueCountriesInPaper.add(country)
				})

				// Count institutions
				authorship.institutions.forEach(inst => {
					if (inst.id) institutionSet.add(inst.id)
				})

				// Count unique authors
				if (authorship.author?.id) {
					uniqueAuthors.add(authorship.author.id)
				}
			})
		}

		// Add 1 count for each unique country in this paper (whole counting)
		uniqueCountriesInPaper.forEach(country => {
			countryPaperCount[country] = (countryPaperCount[country] || 0) + 1
		})
	})

	// Sort countries by paper count and calculate percentages based on total documents
	const sortedCountries = Object.entries(countryPaperCount)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 15)
		.map(([countryCode, count]) => ({
			country: getCountryName(countryCode),
			countryCode: countryCode,
			count,
			percentage:
				totalDocuments > 0 ? ((count / totalDocuments) * 100).toFixed(1) : "0.0",
		}))

	return {
		webOfScienceDocuments: totalDocuments,
		timesCited: totalCitations,
		collabCN: collabCN,
		rank: hIndex,
		percentDocsCited: parseFloat(percentDocsCited),
		categoryNormalizedCitationImpact: parseFloat(cnci),
		averageCitationsPerDocument: parseFloat(avgCitations),
		internationalCollaborationPercent:
			totalDocuments > 0
				? parseFloat(((collabCN / totalDocuments) * 100).toFixed(2))
				: 0,
		contributingAuthors: uniqueAuthors.size,
		countries: Object.keys(countryPaperCount).length,
		institutions: institutionSet.size,
		countryDistribution: sortedCountries,
	}
}