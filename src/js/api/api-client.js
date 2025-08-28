import axios from 'axios';

/**
 * Axios instance configuration for Story API
 * Base URL: https://story-api.dicoding.dev/v1
 */
const apiClient = axios.create({
  baseURL: 'https://story-api.dicoding.dev/v1',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add authorization token
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling errors and authentication
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Remove invalid token
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      
      // Redirect to login page or show login modal
      console.warn('Authentication failed. Please login again.');
      
      // You can dispatch a custom event here to handle authentication failure
      const authFailEvent = new CustomEvent('auth-failed', {
        detail: { message: 'Session expired. Please login again.' }
      });
      window.dispatchEvent(authFailEvent);
    }
    
    // Handle other error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      return Promise.reject({
        message: error.response.data.message || 'Server error occurred',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0
      });
    }
  }
);

export default apiClient;
