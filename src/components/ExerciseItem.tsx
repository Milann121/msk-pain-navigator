
import React from 'react';
import { Exercise } from '@/types/exercise';
import ExerciseVideo from './ExerciseVideo';

interface ExerciseItemProps {
  exercise: Exercise;
}

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{exercise.title}</h3>
        <p className="text-gray-600">{exercise.description}</p>
      </div>
      
      <div className="space-y-6">
        {exercise.videos.map((video, videoIndex) => (
          <ExerciseVideo
            key={videoIndex}
            videoId={video.videoId}
            title={video.title}
            description={video.description}
            exerciseTitle={exercise.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseItem;
