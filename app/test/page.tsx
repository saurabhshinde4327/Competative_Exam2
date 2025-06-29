"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This is a simple test page to check if the basic functionality works.
          </p>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 mb-4">Count: {count}</p>
            <Button onClick={() => setCount(count + 1)}>
              Increment
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            If this page loads without errors, the issue is with the API integration or specific components.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 