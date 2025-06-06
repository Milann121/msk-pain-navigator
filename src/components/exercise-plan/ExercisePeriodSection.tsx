
import React from 'react';
import { ExerciseVideoSection } from './ExerciseVideoSection';

interface Exercise {
  title: string;
  description: string;
  videos: Array<{
    videoId: string;
    title?: string;
    description?: string;
    importance?: 1 | 2 | 3;
  }>;
}

interface ExercisePeriodSectionProps {
  exercise: Exercise;
  index: number;
  showGeneral: boolean;
  assessmentId?: string;
}

export const ExercisePeriodSection = ({ 
  exercise, 
  index, 
  showGeneral, 
  assessmentId 
}: ExercisePeriodSectionProps) => {
  return (
    <div key={index} className="space-y-4">
      {/* Period title with larger size */}
      <h2 className="text-3xl font-bold text-gray-900">{exercise.title}</h2>
      <p className="text-gray-600">{exercise.description}</p>
      
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
    </div>
  );
};
