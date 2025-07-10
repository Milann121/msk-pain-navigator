interface ExerciseVideo {
  videoId: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
  mainGroup: Array<'mobility' | 'stability' | 'pain-relief' | 'neuro-mobs'>;
  bodyPart: Array<'head' | 'jaw' | 'eyes'>;
}

export const headExercises: ExerciseVideo[] = [
  {
    videoId: 'JJq8u5IGDb8',
    title: 'Cervical Rotation with Towel',
    description: 'Gentle neck rotation exercises using towel support',
    importance: 3,
    mainGroup: ['mobility'],
    bodyPart: ['head']
  },
  {
    videoId: 'L94T55NiI34',
    title: 'Upper Cervical Massage',
    description: 'Self-massage techniques for upper neck and head',
    importance: 2,
    mainGroup: ['pain-relief'],
    bodyPart: ['head']
  },
  {
    videoId: 'D46W1uyK6Mg',
    title: 'Neck Strengthening',
    description: 'Isometric strengthening exercises for neck muscles',
    importance: 2,
    mainGroup: ['stability'],
    bodyPart: ['head']
  }
];