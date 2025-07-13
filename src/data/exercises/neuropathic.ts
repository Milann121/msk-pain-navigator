
import { Exercise } from "@/types/exercise";

export const neuropathicExercises: Record<string, Exercise[]> = {
  // Radicular Pain ✅
  // NECK ✅
  'neuropathic-Radicular Pain-neck': [
    {
      title: 'exercises.neuropathic.radicularPainNeckWeek03.title',
      description: 'exercises.neuropathic.radicularPainNeckWeek03.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oaB4o_qeMdQ', // Neck retraction
          title: 'exercises.neuropathic.radicularPainNeckWeek03.neckRetraction.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          alternatives: ['P1cP8CRE5jI', 'eL5KxSe3c1g', 'D46W1uyK6Mg'] // Alternative neck exercises
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.radicularPainNeckWeek03.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["neuro-mobs", "pain-relief"],
          bodyPart:["neck"],
          alternatives: ['M_Y9nE9rSLg', 'oFQwLC6iea4', 'XP1yzpFR6ho'] // Alternative neurodynamic exercises
        },
        {
          videoId: 'AefUaX7yLGw', // Trapezius stretch
          title: 'exercises.neuropathic.radicularPainNeckWeek03.neckSideBending.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.neckSideBending.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
        }
      ]
    },
    {
      title: 'exercises.neuropathic.radicularPainNeckWeek46.title',
      description: 'exercises.neuropathic.radicularPainNeckWeek46.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'PK62xMsZfG0', // Praying stretch
          title: 'exercises.neuropathic.radicularPainNeckWeek46.prayer.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek46.prayer.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA'] // Alternative stretching exercises
        },
        {
          videoId: '844ILxo5xsA', // Neck massage w/ ball
          title: 'exercises.neuropathic.radicularPainNeckWeek46.wallBallMassage.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek46.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        }
      ]
    }
  ],

  //LUMBAR SPINE ✅
  'neuropathic-Radicular Pain-lower back': [
    {
      title: 'exercises.neuropathic.radicularPainLowerBackWeek03.title',
      description: 'exercises.neuropathic.radicularPainLowerBackWeek03.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: '3A27NLPe2bs', // Lower limb neurodynamics
          title: 'exercises.neuropathic.radicularPainLowerBackWeek03.sciaticNeurodynamics.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek03.sciaticNeurodynamics.description',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'PMJsVceAnnY', // Glute stretches
          title: 'exercises.neuropathic.radicularPainLowerBackWeek03.glutealStretching.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek03.glutealStretching.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'L1Mf3NxYwgY', // Pelvis tilting sitting
          title: 'exercises.neuropathic.radicularPainLowerBackWeek03.pelvicTilting.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek03.pelvicTilting.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
          
        }
      ]
    },
    {
      title: 'exercises.neuropathic.radicularPainLowerBackWeek46.title',
      description: 'exercises.neuropathic.radicularPainLowerBackWeek46.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'Xp33YgPZgns', // Glute bridges
          title: 'exercises.neuropathic.radicularPainLowerBackWeek46.bridge.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek46.bridge.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.neuropathic.radicularPainLowerBackWeek46.squats90.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek46.squats90.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        } 
      ]
    }
  ],
  

  // NEUROPAHIC - Radiculopathy✅
  //NECK ✅
  'neuropathic-Radiculopathy-neck': [
    {
      title: 'exercises.neuropathic.radiculopathyNeckWeek02.title',
      description: 'exercises.neuropathic.radiculopathyNeckWeek02.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oFQwLC6iea4', // Upper limb neurodynamics - tensioning
          title: 'exercises.neuropathic.radiculopathyNeckWeek02.tensionNeurodynamics.title',
          description: 'exercises.neuropathic.radiculopathyNeckWeek02.tensionNeurodynamics.description',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
        },
        {
          videoId: 'eL5KxSe3c1g', // Neck retraction w/ extension & rotation
          title: 'exercises.neuropathic.radiculopathyNeckWeek02.mckenzieExtensions.title',
          description: 'exercises.neuropathic.radiculopathyNeckWeek02.mckenzieExtensions.description',
          importance: 2,
          mainGroup: ["mobility","pain-relief"],
          bodyPart:["neck"],
        }
      ]
    },
    {
      title: 'exercises.neuropathic.radiculopathyNeckWeek35.title',
      description: 'exercises.neuropathic.radiculopathyNeckWeek35.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oVJqu0FEw-Y', //Middle-back strengthening - 3exc.
          title: 'exercises.neuropathic.radiculopathyNeckWeek35.interscapularStrengthening.title',
          description: 'exercises.neuropathic.radiculopathyNeckWeek35.interscapularStrengthening.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: 'D46W1uyK6Mg', // Neck extension isometrics
          title: 'exercises.neuropathic.radiculopathyNeckWeek35.neckStrengthening.title',
          description: 'exercises.neuropathic.radiculopathyNeckWeek35.neckStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck"],
        }
      ]
    }
  ],

  // LUMBAR SPINE ✅
  'neuropathic-Radiculopathy-lower back': [
    {
      title: 'exercises.neuropathic.radiculopathyLowerBackWeek02.title',
      description: 'exercises.neuropathic.radiculopathyLowerBackWeek02.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'XP1yzpFR6ho', // Lower limb neurodynamics - tensioning
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek02.proximalSciaticNeurodynamics.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek02.proximalSciaticNeurodynamics.description',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'tIZppe-RB0g', // Mckenzie extension Lx
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek02.mckenzieExtensions.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek02.mckenzieExtensions.description',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["lower-back"],
        },
      ]
    },
    {
      title: 'exercises.neuropathic.radiculopathyLowerBackWeek35.title',
      description: 'exercises.neuropathic.radiculopathyLowerBackWeek35.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'UaG3eY_wNQg', // Glutes ball massage wall
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek35.glutealMassage.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek35.glutealMassage.description',
          importance: 3,
          mainGroup: ["pain-relief"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'Xp33YgPZgns', // Glutes bridges
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek35.bridge.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek35.bridge.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek35.squats90.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek35.squats90.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        }
      ]
    }
  ],

  // Default exercises ✅
  // NECK ✅
  'neuropathic-default-neck': [
    {
      title: 'exercises.neuropathic.defaultNeck.title',
      description: 'exercises.neuropathic.defaultNeck.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oaB4o_qeMdQ', // Neck retraction
          title: 'exercises.neuropathic.defaultNeck.neckRetraction.title',
          description: 'exercises.neuropathic.defaultNeck.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          alternatives: ['P1cP8CRE5jI', 'eL5KxSe3c1g', 'D46W1uyK6Mg']
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.defaultNeck.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.defaultNeck.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
          alternatives: ['M_Y9nE9rSLg', 'oFQwLC6iea4', 'XP1yzpFR6ho']
        },
        {
          videoId: 'PK62xMsZfG0', // Praying stretch
          title: 'exercises.neuropathic.defaultNeck.prayer.title',
          description: 'exercises.neuropathic.defaultNeck.prayer.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA']
        }
      ]
    }
  ],

  // MIDDLE BACK ✅
  'neuropathic-default-middle back': [
    {
      title: 'exercises.neuropathic.defaultMiddleBack.title',
      description: 'exercises.neuropathic.defaultMiddleBack.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'PK62xMsZfG0', // Praying stretch
          title: 'exercises.neuropathic.defaultMiddleBack.prayer.title',
          description: 'exercises.neuropathic.defaultMiddleBack.prayer.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU', // Neck ball massage
          title: 'exercises.neuropathic.defaultMiddleBack.thoracicSpineMassage.title',
          description: 'exercises.neuropathic.defaultMiddleBack.thoracicSpineMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.defaultMiddleBack.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.defaultMiddleBack.upperLimbNeurodynamics.description',
          importance: 3,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
        }
      ]
    }
  ],

  // LOWER BACK ✅
  'neuropathic-default-lower back': [
    {
      title: 'exercises.neuropathic.defaultLowerBack.title',
      description: 'exercises.neuropathic.defaultLowerBack.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'PMJsVceAnnY', // Glute stretches
          title: 'exercises.neuropathic.defaultLowerBack.glutealStretching.title',
          description: 'exercises.neuropathic.defaultLowerBack.glutealStretching.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'L1Mf3NxYwgY', // Pelvis tilting sitting
          title: 'exercises.neuropathic.defaultLowerBack.pelvicTilting.title',
          description: 'exercises.neuropathic.defaultLowerBack.pelvicTilting.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
         videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.defaultLowerBack.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.defaultLowerBack.upperLimbNeurodynamics.description',
          importance: 3,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        }
      ]
    }
  ]
};
