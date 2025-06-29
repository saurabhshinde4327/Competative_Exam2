"use client"

import React, { useState, useEffect } from 'react'
import { apiService, type Notice, type Student, type Course, type Batch, type SuccessStory, type NewsTicker, type Quiz } from '@/lib/api'
import { fallbackData } from '@/lib/fallback-data'

// Safe wrapper for API calls
const safeApiCall = async <T>(apiCall: () => Promise<T>, fallbackData: T): Promise<{ data: T; usingFallback: boolean; error: string | null }> => {
  try {
    const data = await apiCall()
    return { data, usingFallback: false, error: null }
  } catch (err) {
    console.error('API call failed:', err)
    return { 
      data: fallbackData, 
      usingFallback: true, 
      error: err instanceof Error ? err.message : 'Unknown error occurred' 
    }
  }
}

export function useNotices() {
  const [notices, setNotices] = useState<Notice[]>(fallbackData.notices)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true)
      const result = await safeApiCall(() => apiService.getNotices(), fallbackData.notices)
      setNotices(result.data)
      setError(result.error)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    fetchNotices()
  }, [])

  const createNotice = async (notice: Omit<Notice, 'id'>) => {
    try {
      const newNotice = await apiService.createNotice(notice)
      setNotices((prev: Notice[]) => [newNotice, ...prev])
      return newNotice
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create notice'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return { notices, loading, error, createNotice, usingFallback }
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(fallbackData.students)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      const result = await safeApiCall(() => apiService.getStudents(), fallbackData.students)
      setStudents(result.data)
      setError(result.error)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    fetchStudents()
  }, [])

  const createStudent = async (student: Omit<Student, 'id'>) => {
    try {
      const newStudent = await apiService.createStudent(student)
      setStudents((prev: Student[]) => [...prev, newStudent])
      return newStudent
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create student'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return { students, loading, error, createStudent, usingFallback }
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>(fallbackData.courses)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await safeApiCall(() => apiService.getCourses(), fallbackData.courses)
      setCourses(result.data)
      setError(result.error)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    fetchCourses()
  }, [])

  return { courses, loading, error, usingFallback }
}

export function useBatches() {
  const [batches, setBatches] = useState<Batch[]>(fallbackData.batches)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true)
      const result = await safeApiCall(() => apiService.getBatches(), fallbackData.batches)
      setBatches(result.data)
      setError(result.error)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    fetchBatches()
  }, [])

  return { batches, loading, error, usingFallback }
}

export function useSuccessStories() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(fallbackData.successStories)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const fetchSuccessStories = async () => {
      setLoading(true)
      const result = await safeApiCall(() => apiService.getSuccessStories(), fallbackData.successStories)
      setSuccessStories(result.data)
      setError(result.error)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    fetchSuccessStories()
  }, [])

  const createSuccessStory = async (story: Omit<SuccessStory, 'id'>) => {
    try {
      const newStory = await apiService.createSuccessStory(story)
      setSuccessStories((prev: SuccessStory[]) => [newStory, ...prev])
      return newStory
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create success story'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return { successStories, loading, error, createSuccessStory, usingFallback }
}

export function useNewsTicker() {
  const [newsTicker, setNewsTicker] = useState<NewsTicker[]>(fallbackData.newsTicker)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const fetchNewsTicker = async () => {
      setLoading(true)
      const result = await safeApiCall(() => apiService.getNewsTicker(), fallbackData.newsTicker)
      setNewsTicker(result.data)
      setError(result.error)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    fetchNewsTicker()
  }, [])

  const createNewsTicker = async (news: Omit<NewsTicker, 'id'>) => {
    try {
      const newNews = await apiService.createNewsTicker(news)
      setNewsTicker((prev: NewsTicker[]) => [newNews, ...prev])
      return newNews
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create news ticker'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return { newsTicker, loading, error, createNewsTicker, usingFallback }
}

export function useQuiz() {
  const [quiz, setQuiz] = useState<Quiz[]>(fallbackData.quiz)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true)
      const result = await safeApiCall(() => apiService.getQuiz(), fallbackData.quiz)
      setQuiz(result.data)
      setError(result.error)
      setUsingFallback(result.usingFallback)
      setLoading(false)
    }

    fetchQuiz()
  }, [])

  const createQuiz = async (quizItem: Omit<Quiz, 'id'>) => {
    try {
      const newQuiz = await apiService.createQuiz(quizItem)
      setQuiz((prev: Quiz[]) => [...prev, newQuiz])
      return newQuiz
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create quiz'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return { quiz, loading, error, createQuiz, usingFallback }
}

export function useHealthCheck() {
  const [status, setStatus] = useState<string>('checking')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await apiService.healthCheck()
        setStatus(data.status)
        setError(data.status === 'error' ? data.message : null)
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Backend is not responding')
      }
    }

    checkHealth()
  }, [])

  return { status, error }
} 