"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts"
import { useEffect, useRef, useState } from "react"

export default function InstitutionalPrestigePieChart({
  tier1Papers,
  tier2Papers,
  tier3Papers,
  tier4Papers,
  totalPapers
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const cardRef = useRef(null)

  const totalRanked = tier1Papers + tier2Papers + tier3Papers + tier4Papers
  const unrankedPapers = totalPapers - totalRanked
  
  const chartData = [
    { 
      name: "Tier 1", 
      value: tier1Papers, 
      percentage: Math.round((tier1Papers / totalPapers) * 100),
      fill: "#1E40AF" // blue-800
    },
    { 
      name: "Tier 2", 
      value: tier2Papers, 
      percentage: Math.round((tier2Papers / totalPapers) * 100),
      fill: "#2563EB" // blue-600
    },
    { 
      name: "Tier 3", 
      value: tier3Papers, 
      percentage: Math.round((tier3Papers / totalPapers) * 100),
      fill: "#3B82F6" // blue-500
    },
    { 
      name: "Tier 4", 
      value: tier4Papers, 
      percentage: Math.round((tier4Papers / totalPapers) * 100),
      fill: "#60A5FA" // blue-400
    },
    { 
      name: "Unranked / Other", 
      value: unrankedPapers, 
      percentage: Math.round((unrankedPapers / totalPapers) * 100),
      fill: "#92C2F0" // blue-300
    }
  ]

  const chartConfig = {
    value: {
      label: "Papers",
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.4 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const CustomTooltip = ({ active, payload }) => {
    // Show tooltip when hovering
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-sm text-gray-900">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600 mt-1">
            {payload[0].payload.value.toLocaleString()} papers
          </p>
          <p className="text-sm font-medium text-blue-600">
            {payload[0].payload.percentage}% of total
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          First Author Contribution by Institutional Prestige
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribution of papers based on the global ranking tier of first author affiliations
        </p>
      </CardHeader>
      <CardContent>
        <div 
          className="transition-opacity duration-1000 ease-in relative"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {/* Default Tier 1 Tooltip - Only show when nothing is hovered */}
          {hoveredIndex === null && (
            <div 
              className="absolute pointer-events-none z-10"
              style={{
                top: '35%',
                left: '65%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="font-semibold text-sm text-gray-900">{chartData[0].name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {chartData[0].value.toLocaleString()} papers
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {chartData[0].percentage}% of total
                </p>
              </div>
            </div>
          )}

          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                onMouseLeave={() => {
                  setHoveredIndex(null)
                }}
              >
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                  animationEasing="ease-out"
                  isAnimationActive={isVisible}
                  onMouseEnter={(_, index) => {
                    setHoveredIndex(index)
                  }}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={CustomTooltip}
                  cursor={false}
                  wrapperStyle={{ pointerEvents: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div 
          className="grid grid-cols-2 mt-6 space-y-3 transition-opacity duration-1000 delay-300 ease-in"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}