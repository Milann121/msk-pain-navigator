
import { useState, useEffect } from 'react';
import { 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  addWeeks, 
  subWeeks,
  format
} from 'date-fns';
import { sk } from 'date-fns/locale/sk';
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
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

import { CalendarWeek } from './CalendarWeek';
import { useCompletionData } from '@/hooks/useCompletionData';

interface ExerciseCalendarProps {
  assessmentId?: string;
}

export const ExerciseCalendar = ({ assessmentId }: ExerciseCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyGoal, setWeeklyGoal] = useState<number>(0);
  const { user } = useAuth();
  const { completionDays, loading } = useCompletionData(assessmentId);
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // End on Sunday
  
  // Add the previous day and the next day to show context
  const daysToDisplay = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  // Fetch weekly exercise goal
  useEffect(() => {
    const fetchWeeklyGoal = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_goals')
          .select('goal_value')
          .eq('user_id', user.id)
          .eq('goal_type', 'weekly_exercise')
          .single();

        if (error) {
          console.log('No weekly goal set:', error);
          setWeeklyGoal(0);
        } else {
          setWeeklyGoal(data?.goal_value || 0);
        }
      } catch (error) {
        console.error('Error fetching weekly goal:', error);
        setWeeklyGoal(0);
      }
    };

    fetchWeeklyGoal();
  }, [user]);
  
  // Handle week navigation
  const handlePreviousWeek = () => {
    setCurrentDate(prevDate => subWeeks(prevDate, 1));
  };
  
  const handleNextWeek = () => {
    setCurrentDate(prevDate => addWeeks(prevDate, 1));
  };

  // Handle reset to today
  const handleGoToToday = () => {
    setCurrentDate(new Date());
  };

  // Format the date range for display using Slovak locale (e.g., "20. máj - 26. máj 2025")
  const dateRangeText = `${format(startDate, 'd. MMM', { locale: sk })} - ${format(endDate, 'd. MMM yyyy', { locale: sk })}`;
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-medium">Kalendár cvičení</div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleGoToToday} 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 px-3 py-1 text-xs rounded-md border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              <CalendarDays className="h-3 w-3" />
              Dnes
            </Button>
            <div className="text-sm text-muted-foreground">{dateRangeText}</div>
          </div>
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
                      locale={sk}
                      weeklyGoal={weeklyGoal}
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
