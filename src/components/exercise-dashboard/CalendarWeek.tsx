
import React from 'react';
import { isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDay } from './CalendarDay';
import { CompletionDay } from '@/hooks/useCompletionData';
import { Locale } from 'date-fns';

interface CalendarWeekProps {
  daysToDisplay: Date[];
  completionDays: CompletionDay[];
  assessmentId?: string;
  locale?: Locale;
  weeklyGoal?: number;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = ({
  daysToDisplay,
  completionDays,
  assessmentId,
  locale,
  weeklyGoal = 0
}) => {
  // Get completion status for a specific date
  const getCompletionForDate = (date: Date): CompletionDay | undefined => {
    return completionDays.find(day => isSameDay(day.date, date));
  };

  // Calculate weekly completion statistics
  const weekStart = startOfWeek(daysToDisplay[0], { weekStartsOn: 1 });
  const weekEnd = endOfWeek(daysToDisplay[0], { weekStartsOn: 1 });
  
  const weekCompletions = completionDays.filter(completion => 
    completion.date >= weekStart && completion.date <= weekEnd
  );
  
  const totalWeeklyCompletions = weekCompletions.length;
  const goalMet = totalWeeklyCompletions >= weeklyGoal;
  
  return (
    <ScrollArea className="w-full overflow-auto">
      <div className="relative">
        {/* Connection lines between days - positioned at circle level */}
        {weeklyGoal > 0 && (
          <div className="absolute top-[5.75rem] left-0 right-0 flex justify-between items-center px-7 pointer-events-none">
            {daysToDisplay.slice(0, -1).map((day, index) => (
              <div
                key={`line-${index}`}
                className={`h-0.5 flex-1 mx-1 ${
                  goalMet ? 'bg-green-500' : 'bg-red-400'
                }`}
                style={{
                  width: 'calc((100% - 56px) / 6)', // Distribute evenly between 7 days
                }}
              />
            ))}
          </div>
        )}
        
        {/* Calendar days */}
        <div className="flex justify-between space-x-2 relative z-10">
          {daysToDisplay.map(day => (
            <CalendarDay
              key={day.toISOString()}
              day={day}
              completion={getCompletionForDate(day)}
              assessmentId={assessmentId}
              locale={locale}
            />
          ))}
        </div>
        
        {/* Goal status indicator */}
        {weeklyGoal > 0 && (
          <div className="mt-4 text-center">
            <div className={`text-sm font-medium ${goalMet ? 'text-green-600' : 'text-red-500'}`}>
              {totalWeeklyCompletions} / {weeklyGoal} cvičení tento týždeň
              {goalMet && ' ✅'}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
