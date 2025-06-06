
import React from 'react';
import { isSameDay, startOfWeek, endOfWeek, isAfter, endOfDay } from 'date-fns';
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
  goalCreatedAt?: string;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = ({
  daysToDisplay,
  completionDays,
  assessmentId,
  locale,
  weeklyGoal = 0,
  goalCreatedAt
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
  
  // Check if the week has ended (current time is after the end of Sunday)
  const currentTime = new Date();
  const weekHasEnded = isAfter(currentTime, endOfDay(weekEnd));
  
  // Check if this week should show the goal line (goal was set before or during this week)
  const shouldShowGoalLine = () => {
    if (!goalCreatedAt || weeklyGoal === 0) return false;
    
    const goalCreatedDate = new Date(goalCreatedAt);
    const goalCreatedWeekStart = startOfWeek(goalCreatedDate, { weekStartsOn: 1 });
    
    // Show line if current week starts from the week when goal was created or later
    return weekStart >= goalCreatedWeekStart;
  };
  
  // Determine line color: grey by default, green if goal met, red only if week ended and goal missed
  const getLineColor = () => {
    if (goalMet) return 'bg-green-500';
    if (weekHasEnded && !goalMet) return 'bg-red-500';
    return 'bg-gray-300'; // Default grey
  };
  
  return (
    <ScrollArea className="w-full overflow-auto">
      <div className="relative">
        {/* Connection lines between days - positioned at circle level */}
        {shouldShowGoalLine() && (
          <div className="absolute top-[6.97rem] left-0 right-0 flex justify-between items-center px-7 pointer-events-none">
            {daysToDisplay.slice(0, -1).map((day, index) => (
              <div
                key={`line-${index}`}
                className={`h-0.5 flex-1 mx-1 ${getLineColor()}`}
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
        {weeklyGoal > 0 && shouldShowGoalLine() && (
          <div className="mt-4 text-center">
            <div className={`text-sm font-medium ${goalMet ? 'text-green-600' : weekHasEnded ? 'text-red-500' : 'text-gray-600'}`}>
              {totalWeeklyCompletions} / {weeklyGoal} odcvičených dní tento týždeň
              {goalMet && ' ✅'}
              {weekHasEnded && !goalMet && ' ❌'}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
