
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
      <div className="absolute top-[6.97rem] left-0 right-0 flex justify-center items-center pointer-events-none">
        <div className="flex">
          {mobileDisplayDays.slice(0, -1).map((day, index) => (
            <div
              key={`mobile-line-${index}`}
              className={`h-0.5 mx-1 ${lineColor}`}
              style={{
                width: '3.5rem', // Match the day width
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-[6.97rem] left-0 right-0 flex justify-between items-center px-7 pointer-events-none">
      {daysToDisplay.slice(0, -1).map((day, index) => (
        <div
          key={`line-${index}`}
          className={`h-0.5 flex-1 mx-1 ${lineColor}`}
          style={{
            width: 'calc((100% - 56px) / 6)', // Distribute evenly between 7 days
          }}
        />
      ))}
    </div>
  );
};
