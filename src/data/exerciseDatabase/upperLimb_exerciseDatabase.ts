interface ExerciseVideo {
  videoId: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
  mainGroup: Array<'mobility' | 'stability' | 'pain-relief' | 'neuro-mobs'>;
  bodyPart: Array<'shoulder' | 'elbow' | 'forearm' | 'hand' | 'fingers'>;
}

export const upperLimbExercises: ExerciseVideo[] = [
  {
    videoId: 'Ak0QVHhwkQg',
    title: 'Pendulum Exercises',
    description: 'Passive shoulder mobility exercise using gravity',
    importance: 3,
    mainGroup: ['mobility'],
    bodyPart: ['shoulder']
  },
  {
    videoId: '1uz4DoaSY2M',
    title: 'Isometric External Rotation',
    description: 'Strengthening exercise for rotator cuff muscles',
    importance: 1,
    mainGroup: ['pain-relief', 'stability'],
    bodyPart: ['shoulder']
  },
  {
    videoId: 'eV-61JrYLQQ',
    title: 'Rotator Cuff Release',
    description: 'Self-release technique for rotator cuff muscles',
    importance: 1,
    mainGroup: ['pain-relief'],
    bodyPart: ['shoulder']
  },
  {
    videoId: 'NUhSjqTpw5k',
    title: 'Shoulder Heating',
    description: 'Warm-up exercise to prepare shoulder for activity',
    importance: 2,
    mainGroup: ['pain-relief'],
    bodyPart: ['shoulder']
  },
  {
    videoId: 'ldMl3J7MzXE',
    title: 'Isometric Shoulder Presses',
    description: 'Strengthening exercise for shoulder stabilization',
    importance: 2,
    mainGroup: ['stability'],
    bodyPart: ['shoulder']
  },
  {
    videoId: 'whyp41YIN8A',
    title: 'Wall Push-Ups',
    description: 'Modified push-ups against wall for shoulder strengthening',
    importance: 3,
    mainGroup: ['stability'],
    bodyPart: ['shoulder']
  },
  {
    videoId: '7WAoHWIxgEI',
    title: 'Upper Limb Neurodynamics',
    description: 'Neural mobilization exercises for upper extremity',
    importance: 2,
    mainGroup: ['pain-relief', 'neuro-mobs'],
    bodyPart: ['shoulder', 'elbow', 'forearm']
  }
];