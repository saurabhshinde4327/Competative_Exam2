"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle } from "lucide-react"
import { useNewsTicker } from "@/hooks/use-api"

export function NewsTicker() {
  const { newsTicker, loading, error, usingFallback } = useNewsTicker()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-scroll through news items
  useEffect(() => {
    if (newsTicker.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsTicker.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [newsTicker.length])

  if (loading) {
    return (
      <div className="bg-blue-50 border-b border-blue-200 py-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-blue-600">Loading news...</span>
        </div>
      </div>
    )
  }

  // If there's an error but we have fallback data, show the fallback data
  if (error && newsTicker.length === 0) {
    return (
      <div className="bg-red-50 border-b border-red-200 py-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="ml-2 text-sm text-red-600">News ticker unavailable</span>
        </div>
      </div>
    )
  }

  // If no news items available, don't render anything
  if (newsTicker.length === 0) {
    return null
  }

  const activeNews = newsTicker.filter(news => news.active)
  
  if (activeNews.length === 0) {
    return null
  }

  const currentNews = activeNews[currentIndex]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  return (
    <div className="bg-blue-50 border-b border-blue-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge 
              variant="outline" 
              className={`text-xs ${getPriorityColor(currentNews.priority)}`}
            >
              {currentNews.priority.toUpperCase()}
            </Badge>
            <span className="text-sm text-gray-700 font-medium">
              {currentNews.text}
            </span>
            {usingFallback && (
              <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                DEMO
              </Badge>
            )}
          </div>
          <div className="flex space-x-1">
            {activeNews.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
