# API Connection Troubleshooting Guide

This guide helps you resolve API connection issues between the frontend and backend.

## Common Issues and Solutions

### 1. CORS Error: "Failed to fetch"

**Problem**: The browser blocks requests to the backend due to CORS policy.

**Solutions**:

#### Option A: Configure Backend CORS (Recommended)
Add CORS headers to your backend server:

```javascript
// Express.js example
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.0.108:3000'],
  credentials: true
}));
```

#### Option B: Use the Built-in Proxy
The application includes a proxy route at `/api/proxy` that automatically handles CORS issues.

#### Option C: Browser Extension (Development Only)
Install a CORS browser extension for development.

### 2. Backend Server Not Running

**Problem**: The backend server at `http://91.108.105.168:3007/` is not accessible.

**Solutions**:
1. Check if the backend server is running
2. Verify the correct IP address and port
3. Check firewall settings
4. Ensure the server is accessible from your network

### 3. Network Connectivity Issues

**Problem**: Network connectivity problems prevent API calls.

**Solutions**:
1. Check your internet connection
2. Verify the backend server IP is reachable
3. Test with `ping 91.108.105.168`
4. Check if the server is behind a firewall

## Testing API Connectivity

### 1. Health Check
Visit the API Test page at `/api-test` to check all endpoints.

### 2. Direct Backend Test
Test the backend directly:
```bash
curl http://91.108.105.105.168:3007/
```

### 3. Proxy Test
Test the proxy route:
```bash
curl http://localhost:3000/api/proxy?endpoint=/
```

## Fallback Data

When API calls fail, the application automatically uses fallback data to ensure a good user experience. You'll see:

- **Yellow warning banners** indicating demo data is being used
- **"DEMO" badges** on news ticker items
- **Error messages** with details about the connection issue

## Development vs Production

### Development
- Uses direct API calls with CORS
- Falls back to proxy if direct calls fail
- Shows detailed error messages
- Uses fallback data for demonstration

### Production
- Should use the same domain for frontend and backend
- Configure proper CORS headers
- Use environment variables for API URLs
- Implement proper error handling

## Environment Variables

Create a `.env.local` file for configuration:

```env
NEXT_PUBLIC_API_BASE_URL=http://91.108.105.168:3007
NEXT_PUBLIC_USE_PROXY=false
```

## Backend Requirements

Your backend should:

1. **Enable CORS** for frontend domains
2. **Return JSON** responses
3. **Handle OPTIONS** requests (preflight)
4. **Set proper headers**:
   ```
   Access-Control-Allow-Origin: http://localhost:3000
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```

## API Endpoints Checklist

Ensure your backend has these endpoints:

- [ ] `GET /` - Health check
- [ ] `GET /api/notices` - Notices, achievements, updates
- [ ] `GET /api/students` - Student information
- [ ] `POST /api/students` - Create student
- [ ] `GET /api/courses` - Available courses
- [ ] `GET /api/batches` - Batch information
- [ ] `GET /api/success-stories` - Success stories
- [ ] `GET /api/news-ticker` - News ticker items
- [ ] `GET /api/quiz` - Quiz questions

## Debugging Steps

1. **Check Browser Console** for error messages
2. **Test Backend Directly** with curl or Postman
3. **Verify Network Tab** in browser dev tools
4. **Check Server Logs** for backend errors
5. **Test Proxy Route** at `/api/proxy?endpoint=/`

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Failed to fetch" | CORS or network issue | Configure CORS or use proxy |
| "HTTP error! status: 404" | Endpoint not found | Check backend routes |
| "HTTP error! status: 500" | Server error | Check backend logs |
| "Backend is not responding" | Server down | Start backend server |

## Getting Help

If you're still having issues:

1. Check the browser console for detailed error messages
2. Test the backend endpoints directly
3. Verify network connectivity
4. Check the API Test page for specific endpoint status
5. Review the backend server logs 