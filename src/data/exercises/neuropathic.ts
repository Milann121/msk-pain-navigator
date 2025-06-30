
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
          videoId: 'oaB4o_qeMdQ',
          title: 'exercises.neuropathic.radicularPainNeckWeek03.neckRetraction.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'exercises.neuropathic.radicularPainNeckWeek03.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["neuro-mobs", "pain-relief"],
          bodyPart:["neck"],
        },
        {
          videoId: 'AefUaX7yLGw',
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
          videoId: 'PK62xMsZfG0',
          title: 'exercises.neuropathic.radicularPainNeckWeek46.prayer.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek46.prayer.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: '844ILxo5xsA',
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
          videoId: '3A27NLPe2bs',
          title: 'exercises.neuropathic.radicularPainLowerBackWeek03.sciaticNeurodynamics.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek03.sciaticNeurodynamics.description',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'PMJsVceAnnY',
          title: 'exercises.neuropathic.radicularPainLowerBackWeek03.glutealStretching.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek03.glutealStretching.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'L1Mf3NxYwgY',
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
          videoId: 'Xp33YgPZgns',
          title: 'exercises.neuropathic.radicularPainLowerBackWeek46.bridge.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek46.bridge.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
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
          videoId: 'oFQwLC6iea4',
          title: 'exercises.neuropathic.radiculopathyNeckWeek02.tensionNeurodynamics.title',
          description: 'exercises.neuropathic.radiculopathyNeckWeek02.tensionNeurodynamics.description',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
        },
        {
          videoId: 'eL5KxSe3c1g',
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
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.neuropathic.radiculopathyNeckWeek35.interscapularStrengthening.title',
          description: 'exercises.neuropathic.radiculopathyNeckWeek35.interscapularStrengthening.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: 'D46W1uyK6Mg',
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
          videoId: 'XP1yzpFR6ho',
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek02.proximalSciaticNeurodynamics.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek02.proximalSciaticNeurodynamics.description',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'tIZppe-RB0g',
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
          videoId: 'UaG3eY_wNQg',
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek35.glutealMassage.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek35.glutealMassage.description',
          importance: 3,
          mainGroup: ["pain-relief"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'Xp33YgPZgns',
          title: 'exercises.neuropathic.radiculopathyLowerBackWeek35.bridge.title',
          description: 'exercises.neuropathic.radiculopathyLowerBackWeek35.bridge.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
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
          videoId: 'oaB4o_qeMdQ',
          title: 'exercises.neuropathic.defaultNeck.neckRetraction.title',
          description: 'exercises.neuropathic.defaultNeck.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'exercises.neuropathic.defaultNeck.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.defaultNeck.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
        },
        {
          videoId: 'PK62xMsZfG0',
          title: 'exercises.neuropathic.defaultNeck.prayer.title',
          description: 'exercises.neuropathic.defaultNeck.prayer.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
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
          videoId: 'PK62xMsZfG0',
          title: 'exercises.neuropathic.defaultMiddleBack.prayer.title',
          description: 'exercises.neuropathic.defaultMiddleBack.prayer.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'exercises.neuropathic.defaultMiddleBack.thoracicSpineMassage.title',
          description: 'exercises.neuropathic.defaultMiddleBack.thoracicSpineMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
        },
        {
          videoId: '7WAoHWIxgEI',
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
          videoId: 'PMJsVceAnnY',
          title: 'exercises.neuropathic.defaultLowerBack.glutealStretching.title',
          description: 'exercises.neuropathic.defaultLowerBack.glutealStretching.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'L1Mf3NxYwgY',
          title: 'exercises.neuropathic.defaultLowerBack.pelvicTilting.title',
          description: 'exercises.neuropathic.defaultLowerBack.pelvicTilting.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
         videoId: '7WAoHWIxgEI',
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
