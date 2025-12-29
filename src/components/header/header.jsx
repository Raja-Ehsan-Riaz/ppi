"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Users, Menu, X } from "lucide-react"
import Image from "next/image"

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="fixed top-0 bg-white border-b border-gray-200 w-full z-50 font-semibold">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center space-x-2 h-full w-46 relative "
					>
						<Image
							src="/logo-nav.png"
							alt="logo"
							fill
							className="object-contain"
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							href="/how-it-works"
							className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
						>
							How it works
						</Link>
						<Link
							href="/about-us"
							className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
						>
							About
						</Link>
						<Link
							href="/contact-us"
							className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
						>
							Contact
						</Link>
						<Link
							href="/journals"
							className="px-4 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
						>
							Explore Journals Directory
						</Link>
					</nav>

					{/* Mobile menu button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
					<nav className="px-4 py-4 space-y-3">
						<Link
							href="/"
							className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/how-it-works"
							className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							How it works
						</Link>
						<Link
							href="/about"
							className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							About
						</Link>
						<Link
							href="/journals"
							className="block px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Explore Journals Directory
						</Link>
					</nav>
				</div>
			)}
		</header>
	)
}

export default Header
