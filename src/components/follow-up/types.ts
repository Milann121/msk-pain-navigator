
export interface FollowUpQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options?: Array<{
    id: string;
    text: string;
  }>;
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface UserAssessment {
  id: string;
  primary_mechanism: string;
  sin_group: string;
  primary_differential: string;
  pain_area: string;
  timestamp: string;
  completed_exercises_count: number;
  last_completed_at?: string;
  initial_pain_level?: number;
  latest_pain_level?: number;
}
