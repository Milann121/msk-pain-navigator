
import { useState } from 'react';
import { 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  addWeeks, 
  subWeeks
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
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="text-lg font-medium mb-4">Kalendár cvičení</div>
        <div className="relative">
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
            <CarouselPrevious onClick={handlePreviousWeek} />
            <CarouselNext onClick={handleNextWeek} />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  );
};
