import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { AxiosInstance } from 'axios';

/**
 * Centralized API Client
 * Handles base URL, auth token injection, and global error handling.
 */

// Define the base URL from environment variables for flexibility
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://team-tasks-05xr.onrender.com/';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000, // 100 seconds timeout
});

/**
 * REQUEST INTERCEPTOR
 * Automatically attaches the JWT token to every outgoing request
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve token from localStorage (managed by your AuthProvider)
    const token = localStorage.getItem('auth_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * Handles global error responses (401, 403, 500)
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        // Unauthorized: Token expired or invalid
        console.error('Unauthorized! Redirecting to login...');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        // Optional: window.location.href = '/login';
        break;

      case 403:
        // Forbidden: User doesn't have the right role (e.g., Member trying to delete a task)
        console.error('Access Denied: You do not have permission to perform this action.');
        break;

      case 404:
        console.error('Resource not found.');
        break;

      case 500:
        console.error('Internal Server Error. Please try again later.');
        break;

      default:
        console.error('An unexpected error occurred:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;