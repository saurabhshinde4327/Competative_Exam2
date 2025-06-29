import { Navbar } from "@/components/navbar"
import { ImageSlider } from "@/components/image-slider"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Trophy, Newspaper } from "lucide-react"

// Static fallback data
const staticNotices = [
  {
    id: 1,
    title: "New Batch Starting Soon",
    content: "UPSC CSE 2025 batch starting from January 15th. Limited seats available.",
    date: "2024-01-10",
    type: "notice",
  },
  {
    id: 2,
    title: "Scholarship Program",
    content: "50% scholarship for economically weaker sections. Apply before January 20th.",
    date: "2024-01-08",
    type: "notice",
  },
]

const staticAchievements = [
  {
    id: 1,
    title: "AIR 1 in UPSC CSE 2023",
    content: "Congratulations to Priya Sharma for securing All India Rank 1 in UPSC CSE 2023.",
    date: "2024-01-05",
    type: "achievement",
  },
  {
    id: 2,
    title: "100% Success Rate",
    content: "Our SSC CGL batch achieved 100% success rate with 50+ selections.",
    date: "2024-01-03",
    type: "achievement",
  },
]

const staticUpdates = [
  {
    id: 1,
    title: "New Study Material",
    content: "Updated study material for UPSC Prelims 2025 is now available in the library.",
    date: "2024-01-12",
    type: "update",
  },
  {
    id: 2,
    title: "Mock Test Series",
    content: "Weekly mock test series for all competitive exams starting from next week.",
    date: "2024-01-10",
    type: "update",
  },
]

const staticSuccessStories = [
  {
    id: 1,
    name: "Priya Sharma",
    exam: "UPSC CSE 2023",
    rank: "AIR 1",
    image: "/placeholder.svg?height=200&width=200",
    story: "With dedicated preparation and excellent guidance from the faculty, I was able to achieve my dream of becoming an IAS officer.",
    date: "2024-01-05",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    exam: "SSC CGL 2023",
    rank: "AIR 15",
    image: "/placeholder.svg?height=200&width=200",
    story: "The comprehensive study material and regular doubt clearing sessions helped me crack SSC CGL with a good rank.",
    date: "2024-01-03",
  },
  {
    id: 3,
    name: "Anjali Patel",
    exam: "Bank PO 2023",
    rank: "Selected in SBI",
    image: "/placeholder.svg?height=200&width=200",
    story: "The banking preparation course was well-structured and covered all aspects of the exam.",
    date: "2024-01-01",
  },
]

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <Navbar />
      <main>
        {/* Hero Section with Image Slider */}
        <section className="relative">
          <ImageSlider />
        </section>

        {/* Notice, Achievements, Updates Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Latest Updates</h2>
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
                  {staticNotices.map((notice) => (
                    <div key={notice.id} className="border-b pb-3 last:border-b-0">
                      <h4 className="font-semibold text-sm mb-1">{notice.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
                      <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {new Date(notice.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
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
                  {staticAchievements.map((achievement) => (
                    <div key={achievement.id} className="border-b pb-3 last:border-b-0">
                      <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.content}</p>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        {new Date(achievement.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
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
                  {staticUpdates.map((update) => (
                    <div key={update.id} className="border-b pb-3 last:border-b-0">
                      <h4 className="font-semibold text-sm mb-1">{update.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{update.content}</p>
                      <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                        {new Date(update.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {staticSuccessStories.map((story) => (
                <Card key={story.id} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Photo</span>
                      </div>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 