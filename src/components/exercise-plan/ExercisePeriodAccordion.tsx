
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExerciseVideoSection } from './ExerciseVideoSection';
import { useTranslation } from 'react-i18next';

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

interface ExercisePeriodAccordionProps {
  exercises: Exercise[];
  showGeneral: boolean;
  assessmentId?: string;
}

// Helper function for Slovak pluralization
function getCvikLabel(t: (k: string) => string, count: number) {
  if (count === 1) return t('exerciseCvik.one');
  if (count >= 2 && count <= 4) return t('exerciseCvik.few');
  return t('exerciseCvik.many');
}

export const ExercisePeriodAccordion = ({
  exercises,
  showGeneral,
  assessmentId
}: ExercisePeriodAccordionProps) => {
  const { t } = useTranslation();
  
  // Helper function to get translated text
  const getTranslatedText = (text: string) => {
    if (text.startsWith('exercises.')) {
      return t(text);
    }
    return text;
  };

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {exercises.map((exercise, index) => {
        const translatedTitle = getTranslatedText(exercise.title);
        const translatedDescription = getTranslatedText(exercise.description);
        
        return (
          <AccordionItem key={index} value={`period-${index}`} className="border rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900">{translatedTitle}</h2>
                <p className="text-gray-600 mt-2">{translatedDescription}</p>
                <div className="mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium inline-block">
                  {t('exercisePlan.sectionSummary', { count: exercise.videos.length, label: getCvikLabel(t, exercise.videos.length) })}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {exercise.videos.map((video, videoIndex) => (
                  <ExerciseVideoSection
                    key={videoIndex}
                    video={video}
                    exerciseTitle={translatedTitle}
                    showGeneral={showGeneral}
                    assessmentId={assessmentId}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
