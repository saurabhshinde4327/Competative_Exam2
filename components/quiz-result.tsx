"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Target, RotateCcw, Download } from "lucide-react"
import type { QuizResult as QuizResultType } from "@/app/quiz/page"

interface QuizResultProps {
  result: QuizResultType
  onRetake: () => void
}

export function QuizResultComponent({ result, onRetake }: QuizResultProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100)

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: "A+", color: "bg-green-600", message: "Outstanding!" }
    if (percentage >= 80) return { grade: "A", color: "bg-green-500", message: "Excellent!" }
    if (percentage >= 70) return { grade: "B+", color: "bg-orange-500", message: "Very Good!" }
    if (percentage >= 60) return { grade: "B", color: "bg-orange-400", message: "Good!" }
    if (percentage >= 50) return { grade: "C", color: "bg-yellow-500", message: "Average" }
    return { grade: "F", color: "bg-red-500", message: "Needs Improvement" }
  }

  const gradeInfo = getGrade(percentage)

  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download a PDF certificate
    alert("Certificate download feature will be implemented with PDF generation")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Trophy className="h-16 w-16 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Completed!</h1>
        <p className="text-lg text-gray-600">Congratulations on completing the quiz examination.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Student Information */}
        <Card className="border-2 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Name:</span> {result.studentInfo.name}
              </div>
              <div>
                <span className="font-semibold">Department:</span> {result.studentInfo.department}
              </div>
              <div>
                <span className="font-semibold">Contact:</span> {result.studentInfo.contactNo}
              </div>
              <div>
                <span className="font-semibold">Completed At:</span> {new Date(result.completedAt).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Summary */}
        <Card className="border-2 border-red-200">
          <CardHeader className={`${gradeInfo.color} text-white`}>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 mb-2">{percentage}%</div>
              <Badge className={`${gradeInfo.color} text-white text-lg px-4 py-2 mb-4`}>Grade: {gradeInfo.grade}</Badge>
              <p className="text-xl font-semibold text-gray-700 mb-4">{gradeInfo.message}</p>
              <div className="flex justify-center gap-8 text-sm text-gray-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{result.score}</div>
                  <div>Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{result.totalQuestions - result.score}</div>
                  <div>Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{result.totalQuestions}</div>
                  <div>Total</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analysis */}
      <Card className="mb-8 border-2 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-red-600" />
            Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{result.score}</div>
              <div className="text-sm text-gray-600">Questions Answered Correctly</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <Target className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{percentage}%</div>
              <div className="text-sm text-gray-600">Overall Accuracy</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{gradeInfo.grade}</div>
              <div className="text-sm text-gray-600">Final Grade</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRetake}
          variant="outline"
          className="px-8 py-3 text-lg border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Retake Quiz
        </Button>
        <Button
          onClick={handleDownloadCertificate}
          className="px-8 py-3 text-lg bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Certificate
        </Button>
      </div>

      {/* Motivational Message */}
      <Card className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Keep Learning!</h3>
          <p className="text-gray-600">
            {percentage >= 80
              ? "Excellent work! You have a strong understanding of the subject matter."
              : percentage >= 60
                ? "Good effort! Consider reviewing the topics you missed and try again."
                : "Don't give up! Practice makes perfect. Review the material and retake the quiz."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
