
import { startOfWeek, endOfWeek, isAfter, endOfDay } from 'date-fns';
import { CompletionDay } from '@/hooks/useCompletionData';

interface UseWeeklyGoalStatsProps {
  daysToDisplay: Date[];
  completionDays: CompletionDay[];
  weeklyGoal: number;
  goalCreatedAt?: string;
}

export const useWeeklyGoalStats = ({
  daysToDisplay,
  completionDays,
  weeklyGoal,
  goalCreatedAt
}: UseWeeklyGoalStatsProps) => {
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

  return {
    weekStart,
    weekEnd,
    totalWeeklyCompletions,
    goalMet,
    weekHasEnded,
    shouldShowGoalLine: shouldShowGoalLine(),
    lineColor: getLineColor()
  };
};
