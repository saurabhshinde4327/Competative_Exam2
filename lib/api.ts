const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://91.108.105.168:3007'
const PROXY_URL = '/api/proxy'

export interface Notice {
  id: number
  title: string
  content: string
  date: string
  type: 'notice' | 'achievement' | 'update'
}

export interface Student {
  id: number
  name: string
  email: string
  phone: string
  course: string
  batch: string
  registrationDate: string
}

export interface Course {
  id: number
  name: string
  description: string
  duration: string
  fee: number
  seats: number
  startDate: string
}

export interface Batch {
  id: number
  name: string
  courseId: number
  startDate: string
  endDate: string
  capacity: number
  enrolled: number
  status: 'upcoming' | 'ongoing' | 'completed'
}

export interface SuccessStory {
  id: number
  name: string
  exam: string
  rank: string
  image: string
  story: string
  date: string
}

export interface NewsTicker {
  id: number
  text: string
  priority: 'low' | 'medium' | 'high'
  active: boolean
}

export interface Quiz {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  category: string
}

class ApiService {
  private async fetchApi<T>(endpoint: string, useProxy = false): Promise<T> {
    const url = useProxy ? `${PROXY_URL}?endpoint=${endpoint}` : `${API_BASE_URL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: useProxy ? 'same-origin' : 'cors', // Use same-origin for proxy
        cache: 'no-cache', // Prevent caching issues
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      
      // If direct connection failed and we haven't tried proxy yet, try proxy
      if (!useProxy && error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.log('Direct connection failed, trying proxy...')
        return this.fetchApi<T>(endpoint, true)
      }
      
      // Check if it's a CORS error
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error(`CORS Error: Unable to connect to backend at ${API_BASE_URL}. Please ensure the backend server is running and CORS is properly configured.`)
      }
      
      throw error
    }
  }

  // Notices API
  async getNotices(): Promise<Notice[]> {
    return this.fetchApi<Notice[]>('/api/notices')
  }

  // Students API
  async getStudents(): Promise<Student[]> {
    return this.fetchApi<Student[]>('/api/students')
  }

  async createStudent(student: Omit<Student, 'id'>): Promise<Student> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(student),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      console.error('Error creating student:', error)
      throw error
    }
  }

  // Courses API
  async getCourses(): Promise<Course[]> {
    return this.fetchApi<Course[]>('/api/courses')
  }

  // Batches API
  async getBatches(): Promise<Batch[]> {
    return this.fetchApi<Batch[]>('/api/batches')
  }

  // Success Stories API
  async getSuccessStories(): Promise<SuccessStory[]> {
    return this.fetchApi<SuccessStory[]>('/api/success-stories')
  }

  // News Ticker API
  async getNewsTicker(): Promise<NewsTicker[]> {
    return this.fetchApi<NewsTicker[]>('/api/news-ticker')
  }

  // Quiz API
  async getQuiz(): Promise<Quiz[]> {
    return this.fetchApi<Quiz[]>('/api/quiz')
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      return await this.fetchApi<{ status: string; message: string }>('/')
    } catch (error) {
      // Return a structured error response for health check
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }
}

export const apiService = new ApiService() 