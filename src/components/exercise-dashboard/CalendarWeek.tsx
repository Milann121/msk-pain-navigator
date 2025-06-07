
import React, { useState } from 'react';
import { isSameDay, startOfWeek, endOfWeek, isAfter, endOfDay } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay } from './CalendarDay';
import { CompletionDay } from '@/hooks/useCompletionData';
import { Locale } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [mobileStartIndex, setMobileStartIndex] = useState(0);
  
  // Mobile view shows 4 days at a time
  const mobileDisplayDays = isMobile ? daysToDisplay.slice(mobileStartIndex, mobileStartIndex + 4) : daysToDisplay;
  
  // Mobile navigation
  const canScrollLeft = mobileStartIndex > 0;
  const canScrollRight = mobileStartIndex + 4 < daysToDisplay.length;
  
  const handleScrollLeft = () => {
    if (canScrollLeft) {
      setMobileStartIndex(prev => Math.max(0, prev - 1));
    }
  };
  
  const handleScrollRight = () => {
    if (canScrollRight) {
      setMobileStartIndex(prev => Math.min(daysToDisplay.length - 4, prev + 1));
    }
  };

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
        {/* Mobile navigation arrows */}
        {isMobile && (
          <div className="flex justify-between items-center mb-2 px-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-xs text-gray-500">
              {mobileStartIndex + 1}-{Math.min(mobileStartIndex + 4, daysToDisplay.length)} z {daysToDisplay.length}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Connection lines between days - positioned at circle level */}
        {shouldShowGoalLine() && !isMobile && (
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
        
        {/* Mobile connection lines for 4 days */}
        {shouldShowGoalLine() && isMobile && (
          <div className="absolute top-[6.97rem] left-0 right-0 flex justify-center items-center pointer-events-none">
            <div className="flex">
              {mobileDisplayDays.slice(0, -1).map((day, index) => (
                <div
                  key={`mobile-line-${index}`}
                  className={`h-0.5 mx-1 ${getLineColor()}`}
                  style={{
                    width: '3.5rem', // Match the day width
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Calendar days */}
        <div className={`flex ${isMobile ? 'justify-center space-x-1' : 'justify-between space-x-2'} relative z-10`}>
          {mobileDisplayDays.map(day => (
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
