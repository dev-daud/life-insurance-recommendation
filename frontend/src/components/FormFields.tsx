'use client';

import { Loader2 } from 'lucide-react';
import { FormFieldsProps } from '@/lib/types';

export default function FormFields({ 
  formData, 
  errors, 
  isLoading, 
  onInputChange, 
  onSubmit 
}: FormFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Age Input */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age <span className="text-red-500">*</span>
        </label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 ${
            errors.age ? 'border-red-500 shake' : 'border-gray-300'
          }`}
          placeholder="Enter your age (18-80)"
          min="18"
          max="80"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600 flex items-center animate-slideIn">
            <span className="mr-1">⚠️</span>
            {errors.age}
          </p>
        )}
      </div>

      {/* Income Input */}
      <div>
        <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
          Annual Income <span className="text-red-500">*</span>
        </label>
        <input
          id="income"
          name="income"
          type="number"
          value={formData.income}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 ${
            errors.income ? 'border-red-500 shake' : 'border-gray-300'
          }`}
          placeholder="Enter your annual income"
          min="0"
          step="1000"
        />
        {errors.income && (
          <p className="mt-1 text-sm text-red-600 flex items-center animate-slideIn">
            <span className="mr-1">⚠️</span>
            {errors.income}
          </p>
        )}
      </div>

      {/* Dependents Input */}
      <div>
        <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Dependents
        </label>
        <input
          id="dependents"
          name="dependents"
          type="number"
          value={formData.dependents}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 ${
            errors.dependents ? 'border-red-500 shake' : 'border-gray-300'
          }`}
          placeholder="Enter number of dependents (0-20)"
          min="0"
          max="20"
        />
        {errors.dependents && (
          <p className="mt-1 text-sm text-red-600 flex items-center animate-slideIn">
            <span className="mr-1">⚠️</span>
            {errors.dependents}
          </p>
        )}
      </div>

      {/* Risk Tolerance Select */}
      <div>
        <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700 mb-2">
          Risk Tolerance <span className="text-red-500">*</span>
        </label>
        <select
          id="riskTolerance"
          name="riskTolerance"
          value={formData.riskTolerance}
          onChange={onInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white transition-all duration-200 ${
            errors.riskTolerance ? 'border-red-500 shake' : 'border-gray-300'
          }`}
        >
          <option value="low">Low - Conservative approach</option>
          <option value="medium">Medium - Balanced approach</option>
          <option value="high">High - Aggressive approach</option>
        </select>
        {errors.riskTolerance && (
          <p className="mt-1 text-sm text-red-600 flex items-center animate-slideIn">
            <span className="mr-1">⚠️</span>
            {errors.riskTolerance}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <span className="flex items-center justify-center">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Recommendation...
            </>
          ) : (
            'Get Recommendation'
          )}
        </span>
      </button>
    </form>
  );
} 
