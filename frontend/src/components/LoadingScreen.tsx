'use client';

import LoadingSpinner from './LoadingSpinner';
import { LoadingScreenProps } from '@/lib/types';

export default function LoadingScreen({ title, subtitle, showSteps = false }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <LoadingSpinner 
        title={title}
        subtitle={subtitle}
        showSteps={showSteps}
      />
    </div>
  );
} 
