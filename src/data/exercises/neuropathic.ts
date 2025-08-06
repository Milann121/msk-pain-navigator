import { Exercise } from "@/types/exercise";

export const neuropathicExercises: Record<string, Exercise[]> = {
  // Radicular Pain ✅
  // NECK ✅
  'neuropathic-Radicular Pain-neck': [
    {
      title: 'exercises.neuropathic.radicularPainNeckWeek03.title',
      description: 'exercises.neuropathic.radicularPainNeckWeek03.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'oaB4o_qeMdQ', // Neck retraction
          title: 'exercises.neuropathic.radicularPainNeckWeek03.neckRetraction.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          alternatives: ['P1cP8CRE5jI', 'eL5KxSe3c1g', 'D46W1uyK6Mg'], // Alternative neck exercises
          repetitions: "10-12x"
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.radicularPainNeckWeek03.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["neuro-mobs", "pain-relief"],
          bodyPart:["neck"],
          alternatives: ['M_Y9nE9rSLg', 'oFQwLC6iea4', 'XP1yzpFR6ho'], // Alternative neurodynamic exercises
          repetitions: "10-12x"
        },
        {
          videoId: 'AefUaX7yLGw', // Trapezius stretch
          title: 'exercises.neuropathic.radicularPainNeckWeek03.neckSideBending.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek03.neckSideBending.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          repetitions: "10-12x"
        }
      ]
    },
    {
      title: 'exercises.neuropathic.radicularPainNeckWeek46.title',
      description: 'exercises.neuropathic.radicularPainNeckWeek46.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'PK62xMsZfG0', // Praying stretch
          title: 'exercises.neuropathic.radicularPainNeckWeek46.prayer.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek46.prayer.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["neck","middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA'], // Alternative prayer stretch
          repetitions: "10-12x"
        },
        {
          videoId: '844ILxo5xsA', // Neck ball massage
          title: 'exercises.neuropathic.radicularPainNeckWeek46.wallBallMassage.title',
          description: 'exercises.neuropathic.radicularPainNeckWeek46.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // Default neuropathic neck exercises
  'neuropathic-default-neck': [
    {
      title: 'exercises.neuropathic.defaultNeck.title',
      description: 'exercises.neuropathic.defaultNeck.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'oaB4o_qeMdQ', // Neck retraction
          title: 'exercises.neuropathic.defaultNeck.neckRetraction.title',
          description: 'exercises.neuropathic.defaultNeck.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          alternatives: ['P1cP8CRE5jI', 'eL5KxSe3c1g', 'D46W1uyK6Mg'],
          repetitions: "10-12x"
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.defaultNeck.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.defaultNeck.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
          alternatives: ['M_Y9nE9rSLg', 'oFQwLC6iea4', 'XP1yzpFR6ho'],
          repetitions: "10-12x"
        },
        {
          videoId: 'PK62xMsZfG0', // Prayer stretch
          title: 'exercises.neuropathic.defaultNeck.upperCervicalRelease.title',
          description: 'exercises.neuropathic.defaultNeck.upperCervicalRelease.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA'],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // LOWER BACK ✅
  'neuropathic-Radicular Pain-lower back': [
    {
      title: 'exercises.neuropathic.radicularPainLowerBackWeek03.title',
      description: 'exercises.neuropathic.radicularPainLowerBackWeek03.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'RZ4mP4mOKxg', // Sciatic neurodynamics
          title: 'exercises.neuropathic.radicularPainLowerBackWeek03.sciaticNeurodynamics.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek03.sciaticNeurodynamics.description',
          importance: 1,
          mainGroup: ["neuro-mobs","pain-relief"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
        videoId: 'PMJsVceAnnY', // Glute stretches
        title: 'exercises.neuropathic.radicularPainLowerBackWeek03.glutealStretching.title',
        description: 'exercises.neuropathic.radicularPainLowerBackWeek03.glutealStretching.description',
        importance: 2,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        repetitions: "10-12x"
        },
        {
          videoId: 'eL5KxSe3c1g', // McKenzie extensions
          title: 'exercises.neuropathic.radicularPainLowerBackWeek03.mckenzieExtensions.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek03.mckenzieExtensions.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ]
    },
    {
      title: 'exercises.neuropathic.radicularPainLowerBackWeek46.title',
      description: 'exercises.neuropathic.radicularPainLowerBackWeek46.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'Xp33YgPZgns', // Glute bridges
          title: 'exercises.neuropathic.radicularPainLowerBackWeek46.bridge.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek46.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.neuropathic.radicularPainLowerBackWeek46.squats90.title',
          description: 'exercises.neuropathic.radicularPainLowerBackWeek46.squats90.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // Default neuropathic lower back exercises
  'neuropathic-default-lower back': [
    {
      title: 'exercises.neuropathic.defaultLowerBack.title',
      description: 'exercises.neuropathic.defaultLowerBack.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'RZ4mP4mOKxg', // Sciatic neurodynamics
          title: 'exercises.neuropathic.defaultLowerBack.sciaticNeurodynamics.title',
          description: 'exercises.neuropathic.defaultLowerBack.sciaticNeurodynamics.description',
          importance: 1,
          mainGroup: ["neuro-mobs","pain-relief"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
        videoId: 'PMJsVceAnnY', // Glute stretches
        title: 'exercises.neuropathic.defaultLowerBack.glutealStretching.title',
        description: 'exercises.neuropathic.defaultLowerBack.glutealStretching.description',
        importance: 2,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        repetitions: "10-12x"
        },
        {
          videoId: 'Xp33YgPZgns', // Glute bridges
          title: 'exercises.neuropathic.defaultLowerBack.bridge.title',
          description: 'exercises.neuropathic.defaultLowerBack.bridge.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ]
    },
  ],

  // CERVICAL RADICULOPATHY ✅
  'neuropathic-cervical-radiculopathy-neck': [
    {
      title: 'exercises.neuropathic.cervicalRadiculopathyNeck.title',
      description: 'exercises.neuropathic.cervicalRadiculopathyNeck.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'oaB4o_qeMdQ', // Neck retraction
          title: 'exercises.neuropathic.cervicalRadiculopathyNeck.neckRetraction.title',
          description: 'exercises.neuropathic.cervicalRadiculopathyNeck.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          alternatives: ['P1cP8CRE5jI', 'eL5KxSe3c1g', 'D46W1uyK6Mg'],
          repetitions: "10-12x"
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.cervicalRadiculopathyNeck.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.cervicalRadiculopathyNeck.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
          alternatives: ['M_Y9nE9rSLg', 'oFQwLC6iea4', 'XP1yzpFR6ho'],
          repetitions: "10-12x"
        },
        {
          videoId: 'PK62xMsZfG0', // Prayer stretch
          title: 'exercises.neuropathic.cervicalRadiculopathyNeck.upperCervicalRelease.title',
          description: 'exercises.neuropathic.cervicalRadiculopathyNeck.upperCervicalRelease.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA'],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  'neuropathic-radicular-pain-neck': [
    {
      title: 'exercises.neuropathic.radicularPainNeck.title',
      description: 'exercises.neuropathic.radicularPainNeck.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'oaB4o_qeMdQ', // Neck retraction
          title: 'exercises.neuropathic.radicularPainNeck.neckRetraction.title',
          description: 'exercises.neuropathic.radicularPainNeck.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          alternatives: ['P1cP8CRE5jI', 'eL5KxSe3c1g', 'D46W1uyK6Mg'],
          repetitions: "10-12x"
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.radicularPainNeck.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.radicularPainNeck.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
          alternatives: ['M_Y9nE9rSLg', 'oFQwLC6iea4', 'XP1yzpFR6ho'],
          repetitions: "10-12x"
        },
        {
          videoId: 'PK62xMsZfG0', // Prayer stretch
          title: 'exercises.neuropathic.radicularPainNeck.upperCervicalRelease.title',
          description: 'exercises.neuropathic.radicularPainNeck.upperCervicalRelease.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA'],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  'neuropathic-radiculopathy-neck': [
    {
      title: 'exercises.neuropathic.radiculopathyNeck.title',
      description: 'exercises.neuropathic.radiculopathyNeck.description',
      advices: [1, 3], // Reference to advice IDs
      timeline: 4,
      videos: [
        {
          videoId: 'oaB4o_qeMdQ', // Neck retraction
          title: 'exercises.neuropathic.radiculopathyNeck.neckRetraction.title',
          description: 'exercises.neuropathic.radiculopathyNeck.neckRetraction.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          alternatives: ['P1cP8CRE5jI', 'eL5KxSe3c1g', 'D46W1uyK6Mg'],
          repetitions: "10-12x"
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.neuropathic.radiculopathyNeck.upperLimbNeurodynamics.title',
          description: 'exercises.neuropathic.radiculopathyNeck.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
          alternatives: ['M_Y9nE9rSLg', 'oFQwLC6iea4', 'XP1yzpFR6ho'],
          repetitions: "10-12x"
        },
        {
          videoId: 'PK62xMsZfG0', // Prayer stretch
          title: 'exercises.neuropathic.radiculopathyNeck.upperCervicalRelease.title',
          description: 'exercises.neuropathic.radiculopathyNeck.upperCervicalRelease.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA'],
          repetitions: "10-12x"
        }
      ]
    }
  ]
};