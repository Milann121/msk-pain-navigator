
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
      {/* Single continuous line that spans across all circles */}
      <div className="flex-1 relative">
        {/* Calculate the positions for the line segments */}
        <div className="flex items-center justify-between px-12">
          {displayDays.map((day, index) => {
            const isLast = index === displayDays.length - 1;
            return (
              <div key={`connection-${index}`} className="flex items-center flex-1">
                {/* Circle placeholder (invisible, just for spacing) */}
                <div className="w-6 h-6 relative z-30"></div>
                {/* Line segment to next circle */}
                {!isLast && (
                  <div 
                    className={`h-0.5 flex-1 ${lineColor}`}
                    style={{
                      marginLeft: '12px', // Half circle width (24px/2)
                      marginRight: '12px'  // Half circle width (24px/2)
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
