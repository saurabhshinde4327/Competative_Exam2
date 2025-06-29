import Link from "next/link"
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-red-400" />
              <span className="text-xl font-bold">Competitive Exam Dept.</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students to achieve their dreams through quality education and expert guidance.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-400 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">
                  Quiz Exam
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-400 text-sm">123 Education Street, Learning City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-400 text-sm">info@competitiveexam.edu</span>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Find Us</h3>
            <div className="bg-gray-800 rounded-lg p-4 h-32 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Interactive Map</p>
                <p className="text-xs text-gray-500">Click to view location</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Competitive Exam Department. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
