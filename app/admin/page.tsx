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
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
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
  Save,
  AlertCircle,
  WifiOff,
} from "lucide-react"
import Image from "next/image"
import { ExamLogosAdmin } from "@/components/exam-logos-admin"
import { useNotices, useSuccessStories, useNewsTicker, useQuiz } from "@/hooks/use-api"

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
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // API Hooks
  const { notices, loading: noticesLoading, error: noticesError, createNotice, usingFallback: noticesUsingFallback } = useNotices()
  const { successStories, loading: storiesLoading, error: storiesError, createSuccessStory, usingFallback: storiesUsingFallback } = useSuccessStories()
  const { newsTicker, loading: newsLoading, error: newsError, createNewsTicker, usingFallback: newsUsingFallback } = useNewsTicker()
  const { quiz, loading: quizLoading, error: quizError, createQuiz, usingFallback: quizUsingFallback } = useQuiz()

  // Local state for form data
  const [newItem, setNewItem] = useState({ title: "", content: "", type: "notice" as "notice" | "achievement" | "update" })
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
    explanation: "",
    category: "General Knowledge",
  })
  const [newNewsItem, setNewNewsItem] = useState("")

  // Local state for achievements and updates (since they're all notices with different types)
  const achievements = notices.filter(notice => notice.type === 'achievement')
  const updates = notices.filter(notice => notice.type === 'update')
  const regularNotices = notices.filter(notice => notice.type === 'notice')

  // Load student results from localStorage on component mount
  const [studentResults, setStudentResults] = useState<StudentResult[]>([])
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

  const addItem = async (type: string) => {
    if (!newItem.title || !newItem.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const noticeData = {
        title: newItem.title,
        content: newItem.content,
        date: new Date().toISOString().split("T")[0],
        type: newItem.type as "notice" | "achievement" | "update",
      }

      await createNotice(noticeData)
      
      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`,
      })
      
      setNewItem({ title: "", content: "", type: "notice" })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create ${type}. ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addSuccessStory = async () => {
    if (!newStory.name || !newStory.exam || !newStory.rank || !newStory.story) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const storyData = {
        name: newStory.name,
        exam: newStory.exam,
        rank: newStory.rank,
        story: newStory.story,
        image: newStory.image,
        date: new Date().toISOString().split("T")[0],
      }

      await createSuccessStory(storyData)
      
      toast({
        title: "Success",
        description: "Success story created successfully!",
      })
      
      setNewStory({
        name: "",
        exam: "",
        rank: "",
        story: "",
        image: "/placeholder.svg?height=200&width=200",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create success story. ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addQuizQuestion = async () => {
    if (!newQuestion.question || newQuestion.options.some((opt) => !opt.trim())) {
      toast({
        title: "Validation Error",
        description: "Please fill in the question and all options.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const quizData = {
        question: newQuestion.question,
        options: newQuestion.options,
        correctAnswer: newQuestion.correctAnswer,
        explanation: newQuestion.explanation,
        category: newQuestion.category,
      }

      await createQuiz(quizData)
      
      toast({
        title: "Success",
        description: "Quiz question created successfully!",
      })
      
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
        category: "General Knowledge",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create quiz question. ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addNewsItem = async () => {
    if (!newNewsItem.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a news item.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const newsData = {
        text: newNewsItem,
        priority: "medium" as const,
        active: true,
      }

      await createNewsTicker(newsData)
      
      toast({
        title: "Success",
        description: "News item created successfully!",
      })
      
      setNewNewsItem("")
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create news item. ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteItem = (type: string, id: number) => {
    // For now, we'll just show a message since we haven't implemented delete API endpoints
    toast({
      title: "Not Implemented",
      description: "Delete functionality will be implemented when backend supports it.",
      variant: "destructive",
    })
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

  const deleteNewsItem = (index: number) => {
    // For now, we'll just show a message since we haven't implemented delete API endpoints
    toast({
      title: "Not Implemented",
      description: "Delete functionality will be implemented when backend supports it.",
      variant: "destructive",
    })
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

  // Update section counts based on actual data
  const updatedAdminSections = adminSections.map(section => {
    switch (section.id) {
      case "notices":
        return { ...section, count: regularNotices.length }
      case "achievements":
        return { ...section, count: achievements.length }
      case "updates":
        return { ...section, count: updates.length }
      case "stories":
        return { ...section, count: successStories.length }
      case "quiz":
        return { ...section, count: quiz.length }
      case "news":
        return { ...section, count: newsTicker.length }
      case "results":
        return { ...section, count: studentResults.length }
      default:
        return section
    }
  })

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
          {updatedAdminSections.map((section) => {
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
      
      {/* Backend Status Warning */}
      {(noticesUsingFallback || storiesUsingFallback || newsUsingFallback || quizUsingFallback) && (
        <div className="bg-yellow-50 border-b border-yellow-200 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <WifiOff className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800 font-medium">
                Backend API is currently unavailable. Admin panel is running in demo mode.
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Admin Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block w-80">
              <Card className="h-fit sticky top-8">
                <SidebarContent />
              </Card>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden fixed top-20 left-4 z-50">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeSection === "dashboard" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Settings className="h-8 w-8 text-gray-600" />
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {updatedAdminSections.map((section) => {
                      const Icon = section.icon
                      return (
                        <Card key={section.id} className="text-center">
                          <CardContent className="p-4">
                            <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${getColorClasses(section.color)}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-gray-800">{section.name}</h3>
                            <p className="text-2xl font-bold text-gray-600">{section.count}</p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <Button
                          onClick={() => setActiveSection("notices")}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Notice
                        </Button>
                        <Button
                          onClick={() => setActiveSection("stories")}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Success Story
                        </Button>
                        <Button
                          onClick={() => setActiveSection("quiz")}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Quiz Question
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

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
                        <Label htmlFor="notice-type">Notice Type</Label>
                        <select
                          id="notice-type"
                          value={newItem.type}
                          onChange={(e) => setNewItem({ ...newItem, type: e.target.value as "notice" | "achievement" | "update" })}
                          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="notice">Notice</option>
                          <option value="achievement">Achievement</option>
                          <option value="update">Update</option>
                        </select>
                      </div>
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
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                      <Button 
                        onClick={() => addItem("notices")} 
                        className="w-full lg:w-auto bg-purple-600 hover:bg-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Save className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Notice
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Notices</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {regularNotices.map((notice) => (
                          <div
                            key={notice.id}
                            className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border rounded-lg bg-purple-50"
                          >
                            <div className="flex-1 mb-3 lg:mb-0">
                              <h3 className="font-semibold text-purple-800 mb-1">{notice.title}</h3>
                              <p className="text-sm text-gray-700 mb-2">{notice.content}</p>
                              <Badge variant="outline" className="border-purple-200 text-purple-700">
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
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                      <Button 
                        onClick={() => addItem("achievements")} 
                        className="w-full lg:w-auto bg-green-600 hover:bg-green-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Save className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Achievement
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Achievements</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border rounded-lg bg-green-50"
                          >
                            <div className="flex-1 mb-3 lg:mb-0">
                              <h3 className="font-semibold text-green-800 mb-1">{achievement.title}</h3>
                              <p className="text-sm text-gray-700 mb-2">{achievement.content}</p>
                              <Badge variant="outline" className="border-green-200 text-green-700">
                                {achievement.date}
                              </Badge>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteItem("notices", achievement.id)}
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
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                      <Button 
                        onClick={() => addItem("updates")} 
                        className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Save className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Update
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Updates</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {updates.map((update) => (
                          <div
                            key={update.id}
                            className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border rounded-lg bg-blue-50"
                          >
                            <div className="flex-1 mb-3 lg:mb-0">
                              <h3 className="font-semibold text-blue-800 mb-1">{update.title}</h3>
                              <p className="text-sm text-gray-700 mb-2">{update.content}</p>
                              <Badge variant="outline" className="border-blue-200 text-blue-700">
                                {update.date}
                              </Badge>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteItem("notices", update.id)}
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
                        <Label htmlFor="story-content">Success Story</Label>
                        <Textarea
                          id="story-content"
                          value={newStory.story}
                          onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                          placeholder="Share the success story and experience"
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="story-image">Profile Image</Label>
                        <Input
                          id="story-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="mt-2"
                        />
                      </div>
                      <Button 
                        onClick={addSuccessStory} 
                        className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Save className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Success Story
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Success Stories</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {successStories.map((story) => (
                          <div
                            key={story.id}
                            className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border rounded-lg bg-indigo-50"
                          >
                            <div className="flex-1 mb-3 lg:mb-0">
                              <div className="flex items-center gap-3 mb-2">
                                <Image
                                  src={story.image}
                                  alt={story.name}
                                  width={50}
                                  height={50}
                                  className="rounded-full"
                                />
                                <div>
                                  <h3 className="font-semibold text-indigo-800">{story.name}</h3>
                                  <p className="text-sm text-gray-600">{story.exam} - {story.rank}</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{story.story}</p>
                              <Badge variant="outline" className="border-indigo-200 text-indigo-700">
                                {story.date}
                              </Badge>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteItem("notices", story.id)}
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

              {activeSection === "exams" && <ExamLogosAdmin />}

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
                        <Label htmlFor="question-text">Question</Label>
                        <Textarea
                          id="question-text"
                          value={newQuestion.question}
                          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                          placeholder="Enter the question"
                          rows={3}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="question-category">Category</Label>
                        <Input
                          id="question-category"
                          value={newQuestion.category}
                          onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                          placeholder="e.g., General Knowledge, History"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Options</Label>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
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
                      <div>
                        <Label htmlFor="question-explanation">Explanation (Optional)</Label>
                        <Textarea
                          id="question-explanation"
                          value={newQuestion.explanation}
                          onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                          placeholder="Explain why this is the correct answer"
                          rows={2}
                          className="mt-2"
                        />
                      </div>
                      <Button 
                        onClick={addQuizQuestion} 
                        className="w-full lg:w-auto bg-orange-600 hover:bg-orange-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Save className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Question
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Existing Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {quiz.map((question) => (
                          <div key={question.id} className="p-4 border rounded-lg bg-orange-50">
                            <div className="flex flex-col lg:flex-row justify-between items-start mb-2">
                              <h3 className="font-semibold flex-1 mb-2 lg:mb-0 text-orange-800">{question.question}</h3>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteItem("notices", question.id)}
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
                            {question.explanation && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                                <strong>Explanation:</strong> {question.explanation}
                              </div>
                            )}
                            <Badge variant="outline" className="mt-2 border-orange-200 text-orange-700">
                              {question.category}
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
                      <Button 
                        onClick={addNewsItem} 
                        className="w-full lg:w-auto bg-red-600 hover:bg-red-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Save className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add News Item
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current News Items</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {newsTicker.map((news, index) => (
                          <div
                            key={news.id}
                            className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border rounded-lg bg-red-50"
                          >
                            <div className="flex-1 mb-3 lg:mb-0">
                              <p className="text-sm text-red-800">{news.text}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {news.priority.toUpperCase()}
                                </Badge>
                                <Badge variant={news.active ? "default" : "secondary"} className="text-xs">
                                  {news.active ? "ACTIVE" : "INACTIVE"}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteItem("news", news.id)}
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
        )}
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}
