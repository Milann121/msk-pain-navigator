
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
      <div className="absolute top-[7.5rem] left-0 right-0 flex items-center pointer-events-none px-12">
        {mobileDisplayDays.slice(0, -1).map((day, index) => (
          <div
            key={`mobile-line-${index}`}
            className={`h-0.5 flex-1 ${lineColor}`}
            style={{ marginLeft: '1.rem', marginRight: '1.rem' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute top-[7.5rem] left-0 right-0 flex items-center pointer-events-none px-12">
      {daysToDisplay.slice(0, -1).map((day, index) => (
        <div
          key={`line-${index}`}
          className={`h-0.5 flex-1 ${lineColor}`}
          style={{ marginLeft: '1.5rem', marginRight: '1.5rem' }}
        />
      ))}
    </div>
  );
};
