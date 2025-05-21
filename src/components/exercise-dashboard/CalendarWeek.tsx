
import React from 'react';
import { isSameDay } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDay } from './CalendarDay';
import { CompletionDay } from '@/hooks/useCompletionData';

interface CalendarWeekProps {
  daysToDisplay: Date[];
  completionDays: CompletionDay[];
  assessmentId?: string;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = ({
  daysToDisplay,
  completionDays,
  assessmentId
}) => {
  // Get completion status for a specific date
  const getCompletionForDate = (date: Date): CompletionDay | undefined => {
    return completionDays.find(day => isSameDay(day.date, date));
  };
  
  return (
    <ScrollArea className="w-full overflow-auto">
      <div className="flex justify-between space-x-2">
        {daysToDisplay.map(day => (
          <CalendarDay
            key={day.toISOString()}
            day={day}
            completion={getCompletionForDate(day)}
            assessmentId={assessmentId}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
