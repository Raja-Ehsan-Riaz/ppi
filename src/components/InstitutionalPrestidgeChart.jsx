"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useEffect, useRef, useState } from "react"

export default function InstitutionalPrestigePieChart({
  tier1Papers,
  tier2Papers,
  tier3Papers,
  tier4Papers,
  totalPapers
}) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  const totalRanked = tier1Papers + tier2Papers + tier3Papers + tier4Papers
  const unrankedPapers = totalPapers - totalRanked
  
  const chartData = [
    { 
      name: "Top 1-50", 
      value: tier1Papers, 
      percentage: Math.round((tier1Papers / totalPapers) * 100),
      fill: "#1E40AF" // blue-800
    },
    { 
      name: "51-100", 
      value: tier2Papers, 
      percentage: Math.round((tier2Papers / totalPapers) * 100),
      fill: "#2563EB" // blue-600
    },
    { 
      name: "101-150", 
      value: tier3Papers, 
      percentage: Math.round((tier3Papers / totalPapers) * 100),
      fill: "#3B82F6" // blue-500
    },
    { 
      name: "151-200", 
      value: tier4Papers, 
      percentage: Math.round((tier4Papers / totalPapers) * 100),
      fill: "#60A5FA" // blue-400
    },
    { 
      name: "Unranked / Other", 
      value: unrankedPapers, 
      percentage: Math.round((unrankedPapers / totalPapers) * 100),
      fill: "#93C5FD" // blue-300
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

  return (
    <Card ref={cardRef} >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Author Contribution by Institutional Prestige
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribution of papers based on the global ranking tier of author affiliations
        </p>
      </CardHeader>
      <CardContent>
        <div 
          className="transition-opacity duration-1000 ease-in"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <ChartContainer config={chartConfig} className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
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
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold text-sm text-gray-900">{data.name}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {data.value.toLocaleString()} papers
                          </p>
                          <p className="text-sm font-medium text-blue-600">
                            {data.percentage}% of total
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div 
          className="mt-6 space-y-3 transition-opacity duration-1000 delay-300 ease-in"
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
              <span className="text-sm font-semibold text-gray-900">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}