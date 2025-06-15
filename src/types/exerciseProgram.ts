
export interface ProgramExerciseReference {
  id: string; // e.g. "neck-1"
  importance: 1 | 2 | 3;
}

export interface Program {
  title: string;
  description?: string;
  videos: ProgramExerciseReference[];
}
