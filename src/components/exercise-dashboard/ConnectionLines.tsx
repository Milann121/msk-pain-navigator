
import React from 'react';

interface ConnectionLinesProps {
  shouldShowGoalLine: boolean;
  isMobile: boolean;
  daysToDisplay: Date[];
  mobileDisplayDays: Date[];
  lineColor: string;
  goalMet: boolean;
  weekHasEnded: boolean;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  shouldShowGoalLine,
  isMobile,
  daysToDisplay,
  mobileDisplayDays,
  lineColor,
  goalMet,
  weekHasEnded
}) => {
  // Only show rectangle if goal is set and week has ended
  if (!shouldShowGoalLine || !weekHasEnded) return null;

  // Determine background color based on goal achievement
  const backgroundColor = goalMet ? 'bg-green-100' : 'bg-red-100';
  const borderColor = goalMet ? 'border-green-300' : 'border-red-300';

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Background rectangle wrapping all dates */}
      <div 
        className={`
          absolute top-4 left-8 right-8 bottom-4
          ${backgroundColor} ${borderColor}
          border rounded-lg opacity-50
        `}
      />
    </div>
  );
};
