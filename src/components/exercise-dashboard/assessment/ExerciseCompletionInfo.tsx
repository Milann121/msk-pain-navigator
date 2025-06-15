
import React from "react";
import { AssessmentExerciseStats } from "../AssessmentExerciseStats";

interface ExerciseCompletionInfoProps {
  assessmentId: string;
}

export const ExerciseCompletionInfo = ({ assessmentId }: ExerciseCompletionInfoProps) => {
  return (
    <div className="space-y-2">
      <AssessmentExerciseStats assessmentId={assessmentId} />
    </div>
  );
};
