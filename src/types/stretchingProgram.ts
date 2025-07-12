export interface StretchingVideo {
  videoId: string;
  title: string;
  description: string;
}

export interface StretchingExercise {
  title: string;
  description: string;
  video: StretchingVideo;
  focus_bodyPart: string[];
  avoid_differentials: string[];
}

export interface StretchingProgram {
  id: string;
  title: string;
  description: string;
  listDescription: string[];
  time: string;
  image: string;
  exercises: StretchingExercise[];
  focus_bodyPart: string[];
  avoid_differentials: string[];
}