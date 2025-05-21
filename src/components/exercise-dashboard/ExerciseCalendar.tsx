
import { useState } from 'react';
import { 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  addWeeks, 
  subWeeks,
  format
} from 'date-fns';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { CalendarWeek } from './CalendarWeek';
import { useCompletionData } from '@/hooks/useCompletionData';

interface ExerciseCalendarProps {
  assessmentId?: string;
}

export const ExerciseCalendar = ({ assessmentId }: ExerciseCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { completionDays, loading } = useCompletionData(assessmentId);
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // End on Sunday
  
  // Add the previous day and the next day to show context
  const daysToDisplay = eachDayOfInterval({
    start: startDate,
    end: endDate
  });
  
  // Handle week navigation
  const handlePreviousWeek = () => {
    setCurrentDate(prevDate => subWeeks(prevDate, 1));
  };
  
  const handleNextWeek = () => {
    setCurrentDate(prevDate => addWeeks(prevDate, 1));
  };

  // Format the date range for display (e.g., "May 20 - May 26, 2025")
  const dateRangeText = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-medium">Kalendár cvičení</div>
          <div className="text-sm text-muted-foreground">{dateRangeText}</div>
        </div>
        <div className="relative">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="mr-1" 
              onClick={handlePreviousWeek}
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex-1">
              <Carousel className="w-full">
                <CarouselContent>
                  {/* Just show one week at a time */}
                  <CarouselItem className="basis-full">
                    <CalendarWeek
                      daysToDisplay={daysToDisplay}
                      completionDays={completionDays}
                      assessmentId={assessmentId}
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-1"
              onClick={handleNextWeek}
              aria-label="Next week"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
