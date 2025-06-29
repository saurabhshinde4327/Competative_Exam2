"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useHealthCheck, useNotices, useStudents, useCourses, useBatches, useSuccessStories, useNewsTicker, useQuiz } from "@/hooks/use-api"

export default function ApiTestPage() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, { status: 'pending' | 'success' | 'error', message: string }>>({})

  const healthCheck = useHealthCheck()
  const notices = useNotices()
  const students = useStudents()
  const courses = useCourses()
  const batches = useBatches()
  const successStories = useSuccessStories()
  const newsTicker = useNewsTicker()
  const quiz = useQuiz()

  const runAllTests = async () => {
    setIsTesting(true)
    setTestResults({})

    const endpoints = [
      { name: 'Health Check', hook: healthCheck, hasLoading: false },
      { name: 'Notices', hook: notices, hasLoading: true },
      { name: 'Students', hook: students, hasLoading: true },
      { name: 'Courses', hook: courses, hasLoading: true },
      { name: 'Batches', hook: batches, hasLoading: true },
      { name: 'Success Stories', hook: successStories, hasLoading: true },
      { name: 'News Ticker', hook: newsTicker, hasLoading: true },
      { name: 'Quiz', hook: quiz, hasLoading: true },
    ]

    for (const endpoint of endpoints) {
      setTestResults(prev => ({
        ...prev,
        [endpoint.name]: { status: 'pending', message: 'Testing...' }
      }))

      // Simulate a small delay to show the testing state
      await new Promise(resolve => setTimeout(resolve, 500))

      if (endpoint.hasLoading) {
        const { loading, error } = endpoint.hook as any
        
        if (loading) {
          setTestResults(prev => ({
            ...prev,
            [endpoint.name]: { status: 'pending', message: 'Still loading...' }
          }))
          continue
        }

        if (error) {
          setTestResults(prev => ({
            ...prev,
            [endpoint.name]: { status: 'error', message: error }
          }))
        } else {
          setTestResults(prev => ({
            ...prev,
            [endpoint.name]: { status: 'success', message: 'API working correctly' }
          }))
        }
      } else {
        // Health check doesn't have loading state
        const { status, error } = endpoint.hook as any
        
        if (error) {
          setTestResults(prev => ({
            ...prev,
            [endpoint.name]: { status: 'error', message: error }
          }))
        } else {
          setTestResults(prev => ({
            ...prev,
            [endpoint.name]: { status: 'success', message: 'API working correctly' }
          }))
        }
      }
    }

    setIsTesting(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'pending':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints Test</h1>
            <p className="text-gray-600 mb-6">
              Testing all API endpoints against the backend at http://91.108.105.168:3007/
            </p>
            <Button 
              onClick={runAllTests} 
              disabled={isTesting}
              className="mb-6"
            >
              {isTesting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Testing APIs...
                </>
              ) : (
                'Run All Tests'
              )}
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Health Check */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Backend Health Check</span>
                  <Badge variant="outline" className={getStatusColor(healthCheck.status)}>
                    {healthCheck.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthCheck.error ? (
                  <p className="text-red-600">{healthCheck.error}</p>
                ) : (
                  <p className="text-green-600">Backend is responding</p>
                )}
              </CardContent>
            </Card>

            {/* API Endpoints */}
            {[
              { name: 'Notices', hook: notices, data: notices.notices },
              { name: 'Students', hook: students, data: students.students },
              { name: 'Courses', hook: courses, data: courses.courses },
              { name: 'Batches', hook: batches, data: batches.batches },
              { name: 'Success Stories', hook: successStories, data: successStories.successStories },
              { name: 'News Ticker', hook: newsTicker, data: newsTicker.newsTicker },
              { name: 'Quiz', hook: quiz, data: quiz.quiz },
            ].map((endpoint) => (
              <Card key={endpoint.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{endpoint.name} API</span>
                    <div className="flex items-center space-x-2">
                      {testResults[endpoint.name] && getStatusIcon(testResults[endpoint.name].status)}
                      <Badge variant="outline" className={getStatusColor(testResults[endpoint.name]?.status || 'pending')}>
                        {testResults[endpoint.name]?.status?.toUpperCase() || 'PENDING'}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(endpoint.hook as any).loading ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Loading...</span>
                      </div>
                    ) : (endpoint.hook as any).error ? (
                      <p className="text-red-600">{(endpoint.hook as any).error}</p>
                    ) : (
                      <div>
                        <p className="text-green-600 mb-2">✓ API working correctly</p>
                        <p className="text-sm text-gray-600">
                          Loaded {endpoint.data.length} {endpoint.name.toLowerCase()}
                        </p>
                        {testResults[endpoint.name] && (
                          <p className="text-sm text-gray-500 mt-1">
                            {testResults[endpoint.name].message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          {Object.keys(testResults).length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Test Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(testResults).filter(r => r.status === 'success').length}
                    </div>
                    <div className="text-sm text-gray-600">Successful</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {Object.values(testResults).filter(r => r.status === 'error').length}
                    </div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Object.values(testResults).filter(r => r.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 