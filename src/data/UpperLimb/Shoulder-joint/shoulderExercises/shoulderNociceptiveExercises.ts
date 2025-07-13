import { Exercise } from "@/types/exercise";

export const shoulderNociceptiveExercises: Record<string, Exercise[]> = {
  // Frozen shoulder and stiff shoulder exercises
  'nociceptive-frozen-shoulder-upper limb': [
    {
      title: 'exercises.shoulderNociceptive.frozenShoulderPhase1.title',
      description: 'exercises.shoulderNociceptive.frozenShoulderPhase1.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'Ak0QVHhwkQg',
          title: 'exercises.shoulderNociceptive.frozenShoulderPhase1.pendulumExercises.title',
          description: 'exercises.shoulderNociceptive.frozenShoulderPhase1.pendulumExercises.description',
          importance: 3,
          mainGroup: ['mobility'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: '1uz4DoaSY2M', 
          title: 'exercises.shoulderNociceptive.frozenShoulderPhase1.isometricExternalRotation.title',
          description: 'exercises.shoulderNociceptive.frozenShoulderPhase1.isometricExternalRotation.description',
          importance: 1,
          mainGroup: ['pain-relief', 'stability'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'eV-61JrYLQQ',
          title: 'exercises.shoulderNociceptive.frozenShoulderPhase1.rotatorCuffRelease.title',
          description: 'exercises.shoulderNociceptive.frozenShoulderPhase1.rotatorCuffRelease.description',
          importance: 1,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'NUhSjqTpw5k',
          title: 'exercises.shoulderNociceptive.frozenShoulderPhase1.shoulderHeating.title',
          description: 'exercises.shoulderNociceptive.frozenShoulderPhase1.shoulderHeating.description',
          importance: 2,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        }
      ]
    },
    {
      title: 'exercises.shoulderNociceptive.frozenShoulderPhase2.title',
      description: 'exercises.shoulderNociceptive.frozenShoulderPhase2.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'ldMl3J7MzXE',
          title: 'exercises.shoulderNociceptive.frozenShoulderPhase2.isometricShoulderPresses.title',
          description: 'exercises.shoulderNociceptive.frozenShoulderPhase2.isometricShoulderPresses.description',
          importance: 2,
          mainGroup: ['stability'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'whyp41YIN8A',
          title: 'exercises.shoulderNociceptive.frozenShoulderPhase2.wallPushUps.title',
          description: 'exercises.shoulderNociceptive.frozenShoulderPhase2.wallPushUps.description',
          importance: 3,
          mainGroup: ['stability'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.shoulderNociceptive.frozenShoulderPhase2.interscapularStrengthening.title',
          description: 'exercises.shoulderNociceptive.frozenShoulderPhase2.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ['stability'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // Subacromional impingement syndrome exercises
  'nociceptive-subacromional-impingement-syndrome-upper limb': [
    {
      title: 'exercises.shoulderNociceptive.subacromialImpingement.title',
      description: 'exercises.shoulderNociceptive.subacromialImpingement.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.shoulderNociceptive.subacromialImpingement.interscapularStrengthening.title',
          description: 'exercises.shoulderNociceptive.subacromialImpingement.interscapularStrengthening.description',
          importance: 1,
          mainGroup: ['stability'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'Ak0QVHhwkQg',
          title: 'exercises.shoulderNociceptive.subacromialImpingement.gentlePendulum.title',
          description: 'exercises.shoulderNociceptive.subacromialImpingement.gentlePendulum.description',
          importance: 2,
          mainGroup: ['mobility'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'NUhSjqTpw5k',
          title: 'exercises.shoulderNociceptive.subacromialImpingement.preExerciseHeating.title',
          description: 'exercises.shoulderNociceptive.subacromialImpingement.preExerciseHeating.description',
          importance: 3,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // Rotator cuff tear exercises
  'nociceptive-rotator-cuff-tear-upper limb': [
    {
      title: 'exercises.shoulderNociceptive.rotatorCuffTear.title',
      description: 'exercises.shoulderNociceptive.rotatorCuffTear.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: '1uz4DoaSY2M',
          title: 'exercises.shoulderNociceptive.rotatorCuffTear.isometricStrengthening.title',
          description: 'exercises.shoulderNociceptive.rotatorCuffTear.isometricStrengthening.description',
          importance: 1,
          mainGroup: ['stability'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'un6jXuY',
          title: 'exercises.shoulderNociceptive.rotatorCuffTear.rotatorCuffMassage.title',
          description: 'exercises.shoulderNociceptive.rotatorCuffTear.rotatorCuffMassage.description',
          importance: 2,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // Default nociceptive shoulder exercises
  'nociceptive-default-upper limb': [
    {
      title: 'exercises.shoulderNociceptive.defaultNociceptive.title',
      description: 'exercises.shoulderNociceptive.defaultNociceptive.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'Ak0QVHhwkQg',
          title: 'exercises.shoulderNociceptive.defaultNociceptive.basicMobility.title',
          description: 'exercises.shoulderNociceptive.defaultNociceptive.basicMobility.description',
          importance: 1,
          mainGroup: ['mobility'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        },
        {
          videoId: 'ldMl3J7MzXE',
          title: 'exercises.shoulderNociceptive.defaultNociceptive.basicStrengthening.title',
          description: 'exercises.shoulderNociceptive.defaultNociceptive.basicStrengthening.description',
          importance: 2,
          mainGroup: ['stability'],
          bodyPart: ['shoulder'],
          repetitions: "10-12x"
        }
      ]
    }
  ]
};
