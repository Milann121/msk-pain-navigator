
export interface UseExerciseCompletionProps {
  exerciseTitle: string;
  assessmentId: string;
}

export interface ExerciseCompletionState {
  completionCount: number;
  loading: boolean;
  lastCompletedAt: Date | null;
  cooldownActive: boolean;
  latestClickId: string | null;
}

export interface ExerciseCompletionActions {
  resetCompletion: () => Promise<void>;
  addCompletion: () => Promise<boolean>;
}

export interface UseExerciseCompletionReturn extends ExerciseCompletionState, ExerciseCompletionActions {}
