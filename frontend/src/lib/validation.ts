import { ValidationErrors } from './types';

interface FormData {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: string;
}

export const validateRecommendationForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Age validation
  if (!formData.age) {
    errors.age = 'Age is required';
  } else if (formData.age < 18) {
    errors.age = 'Age must be at least 18 years old';
  } else if (formData.age > 80) {
    errors.age = 'Age must be 80 years or less';
  } else if (!Number.isInteger(formData.age)) {
    errors.age = 'Age must be a whole number';
  }

  // Income validation
  if (!formData.income) {
    errors.income = 'Annual income is required';
  } else if (formData.income < 0) {
    errors.income = 'Income cannot be negative';
  } else if (formData.income > 10000000) {
    errors.income = 'Income must be less than $10,000,000';
  }

  // Dependents validation
  if (formData.dependents < 0) {
    errors.dependents = 'Number of dependents cannot be negative';
  } else if (formData.dependents > 20) {
    errors.dependents = 'Number of dependents must be 20 or less';
  } else if (!Number.isInteger(formData.dependents)) {
    errors.dependents = 'Number of dependents must be a whole number';
  }

  // Risk tolerance validation
  if (!formData.riskTolerance || !['low', 'medium', 'high'].includes(formData.riskTolerance)) {
    errors.riskTolerance = 'Please select a risk tolerance level';
  }

  return errors;
};

export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
}; 
