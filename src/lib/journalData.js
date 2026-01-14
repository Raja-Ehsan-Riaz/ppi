// Main filter and sort function - handles all filtering logic
export function processJournals(journals, filters = {}) {
	let filtered = [...journals]

	// Apply keyword search filter
	if (filters.keyword && filters.keyword.trim() !== "") {
		const searchLower = filters.keyword.toLowerCase().trim()
		filtered = filtered.filter(
			j =>
				j.name.toLowerCase().includes(searchLower) ||
				j.abbreviation.toLowerCase().includes(searchLower) ||
				j.publisher.toLowerCase().includes(searchLower) ||
				j.issn.toLowerCase().includes(searchLower) ||
				j.eissn.toLowerCase().includes(searchLower)
		)
	}

	// Apply category filter
	if (filters.category && filters.category !== "all") {
		filtered = filtered.filter(j => j.category === filters.category)
	}

	// Apply PPI sorting (internal, not in URL)
	const sortOrder = filters.ppiSort || "high_to_low"
	if (sortOrder === "high_to_low") {
		filtered.sort((a, b) => b.ppi - a.ppi)
	} else if (sortOrder === "low_to_high") {
		filtered.sort((a, b) => a.ppi - b.ppi)
	}

	return filtered
}

// Find a journal by slug
export async function fetchJournalBySlug(slug) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/Journals/${slug}`
		)

		if (!response.ok) {
			return null
		}

		const data = await response.json()
		console.log(data)
		return data.journal
	} catch (error) {
		console.error("Error fetching journal:", error)
		return null
	}
}

// Get unique categories (filter out empty strings)
export function getCategories(journals) {
	const categories = new Set(
		journals.map(j => j.category).filter(cat => cat && cat.trim() !== "")
	)
	return Array.from(categories).sort()
}

// Paginate results
export function paginateJournals(journals, page = 1, perPage = 10) {
	const totalPages = Math.ceil(journals.length / perPage)
	const startIndex = (page - 1) * perPage
	const endIndex = startIndex + perPage
	const paginatedJournals = journals.slice(startIndex, endIndex)

	return {
		journals: paginatedJournals,
		totalPages,
		currentPage: page,
		totalResults: journals.length,
	}
}

// Find a journal by slug
export async function fetchPakistaniJournalBySlug(slug) {
	try {
		// Fetch Pakistani papers data
		const pakistaniResponse = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/saheb-i-ejaad/${slug}`
		)

		if (!pakistaniResponse.ok) {
			return null
		}

		const pakistaniData = await pakistaniResponse.json()
		const journal = pakistaniData.journal

		// Fetch total papers from main journal route
		try {
			const mainJournalResponse = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/Journals/${slug}`
			)

			if (mainJournalResponse.ok) {
				const mainJournalData = await mainJournalResponse.json()

				// Merge total papers into the Pakistani journal data
				journal.totalPapers = mainJournalData.journal.totalPapers || 0
			}
		} catch (error) {
			console.warn("Could not fetch total papers:", error)
			// Continue with Pakistani data only if main journal fetch fails
		}

		console.log(journal)
		return journal
	} catch (error) {
		console.error("Error fetching Pakistani journal:", error)
		return null
	}
}
