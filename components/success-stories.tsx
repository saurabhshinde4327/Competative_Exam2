"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle } from "lucide-react"
import { useSuccessStories } from "@/hooks/use-api"

interface SuccessStoriesProps {
  showAll?: boolean
}

export function SuccessStories({ showAll = false }: SuccessStoriesProps) {
  const { successStories, loading, error, usingFallback } = useSuccessStories()

  // Sort by date (newest first) and limit to 3 for home page
  const sortedStories = [...successStories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const displayStories = showAll ? sortedStories : sortedStories.slice(0, 3)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading success stories...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Fallback Data Warning */}
      {usingFallback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Using Demo Data</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Unable to connect to the backend server. Showing sample data for demonstration.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !usingFallback && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Stories Grid */}
      {displayStories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No success stories available</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {displayStories.map((story) => (
            <Card key={story.id} className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{story.name}</h3>
                  <Badge className="bg-red-100 text-red-800 mt-2">
                    {story.exam} - {story.rank}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{story.story}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
