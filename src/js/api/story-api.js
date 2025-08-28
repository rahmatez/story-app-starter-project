import apiClient from './api-client.js';

/**
 * Authentication API services
 */
export class AuthService {
  /**
   * User registration
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User name
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password (min 8 characters)
   * @returns {Promise<Object>} Registration response
   */
  static async register(userData) {
    try {
      const response = await apiClient.post('/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * User login
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} Login response with token and user data
   */
  static async login(credentials) {
    try {
      const response = await apiClient.post('/login', credentials);
      
      // Store token and user data in localStorage
      if (response.data.loginResult) {
        localStorage.setItem('accessToken', response.data.loginResult.token);
        localStorage.setItem('userData', JSON.stringify(response.data.loginResult));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * User logout
   * Clears stored authentication data
   */
  static logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  static isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  /**
   * Get current user data
   * @returns {Object|null} User data or null if not authenticated
   */
  static getCurrentUser() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}

/**
 * Story API services
 */
export class StoryService {
  /**
   * Get all stories
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (optional)
   * @param {number} params.size - Page size (optional)
   * @param {number} params.location - Include location data (0 or 1, optional)
   * @returns {Promise<Object>} Stories response
   */
  static async getAllStories(params = {}) {
    try {
      const response = await apiClient.get('/stories', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get story by ID
   * @param {string} storyId - Story ID
   * @returns {Promise<Object>} Story detail response
   */
  static async getStoryById(storyId) {
    try {
      const response = await apiClient.get(`/stories/${storyId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add new story
   * @param {FormData} storyData - Story form data
   * @param {string} storyData.description - Story description
   * @param {File} storyData.photo - Story photo (max 1MB)
   * @param {number} storyData.lat - Latitude (optional)
   * @param {number} storyData.lon - Longitude (optional)
   * @returns {Promise<Object>} Add story response
   */
  static async addStory(storyData) {
    try {
      const response = await apiClient.post('/stories', storyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add story as guest (without authentication)
   * @param {FormData} storyData - Story form data
   * @returns {Promise<Object>} Add story response
   */
  static async addStoryAsGuest(storyData) {
    try {
      const response = await apiClient.post('/stories/guest', storyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Notification API services
 */
export class NotificationService {
  /**
   * Subscribe to web push notifications
   * @param {Object} subscriptionData - Push subscription data
   * @param {string} subscriptionData.endpoint - Subscription endpoint
   * @param {Object} subscriptionData.keys - Subscription keys
   * @param {string} subscriptionData.keys.p256dh - P256DH key
   * @param {string} subscriptionData.keys.auth - Auth key
   * @returns {Promise<Object>} Subscription response
   */
  static async subscribe(subscriptionData) {
    try {
      const response = await apiClient.post('/notifications/subscribe', subscriptionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Unsubscribe from web push notifications
   * @param {Object} subscriptionData - Subscription data
   * @param {string} subscriptionData.endpoint - Subscription endpoint
   * @returns {Promise<Object>} Unsubscribe response
   */
  static async unsubscribe(subscriptionData) {
    try {
      const response = await apiClient.delete('/notifications/subscribe', {
        data: subscriptionData
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
