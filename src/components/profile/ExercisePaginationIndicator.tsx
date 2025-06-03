
import React from 'react';

interface ExercisePaginationIndicatorProps {
  totalPages: number;
  currentPage: number;
}

export const ExercisePaginationIndicator = ({ 
  totalPages, 
  currentPage 
}: ExercisePaginationIndicatorProps) => {
  return (
    <div className="flex justify-center mt-4 gap-1">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            currentPage === index
              ? 'bg-blue-600'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
