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
  
  // Create SVG path for downward sloping curved journey
  const svgWidth = isMobile ? 200 : 160;
  const svgHeight = isMobile ? 40 : 48;
  const pathStartX = 10;
  const pathEndX = svgWidth - 10;
  const pathStartY = svgHeight * 0.35; // Start higher on the left
  const pathEndY = svgHeight * 0.65;   // End lower on the right
  const controlX = svgWidth / 2;
  const controlY = svgHeight * 0.45;   // Control point for gentle downward curve
  
  // Create downward sloping curved path
  const curvePath = `M ${pathStartX} ${pathStartY} Q ${controlX} ${controlY} ${pathEndX} ${pathEndY}`;
  
  // Calculate ball position along the downward curved path
  const progress = ballPosition / 100;
  // Quadratic bezier curve calculation for both X and Y positions
  const t = progress;
  const ballX = Math.pow(1 - t, 2) * pathStartX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * pathEndX;
  const ballY = Math.pow(1 - t, 2) * pathStartY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * pathEndY;

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
            const phaseProgress = phase.weeksEnd / totalWeeks;
            // Calculate marker position along the downward curved path
            const t = phaseProgress;
            const markerX = Math.pow(1 - t, 2) * pathStartX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * pathEndX;
            const markerY = Math.pow(1 - t, 2) * pathStartY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * pathEndY;
            
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