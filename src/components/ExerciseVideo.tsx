
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ExerciseVideoProps {
  videoId: string;
  title?: string;
  description?: string;
  exerciseTitle: string;
}

const ExerciseVideo = ({ videoId, title, description, exerciseTitle }: ExerciseVideoProps) => {
  const { t } = useTranslation();
  
  // Helper function to get translated text
  const getTranslatedText = (text: string) => {
    if (text.startsWith('exercises.') || text.startsWith('stretchingPrograms.') || text.startsWith('strengthPrograms.') || text.startsWith('yogaPrograms.')) {
      return t(text);
    }
    return text;
  };

  const translatedTitle = title ? getTranslatedText(title) : '';
  const translatedDescription = description ? getTranslatedText(description) : '';
  const translatedExerciseTitle = getTranslatedText(exerciseTitle);

  return (
    <div className="aspect-video w-full">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={translatedTitle || translatedExerciseTitle}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default ExerciseVideo;
