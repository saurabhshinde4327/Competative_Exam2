"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Trophy, Newspaper, Loader2, AlertCircle } from "lucide-react"
import { useNotices } from "@/hooks/use-api"

export function NoticeSection() {
  const { notices, loading, error, usingFallback } = useNotices()

  // Filter notices by type
  const noticeItems = notices.filter(item => item.type === 'notice')
  const achievementItems = notices.filter(item => item.type === 'achievement')
  const updateItems = notices.filter(item => item.type === 'update')

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading notices...</span>
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

      {/* Notices Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Notices - Purple Theme */}
        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Bell className="h-5 w-5" />
              Notices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto">
            {noticeItems.length > 0 ? (
              noticeItems.map((notice) => (
                <div key={notice.id} className="border-b pb-3 last:border-b-0">
                  <h4 className="font-semibold text-sm mb-1">{notice.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                    {new Date(notice.date).toLocaleDateString()}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No notices available</p>
            )}
          </CardContent>
        </Card>

        {/* Achievements - Green Theme */}
        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto">
            {achievementItems.length > 0 ? (
              achievementItems.map((achievement) => (
                <div key={achievement.id} className="border-b pb-3 last:border-b-0">
                  <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{achievement.content}</p>
                  <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                    {new Date(achievement.date).toLocaleDateString()}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No achievements available</p>
            )}
          </CardContent>
        </Card>

        {/* Updates - Blue Theme */}
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Newspaper className="h-5 w-5" />
              Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto">
            {updateItems.length > 0 ? (
              updateItems.map((update) => (
                <div key={update.id} className="border-b pb-3 last:border-b-0">
                  <h4 className="font-semibold text-sm mb-1">{update.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{update.content}</p>
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                    {new Date(update.date).toLocaleDateString()}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No updates available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
