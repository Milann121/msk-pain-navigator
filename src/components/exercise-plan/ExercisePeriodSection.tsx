
import React from 'react';
import { Exercise } from '@/types/exercise';
import { ExerciseVideoSection } from './ExerciseVideoSection';
import { useTranslation } from 'react-i18next';
import { AdviceList } from '@/components/advice';

interface ExercisePeriodSectionProps {
  exercise: Exercise;
  showGeneral?: boolean;
  assessmentId?: string;
}

export const ExercisePeriodSection = ({ exercise, showGeneral = false, assessmentId }: ExercisePeriodSectionProps) => {
  const { t } = useTranslation(['translation', 'advice']);
  
  // Helper function to get translated text
  const getTranslatedText = (text: string) => {
    if (!text) return '';
    
    // If it's a translation key, translate it
    if (text.startsWith('exercises.')) {
      const translated = t(text);
      // If translation returns the same key, it means translation wasn't found
      return translated === text ? text : translated;
    }
    
    return text;
  };
  
  // For general program, translate the title and description
  const displayTitle = showGeneral && exercise.title === 'General Program' 
    ? t('generalProgram.title') 
    : getTranslatedText(exercise.title);
    
  const displayDescription = showGeneral && exercise.description === 'Personalized program with the most important exercises from your programs'
    ? t('generalProgram.description')
    : getTranslatedText(exercise.description);

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {displayTitle}
        </h2>
        <p className="text-gray-600 text-sm">
          {displayDescription}
        </p>
      </div>
      
      {/* Advice Section - Moved above exercises */}
      {exercise.advices && exercise.advices.length > 0 && (
        <div className="mb-6 border-b pb-6">
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              {t('exerciseDisclaimer')}
            </p>
          </div>
          <AdviceList adviceIds={exercise.advices} />
        </div>
      )}
      
      <div className="space-y-6">
        {exercise.videos.map((video, index) => (
          <ExerciseVideoSection
            key={video.videoId}
            video={video}
            exerciseTitle={displayTitle}
            showGeneral={showGeneral}
            assessmentId={assessmentId}
          />
        ))}
      </div>
    </div>
  );
};
