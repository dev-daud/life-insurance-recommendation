import axios from 'axios';
import { UserProfile, RecommendationResponse } from './types';
import { apiConfig } from './config';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: `${apiConfig.baseUrl}${apiConfig.apiPath}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export const recommendationApi = {
  /**
   * Get life insurance recommendation based on user profile
   */
  getRecommendation: async (userProfile: UserProfile): Promise<RecommendationResponse> => {
    try {
      const response = await api.post(apiConfig.endpoints.recommendation, userProfile);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get recommendation history for a user
   */
  getRecommendationHistory: async (userId: number): Promise<RecommendationResponse[]> => {
    try {
      const response = await api.get(`/recommendation/history/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const healthApi = {
  /**
   * Check API health status
   */
  checkHealth: async (): Promise<{ status: string; timestamp: string }> => {
    try {
      const response = await api.get(apiConfig.endpoints.health);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api; 
