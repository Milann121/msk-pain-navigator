import { useState, useEffect } from 'react';
import { UserAssessment } from '@/components/follow-up/types';
import exercisesByDifferential from '@/data/exercises';
import { Exercise } from '@/types/exercise';

interface TimelineProgress {
  totalWeeks: number;
  currentWeek: number;
  progressPercentage: number;
  isComplete: boolean;
  phases: Array<{
    weeksEnd: number;
    isComplete: boolean;
  }>;
}

export const useTimelineProgress = (assessment: UserAssessment): TimelineProgress => {
  const [timeline, setTimeline] = useState<TimelineProgress>({
    totalWeeks: 0,
    currentWeek: 0,
    progressPercentage: 0,
    isComplete: false,
    phases: []
  });

  useEffect(() => {
    const calculateTimeline = () => {
      // Get exercises for this assessment
      const specificKey = `${assessment.primary_mechanism}-${assessment.primary_differential}-${assessment.pain_area}`;
      const defaultKey = `${assessment.primary_mechanism}-default-${assessment.pain_area}`;
      
      const exercises: Exercise[] = exercisesByDifferential[specificKey] || 
                                   exercisesByDifferential[defaultKey] || [];

      if (exercises.length === 0) {
        return {
          totalWeeks: 0,
          currentWeek: 0,
          progressPercentage: 0,
          isComplete: false,
          phases: []
        };
      }

      // Calculate total timeline and phases
      let totalWeeks = 0;
      const phases: Array<{ weeksEnd: number; isComplete: boolean }> = [];
      
      exercises.forEach((exercise) => {
        if (exercise.timeline && exercise.timeline > 0) {
          totalWeeks += exercise.timeline;
          phases.push({
            weeksEnd: totalWeeks,
            isComplete: false // Will be calculated based on current progress
          });
        }
      });

      // Calculate current progress
      const programStartDate = assessment.program_start_date 
        ? new Date(assessment.program_start_date) 
        : new Date(assessment.timestamp);
      
      const currentDate = new Date();
      const daysSinceStart = Math.floor((currentDate.getTime() - programStartDate.getTime()) / (1000 * 60 * 60 * 24));
      const weeksSinceStart = daysSinceStart / 7;
      
      const currentWeek = Math.max(0, Math.min(weeksSinceStart, totalWeeks));
      const progressPercentage = totalWeeks > 0 ? (currentWeek / totalWeeks) * 100 : 0;
      const isComplete = weeksSinceStart >= totalWeeks;

      // Update phase completion status
      const updatedPhases = phases.map(phase => ({
        ...phase,
        isComplete: currentWeek >= phase.weeksEnd
      }));

      return {
        totalWeeks,
        currentWeek,
        progressPercentage: Math.min(100, progressPercentage),
        isComplete,
        phases: updatedPhases
      };
    };

    setTimeline(calculateTimeline());
  }, [assessment]);

  return timeline;
};