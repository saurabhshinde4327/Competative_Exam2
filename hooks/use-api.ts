"use client"

import React, { useState, useEffect } from 'react'
import { apiService, type Notice, type Student, type Course, type Batch, type SuccessStory, type NewsTicker, type Quiz } from '@/lib/api'
import { fallbackData } from '@/lib/fallback-data'

export function useNotices() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true)
        const data = await apiService.getNotices()
        setNotices(data)
        setError(null)
        setUsingFallback(false)
      } catch (err) {
        console.error('Error fetching notices:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch notices')
        // Use fallback data
        setNotices(fallbackData.notices)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  return { notices, loading, error, usingFallback }
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const data = await apiService.getStudents()
        setStudents(data)
        setError(null)
        setUsingFallback(false)
      } catch (err) {
        console.error('Error fetching students:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch students')
        // Use fallback data
        setStudents(fallbackData.students)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const createStudent = async (student: Omit<Student, 'id'>) => {
    try {
      const newStudent = await apiService.createStudent(student)
      setStudents((prev: Student[]) => [...prev, newStudent])
      return newStudent
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create student')
      throw err
    }
  }

  return { students, loading, error, createStudent, usingFallback }
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await apiService.getCourses()
        setCourses(data)
        setError(null)
        setUsingFallback(false)
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch courses')
        // Use fallback data
        setCourses(fallbackData.courses)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, loading, error, usingFallback }
}

export function useBatches() {
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true)
        const data = await apiService.getBatches()
        setBatches(data)
        setError(null)
        setUsingFallback(false)
      } catch (err) {
        console.error('Error fetching batches:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch batches')
        // Use fallback data
        setBatches(fallbackData.batches)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBatches()
  }, [])

  return { batches, loading, error, usingFallback }
}

export function useSuccessStories() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        setLoading(true)
        const data = await apiService.getSuccessStories()
        setSuccessStories(data)
        setError(null)
        setUsingFallback(false)
      } catch (err) {
        console.error('Error fetching success stories:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch success stories')
        // Use fallback data
        setSuccessStories(fallbackData.successStories)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchSuccessStories()
  }, [])

  return { successStories, loading, error, usingFallback }
}

export function useNewsTicker() {
  const [newsTicker, setNewsTicker] = useState<NewsTicker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchNewsTicker = async () => {
      try {
        setLoading(true)
        const data = await apiService.getNewsTicker()
        setNewsTicker(data)
        setError(null)
        setUsingFallback(false)
      } catch (err) {
        console.error('Error fetching news ticker:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch news ticker')
        // Use fallback data
        setNewsTicker(fallbackData.newsTicker)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsTicker()
  }, [])

  return { newsTicker, loading, error, usingFallback }
}

export function useQuiz() {
  const [quiz, setQuiz] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true)
        const data = await apiService.getQuiz()
        setQuiz(data)
        setError(null)
        setUsingFallback(false)
      } catch (err) {
        console.error('Error fetching quiz:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch quiz')
        // Use fallback data
        setQuiz(fallbackData.quiz)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [])

  return { quiz, loading, error, usingFallback }
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