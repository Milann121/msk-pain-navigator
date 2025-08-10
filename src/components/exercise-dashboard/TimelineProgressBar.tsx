import React from 'react';
import { UserAssessment } from '@/components/follow-up/types';
import { useTimelineProgress } from '@/hooks/useTimelineProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

interface TimelineProgressBarProps {
  assessment: UserAssessment;
}

export const TimelineProgressBar: React.FC<TimelineProgressBarProps> = ({ assessment }) => {
  const { totalWeeks, currentWeek, progressPercentage, isComplete, phases } = useTimelineProgress(assessment);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Don't render if no timeline data
  if (totalWeeks === 0) return null;

  // Calculate ball position along the straight line
  const ballPosition = Math.min(progressPercentage, 100);
  
  // Create SVG dimensions for straight line
  const svgWidth = isMobile ? 300 : 240;
  const svgHeight = isMobile ? 40 : 48;
  const lineStartX = 10;
  const lineEndX = svgWidth - 10;
  const lineY = svgHeight / 2; // Center the line vertically
  
  // Create straight horizontal path
  const straightPath = `M ${lineStartX} ${lineY} L ${lineEndX} ${lineY}`;
  
  // Calculate ball position along the straight line
  const progress = ballPosition / 100;
  const ballX = lineStartX + (lineEndX - lineStartX) * progress;
  const ballY = lineY;

  return (
    <div className={`flex flex-col items-center ${isMobile ? 'w-full mt-3' : 'flex-1 mx-4'}`}>
      {/* Progress visualization */}
      <div className="relative">
        <svg width={svgWidth} height={svgHeight} className="overflow-visible">
          {/* Background path */}
          <path
            d={straightPath}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="text-muted-foreground/30"
          />
          
          {/* Progress path */}
          <path
            d={`M ${lineStartX} ${lineY} L ${ballX} ${lineY}`}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="text-primary transition-all duration-500 ease-out"
          />
          
          {/* Phase markers */}
          {phases.map((phase, index) => {
            const phaseProgress = phase.weeksEnd / totalWeeks;
            // Calculate marker position along the straight line
            const markerX = lineStartX + (lineEndX - lineStartX) * phaseProgress;
            const markerY = lineY;
            
            return (
              <circle
                key={index}
                cx={markerX}
                cy={markerY}
                r="5"
                fill={phase.isComplete ? "#10b981" : "#94a3b8"}
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
          {t('myExercises.timeline.weeksProgress', { current: Math.round(currentWeek * 10) / 10, total: totalWeeks })}
        </div>
        {isComplete && (
          <div className="text-green-600 font-medium text-xs">
            ✓ {t('myExercises.timeline.completed')}
          </div>
        )}
      </div>
    </div>
  );
};