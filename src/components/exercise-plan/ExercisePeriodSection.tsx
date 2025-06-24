
import React, { useState } from 'react';
import { ExerciseVideoSection } from './ExerciseVideoSection';
import { ExerciseGoodToggle } from './ExerciseGoodToggle';
import { ExerciseFeedbackDialog } from './ExerciseFeedbackDialog';
import { useTranslation } from 'react-i18next';

// Exercise type
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

// Helper to store feedback by exercise title
type FeedbackMap = Record<string, "good" | "not-good">;

export const ExercisePeriodSection = ({
  exercise,
  index,
  showGeneral,
  assessmentId,
}: ExercisePeriodSectionProps) => {
  // Local feedback state per exercise (could be lifted up in future)
  const [feedbackMap, setFeedbackMap] = useState<FeedbackMap>({});
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
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
  const feedbackValue = feedbackMap[translatedTitle] ?? "good";

  const handleToggleChange = (value: "good" | "not-good") => {
    setFeedbackMap((prev) => ({ ...prev, [translatedTitle]: value }));
    if (value === "not-good") {
      setFeedbackDialogOpen(true);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setFeedbackDialogOpen(open);
    // Optionally reset state here
  };

  const handleExerciseChangeRequest = () => {
    // Placeholder: Here you'd trigger workflow to change exercise.
    alert(t('exercisePlan.changeRequestAlert'));
  };

  return (
    <div key={index} className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Period title with larger size */}
        <h2 className="text-3xl font-bold text-gray-900">{translatedTitle}</h2>

        <ExerciseGoodToggle value={feedbackValue} onChange={handleToggleChange} />
      </div>
      <p className="text-gray-600">{translatedDescription}</p>
      {/* Feedback dialog for this period */}
      <ExerciseFeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onChangeRequest={handleExerciseChangeRequest}
      />

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
    </div>
  );
};
