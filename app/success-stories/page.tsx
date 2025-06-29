import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SuccessStories } from "@/components/success-stories"

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <Navbar />
      <main className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Success Stories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read inspiring stories from our successful students who achieved their dreams with our guidance and
              support.
            </p>
          </div>
          <SuccessStories showAll={true} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
