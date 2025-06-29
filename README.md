# Competitive Exam Frontend

A Next.js frontend application for a competitive exam coaching institute that integrates with a backend API.

## Features

- **Real-time Data**: All data is fetched from the backend API at `http://91.108.105.168:3007/`
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components
- **API Integration**: Complete integration with all backend endpoints
- **Loading States**: Proper loading and error handling for all API calls

## API Endpoints Integrated

The application integrates with the following API endpoints:

- `GET /api/notices` - Fetch notices, achievements, and updates
- `GET /api/students` - Fetch student information
- `POST /api/students` - Create new student records
- `GET /api/courses` - Fetch available courses
- `GET /api/batches` - Fetch batch information
- `GET /api/success-stories` - Fetch success stories
- `GET /api/news-ticker` - Fetch news ticker items
- `GET /api/quiz` - Fetch quiz questions

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Application**
   Navigate to `http://localhost:3000`

## Testing API Integration

1. **API Test Page**: Visit `/api-test` to test all API endpoints
2. **Real-time Testing**: The test page shows the status of each endpoint
3. **Error Handling**: Displays detailed error messages if APIs are not responding

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api-test/          # API testing page
│   ├── about/             # About page
│   ├── quiz/              # Quiz page
│   ├── success-stories/   # Success stories page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── notice-section.tsx # Notices component
│   ├── success-stories.tsx # Success stories component
│   └── news-ticker.tsx   # News ticker component
├── hooks/                # Custom React hooks
│   └── use-api.ts        # API integration hooks
├── lib/                  # Utility libraries
│   ├── api.ts           # API service functions
│   └── utils.ts         # Utility functions
└── contexts/            # React contexts
    └── data-context.tsx # Data context (legacy)
```

## API Service

The `lib/api.ts` file contains all API service functions with proper TypeScript interfaces:

- `apiService.getNotices()` - Fetch notices
- `apiService.getStudents()` - Fetch students
- `apiService.createStudent()` - Create new student
- `apiService.getCourses()` - Fetch courses
- `apiService.getBatches()` - Fetch batches
- `apiService.getSuccessStories()` - Fetch success stories
- `apiService.getNewsTicker()` - Fetch news ticker
- `apiService.getQuiz()` - Fetch quiz questions
- `apiService.healthCheck()` - Check backend health

## Custom Hooks

The `hooks/use-api.ts` file provides React hooks for each API endpoint:

- `useNotices()` - Hook for notices data
- `useStudents()` - Hook for students data
- `useCourses()` - Hook for courses data
- `useBatches()` - Hook for batches data
- `useSuccessStories()` - Hook for success stories data
- `useNewsTicker()` - Hook for news ticker data
- `useQuiz()` - Hook for quiz data
- `useHealthCheck()` - Hook for backend health check

## Backend Requirements

The backend should be running at `http://91.108.105.168:3007/` with the following endpoints:

- All endpoints should return JSON data
- CORS should be enabled for frontend access
- Proper error handling and status codes
- MongoDB connection (as mentioned in backend status)

## Error Handling

The application includes comprehensive error handling:

- Network errors are caught and displayed
- Loading states are shown during API calls
- Fallback UI when APIs are unavailable
- Detailed error messages for debugging

## Development

- **TypeScript**: Full TypeScript support with proper interfaces
- **ESLint**: Code linting and formatting
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library

## Deployment

The application can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## Troubleshooting

1. **API Connection Issues**: Check if the backend is running at the correct URL
2. **CORS Errors**: Ensure the backend has CORS enabled
3. **TypeScript Errors**: Run `npm install` to ensure all dependencies are installed
4. **Build Errors**: Use `--legacy-peer-deps` flag for dependency resolution 