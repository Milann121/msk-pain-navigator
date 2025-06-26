
import React from 'react';
import { Exercise } from '@/types/exercise';
import { ExerciseVideoSection } from './ExerciseVideoSection';
import { AdviceList } from '@/components/advice';

interface ExercisePeriodSectionProps {
  exercise: Exercise;
  showGeneral: boolean;
  assessmentId?: string;
}

export const ExercisePeriodSection = ({
  exercise,
  showGeneral,
  assessmentId
}: ExercisePeriodSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Exercise videos */}
      <div className="space-y-6">
        {exercise.videos.map((video, videoIndex) => (
          <ExerciseVideoSection
            key={videoIndex}
            video={video}
            exerciseTitle={exercise.title}
            showGeneral={showGeneral}
            assessmentId={assessmentId}
          />
        ))}
      </div>

      {/* Advices section */}
      {exercise.advices && exercise.advices.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Dôležité rady</h3>
          <AdviceList adviceIds={exercise.advices} />
        </div>
      )}
    </div>
  );
};
