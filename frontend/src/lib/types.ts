// User Profile and Form Data Types
export interface UserProfile {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface FormData {
  age: string;
  income: string;
  dependents: string;
  riskTolerance: string;
}

// API Response Types
export interface RecommendationResponse {
  recommendation: string;
  explanation: string;
  coverage: number;
  term: number;
  type: string;
  userId: number;
  createdAt: string | Date; // Handle both string and Date types
}

// For internal component state (simplified version of RecommendationResponse)
export interface RecommendationResult {
  recommendation: string;
  coverage: number;
  explanation: string;
  term: number;
  type: string;
}

// Form Validation Types
export interface ValidationErrors {
  age?: string;
  income?: string;
  dependents?: string;
  riskTolerance?: string;
}

// API Error Types
export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  isInitialLoading: boolean;
  loadingMessage?: string;
}

// Component Props Types
export interface LoadingSpinnerProps {
  title: string;
  subtitle: string;
  showSteps?: boolean;
}

export interface RecommendationResultProps {
  recommendation: RecommendationResponse;
  onNewRecommendation: () => void;
}

export interface FormFieldsProps {
  formData: {
    age: number;
    income: number;
    dependents: number;
    riskTolerance: string;
  };
  errors: ValidationErrors;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface LoadingScreenProps {
  title: string;
  subtitle: string;
  showSteps?: boolean;
} 
