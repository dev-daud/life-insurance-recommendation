'use client';

import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { RecommendationResponse, ValidationErrors } from '@/lib/types';
import { validateRecommendationForm, isFormValid } from '@/lib/validation';
import { buildApiUrl } from '@/lib/config';
import LoadingScreen from './LoadingScreen';
import RecommendationResult from './RecommendationResult';
import FormFields from './FormFields';

export default function RecommendationForm() {
  const [formData, setFormData] = useState({
    age: 30,
    income: 75000,
    dependents: 1,
    riskTolerance: 'medium'
  });

  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const validateForm = () => {
    const validationErrors = validateRecommendationForm(formData);
    setErrors(validationErrors);
    return isFormValid(validationErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'income' || name === 'dependents' 
        ? parseInt(value) || 0 
        : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Add artificial delay for better UX (shows loading state)
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch(buildApiUrl('/recommendation'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Ensure createdAt is a string (convert if it's a Date object)
        const processedData = {
          ...data,
          createdAt: typeof data.createdAt === 'string' ? data.createdAt : new Date(data.createdAt).toISOString()
        };
        
        setResult(processedData);
      } else {
        alert('Error getting recommendation. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewRecommendation = () => {
    setResult(null);
  };

  // Initial Loading Screen
  if (isInitialLoading) {
    return (
      <LoadingScreen 
        title="Life Insurance Recommendation"
        subtitle="Initializing your personalized experience..."
      />
    );
  }

  // Loading state during recommendation generation
  if (isLoading) {
    return (
      <LoadingScreen 
        title="Generating Your Recommendation"
        subtitle="Please wait while we analyze your profile..."
        showSteps={true}
      />
    );
  }

  // Results screen - using the original comprehensive component
  if (result) {
    return (
      <RecommendationResult 
        recommendation={result}
        onNewRecommendation={handleNewRecommendation}
      />
    );
  }

  // Main form
  return (
    <div className="max-w-2xl mx-auto p-6 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Life Insurance Recommendation</h1>
          </div>
          <p className="text-gray-600">
            Get personalized life insurance recommendations based on your profile
          </p>
        </div>

        <FormFields 
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
} 
