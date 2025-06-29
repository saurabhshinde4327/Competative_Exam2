import { Notice, Student, Course, Batch, SuccessStory, NewsTicker, Quiz } from './api'

export const fallbackData = {
  notices: [
    {
      id: 1,
      title: "New Batch Starting Soon",
      content: "UPSC CSE 2025 batch starting from January 15th. Limited seats available.",
      date: "2024-01-10",
      type: "notice" as const,
    },
    {
      id: 2,
      title: "Scholarship Program",
      content: "50% scholarship for economically weaker sections. Apply before January 20th.",
      date: "2024-01-08",
      type: "notice" as const,
    },
    {
      id: 3,
      title: "AIR 1 in UPSC CSE 2023",
      content: "Congratulations to Priya Sharma for securing All India Rank 1 in UPSC CSE 2023.",
      date: "2024-01-05",
      type: "achievement" as const,
    },
    {
      id: 4,
      title: "100% Success Rate",
      content: "Our SSC CGL batch achieved 100% success rate with 50+ selections.",
      date: "2024-01-03",
      type: "achievement" as const,
    },
    {
      id: 5,
      title: "New Study Material",
      content: "Updated study material for UPSC Prelims 2025 is now available in the library.",
      date: "2024-01-12",
      type: "update" as const,
    },
    {
      id: 6,
      title: "Mock Test Series",
      content: "Weekly mock test series for all competitive exams starting from next week.",
      date: "2024-01-10",
      type: "update" as const,
    },
  ] as Notice[],

  students: [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91-9876543210",
      course: "UPSC CSE",
      batch: "2025 Morning",
      registrationDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91-9876543211",
      course: "SSC CGL",
      batch: "2024 Evening",
      registrationDate: "2024-01-10",
    },
  ] as Student[],

  courses: [
    {
      id: 1,
      name: "UPSC Civil Services Examination",
      description: "Comprehensive preparation for IAS, IPS, and other civil services",
      duration: "12 months",
      fee: 50000,
      seats: 100,
      startDate: "2025-01-15",
    },
    {
      id: 2,
      name: "SSC CGL",
      description: "Staff Selection Commission Combined Graduate Level",
      duration: "8 months",
      fee: 35000,
      seats: 80,
      startDate: "2024-03-01",
    },
  ] as Course[],

  batches: [
    {
      id: 1,
      name: "UPSC CSE 2025 Morning",
      courseId: 1,
      startDate: "2025-01-15",
      endDate: "2025-12-15",
      capacity: 50,
      enrolled: 35,
      status: "upcoming" as const,
    },
    {
      id: 2,
      name: "SSC CGL 2024 Evening",
      courseId: 2,
      startDate: "2024-03-01",
      endDate: "2024-10-31",
      capacity: 40,
      enrolled: 40,
      status: "ongoing" as const,
    },
  ] as Batch[],

  successStories: [
    {
      id: 1,
      name: "Priya Sharma",
      exam: "UPSC CSE 2023",
      rank: "AIR 1",
      image: "/placeholder.svg?height=200&width=200",
      story: "With dedicated preparation and excellent guidance from the faculty, I was able to achieve my dream of becoming an IAS officer. The mock tests and personalized feedback were instrumental in my success.",
      date: "2024-01-05",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      exam: "SSC CGL 2023",
      rank: "AIR 15",
      image: "/placeholder.svg?height=200&width=200",
      story: "The comprehensive study material and regular doubt clearing sessions helped me crack SSC CGL with a good rank. The faculty's support throughout the journey was exceptional.",
      date: "2024-01-03",
    },
    {
      id: 3,
      name: "Anjali Patel",
      exam: "Bank PO 2023",
      rank: "Selected in SBI",
      image: "/placeholder.svg?height=200&width=200",
      story: "The banking preparation course was well-structured and covered all aspects of the exam. The interview preparation sessions gave me the confidence to face the final round successfully.",
      date: "2024-01-01",
    },
  ] as SuccessStory[],

  newsTicker: [
    {
      id: 1,
      text: "🎉 New UPSC CSE 2025 batch starting from February 1st - Limited seats available!",
      priority: "high" as const,
      active: true,
    },
    {
      id: 2,
      text: "📢 50% scholarship program for economically weaker sections - Apply before January 31st",
      priority: "medium" as const,
      active: true,
    },
    {
      id: 3,
      text: "🏆 Congratulations! Our students secured AIR 1, 3, and 7 in UPSC CSE 2024",
      priority: "high" as const,
      active: true,
    },
  ] as NewsTicker[],

  quiz: [
    {
      id: 1,
      question: "Which of the following is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      correctAnswer: 1,
      explanation: "Delhi is the capital of India since 1911.",
      category: "General Knowledge",
    },
    {
      id: 2,
      question: "Who is known as the Father of the Nation in India?",
      options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"],
      correctAnswer: 1,
      explanation: "Mahatma Gandhi is known as the Father of the Nation in India.",
      category: "History",
    },
  ] as Quiz[],
} 