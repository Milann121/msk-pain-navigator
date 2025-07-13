export interface YogaVideo {
  videoId: string;
  title: string;
  description: string;
}

export interface YogaExercise {
  title: string;
  description: string;
  video: YogaVideo;
  focus_bodyPart: string[];
  avoid_differentials: string[];
  repetitions?: string;
}

export interface YogaProgram {
  id: string;
  title: string;
  description: string;
  listDescription: string[];
  time: string;
  image: string;
  exercises: YogaExercise[];
  focus_bodyPart: string[];
  avoid_differentials: string[];
}