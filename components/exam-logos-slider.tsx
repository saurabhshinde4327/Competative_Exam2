"use client"

const examLogos = [
  {
    id: 1,
    name: "UPSC",
    fullName: "Union Public Service Commission",
  },
  {
    id: 2,
    name: "SSC",
    fullName: "Staff Selection Commission",
  },
  {
    id: 3,
    name: "IBPS",
    fullName: "Institute of Banking Personnel Selection",
  },
  {
    id: 4,
    name: "SBI",
    fullName: "State Bank of India",
  },
  {
    id: 5,
    name: "RRB",
    fullName: "Railway Recruitment Board",
  },
  {
    id: 6,
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
  },
  {
    id: 7,
    name: "CAT",
    fullName: "Common Admission Test",
  },
  {
    id: 8,
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
  },
  {
    id: 9,
    name: "JEE",
    fullName: "Joint Entrance Examination",
  },
  {
    id: 10,
    name: "CLAT",
    fullName: "Common Law Admission Test",
  },
  {
    id: 11,
    name: "NDA",
    fullName: "National Defence Academy",
  },
  {
    id: 12,
    name: "CDS",
    fullName: "Combined Defence Services",
  },
]

export function ExamLogosSlider() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Competitive Exams We Prepare You For</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive coaching for all major competitive examinations across various sectors
          </p>
        </div>

        {/* Grid Layout for All Exams */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-16">
          {examLogos.map((exam) => (
            <div key={exam.id} className="group">
              <div className="bg-white rounded-lg p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex flex-col items-center text-center">
                  {/* Logo with Text */}
                  <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white font-bold text-lg shadow-md group-hover:from-blue-600 group-hover:to-indigo-700 transition-colors">
                    {exam.name}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{exam.name}</h3>
                  <p className="text-sm text-gray-600 leading-tight text-center">{exam.fullName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
            <div className="text-gray-600 font-medium">Exam Categories</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600 font-medium">Success Rate</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">5000+</div>
            <div className="text-gray-600 font-medium">Students Trained</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
