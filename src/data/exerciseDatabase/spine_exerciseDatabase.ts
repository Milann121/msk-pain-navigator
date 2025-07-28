interface ExerciseVideo {
  videoId: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3; // 1 = primary, 2 = secondary, 3 = tertiary
  mainGroup: Array<'mobility' | 'stability' | 'pain-relief' | 'neuro-mobs'>;
  bodyPart: Array<'neck' | 'middle-back' | 'lower-back'>;
  alternatives?: string[]; // Array of alternative video IDs for exercise swapping
}

export const spineExercises: ExerciseVideo[] = [

  
  // NECK EXERCISES DATABASE
  {
    videoId: 'eL5KxSe3c1g',
    title: 'McKenzie Neck Extensions',
    description: 'Gentle neck extension exercises to improve cervical spine mobility',
    importance: 1,
    mainGroup: ['mobility', 'pain-relief'],
    bodyPart: ['neck']
  },
  {
    videoId: '844ILxo5xsA',
    title: 'Wall Ball Massage',
    description: 'Self-massage technique using wall and ball for neck and upper back',
    importance: 2,
    mainGroup: ['pain-relief'],
    bodyPart: ['neck', 'middle-back']
  },
  {
    videoId: 'dHk-RqehNc8',
    title: 'Trapezius Stretch',
    description: '',
    importance: 2,
    mainGroup: ["mobility"],
    bodyPart: ['neck']
  },
  {
    videoId: 'kvxXicryMHA',
    title: 'Neck Rotation with Side Flextion',
    description: '',
    importance: 3,
    mainGroup: ['mobility'],
    bodyPart: ['neck']
  },
  {
    videoId: 'yzCxAbfKImQ',
    title: 'Rowing with Resistance Band (ground sitting position)',
    description: '',
    importance: 1,
    mainGroup: ['stability'],
    bodyPart: ['neck', 'middle-back']
  },

  


  // MIDDLE-BACK EXERCISE DATABASE
  {
    videoId: 'PK62xMsZfG0',
    title: 'Prayer Stretch',
    description: 'Thoracic spine mobility exercise in prayer position',
    importance: 1,
    mainGroup: ['mobility'],
    bodyPart: ['middle-back']
  },
  {
    videoId: 'dxzegzGNdaU',
    title: 'Thoracic Spine Massage',
    description: 'Self-massage techniques for thoracic spine',
    importance: 2,
    mainGroup: ['pain-relief'],
    bodyPart: ['middle-back']
  },
  {
    videoId: 'oAxVF_ktAi0',
    title: 'Thoracic Rotation with Extension',
    description: 'Combined rotation and extension for thoracic spine mobility',
    importance: 2,
    mainGroup: ['mobility'],
    bodyPart: ['middle-back']
  },
  {
    videoId: 'gyew25Vaqj8',
    title: 'Kneeling Middle-Back Rotation',
    description: '',
    importance: 1,
    mainGroup: ['mobility'],
    bodyPart: ['middle-back']
  },


  

  // LOWER-BACK EXERCISE DATABASE
  {
    videoId: 'tIZppe-RB0g',
    title: 'McKenzie Lumbar Extensions',
    description: 'Lower back extension exercises for disc-related issues',
    importance: 1,
    mainGroup: ['mobility', 'pain-relief'],
    bodyPart: ['lower-back']
  },
  {
    videoId: 'Xp33YgPZgns',
    title: 'Bridge Exercise',
    description: 'Strengthening exercise for core and gluteal muscles',
    importance: 1,
    mainGroup: ['stability'],
    bodyPart: ['lower-back']
  },
  {
    videoId: 'L1Mf3NxYwgY',
    title: 'Pelvic Tilting',
    description: 'Gentle mobility exercise for lower back and pelvis',
    importance: 2,
    mainGroup: ['mobility', 'pain-relief'],
    bodyPart: ['lower-back']
  },
  {
    videoId: '2of247Kt0tU',
    title: 'Cat Back Mobilisations',
    description: '',
    importance: 2,
    mainGroup: ["mobility", 'pain-relief'],
    bodyPart: ['lower-back']
  },
  {
    videoId: 'XP1yzpFR6ho',
    title: 'Proximal Lower-Limb Neuromobilisations',
    description: '',
    importance: 1,
    mainGroup: ['neuro-mobs', 'pain-relief'],
    bodyPart: ['lower-back']
  },
  {
    videoId: 'zhzW4-tq9HM',
    title: 'Piriformis Stretch (on back postion)',
    description: '',
    importance: 1,
    mainGroup: ['mobility', 'pain-relief'],
    bodyPart: ['lower-back']
  },
  {
    videoId: 'HtMI17DGuTk',
    title: 'Bird Dog',
    description: '',
    importance: 3,
    mainGroup: ['stability'],
    bodyPart: ['lower-back']
  },
  {
    videoId: 'ESbiu4FdbPs',
    title: 'Side-Glides',
    description: '',
    importance: 1,
    mainGroup: ['mobility', 'pain-relief'],
    bodyPart: ['lower-back']
  }

];
