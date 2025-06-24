
import React from 'react';
import { Exercise } from '@/types/exercise';
import ExerciseVideo from './ExerciseVideo';
import { useTranslation } from 'react-i18next';

interface ExerciseItemProps {
  exercise: Exercise;
}

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  const { t } = useTranslation();
  
  // Helper function to get translated text
  const getTranslatedText = (text: string) => {
    if (text.startsWith('exercises.')) {
      return t(text);
    }
    return text;
  };

  const translatedTitle = getTranslatedText(exercise.title);
  const translatedDescription = getTranslatedText(exercise.description);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{translatedTitle}</h3>
        <p className="text-gray-600">
          {translatedDescription.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      
      <div className="space-y-6">
        {exercise.videos.map((video, videoIndex) => (
          <ExerciseVideo
            key={videoIndex}
            videoId={video.videoId}
            title={video.title}
            description={video.description}
            exerciseTitle={translatedTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseItem;
