"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

const JournalsContext = createContext()

export const useJournals = () => {
	const context = useContext(JournalsContext)
	if (!context) {
		throw new Error("useJournals must be used within a JournalsProvider")
	}
	return context
}

export const JournalsProvider = ({ children }) => {
	const [journals, setJournals] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const loadJournals = async () => {
			try {
				setLoading(true)

				// Fetch from your existing API
				const response = await fetch("/api/Journals")

				if (!response.ok) {
					throw new Error("Failed to fetch journals")
				}

				const data = await response.json()
				setJournals(data.journals)
				setError(null)
			} catch (err) {
				console.error("Error loading journals:", err)
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadJournals()
	}, [])

	// Search function - reuses your existing logic
	const searchJournals = keyword => {
		if (!keyword || keyword.trim() === "") return journals

		const searchLower = keyword.toLowerCase().trim()
		return journals.filter(
			j =>
				j.name.toLowerCase().includes(searchLower) ||
				j.abbreviation.toLowerCase().includes(searchLower) ||
				j.publisher.toLowerCase().includes(searchLower) ||
				j.issn.toLowerCase().includes(searchLower) ||
				j.eissn.toLowerCase().includes(searchLower)
		)
	}

	// Get top N journals by PPI
	const getTopJournals = (limit = 3) => {
		return [...journals].sort((a, b) => b.ppi - a.ppi).slice(0, limit)
	}

	const value = {
		journals,
		loading,
		error,
		searchJournals,
		getTopJournals,
	}

	return (
		<JournalsContext.Provider value={value}>
			{children}
		</JournalsContext.Provider>
	)
}
