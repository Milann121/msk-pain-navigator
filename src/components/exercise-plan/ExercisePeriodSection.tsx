
import React, { useState } from 'react';
import { ExerciseVideoSection } from './ExerciseVideoSection';
import { ExerciseGoodToggle } from './ExerciseGoodToggle';
import { ExerciseFeedbackDialog } from './ExerciseFeedbackDialog';

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

  const feedbackValue = feedbackMap[exercise.title] ?? "good";

  const handleToggleChange = (value: "good" | "not-good") => {
    setFeedbackMap((prev) => ({ ...prev, [exercise.title]: value }));
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
    // For demo just alert. In real app, replace with proper logic/API.
    alert("Žiadosť o zmenu cviku bola odoslaná.");
  };

  return (
    <div key={index} className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Period title with larger size */}
        <h2 className="text-3xl font-bold text-gray-900">{exercise.title}</h2>

        <ExerciseGoodToggle value={feedbackValue} onChange={handleToggleChange} />
      </div>
      <p className="text-gray-600">{exercise.description}</p>
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
            exerciseTitle={exercise.title}
            showGeneral={showGeneral}
            assessmentId={assessmentId}
          />
        ))}
      </div>
    </div>
  );
};
