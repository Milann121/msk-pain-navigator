
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
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
}

export const CalendarWeek: React.FC<CalendarWeekProps> = ({
  daysToDisplay,
  completionDays,
  assessmentId,
  locale,
  weeklyGoal = 0,
  goalCreatedAt,
  onPreviousWeek,
  onNextWeek
}) => {
  const isMobile = useIsMobile();
  const [mobileStartIndex, setMobileStartIndex] = useState(0);
  
  // Mobile view shows 4 days at a time
  const mobileDisplayDays = isMobile ? daysToDisplay.slice(mobileStartIndex, mobileStartIndex + 4) : daysToDisplay;
  
  // Mobile navigation - move by 4 days
  const canScrollLeft = mobileStartIndex > 0;
  const canScrollRight = mobileStartIndex + 4 < daysToDisplay.length;
  
  const handleScrollLeft = () => {
    if (isMobile) {
      if (mobileStartIndex >= 4) {
        setMobileStartIndex(prev => prev - 4);
      } else {
        // Move to previous week and reset mobile index
        if (onPreviousWeek) {
          onPreviousWeek();
          setMobileStartIndex(3); // Start from the last 4 days of previous week
        }
      }
    } else {
      if (onPreviousWeek) {
        onPreviousWeek();
      }
    }
  };
  
  const handleScrollRight = () => {
    if (isMobile) {
      if (mobileStartIndex + 8 <= daysToDisplay.length) {
        setMobileStartIndex(prev => prev + 4);
      } else {
        // Move to next week and reset mobile index
        if (onNextWeek) {
          onNextWeek();
          setMobileStartIndex(0); // Start from the beginning of next week
        }
      }
    } else {
      if (onNextWeek) {
        onNextWeek();
      }
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
        
        {/* Calendar days with navigation arrows */}
        <div className="relative">
          <div className={`flex ${isMobile ? 'justify-center space-x-1' : 'justify-between space-x-2'} relative z-10`}>
            {/* Left arrow for mobile */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8" 
                onClick={handleScrollLeft}
                disabled={!canScrollLeft && mobileStartIndex === 0}
                aria-label="Previous dates"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            
            {/* Desktop left arrow */}
            {!isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                className="mr-1" 
                onClick={handleScrollLeft}
                aria-label="Previous week"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            
            {/* Calendar days */}
            <div className={`flex ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
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
            
            {/* Right arrow for mobile */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8"
                onClick={handleScrollRight}
                disabled={!canScrollRight && mobileStartIndex + 4 >= daysToDisplay.length}
                aria-label="Next dates"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            
            {/* Desktop right arrow */}
            {!isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-1"
                onClick={handleScrollRight}
                aria-label="Next week"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
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
