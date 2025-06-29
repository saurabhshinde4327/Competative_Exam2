import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Award, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <Navbar />
      <main className="py-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">About Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are dedicated to providing exceptional coaching and guidance for competitive exams, helping thousands
              of students achieve their career goals.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-800">5000+</h3>
                <p className="text-gray-600">Students Trained</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-800">95%</h3>
                <p className="text-gray-600">Success Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-800">500+</h3>
                <p className="text-gray-600">Selections</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <BookOpen className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-800">15+</h3>
                <p className="text-gray-600">Years Experience</p>
              </CardContent>
            </Card>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-red-600">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To provide world-class coaching and mentorship for competitive exams, ensuring every student gets
                  personalized attention and achieves their maximum potential. We believe in transforming dreams into
                  reality through dedication, hard work, and expert guidance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading competitive exam coaching institute in the country, known for our innovative
                  teaching methods, exceptional results, and commitment to student success. We aim to create future
                  leaders who will serve the nation with integrity and excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
