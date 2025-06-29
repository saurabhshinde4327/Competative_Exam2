"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface NewsContextType {
  importantNews: string[]
  setImportantNews: (news: string[]) => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: ReactNode }) {
  const [importantNews, setImportantNews] = useState<string[]>([
    "🎉 New UPSC CSE 2025 batch starting from February 1st - Limited seats available!",
    "📢 50% scholarship program for economically weaker sections - Apply before January 31st",
    "🏆 Congratulations! Our students secured AIR 1, 3, and 7 in UPSC CSE 2024",
    "📚 Free mock test series for all competitive exams - Register now!",
    "⭐ 95% success rate achieved in SSC CGL 2024 - Join our winning team",
    "🎯 Special weekend batches for working professionals now available",
  ])

  return <NewsContext.Provider value={{ importantNews, setImportantNews }}>{children}</NewsContext.Provider>
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}
