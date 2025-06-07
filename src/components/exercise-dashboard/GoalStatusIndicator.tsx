
import React from 'react';

interface GoalStatusIndicatorProps {
  weeklyGoal: number;
  shouldShowGoalLine: boolean;
  totalWeeklyCompletions: number;
  goalMet: boolean;
  weekHasEnded: boolean;
}

export const GoalStatusIndicator: React.FC<GoalStatusIndicatorProps> = ({
  weeklyGoal,
  shouldShowGoalLine,
  totalWeeklyCompletions,
  goalMet,
  weekHasEnded
}) => {
  if (weeklyGoal === 0 || !shouldShowGoalLine) return null;

  return (
    <div className="mt-4 text-center">
      <div className={`text-sm font-medium ${goalMet ? 'text-green-600' : weekHasEnded ? 'text-red-500' : 'text-gray-600'}`}>
        {totalWeeklyCompletions} / {weeklyGoal} odcvičených dní tento týždeň
        {goalMet && ' ✅'}
        {weekHasEnded && !goalMet && ' ❌'}
      </div>
    </div>
  );
};
