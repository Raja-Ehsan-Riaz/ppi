import { Dot } from "lucide-react"
import { CircleDot } from "lucide-react"
import { Circle } from "lucide-react"

const CategoryCard = ({
	icon,
	label,
	range,
	description,
	color,
	iconColor,
	index,
}) => {
	return (
		<div
			className={`bg-gray-50/50 rounded-lg p-8 border border-gray-200 transition-all duration-700 `}
		>
			<div className="flex flex-col md:flex-row items-start md:items-center gap-8">
				<div
					className={`px-3  py-1 min-w-25 justify-start gap-2 flex items-center rounded-md border  ${color}`}
				>
					<div className={`${iconColor} text-lg mb-0.5`}>{icon}</div>
					<span className="text-sm">{label}</span>
				</div>
				<div className="flex-2 font-semibold  text-gray-600 mb-2">{range}</div>
				<p className="text-gray-500 flex-9 leading-relaxed">{description}</p>
			</div>
		</div>
	)
}

export default function PPICategoriesExplained() {
	const categories = [
		{
			icon: "α",
			label: "Alpha",
			range: "PPI ≥ 15.00",
			description:
				" Most prestigious journals where top universities and organizations frequently publish.",
			color: "bg-blue-50 border-blue-300 text-blue-700",
			iconColor: "text-blue-700",
		},
		{
			icon: "β",
			label: "Beta",
			range: "(15.00 > PPI ≥ 10.00)",
			description:
				" Well-regarded journals with strong participation from high-ranking institutions.",
			color: "bg-green-50 border-green-300 text-green-700",
			iconColor: "text-green-700",
		},
		{
			icon: "γ",
			label: "Gamma",
			range: "(10.00 > PPI ≥ 5.00)",
			description:
				"Low-quality journals with moderate participation from recognized institutions.",
			color: "bg-orange-50 border-orange-300 text-orange-700",
			iconColor: "text-orange-700",
		},
		{
			icon: "δ",
			label: "Delta",
			range: "(5.00 > PPI ≥ 2.00)",
			description:
				"Borderline predatory journals with negative perception among academic peers.",
			color: "bg-purple-50 border-purple-300 text-purple-700",
			iconColor: "text-purple-700",
		},
		{
			icon: "■",
			label: "None",
			range: "(PPI < 2)",
			description:
				" Journals with extremely negative reputation, not assigned a quality category.",
			color: "bg-gray-50 border-gray-300 text-gray-700",
			iconColor: "text-gray-700",
		},
	]

	return (
		<div className="px-10 md:px-16 lg:px-24 py-16 md:py-24 " id="categories">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 max-w-2xl mx-auto leading-tight">
						Journal Categories by Peer Perception Index
					</h1>
					<p className="text-gray-600 text-lg max-w-5xl">
						Journals and conferences are classified into five tiers based on
						their PPI, reflecting prestige and quality among academic peers.
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
							iconColor={category.iconColor}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
