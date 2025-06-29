"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StudentInfoForm } from "@/components/student-info-form"
import { QuizComponent } from "@/components/quiz-component"
import { QuizResultComponent } from "@/components/quiz-result"

export interface StudentInfo {
  name: string
  department: string
  contactNo: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizResult {
  studentInfo: StudentInfo
  score: number
  totalQuestions: number
  answers: number[]
  completedAt: string
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState<"info" | "quiz" | "result">("info")
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const handleStudentInfoSubmit = (info: StudentInfo) => {
    setStudentInfo(info)
    setCurrentStep("quiz")
  }

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result)
    setCurrentStep("result")
  }

  const handleRetakeQuiz = () => {
    setCurrentStep("info")
    setStudentInfo(null)
    setQuizResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <Navbar />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {currentStep === "info" && <StudentInfoForm onSubmit={handleStudentInfoSubmit} />}
          {currentStep === "quiz" && studentInfo && (
            <QuizComponent studentInfo={studentInfo} onComplete={handleQuizComplete} />
          )}
          {currentStep === "result" && quizResult && (
            <QuizResultComponent result={quizResult} onRetake={handleRetakeQuiz} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
