import axios from 'axios';

/**
 * Enterprise API Client Configuration
 * 
 * Note: Configured for future Python FastAPI backend integration.
 * Currently, no active API calls are initiated; the application operates
 * on centralized structured mock data designed to mirror future schema responses.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

// Request interceptor template for auth tokens (to be enabled when FastAPI auth is integrated)
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('insighthub_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor template for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global API errors (401, 403, 500) when backend is connected
    return Promise.reject(error);
  }
);

export default apiClient;
