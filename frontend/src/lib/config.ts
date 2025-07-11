// API Configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  apiPath: '/api',
  endpoints: {
    recommendation: '/recommendation',
    health: '/health'
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${apiConfig.baseUrl}${apiConfig.apiPath}${endpoint}`;
};

// Environment configuration
export const config = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  apiUrl: apiConfig.baseUrl,
}; 
