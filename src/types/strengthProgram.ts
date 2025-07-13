export interface StrengthVideo {
  videoId: string;
  title: string;
  description: string;
}

export interface StrengthExercise {
  title: string;
  description: string;
  video: StrengthVideo;
  focus_bodyPart: string[];
  avoid_differentials: string[];
  repetitions?: string;
}

export interface StrengthProgram {
  id: string;
  title: string;
  description: string;
  listDescription: string[];
  time: string;
  image: string;
  exercises: StrengthExercise[];
  focus_bodyPart: string[];
  avoid_differentials: string[];
}