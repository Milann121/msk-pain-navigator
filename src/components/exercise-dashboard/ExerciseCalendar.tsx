
import { useState, useEffect } from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
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
import { CheckIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CompletionDay {
  date: Date;
  count: number;
  assessmentIds: string[];
}

interface ExerciseCalendarProps {
  assessmentId?: string;
}

export const ExerciseCalendar = ({ assessmentId }: ExerciseCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completionDays, setCompletionDays] = useState<CompletionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // End on Sunday
  
  // Add the previous day and the next day to show context
  const daysToDisplay = eachDayOfInterval({
    start: startDate,
    end: endDate
  });
  
  useEffect(() => {
    const fetchCompletionData = async () => {
      if (!user) return;
      
      setLoading(true);
      
      try {
        // Get all exercise completion records for the user
        const { data, error } = await supabase
          .from('completed_exercises')
          .select('completed_at, assessment_id')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });
          
        if (error) throw error;
        
        // Process the data to group by date
        const completions: Record<string, CompletionDay> = {};
        
        (data || []).forEach(completion => {
          const completionDate = new Date(completion.completed_at);
          const dateKey = format(completionDate, 'yyyy-MM-dd');
          
          if (!completions[dateKey]) {
            completions[dateKey] = {
              date: completionDate,
              count: 0,
              assessmentIds: []
            };
          }
          
          completions[dateKey].count += 1;
          
          if (!completions[dateKey].assessmentIds.includes(completion.assessment_id)) {
            completions[dateKey].assessmentIds.push(completion.assessment_id);
          }
        });
        
        setCompletionDays(Object.values(completions));
      } catch (error) {
        console.error('Error fetching completion data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompletionData();
    
    // Listen for exercise completion events to refresh the calendar
    const handleExerciseCompleted = () => {
      fetchCompletionData();
    };
    
    window.addEventListener('exercise-completed', handleExerciseCompleted);
    
    // Set up a real-time subscription to completed_exercises changes
    const channel = supabase
      .channel('exercise_completions')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'completed_exercises',
          filter: `user_id=eq.${user?.id}`
        }, 
        () => {
          fetchCompletionData();
        }
      )
      .subscribe();
    
    return () => {
      window.removeEventListener('exercise-completed', handleExerciseCompleted);
      supabase.removeChannel(channel);
    };
  }, [user, assessmentId]);
  
  // Get completion status for a specific date
  const getCompletionForDate = (date: Date): CompletionDay | undefined => {
    return completionDays.find(day => isSameDay(day.date, date));
  };
  
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
                <ScrollArea className="w-full overflow-auto">
                  <div className="flex justify-between space-x-2">
                    {daysToDisplay.map(day => {
                      const completion = getCompletionForDate(day);
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
                            {format(day, 'EEE')}
                          </div>
                          <div className={`
                            text-base font-bold my-2 h-8 w-8 flex items-center justify-center rounded-full
                            ${isSameDay(day, new Date()) ? 'bg-blue-100' : ''}
                          `}>
                            {format(day, 'd')}
                          </div>
                          <div className="text-xs text-gray-500 mb-1">
                            {format(day, 'MMM')}
                          </div>
                          <div 
                            className={`
                              h-6 w-6 rounded-full border flex items-center justify-center
                              ${isCompleted 
                                ? specialHighlight
                                  ? 'bg-green-500 border-green-600' 
                                  : 'bg-green-200 border-green-300'
                                : 'border-gray-300'
                              }
                            `}
                            title={`${completionCount} cvičení${completionCount === 0 ? '' : isForCurrentAssessment ? ' (aktuálne hodnotenie)' : ''}`}
                          >
                            {isCompleted && <CheckIcon className="h-4 w-4 text-white" />}
                          </div>
                          {completionCount > 0 && (
                            <div className="text-xs font-medium mt-1">
                              {completionCount}x
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
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
