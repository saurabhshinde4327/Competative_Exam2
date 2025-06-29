"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SuccessStory {
  id: number
  name: string
  exam: string
  rank: string
  image: string
  story: string
  date: string
}

interface DataContextType {
  successStories: SuccessStory[]
  setSuccessStories: (stories: SuccessStory[]) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([
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
    {
      id: 4,
      name: "Vikash Singh",
      exam: "Railway NTPC 2023",
      rank: "AIR 25",
      image: "/placeholder.svg?height=200&width=200",
      story:
        "The systematic approach and regular practice tests helped me understand the exam pattern thoroughly. The faculty's guidance was exceptional throughout my preparation journey.",
      date: "2023-12-28",
    },
    {
      id: 5,
      name: "Sneha Gupta",
      exam: "IBPS PO 2023",
      rank: "Selected in PNB",
      image: "/placeholder.svg?height=200&width=200",
      story:
        "The mock interviews and personality development sessions gave me the confidence to face the final selection process. Thank you for making my banking career dream come true.",
      date: "2023-12-25",
    },
  ])

  return <DataContext.Provider value={{ successStories, setSuccessStories }}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
