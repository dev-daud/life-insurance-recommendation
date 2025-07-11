'use client';

import { CheckCircle, Shield, Calendar, DollarSign, Info } from 'lucide-react';
import { RecommendationResponse, RecommendationResultProps } from '@/lib/types';

export default function RecommendationResult({ recommendation, onNewRecommendation }: RecommendationResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateValue: string | Date) => {
    try {
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      if (isNaN(date.getTime())) {
        return 'Unknown date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="card text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Your Recommendation is Ready!</h2>
        </div>
        <p className="text-gray-600">
          Based on your profile, here's our personalized life insurance recommendation
        </p>
      </div>

      {/* Recommendation Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Recommendation */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Recommended Policy</h3>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-900 mb-2">
              {recommendation.recommendation}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-blue-700">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>Coverage: {formatCurrency(recommendation.coverage)}</span>
              </div>
              {recommendation.term > 0 && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Term: {recommendation.term} years</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Policy Summary */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Policy Type:</span>
              <span className="font-semibold text-gray-900">
                {recommendation.type ? `${recommendation.type} Life Insurance` : 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Coverage Amount:</span>
              <span className="font-semibold text-gray-900">
                {recommendation.coverage ? formatCurrency(recommendation.coverage) : 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Policy Term:</span>
              <span className="font-semibold text-gray-900">
                {recommendation.term !== undefined 
                  ? (recommendation.term > 0 ? `${recommendation.term} years` : 'Lifetime')
                  : 'Not specified'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Generated:</span>
              <span className="font-semibold text-gray-900">
                {recommendation.createdAt ? formatDate(recommendation.createdAt) : 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Info className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Why This Recommendation?</h3>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {recommendation.explanation}
          </p>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {recommendation.type === 'term' ? (
            <>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Cost Effective</h4>
                  <p className="text-sm text-gray-600">Lower premiums for maximum coverage</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Flexible Terms</h4>
                  <p className="text-sm text-gray-600">Choose coverage duration that fits your needs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Simple Coverage</h4>
                  <p className="text-sm text-gray-600">Pure life insurance without investment component</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Lifelong Coverage</h4>
                  <p className="text-sm text-gray-600">Protection that lasts your entire lifetime</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Cash Value Growth</h4>
                  <p className="text-sm text-gray-600">Build savings while maintaining coverage</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Investment Component</h4>
                  <p className="text-sm text-gray-600">Dual benefit of protection and wealth building</p>
                </div>
              </div>
            </>
          )}
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900">Financial Security</h4>
              <p className="text-sm text-gray-600">Peace of mind for you and your loved ones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNewRecommendation}
            className="btn-secondary"
          >
            Get New Recommendation
          </button>
          <button
            onClick={() => window.print()}
            className="btn-primary"
          >
            Print Recommendation
          </button>
        </div>
      </div>
    </div>
  );
} 
