
export interface Exercise {
  title: string;
  description: string;
  timeline?: number; // Duration in weeks for the program
  videos: Array<{
    videoId: string;
    title?: string;
    description?: string;
    importance?: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
    mainGroup: Array<'mobility' | 'stability' | 'pain-relief'| 'neuro-mobs' >;
    bodyPart: Array<'neck' | 'middle-back' | 'lower-back' | 'shoulder' | 'elbow' | 'forearm' | 'hand' | 'fingers'>;
    alternatives?: string[]; // Array of alternative video IDs for exercise swapping
    repetitions?: string;
  }>;
  advices?: number[]; // Array of advice IDs
}
