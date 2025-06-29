"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle } from "lucide-react"
import type { StudentInfo, QuizQuestion, QuizResult } from "@/app/quiz/page"

interface QuizComponentProps {
  studentInfo: StudentInfo
  onComplete: (result: QuizResult) => void
}

// Sample quiz questions - in real app, these would come from admin panel
const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Who is known as the Father of the Nation in India?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Narmada", "Ganga", "Godavari"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "In which year did India gain independence?",
    options: ["1945", "1946", "1947", "1948"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is the currency of India?",
    options: ["Dollar", "Rupee", "Pound", "Euro"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Who wrote the Indian National Anthem?",
    options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Kavi Pradeep"],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: "Which is the smallest state in India by area?",
    options: ["Sikkim", "Tripura", "Goa", "Manipur"],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "What is the full form of CPU?",
    options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"],
    correctAnswer: 0,
  },
  {
    id: 10,
    question: "Which gas is most abundant in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: "Who is the current President of India (as of 2024)?",
    options: ["Ram Nath Kovind", "Droupadi Murmu", "Pranab Mukherjee", "A.P.J. Abdul Kalam"],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "Which is the largest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
  },
  {
    id: 13,
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "Which vitamin is produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correctAnswer: 3,
  },
  {
    id: 15,
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Benjamin Franklin"],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "Which is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "What is the speed of light in vacuum?",
    options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁹ m/s"],
    correctAnswer: 0,
  },
  {
    id: 20,
    question: "Which organ in the human body produces insulin?",
    options: ["Liver", "Kidney", "Pancreas", "Heart"],
    correctAnswer: 2,
  },
]

export function QuizComponent({ studentInfo, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(20).fill(-1))
  const [timeRemaining, setTimeRemaining] = useState(1200) // 20 minutes
  const [selectedOption, setSelectedOption] = useState<number>(-1)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleQuizComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = selectedOption
    setSelectedAnswers(newAnswers)

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(selectedAnswers[currentQuestion + 1])
    } else {
      handleQuizComplete(newAnswers)
    }
  }

  const handleQuizComplete = (answers = selectedAnswers) => {
    const finalAnswers = [...answers]
    if (selectedOption !== -1) {
      finalAnswers[currentQuestion] = selectedOption
    }

    const score = finalAnswers.reduce((total, answer, index) => {
      return answer === sampleQuestions[index].correctAnswer ? total + 1 : total
    }, 0)

    const result: QuizResult = {
      studentInfo,
      score,
      totalQuestions: sampleQuestions.length,
      answers: finalAnswers,
      completedAt: new Date().toISOString(),
    }

    // Save to localStorage (in real app, this would be saved to database)
    const existingResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
    existingResults.push(result)
    localStorage.setItem("quizResults", JSON.stringify(existingResults))

    onComplete(result)
  }

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Quiz Examination</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow border-2 border-red-200">
              <Clock className="h-5 w-5 text-red-600" />
              <span className="font-mono text-lg font-semibold text-red-700">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-red-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-red-700">Progress</span>
            <span className="text-sm font-medium text-red-700">
              {currentQuestion + 1} of {sampleQuestions.length}
            </span>
          </div>
          <Progress
            value={progress}
            className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-orange-500"
          />
        </div>
      </div>

      <Card className="shadow-xl border-2 border-red-200">
        <CardHeader className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
          <CardTitle className="text-xl">
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{sampleQuestions[currentQuestion].question}</h2>

            <div className="space-y-4">
              {sampleQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedOption === index
                      ? "border-red-500 bg-red-50 text-red-800"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === index ? "border-red-500 bg-red-500" : "border-gray-300"
                      }`}
                    >
                      {selectedOption === index && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                    <span className="text-lg">
                      <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Student: <strong>{studentInfo.name}</strong> | Department: <strong>{studentInfo.department}</strong>
            </div>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === -1}
              className="px-8 py-3 text-lg bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600"
            >
              {currentQuestion === sampleQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
