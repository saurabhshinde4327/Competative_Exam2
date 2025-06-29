import { Navbar } from "@/components/navbar"
import { ImageSlider } from "@/components/image-slider"
import { NoticeSection } from "@/components/notice-section"
import { SuccessStories } from "@/components/success-stories"
import { Footer } from "@/components/footer"
import { NewsTicker } from "@/components/news-ticker"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <Navbar />
      <NewsTicker />
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
      </main>
      <Footer />
    </div>
  )
}
