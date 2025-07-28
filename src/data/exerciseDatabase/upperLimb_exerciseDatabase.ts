interface ExerciseVideo {
  videoId: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
  mainGroup: Array<'mobility' | 'stability' | 'pain-relief' | 'neuro-mobs'>;
  bodyPart: Array<'shoulder' | 'elbow' | 'forearm' | 'hand' | 'fingers'>;
  alternatives?: string[]; // Array of alternative video IDs for exercise swapping
}

export const upperLimbExercises: ExerciseVideo[] = [

  //SHOULDER JOINT EXERCISES DATABASE
  {
    videoId: 'Ak0QVHhwkQg',
    title: 'Pendulum Exercises',
    description: 'Passive shoulder mobility exercise using gravity',
    importance: 3,
    mainGroup: ['mobility'],
    bodyPart: ['shoulder']
  },
  {
    videoId: 'TTgEz3NLljs',
    title: 'Flexion Rotations of the Shoulder Joint',
    description: '',
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
    videoId: 'dS9ORQCnWsE',
    title: 'Rotator-Cuff External Rotation with Resistance Band',
    description: '',
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
  },
  {
    videoId: '5-9_zrKwxTU',
    title: 'Forward Shoulder Flexion Strengthening,',
    description: '',
    importance: 1,
    mainGroup: ['stability'],
    bodyPart: ['shoulder']
  },
  {
    videoId: 'WDIpL0pjun0',
    title: 'Pull-Ups',
    description: '',
    importance: 3,
    mainGroup: ['stability'],
    bodyPart: ['shoulder']
  },
  {
    videoId: 'J9QSqLq4L6U',
    title: 'Shoulder Taps',
    description: '',
    importance: 3,
    mainGroup: ['stability'],
    bodyPart: ['shoulder']
  },
  {
    videoId: '0GjGtt1DvoQ',
    title: 'Shoulder Movement Drill (lying on belly position)',
    description: '',
    importance: 2,
    mainGroup: ['stability'],
    bodyPart: ['shoulder'],
  },
];