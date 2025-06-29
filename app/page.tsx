"use client"

import { Navbar } from "@/components/navbar"
import { ImageSlider } from "@/components/image-slider"
import { NoticeSection } from "@/components/notice-section"
import { SuccessStories } from "@/components/success-stories"
import { Footer } from "@/components/footer"
import { NewsTicker } from "@/components/news-ticker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Wifi, WifiOff } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <Navbar />
      <NewsTicker />
      
      {/* Backend Status Warning */}
      <div className="bg-yellow-50 border-b border-yellow-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <WifiOff className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800 font-medium">
              Backend API is currently unavailable. Showing demo data.
            </span>
          </div>
        </div>
      </div>

      <main>
        {/* Hero Section with Image Slider */}
        <section className="relative">
          <ImageSlider />
        </section>

        {/* Notice, Achievements, Updates Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Latest Updates</h2>
            <NoticeSection />
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
            <SuccessStories />
          </div>
        </section>

        {/* Backend Status Card */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="h-5 w-5" />
                  Backend Connection Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <WifiOff className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-700">
                      Backend server at http://91.108.105.168:3007/ is not responding properly
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    The application is currently running in demo mode with sample data. 
                    All features are functional but using static content instead of live data from the backend.
                  </p>
                  <div className="flex gap-2">
                    <a 
                      href="/simple" 
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      View Static Version
                    </a>
                    <a 
                      href="/api-test" 
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Test API Connection
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
