"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, User, Building, Phone } from "lucide-react"
import type { StudentInfo } from "@/app/quiz/page"

interface StudentInfoFormProps {
  onSubmit: (info: StudentInfo) => void
}

export function StudentInfoForm({ onSubmit }: StudentInfoFormProps) {
  const [formData, setFormData] = useState<StudentInfo>({
    name: "",
    department: "",
    contactNo: "",
  })

  const [errors, setErrors] = useState<Partial<StudentInfo>>({})

  const validateForm = () => {
    const newErrors: Partial<StudentInfo> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required"
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required"
    } else if (!/^\d{10}$/.test(formData.contactNo.replace(/\D/g, ""))) {
      newErrors.contactNo = "Please enter a valid 10-digit contact number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof StudentInfo, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <BookOpen className="h-16 w-16 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Examination</h1>
        <p className="text-lg text-gray-600">
          Test your knowledge with our comprehensive quiz. Please fill in your details to begin.
        </p>
      </div>

      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
          <CardTitle className="text-2xl text-center">Student Information</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 text-lg font-medium mb-2">
                <User className="h-5 w-5 text-red-600" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className={`text-lg p-3 focus:ring-red-500 focus:border-red-500 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="department" className="flex items-center gap-2 text-lg font-medium mb-2">
                <Building className="h-5 w-5 text-red-600" />
                Department/Course
              </Label>
              <Input
                id="department"
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                placeholder="e.g., Computer Science, UPSC Preparation"
                className={`text-lg p-3 focus:ring-red-500 focus:border-red-500 ${errors.department ? "border-red-500" : ""}`}
              />
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            <div>
              <Label htmlFor="contactNo" className="flex items-center gap-2 text-lg font-medium mb-2">
                <Phone className="h-5 w-5 text-red-600" />
                Contact Number
              </Label>
              <Input
                id="contactNo"
                type="tel"
                value={formData.contactNo}
                onChange={(e) => handleInputChange("contactNo", e.target.value)}
                placeholder="Enter your 10-digit mobile number"
                className={`text-lg p-3 focus:ring-red-500 focus:border-red-500 ${errors.contactNo ? "border-red-500" : ""}`}
              />
              {errors.contactNo && <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>}
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Quiz Instructions:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• The quiz contains 20 multiple-choice questions</li>
                <li>• Each question has 4 options with only one correct answer</li>
                <li>• You cannot go back to previous questions</li>
                <li>• Your results will be displayed immediately after completion</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-3 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600"
            >
              Start Quiz Examination
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
