"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

export default function UniversityTierBarChart({
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
      label: "Top 100", 
      value: tier1Papers + tier2Papers,
      percentage: ((tier1Papers + tier2Papers) / totalPapers) * 100,
      color: "#2563EB" // blue-600
    },
    { 
      label: "Top 500", 
      value: tier3Papers,
      percentage: (tier3Papers / totalPapers) * 100,
      color: "#3B82F6" // blue-500
    },
    { 
      label: "Other ranked", 
      value: tier4Papers,
      percentage: (tier4Papers / totalPapers) * 100,
      color: "#60A5FA" // blue-400
    },
    { 
      label: "Unranked", 
      value: unrankedPapers,
      percentage: (unrankedPapers / totalPapers) * 100,
      color: "#93C5FD" // blue-300
    }
  ]

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
          Author Affiliations by University Tier
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribution of authors based on their institution's global ranking
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {chartData.map((item, index) => {
          const actualWidth = isVisible ? item.percentage : 0
          const showPercentageInside = item.percentage >= 8
          const roundedPercentage = Math.round(item.percentage)
          
          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.value.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-10 relative overflow-hidden">
                <div
                  className="h-10 rounded-full transition-all duration-1000 ease-out flex items-center"
                  style={{
                    width: `${actualWidth}%`,
                    backgroundColor: item.color,
                  }}
                >
                  {showPercentageInside && actualWidth > 0 && (
                    <span 
                      className="ml-auto pr-3 text-white text-sm font-semibold whitespace-nowrap transition-opacity duration-300 ease-in"
                      style={{
                        transitionDelay: '600ms',
                        opacity: actualWidth > 5 ? 1 : 0,
                      }}
                    >
                      {roundedPercentage}%
                    </span>
                  )}
                </div>
                {!showPercentageInside && item.percentage > 0 && (
                  <span 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm font-semibold whitespace-nowrap transition-opacity duration-300 ease-in"
                    style={{
                      transitionDelay: '600ms',
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    {roundedPercentage}%
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}