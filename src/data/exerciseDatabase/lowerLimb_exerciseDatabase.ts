interface ExerciseVideo {
  videoId: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
  mainGroup: Array<'mobility' | 'stability' | 'pain-relief' | 'neuro-mobs'>;
  bodyPart: Array<'hip' | 'knee' | 'ankle' | 'foot'>;
}

export const lowerLimbExercises: ExerciseVideo[] = [
  {
    videoId: 'PMJsVceAnnY',
    title: 'Gluteal Stretching',
    description: 'Stretching exercises for gluteal muscles and hip mobility',
    importance: 1,
    mainGroup: ['mobility'],
    bodyPart: ['hip']
  },
  {
    videoId: '3A27NLPe2bs',
    title: 'Sciatic Neurodynamics',
    description: 'Neural mobilization exercises for sciatic nerve',
    importance: 2,
    mainGroup: ['pain-relief', 'neuro-mobs'],
    bodyPart: ['hip', 'knee']
  },
  {
    videoId: 'dVjfUlXK93k',
    title: 'Squats 90 Degrees',
    description: 'Partial squats for lower limb strengthening',
    importance: 2,
    mainGroup: ['stability'],
    bodyPart: ['hip', 'knee']
  },
  {
    videoId: 'BnWLb1h6kfQ',
    title: 'Gluteal Strengthening',
    description: 'Strengthening exercises for gluteal muscles',
    importance: 1,
    mainGroup: ['stability'],
    bodyPart: ['hip']
  },
  {
    videoId: 'Wan8QnjTmiQ',
    title: 'SIJ Mobilization',
    description: 'Mobilization exercises for sacroiliac joint',
    importance: 1,
    mainGroup: ['mobility', 'pain-relief'],
    bodyPart: ['hip']
  }
];