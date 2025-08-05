import React from 'react';
import { UserAssessment } from '@/components/follow-up/types';
import { useTimelineProgress } from '@/hooks/useTimelineProgress';
import { useIsMobile } from '@/hooks/use-mobile';

interface TimelineProgressBarProps {
  assessment: UserAssessment;
}

export const TimelineProgressBar: React.FC<TimelineProgressBarProps> = ({ assessment }) => {
  const { totalWeeks, currentWeek, progressPercentage, isComplete, phases } = useTimelineProgress(assessment);
  const isMobile = useIsMobile();

  // Don't render if no timeline data
  if (totalWeeks === 0) return null;

  // Calculate ball position along the curved path
  const ballPosition = Math.min(progressPercentage, 100);
  
  // Create SVG path for curved journey
  const svgWidth = isMobile ? 200 : 180;
  const svgHeight = isMobile ? 40 : 32;
  const pathStartX = 10;
  const pathEndX = svgWidth - 10;
  const pathY = svgHeight / 2;
  
  // Create a slightly curved path
  const curvePath = `M ${pathStartX} ${pathY} Q ${svgWidth / 2} ${pathY - 8} ${pathEndX} ${pathY}`;
  
  // Calculate ball position along the path
  const ballX = pathStartX + (pathEndX - pathStartX) * (ballPosition / 100);
  const ballY = pathY - 4 * Math.sin((ballPosition / 100) * Math.PI); // Slight curve effect

  return (
    <div className={`flex flex-col items-center ${isMobile ? 'w-full mt-3' : 'flex-1 mx-4'}`}>
      {/* Progress visualization */}
      <div className="relative">
        <svg width={svgWidth} height={svgHeight} className="overflow-visible">
          {/* Background path */}
          <path
            d={curvePath}
            stroke="#e5e7eb"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Progress path */}
          <path
            d={curvePath}
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${ballPosition}% ${100 - ballPosition}%`}
            className="transition-all duration-500 ease-out"
          />
          
          {/* Phase markers */}
          {phases.map((phase, index) => {
            const markerX = pathStartX + (pathEndX - pathStartX) * (phase.weeksEnd / totalWeeks);
            const markerY = pathY - 4 * Math.sin((phase.weeksEnd / totalWeeks) * Math.PI);
            
            return (
              <circle
                key={index}
                cx={markerX}
                cy={markerY}
                r="4"
                fill={phase.isComplete ? "#10b981" : "#e5e7eb"}
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-colors duration-300"
              />
            );
          })}
          
          {/* Moving ball */}
          <circle
            cx={ballX}
            cy={ballY}
            r="6"
            fill={isComplete ? "#10b981" : "#3b82f6"}
            stroke="#ffffff"
            strokeWidth="2"
            className="transition-all duration-500 ease-out drop-shadow-sm"
          />
        </svg>
      </div>
      
      {/* Progress text */}
      <div className={`text-center mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
        <div className="text-muted-foreground">
          {Math.round(currentWeek * 10) / 10} / {totalWeeks} weeks
        </div>
        {isComplete && (
          <div className="text-green-600 font-medium text-xs">
            ✓ Completed
          </div>
        )}
      </div>
    </div>
  );
};