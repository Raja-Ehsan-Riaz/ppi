import { Dot } from "lucide-react"
import { CircleDot } from "lucide-react"
import { Circle } from "lucide-react"

const CategoryCard = ({ icon, label, range, description, color, index }) => {
	return (
		<div
			className={`bg-gray-50/50 rounded-lg p-8 border border-gray-200 transition-all duration-700 `}
		>
			<div className="flex items-start gap-8">
				<div
					className={`px-3  min-w-25 justify-start flex items-center rounded-md border  font-medium whitespace-nowrap ${color}`}
				>
					<Dot size={30} /> <span className="text-xs">{label}</span>
				</div>
				<div className="text-xl flex-1 font-bold text-center text-gray-800 mb-2">
					{range}
				</div>
				<p className="text-gray-600 flex-7 leading-relaxed">{description}</p>
			</div>
		</div>
	)
}

export default function PPICategoriesExplained() {
	const categories = [
		{
			icon: "",
			label: "Alpha",
			range: "80-100",
			description:
				"Elite journals where the vast majority of authors are from top-tier research institutions. Represents the highest prestige in academic publishing.",
			color: "bg-blue-50 border-blue-300 text-blue-700",
		},
		{
			icon: "◆",
			label: "Beta",
			range: "60-79",
			description:
				"Elite journals where the vast majority of authors are from top-tier research institutions. Represents the highest prestige in academic publishing.",
			color: "bg-green-50 border-green-300 text-green-700",
		},
		{
			icon: "♦",
			label: "Gamma",
			range: "40-59",
			description:
				"Elite journals where the vast majority of authors are from top-tier research institutions. Represents the highest prestige in academic publishing.",
			color: "bg-orange-50 border-orange-300 text-orange-700",
		},
		{
			icon: "◆",
			label: "Delta",
			range: "20-39",
			description:
				"Elite journals where the vast majority of authors are from top-tier research institutions. Represents the highest prestige in academic publishing.",
			color: "bg-purple-50 border-purple-300 text-purple-700",
		},
		{
			icon: "■",
			label: "None",
			range: "0-19",
			description:
				"Elite journals where the vast majority of authors are from top-tier research institutions. Represents the highest prestige in academic publishing.",
			color: "bg-gray-50 border-gray-300 text-gray-700",
		},
	]

	return (
		<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24 ">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
						PPI Categories Explained
					</h1>
					<p className="text-gray-600 text-lg">
						Journals are classified into five tiers based on their Peer
						Perception Index score
					</p>
				</div>

				<div className="space-y-4">
					{categories.map((category, index) => (
						<CategoryCard
							key={index}
							icon={category.icon}
							label={category.label}
							range={category.range}
							description={category.description}
							color={category.color}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
