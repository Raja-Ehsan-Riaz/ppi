import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import AOSProvider from "@/providers/aosProvider"
import { JournalsProvider } from "@/context/journalsContext"

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
})

export const metadata = {
	title: "Peer Perception Index",
	description:
		"The Peer Perception Index analyzes where top researchers actually publish, providing a transparent metric for journal quality beyond traditional impact factors.",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.variable} } font-sans antialiased`}>
				<JournalsProvider>
					<AOSProvider />
					<Header />
					{children}
					<Footer />
				</JournalsProvider>
			</body>
		</html>
	)
}

