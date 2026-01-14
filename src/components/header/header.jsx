"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const pathname = usePathname()

	const isActive = path => pathname === path

	return (
		<header
			className={`fixed top-0 bg-white border-b border-gray-100 w-full z-50 font-semibold`}
		>
			<div className="max-w-7xl mx-auto py-2">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center space-x-2 h-full w-46 relative "
					>
						<Image
							src={`${
								pathname.includes("/saheb-i-ejaad")
									? "/logo - green.png"
									: "/logo.png"
							}`}
							alt="logo"
							fill
							className="object-contain"
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							href="/how-it-works"
							className={`text-sm transition-colors pb-1 ${
								isActive("/how-it-works")
									? "text-primary border-primary border-b-2"
									: "text-gray-600 hover:text-primary border-transparent"
							}`}
						>
							How it works
						</Link>
						<Link
							href="/about-us"
							className={`text-sm transition-colors pb-1 ${
								isActive("/about-us")
									? "text-primary border-primary border-b-2"
									: "text-gray-600 hover:text-primary border-transparent"
							}`}
						>
							About
						</Link>
						<Link
							href="/contact-us"
							className={`text-sm transition-colors pb-1 ${
								isActive("/contact-us")
									? "text-primary border-primary border-b-2"
									: "text-gray-600 hover:text-primary border-transparent"
							}`}
						>
							Contact
						</Link>
						<div className="flex items-center gap-3">
							{!pathname.includes("/saheb-i-ejaad") ? (
								<Link
									href="/journals"
									className="px-4 py-3 bg-primary text-white text-sm rounded-lg hover:bg-primary/80 transition-colors"
								>
									Explore Journals
								</Link>
							) : (
								<></>
							)}

							<Link
								href="/saheb-i-ejaad"
								className={`px-4 py-3 ${
									pathname.includes("/saheb-i-ejaad")
										? "bg-[#007856] hover:bg-[#007856]/80"
										: "bg-black hover:bg-black/70"
								}  text-white text-sm rounded-lg  transition-colors`}
							>
								Saheb-i-Ejaad
							</Link>
						</div>
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
							className={`block px-4 py-2 rounded-lg transition-colors ${
								isActive("/")
									? "text-blue-600 bg-blue-50"
									: "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
							}`}
							onClick={() => setMobileMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/how-it-works"
							className={`block px-4 py-2 rounded-lg transition-colors ${
								isActive("/how-it-works")
									? "text-blue-600 bg-blue-50"
									: "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
							}`}
							onClick={() => setMobileMenuOpen(false)}
						>
							How it works
						</Link>
						<Link
							href="/about-us"
							className={`block px-4 py-2 rounded-lg transition-colors ${
								isActive("/about-us")
									? "text-blue-600 bg-blue-50"
									: "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
							}`}
							onClick={() => setMobileMenuOpen(false)}
						>
							About
						</Link>
						<Link
							href="/contact-us"
							className={`block px-4 py-2 rounded-lg transition-colors ${
								isActive("/contact-us")
									? "text-blue-600 bg-blue-50"
									: "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
							}`}
							onClick={() => setMobileMenuOpen(false)}
						>
							Contact
						</Link>
						{pathname !== "/saheb-i-ejaad" ? (
							<Link
								href="/journals"
								className="block px-4 py-2 bg-blue-600 text-white  text-center rounded-lg hover:bg-blue-700 transition-colors"
								onClick={() => setMobileMenuOpen(false)}
							>
								Explore Journals
							</Link>
						) : (
							<></>
						)}
						<Link
							href="/saheb-i-ejaad"
							className={`block px-4 py-2 text-white  text-center rounded-lg ${
								pathname.includes("/saheb-i-ejaad")
									? "bg-[#007856] hover:bg-[#007856]/80"
									: "bg-black hover:bg-black/70"
							} transition-colors`}
							onClick={() => setMobileMenuOpen(false)}
						>
							Saheb-i-Ejaad
						</Link>
					</nav>
				</div>
			)}
		</header>
	)
}

export default Header
