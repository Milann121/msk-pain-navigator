
import React from 'react';

interface ConnectionLinesProps {
  shouldShowGoalLine: boolean;
  isMobile: boolean;
  daysToDisplay: Date[];
  mobileDisplayDays: Date[];
  lineColor: string;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  shouldShowGoalLine,
  isMobile,
  daysToDisplay,
  mobileDisplayDays,
  lineColor
}) => {
  if (!shouldShowGoalLine) return null;

  if (isMobile) {
    return (
      <div className="absolute top-[6.97rem] left-12 right-12 flex justify-between items-center pointer-events-none">
        {mobileDisplayDays.slice(0, -1).map((day, index) => (
          <div
            key={`mobile-line-${index}`}
            className={`h-0.5 flex-1 mx-2 ${lineColor}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute top-[6.97rem] left-12 right-12 flex justify-between items-center pointer-events-none">
      {daysToDisplay.slice(0, -1).map((day, index) => (
        <div
          key={`line-${index}`}
          className={`h-0.5 flex-1 mx-2 ${lineColor}`}
        />
      ))}
    </div>
  );
};
