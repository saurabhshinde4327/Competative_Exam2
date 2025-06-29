"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Trash2,
  Plus,
  Eye,
  Menu,
  Bell,
  Trophy,
  Newspaper,
  Users,
  BookOpen,
  ImageIcon,
  HelpCircle,
  Megaphone,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { ExamLogosAdmin } from "@/components/exam-logos-admin"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  date: string
}

interface StudentResult {
  studentInfo: {
    name: string
    department: string
    contactNo: string
  }
  score: number
  totalQuestions: number
  answers: number[]
  completedAt: string
}

const adminSections = [
  { id: "notices", name: "Notices", icon: Bell, color: "purple", count: 2 },
  { id: "achievements", name: "Achievements", icon: Trophy, color: "green", count: 2 },
  { id: "updates", name: "Updates", icon: Newspaper, color: "blue", count: 2 },
  { id: "stories", name: "Success Stories", icon: Users, color: "indigo", count: 5 },
  { id: "exams", name: "Exam Logos", icon: ImageIcon, color: "cyan", count: 6 },
  { id: "quiz", name: "Quiz Questions", icon: HelpCircle, color: "orange", count: 20 },
  { id: "results", name: "Student Results", icon: BookOpen, color: "pink", count: 0 },
  { id: "news", name: "Important News", icon: Megaphone, color: "red", count: 6 },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "New Batch Starting Soon",
      content: "UPSC CSE 2025 batch starting from January 15th.",
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "Scholarship Program",
      content: "50% scholarship for economically weaker sections.",
      date: "2024-01-08",
    },
  ])
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "AIR 1 in UPSC CSE 2023",
      content: "Congratulations to Priya Sharma for securing All India Rank 1.",
      date: "2024-01-05",
    },
    { id: 2, title: "100% Success Rate", content: "Our SSC CGL batch achieved 100% success rate.", date: "2024-01-03" },
  ])
  const [updates, setUpdates] = useState([
    {
      id: 1,
      title: "New Study Material",
      content: "Updated study material for UPSC Prelims 2025 is now available.",
      date: "2024-01-12",
    },
    {
      id: 2,
      title: "Mock Test Series",
      content: "Weekly mock test series for all competitive exams starting.",
      date: "2024-01-10",
    },
  ])

  const [successStories, setSuccessStories] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      exam: "UPSC CSE 2023",
      rank: "AIR 1",
      image: "/placeholder.svg?height=200&width=200",
      story:
        "With dedicated preparation and excellent guidance from the faculty, I was able to achieve my dream of becoming an IAS officer. The mock tests and personalized feedback were instrumental in my success.",
      date: "2024-01-05",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      exam: "SSC CGL 2023",
      rank: "AIR 15",
      image: "/placeholder.svg?height=200&width=200",
      story:
        "The comprehensive study material and regular doubt clearing sessions helped me crack SSC CGL with a good rank. The faculty's support throughout the journey was exceptional.",
      date: "2024-01-03",
    },
    {
      id: 3,
      name: "Anjali Patel",
      exam: "Bank PO 2023",
      rank: "Selected in SBI",
      image: "/placeholder.svg?height=200&width=200",
      story:
        "The banking preparation course was well-structured and covered all aspects of the exam. The interview preparation sessions gave me the confidence to face the final round successfully.",
      date: "2024-01-01",
    },
  ])

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      correctAnswer: 1,
      date: "2024-01-01",
    },
    {
      id: 2,
      question: "Who is known as the Father of the Nation in India?",
      options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"],
      correctAnswer: 1,
      date: "2024-01-01",
    },
  ])

  const [studentResults, setStudentResults] = useState<StudentResult[]>([])

  const [newItem, setNewItem] = useState({ title: "", content: "" })
  const [newStory, setNewStory] = useState({
    name: "",
    exam: "",
    rank: "",
    story: "",
    image: "/placeholder.svg?height=200&width=200",
  })
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  })

  const [importantNews, setImportantNews] = useState([
    "🎉 New UPSC CSE 2025 batch starting from February 1st - Limited seats available!",
    "📢 50% scholarship program for economically weaker sections - Apply before January 31st",
    "🏆 Congratulations! Our students secured AIR 1, 3, and 7 in UPSC CSE 2024",
    "📚 Free mock test series for all competitive exams - Register now!",
    "⭐ 95% success rate achieved in SSC CGL 2024 - Join our winning team",
    "🎯 Special weekend batches for working professionals now available",
  ])

  const [newNewsItem, setNewNewsItem] = useState("")

  // Load student results from localStorage on component mount
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("quizResults") || "[]")
    setStudentResults(results)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === "root" && credentials.password === "Saurabh@2000") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials!")
    }
  }

  const addItem = (type: string) => {
    if (!newItem.title || !newItem.content) return

    const item = {
      id: Date.now(),
      title: newItem.title,
      content: newItem.content,
      date: new Date().toISOString().split("T")[0],
    }

    if (type === "notices") {
      setNotices([...notices, item])
    } else if (type === "achievements") {
      setAchievements([...achievements, item])
    } else if (type === "updates") {
      setUpdates([...updates, item])
    }

    setNewItem({ title: "", content: "" })
  }

  const addSuccessStory = () => {
    if (!newStory.name || !newStory.exam || !newStory.rank || !newStory.story) return

    const story = {
      id: Date.now(),
      name: newStory.name,
      exam: newStory.exam,
      rank: newStory.rank,
      story: newStory.story,
      image: newStory.image,
      date: new Date().toISOString().split("T")[0],
    }

    setSuccessStories([story, ...successStories])
    setNewStory({
      name: "",
      exam: "",
      rank: "",
      story: "",
      image: "/placeholder.svg?height=200&width=200",
    })
  }

  const addQuizQuestion = () => {
    if (!newQuestion.question || newQuestion.options.some((opt) => !opt.trim())) return

    const question: QuizQuestion = {
      id: Date.now(),
      question: newQuestion.question,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer,
      date: new Date().toISOString().split("T")[0],
    }

    setQuizQuestions([...quizQuestions, question])
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    })
  }

  const deleteItem = (type: string, id: number) => {
    if (type === "notices") {
      setNotices(notices.filter((item) => item.id !== id))
    } else if (type === "achievements") {
      setAchievements(achievements.filter((item) => item.id !== id))
    } else if (type === "updates") {
      setUpdates(updates.filter((item) => item.id !== id))
    } else if (type === "stories") {
      setSuccessStories(successStories.filter((item) => item.id !== id))
    } else if (type === "questions") {
      setQuizQuestions(quizQuestions.filter((item) => item.id !== id))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewStory({ ...newStory, image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleQuestionOptionChange = (index: number, value: string) => {
    const newOptions = [...newQuestion.options]
    newOptions[index] = value
    setNewQuestion({ ...newQuestion, options: newOptions })
  }

  const addNewsItem = () => {
    if (!newNewsItem.trim()) return
    setImportantNews([...importantNews, newNewsItem])
    setNewNewsItem("")
  }

  const deleteNewsItem = (index: number) => {
    setImportantNews(importantNews.filter((_, i) => i !== index))
  }

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-500 text-white",
      green: "bg-green-500 text-white",
      blue: "bg-blue-500 text-white",
      indigo: "bg-indigo-500 text-white",
      cyan: "bg-cyan-500 text-white",
      orange: "bg-orange-500 text-white",
      pink: "bg-pink-500 text-white",
      red: "bg-red-500 text-white",
    }
    return colors[color as keyof typeof colors] || "bg-gray-500 text-white"
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500">Management Dashboard</p>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-4">
        <button
          onClick={() => {
            setActiveSection("dashboard")
            setIsMobileMenuOpen(false)
          }}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
            activeSection === "dashboard"
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Dashboard</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 pb-4">
        <div className="space-y-2">
          {adminSections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  activeSection === section.id ? `${getColorClasses(section.color)}` : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {section.count}
                  </Badge>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={() => setIsAuthenticated(false)}
          variant="outline"
          className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <Navbar />
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-md">
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white text-center rounded-t-lg">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <p className="text-red-100">Access the management dashboard</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="username" className="text-gray-700 font-medium">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="mt-2 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="mt-2 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-lg font-medium"
                  >
                    Sign In to Dashboard
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <Button onClick={() => setIsAuthenticated(false)} variant="ghost" size="sm" className="text-red-600">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 h-screen sticky top-0">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                  <p className="text-gray-600 mt-2">Manage your competitive exam department</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {adminSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <Card
                      key={section.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{section.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{section.count}</p>
                          </div>
                          <div className={`p-3 rounded-lg ${getColorClasses(section.color)}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                      <Trophy className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-medium">New Achievement Added</p>
                        <p className="text-sm text-gray-600">100% Success Rate achievement was added</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                      <Newspaper className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">Update Published</p>
                        <p className="text-sm text-gray-600">Mock Test Series update was published</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                      <Bell className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="font-medium">Notice Posted</p>
                        <p className="text-sm text-gray-600">New batch notice was posted</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Content sections remain the same but with better mobile styling */}
          {activeSection === "notices" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Bell className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Notices</h1>
              </div>

              <Card>
                <CardHeader className="bg-purple-50 border-b">
                  <CardTitle className="text-purple-800">Add New Notice</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <div>
                    <Label htmlFor="notice-title">Title</Label>
                    <Input
                      id="notice-title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Enter notice title"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notice-content">Content</Label>
                    <Textarea
                      id="notice-content"
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                      placeholder="Enter notice content"
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={() => addItem("notices")}
                    className="w-full lg:w-auto bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Notice
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Notices</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <div
                        key={notice.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg bg-purple-50"
                      >
                        <div className="flex-1 mb-3 lg:mb-0">
                          <h3 className="font-semibold text-purple-800">{notice.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                          <Badge variant="outline" className="mt-2 border-purple-200 text-purple-700">
                            {notice.date}
                          </Badge>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteItem("notices", notice.id)}
                          className="w-full lg:w-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-2 lg:mr-0" />
                          <span className="lg:hidden">Delete</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "achievements" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Achievements</h1>
              </div>

              <Card>
                <CardHeader className="bg-green-50 border-b">
                  <CardTitle className="text-green-800">Add New Achievement</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <div>
                    <Label htmlFor="achievement-title">Title</Label>
                    <Input
                      id="achievement-title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Enter achievement title"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="achievement-content">Content</Label>
                    <Textarea
                      id="achievement-content"
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                      placeholder="Enter achievement content"
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={() => addItem("achievements")}
                    className="w-full lg:w-auto bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Achievements</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg bg-green-50"
                      >
                        <div className="flex-1 mb-3 lg:mb-0">
                          <h3 className="font-semibold text-green-800">{achievement.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{achievement.content}</p>
                          <Badge variant="outline" className="mt-2 border-green-200 text-green-700">
                            {achievement.date}
                          </Badge>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteItem("achievements", achievement.id)}
                          className="w-full lg:w-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-2 lg:mr-0" />
                          <span className="lg:hidden">Delete</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "updates" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Newspaper className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Updates</h1>
              </div>

              <Card>
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="text-blue-800">Add New Update</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <div>
                    <Label htmlFor="update-title">Title</Label>
                    <Input
                      id="update-title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Enter update title"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="update-content">Content</Label>
                    <Textarea
                      id="update-content"
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                      placeholder="Enter update content"
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <Button onClick={() => addItem("updates")} className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Update
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Updates</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <div
                        key={update.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg bg-blue-50"
                      >
                        <div className="flex-1 mb-3 lg:mb-0">
                          <h3 className="font-semibold text-blue-800">{update.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{update.content}</p>
                          <Badge variant="outline" className="mt-2 border-blue-200 text-blue-700">
                            {update.date}
                          </Badge>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteItem("updates", update.id)}
                          className="w-full lg:w-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-2 lg:mr-0" />
                          <span className="lg:hidden">Delete</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "stories" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Success Stories</h1>
              </div>

              <Card>
                <CardHeader className="bg-indigo-50 border-b">
                  <CardTitle className="text-indigo-800">Add New Success Story</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="story-name">Student Name</Label>
                      <Input
                        id="story-name"
                        value={newStory.name}
                        onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
                        placeholder="Enter student name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="story-exam">Exam</Label>
                      <Input
                        id="story-exam"
                        value={newStory.exam}
                        onChange={(e) => setNewStory({ ...newStory, exam: e.target.value })}
                        placeholder="e.g., UPSC CSE 2023"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="story-rank">Rank/Achievement</Label>
                    <Input
                      id="story-rank"
                      value={newStory.rank}
                      onChange={(e) => setNewStory({ ...newStory, rank: e.target.value })}
                      placeholder="e.g., AIR 1, Selected in SBI"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-image">Student Image</Label>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-2">
                      <Input
                        id="story-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1"
                      />
                      <div className="w-16 h-16 rounded-full overflow-hidden border">
                        <Image
                          src={newStory.image || "/placeholder.svg"}
                          alt="Preview"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="story-content">Success Story</Label>
                    <Textarea
                      id="story-content"
                      value={newStory.story}
                      onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                      placeholder="Enter the student's success story"
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={addSuccessStory} className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Success Story
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Success Stories</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {successStories.map((story) => (
                      <div
                        key={story.id}
                        className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border rounded-lg bg-indigo-50"
                      >
                        <div className="flex flex-col lg:flex-row gap-4 flex-1 mb-3 lg:mb-0">
                          <Image
                            src={story.image || "/placeholder.svg"}
                            alt={story.name}
                            width={60}
                            height={60}
                            className="rounded-full object-cover self-center lg:self-start"
                          />
                          <div className="flex-1 text-center lg:text-left">
                            <h3 className="font-semibold text-indigo-800">{story.name}</h3>
                            <p className="text-sm text-indigo-600">
                              {story.exam} - {story.rank}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{story.story}</p>
                            <Badge variant="outline" className="mt-2 border-indigo-200 text-indigo-700">
                              {story.date}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteItem("stories", story.id)}
                          className="w-full lg:w-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-2 lg:mr-0" />
                          <span className="lg:hidden">Delete</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "exams" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-8 w-8 text-cyan-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Exam Logos</h1>
              </div>
              <ExamLogosAdmin />
            </div>
          )}

          {activeSection === "quiz" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-8 w-8 text-orange-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Quiz Questions</h1>
              </div>

              <Card>
                <CardHeader className="bg-orange-50 border-b">
                  <CardTitle className="text-orange-800">Add New Question</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      placeholder="Enter the question"
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {newQuestion.options.map((option, index) => (
                      <div key={index}>
                        <Label htmlFor={`option-${index}`}>Option {String.fromCharCode(65 + index)}</Label>
                        <Input
                          id={`option-${index}`}
                          value={option}
                          onChange={(e) => handleQuestionOptionChange(index, e.target.value)}
                          placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                          className="mt-2"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="correct-answer">Correct Answer</Label>
                    <select
                      id="correct-answer"
                      value={newQuestion.correctAnswer}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, correctAnswer: Number.parseInt(e.target.value) })
                      }
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    >
                      {newQuestion.options.map((_, index) => (
                        <option key={index} value={index}>
                          Option {String.fromCharCode(65 + index)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={addQuizQuestion} className="w-full lg:w-auto bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {quizQuestions.map((question) => (
                      <div key={question.id} className="p-4 border rounded-lg bg-orange-50">
                        <div className="flex flex-col lg:flex-row justify-between items-start mb-2">
                          <h3 className="font-semibold flex-1 mb-2 lg:mb-0 text-orange-800">{question.question}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteItem("questions", question.id)}
                            className="w-full lg:w-auto"
                          >
                            <Trash2 className="h-4 w-4 mr-2 lg:mr-0" />
                            <span className="lg:hidden">Delete</span>
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`p-2 rounded ${
                                index === question.correctAnswer ? "bg-green-100 text-green-800" : "bg-gray-100"
                              }`}
                            >
                              <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                              {index === question.correctAnswer && " ✓"}
                            </div>
                          ))}
                        </div>
                        <Badge variant="outline" className="mt-2 border-orange-200 text-orange-700">
                          {question.date}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "results" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-pink-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Student Quiz Results</h1>
              </div>

              <Card>
                <CardHeader className="bg-pink-50 border-b">
                  <CardTitle className="text-pink-800">Quiz Performance Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {studentResults.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No quiz results available yet.</p>
                        <p className="text-sm">Results will appear here once students complete quizzes.</p>
                      </div>
                    ) : (
                      studentResults.map((result, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-pink-50">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="text-center lg:text-left">
                              <h3 className="font-semibold text-pink-800">{result.studentInfo.name}</h3>
                              <p className="text-sm text-gray-600">{result.studentInfo.department}</p>
                              <p className="text-sm text-gray-600">{result.studentInfo.contactNo}</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-pink-600">
                                {result.score}/{result.totalQuestions}
                              </div>
                              <div className="text-sm text-gray-600">
                                {Math.round((result.score / result.totalQuestions) * 100)}%
                              </div>
                            </div>
                            <div className="text-center lg:text-right">
                              <Badge
                                className={
                                  result.score / result.totalQuestions >= 0.8
                                    ? "bg-green-100 text-green-800"
                                    : result.score / result.totalQuestions >= 0.6
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {result.score / result.totalQuestions >= 0.8
                                  ? "Excellent"
                                  : result.score / result.totalQuestions >= 0.6
                                    ? "Good"
                                    : "Needs Improvement"}
                              </Badge>
                              <p className="text-sm text-gray-600 mt-1">
                                {new Date(result.completedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "news" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Megaphone className="h-8 w-8 text-red-600" />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Important News</h1>
              </div>

              <Card>
                <CardHeader className="bg-red-50 border-b">
                  <CardTitle className="text-red-800">Add News Item</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <div>
                    <Label htmlFor="news-item">News Item</Label>
                    <Textarea
                      id="news-item"
                      value={newNewsItem}
                      onChange={(e) => setNewNewsItem(e.target.value)}
                      placeholder="Enter important news or announcement (use emojis for better visibility)"
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={addNewsItem} className="w-full lg:w-auto bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add News Item
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current News Items</CardTitle>
                </CardHeader>
                <CardContent className="p-4 lg:p-6">
                  <div className="space-y-4">
                    {importantNews.map((news, index) => (
                      <div
                        key={index}
                        className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border rounded-lg bg-red-50"
                      >
                        <div className="flex-1 mb-3 lg:mb-0">
                          <p className="text-sm text-red-800">{news}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteNewsItem(index)}
                          className="w-full lg:w-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-2 lg:mr-0" />
                          <span className="lg:hidden">Delete</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
