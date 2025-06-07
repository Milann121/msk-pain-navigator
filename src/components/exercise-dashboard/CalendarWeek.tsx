
import React from 'react';
import { Locale } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay } from './CalendarDay';
import { CompletionDay } from '@/hooks/useCompletionData';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileNavigation } from './useMobileNavigation';
import { useWeeklyGoalStats } from './useWeeklyGoalStats';
import { getCompletionForDate } from './completionHelpers';
import { GoalStatusIndicator } from './GoalStatusIndicator';
import { ConnectionLines } from './ConnectionLines';

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
  
  const {
    mobileDisplayDays,
    canScrollLeft,
    canScrollRight,
    handleScrollLeft,
    handleScrollRight
  } = useMobileNavigation({
    daysToDisplay,
    isMobile,
    onPreviousWeek,
    onNextWeek
  });

  const {
    totalWeeklyCompletions,
    goalMet,
    weekHasEnded,
    shouldShowGoalLine,
    lineColor
  } = useWeeklyGoalStats({
    daysToDisplay,
    completionDays,
    weeklyGoal,
    goalCreatedAt
  });
  
  return (
    <ScrollArea className="w-full overflow-auto">
      <div className="relative">
        {/* Connection lines between days - positioned at circle level */}
        <ConnectionLines
          shouldShowGoalLine={shouldShowGoalLine}
          isMobile={isMobile}
          daysToDisplay={daysToDisplay}
          mobileDisplayDays={mobileDisplayDays}
          lineColor={lineColor}
        />
        
        {/* Calendar days with navigation arrows */}
        <div className="relative">
          <div className={`flex ${isMobile ? 'justify-between items-center px-4' : 'justify-between items-center'} relative z-10`}>
            {/* Left arrow */}
            <Button 
              variant="ghost" 
              size="icon"
              className={`${isMobile ? 'h-8 w-8' : 'mr-2'} flex-shrink-0`}
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label={isMobile ? "Previous dates" : "Previous week"}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Calendar days - full width container */}
            <div className={`flex-1 flex ${isMobile ? 'justify-evenly' : 'justify-between px-4'}`}>
              {mobileDisplayDays.map(day => (
                <CalendarDay
                  key={day.toISOString()}
                  day={day}
                  completion={getCompletionForDate(day, completionDays)}
                  assessmentId={assessmentId}
                  locale={locale}
                />
              ))}
            </div>
            
            {/* Right arrow */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${isMobile ? 'h-8 w-8' : 'ml-2'} flex-shrink-0`}
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label={isMobile ? "Next dates" : "Next week"}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Goal status indicator */}
        <GoalStatusIndicator
          weeklyGoal={weeklyGoal}
          shouldShowGoalLine={shouldShowGoalLine}
          totalWeeklyCompletions={totalWeeklyCompletions}
          goalMet={goalMet}
          weekHasEnded={weekHasEnded}
        />
      </div>
    </ScrollArea>
  );
};
