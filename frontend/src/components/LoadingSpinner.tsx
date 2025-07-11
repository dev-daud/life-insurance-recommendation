'use client';

import { Shield, Loader2, CheckCircle } from 'lucide-react';
import { LoadingSpinnerProps } from '@/lib/types';

export default function LoadingSpinner({ title, subtitle, showSteps = false }: LoadingSpinnerProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <Shield className="w-8 h-8 text-blue-600 absolute inset-0 m-auto" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{subtitle}</p>
          
          {showSteps && (
            <div className="space-y-3 text-left max-w-md mx-auto mb-6">
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>Analyzing your profile...</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>Calculating optimal coverage...</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Loader2 className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 animate-spin" />
                <span>Personalizing recommendations...</span>
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Did you know?</strong> We consider over 10 factors including your age, income, 
              and family situation to provide the most suitable life insurance recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
