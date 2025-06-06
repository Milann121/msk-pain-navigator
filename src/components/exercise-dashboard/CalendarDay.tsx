
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { CheckIcon } from 'lucide-react';
import { CompletionDay } from '@/hooks/useCompletionData';
import { Locale } from 'date-fns';

interface CalendarDayProps {
  day: Date;
  completion?: CompletionDay;
  assessmentId?: string;
  locale?: Locale;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  completion, 
  assessmentId,
  locale
}) => {
  const isCompleted = completion !== undefined;
  const completionCount = completion?.count || 0;
  const isForCurrentAssessment = assessmentId 
    ? completion?.assessmentIds.includes(assessmentId)
    : false;
  
  // Highlight the current assessment's completions specially
  const specialHighlight = assessmentId && isForCurrentAssessment;
  
  return (
    <div 
      key={format(day, 'yyyy-MM-dd')}
      className={`flex flex-col items-center min-w-[3.5rem] ${
        isSameDay(day, new Date()) 
          ? 'bg-blue-50 rounded-lg'
          : ''
      }`}
    >
      <div className="text-xs font-medium">
        {format(day, 'EEE', { locale })}
      </div>
      <div className={`
        text-base font-bold my-2 h-8 w-8 flex items-center justify-center rounded-full
        ${isSameDay(day, new Date()) ? 'bg-blue-100' : ''}
      `}>
        {format(day, 'd', { locale })}
      </div>
      <div className="text-xs text-gray-500 mb-1">
        {format(day, 'MMM', { locale })}
      </div>
      <div 
        className={`
          h-6 w-6 rounded-full border flex items-center justify-center relative z-20
          ${isCompleted 
            ? specialHighlight
              ? 'bg-green-500 border-green-600 shadow-lg' 
              : 'bg-green-200 border-green-300'
            : 'border-gray-300 bg-white'
          }
        `}
        title={`${completionCount} cvičení${completionCount === 0 ? '' : isForCurrentAssessment ? ' (aktuálne hodnotenie)' : ''}`}
      >
        {isCompleted && <CheckIcon className="h-4 w-4 text-white" />}
      </div>
      {completionCount > 0 && (
        <div className={`text-xs font-medium mt-1 ${specialHighlight ? 'text-green-600' : 'text-gray-600'}`}>
          {completionCount}x
        </div>
      )}
    </div>
  );
};
