import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { DataProvider } from "@/contexts/data-context"
import { NewsTicker } from "@/components/news-ticker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Competitive Exam Department",
  description: "Excellence in competitive exam preparation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <NewsTicker />
          {children}
        </DataProvider>
      </body>
    </html>
  )
}
