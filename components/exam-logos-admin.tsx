"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus } from "lucide-react"

interface ExamLogo {
  id: number
  name: string
  fullName: string
  logo: string
  date: string
}

export function ExamLogosAdmin() {
  const [examLogos, setExamLogos] = useState<ExamLogo[]>([
    {
      id: 1,
      name: "UPSC",
      fullName: "Union Public Service Commission",
      logo: "/placeholder.svg?height=100&width=150&text=UPSC",
      date: "2024-01-01",
    },
    {
      id: 2,
      name: "SSC",
      fullName: "Staff Selection Commission",
      logo: "/placeholder.svg?height=100&width=150&text=SSC",
      date: "2024-01-01",
    },
    {
      id: 3,
      name: "IBPS",
      fullName: "Institute of Banking Personnel Selection",
      logo: "/placeholder.svg?height=100&width=150&text=IBPS",
      date: "2024-01-01",
    },
    {
      id: 4,
      name: "SBI",
      fullName: "State Bank of India",
      logo: "/placeholder.svg?height=100&width=150&text=SBI",
      date: "2024-01-01",
    },
    {
      id: 5,
      name: "RRB",
      fullName: "Railway Recruitment Board",
      logo: "/placeholder.svg?height=100&width=150&text=RRB",
      date: "2024-01-01",
    },
    {
      id: 6,
      name: "GATE",
      fullName: "Graduate Aptitude Test in Engineering",
      logo: "/placeholder.svg?height=100&width=150&text=GATE",
      date: "2024-01-01",
    },
  ])

  const [newExam, setNewExam] = useState({
    name: "",
    fullName: "",
    logo: "/placeholder.svg?height=100&width=150&text=NEW",
  })

  const addExamLogo = () => {
    if (!newExam.name || !newExam.fullName) return

    const exam = {
      id: Date.now(),
      name: newExam.name,
      fullName: newExam.fullName,
      logo: newExam.logo,
      date: new Date().toISOString().split("T")[0],
    }

    setExamLogos([...examLogos, exam])
    setNewExam({
      name: "",
      fullName: "",
      logo: "/placeholder.svg?height=100&width=150&text=NEW",
    })
  }

  const deleteExamLogo = (id: number) => {
    setExamLogos(examLogos.filter((exam) => exam.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewExam({ ...newExam, logo: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Exam Logos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exam-name">Exam Short Name</Label>
              <Input
                id="exam-name"
                value={newExam.name}
                onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                placeholder="e.g., UPSC, SSC"
              />
            </div>
            <div>
              <Label htmlFor="exam-fullname">Full Name</Label>
              <Input
                id="exam-fullname"
                value={newExam.fullName}
                onChange={(e) => setNewExam({ ...newExam, fullName: e.target.value })}
                placeholder="e.g., Union Public Service Commission"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="exam-logo">Exam Logo</Label>
            <div className="flex items-center gap-4">
              <Input id="exam-logo" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
              <div className="w-20 h-16 rounded border flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                {newExam.logo.includes("data:") ? (
                  <Image
                    src={newExam.logo || "/placeholder.svg"}
                    alt="Preview"
                    width={60}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-xs font-bold text-blue-600">{newExam.name || "NEW"}</span>
                )}
              </div>
            </div>
          </div>
          <Button onClick={addExamLogo} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Exam Logo
          </Button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {examLogos.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-12 rounded border flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                  {exam.logo.includes("data:") ? (
                    <Image
                      src={exam.logo || "/placeholder.svg"}
                      alt={exam.name}
                      width={48}
                      height={36}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-blue-600">{exam.name}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{exam.name}</h3>
                  <p className="text-sm text-gray-600">{exam.fullName}</p>
                  <Badge variant="outline" className="mt-1">
                    {exam.date}
                  </Badge>
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => deleteExamLogo(exam.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
