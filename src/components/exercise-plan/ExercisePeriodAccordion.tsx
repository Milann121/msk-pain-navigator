
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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

interface ExercisePeriodAccordionProps {
  exercises: Exercise[];
  showGeneral: boolean;
  assessmentId?: string;
}

export const ExercisePeriodAccordion = ({ 
  exercises, 
  showGeneral, 
  assessmentId 
}: ExercisePeriodAccordionProps) => {
  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {exercises.map((exercise, index) => (
        <AccordionItem key={index} value={`period-${index}`} className="border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">{exercise.title}</h2>
              <p className="text-gray-600 mt-2">{exercise.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Táto sekcia obsahuje {exercise.videos.length} cvikov
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
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
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
