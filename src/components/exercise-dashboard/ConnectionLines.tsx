
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

  const displayDays = isMobile ? mobileDisplayDays : daysToDisplay;

  return (
    <div className="absolute top-[7rem] left-0 right-0 flex items-center pointer-events-none">
      {/* Left padding to align with first circle */}
      <div className="w-4" />
      
      {/* Container for circles and lines */}
      <div className="flex-1 flex items-center justify-between relative">
        {displayDays.map((day, index) => (
          <React.Fragment key={`connection-${index}`}>
            {/* Circle placeholder to maintain spacing */}
            <div className="w-6 h-6 flex-shrink-0" />
            
            {/* Connection line (except after the last circle) */}
            {index < displayDays.length - 1 && (
              <div className={`h-0.5 flex-1 ${lineColor}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Right padding to align with last circle */}
      <div className="w-4" />
    </div>
  );
};
