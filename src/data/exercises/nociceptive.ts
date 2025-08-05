import { Exercise } from "@/types/exercise";

export const nociceptiveExercises: Record<string, Exercise[]> = {
  // Disc Herniation ✅
  // NECK ✅
  'nociceptive-disc herniation-neck': [
    {
      title: 'exercises.nociceptive.discHerniationNeckWeek03.title',
      description: 'exercises.nociceptive.discHerniationNeckWeek03.description',
      advices: [1, 3], // Reference to advice IDs
      videos: [
        {
          videoId: 'eL5KxSe3c1g', // Neck retraction w/ extension & rotation
          title: 'exercises.nociceptive.discHerniationNeckWeek03.mckenzieExtensions.title',
          description: 'exercises.nociceptive.discHerniationNeckWeek03.mckenzieExtensions.description',
          importance: 3,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["neck"],
          alternatives: ['JF_04gMZ8rU', 'Z3tKUfZGqjs'], // Alternative neck mobility exercises
          repetitions: "10-12x"
        },
        {
          videoId: '7WAoHWIxgEI', // Upper limb neurodynamics
          title: 'exercises.nociceptive.discHerniationNeckWeek03.upperLimbNeurodynamics.title',
          description: 'exercises.nociceptive.discHerniationNeckWeek03.upperLimbNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief", "neuro-mobs"],
          bodyPart:["neck"],
          alternatives: ['RZ4mP4mOKxg', 'qR6mU0g7c7s'], // Alternative neurodynamic exercises
          repetitions: "10-12x"
        },
        {
          videoId: '844ILxo5xsA', //Neck massage w/ ball
          title: 'exercises.nociceptive.discHerniationNeckWeek03.wallBallMassage.title',
          description: 'exercises.nociceptive.discHerniationNeckWeek03.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck", "middle-back"],
          alternatives: ['dqnKix4f0dU', 'T4x3EGEAcpU', 'dHk-RqehNc8'], // Alternative massage/relaxation exercises
          repetitions: "10-12x"
        }
      ]
    },
    {
      title: 'exercises.nociceptive.discHerniationNeckWeek46.title',
      description: 'exercises.nociceptive.discHerniationNeckWeek46.description',
      advices: [3], // Reference to advice IDs
      videos: [
        {
          videoId: 'PK62xMsZfG0', //Praying stretch
          title: 'exercises.nociceptive.discHerniationNeckWeek46.prayer.title',
          description: 'exercises.nociceptive.discHerniationNeckWeek46.prayer.description',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["neck","middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA', 'gyew25Vaqj8'], // Alternative stretching and mobility exercises
          repetitions: "10-12x"
        },
        {
          videoId: 'oVJqu0FEw-Y', //Middle-back strenthening - 3exc.
          title: 'exercises.nociceptive.discHerniationNeckWeek46.interscapularStrengthening.title',
          description: 'exercises.nociceptive.discHerniationNeckWeek46.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
          alternatives: ['wHPFZctnIjg', 'yzCxAbfKImQ'],
          repetitions: "10-12x"
        },
      ]
    }
  ],

  // LUMBAR SPINE ✅
  'nociceptive-disc herniation-lower back': [
    {
      title: 'exercises.nociceptive.discHerniationLowerBackWeek03.title',
      description: 'exercises.nociceptive.discHerniationLowerBackWeek03.description',
      advices: [1, 3, 4], // Reference to advice IDs
      videos: [
        {
          videoId: 'tIZppe-RB0g', //Mckenzie extension Lx
          title: 'exercises.nociceptive.discHerniationLowerBackWeek03.mckenzieExtensions.title',
          description: 'exercises.nociceptive.discHerniationLowerBackWeek03.mckenzieExtensions.description',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["lower-back"],
          alternatives: ['2of247Kt0tU', 'ESbiu4FdbPs'],
          repetitions: "10-12x"
        },
        {
          videoId: '3A27NLPe2bs', //Lower limb neurodynamics
          title: 'exercises.nociceptive.discHerniationLowerBackWeek03.sciaticNeurodynamics.title',
          description: 'exercises.nociceptive.discHerniationLowerBackWeek03.sciaticNeurodynamics.description',
          importance: 2,
          mainGroup: ["pain-relief", "neuro-mobs"],
          bodyPart:["lower-back"],
          alternatives: ['XP1yzpFR6ho'],
          repetitions: "10-12x"
        },
        {
          videoId: 'PMJsVceAnnY', // Glute stretches
          title: 'exercises.nociceptive.discHerniationLowerBackWeek03.glutealStretching.title',
          description: 'exercises.nociceptive.discHerniationLowerBackWeek03.glutealStretching.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          alternatives: ['zhzW4-tq9HM'],
          repetitions: "10-12x"
        }
      ]
    },
    {
      title: 'exercises.nociceptive.discHerniationLowerBackWeek46.title',
      description: 'exercises.nociceptive.discHerniationLowerBackWeek46.description',
      advices: [1, 3, 4], // Reference to advice IDs
      videos: [
        {
          videoId: 'Xp33YgPZgns', // Glute bridges
          title: 'exercises.nociceptive.discHerniationLowerBackWeek46.bridge.title',
          description: 'exercises.nociceptive.discHerniationLowerBackWeek46.bridge.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.nociceptive.discHerniationLowerBackWeek46.squats90.title',
          description: 'exercises.nociceptive.discHerniationLowerBackWeek46.squats90.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // Facet Joint Syndrome ✅
  // NECK ✅
  'nociceptive-facet joint syndrome-neck': [
    {
      title: 'exercises.nociceptive.facetJointSyndromeNeckWeek02.title',
      description: 'exercises.nociceptive.facetJointSyndromeNeckWeek02.description',
      advices: [3], // Reference to advice IDs
      videos: [
        {
          videoId: 'JJq8u5IGDb8', // Mulligan towel neck rotation
          title: 'exercises.nociceptive.facetJointSyndromeNeckWeek02.cervicalRotationWithTowel.title',
          description: 'exercises.nociceptive.facetJointSyndromeNeckWeek02.cervicalRotationWithTowel.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
          repetitions: "10-12x"
        },
        {
          videoId: '844ILxo5xsA', //Neck massage w/ ball
          title: 'exercises.nociceptive.defaultNeck.wallBallMassage.title',
          description: 'exercises.nociceptive.defaultNeck.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'L94T55NiI34', // Self massage suboccipitals
          title: 'exercises.nociceptive.facetJointSyndromeNeckWeek02.upperCervicalMassage.title',
          description: 'exercises.nociceptive.facetJointSyndromeNeckWeek02.upperCervicalMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["neck"],
          repetitions: "10-12x"
        },
      ],
    },
    {
      title: 'exercises.nociceptive.facetJointSyndromeNeckWeek35.title',
      description: 'exercises.nociceptive.facetJointSyndromeNeckWeek35.description',
      advices: [3], // Reference to advice IDs
      videos: [
        {
          videoId: 'oVJqu0FEw-Y', //Middle-back strenthening - 3exc.
          title: 'exercises.nociceptive.facetJointSyndromeNeckWeek35.interscapularStrengthening.title',
          description: 'exercises.nociceptive.facetJointSyndromeNeckWeek35.interscapularStrengthening.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'D46W1uyK6Mg', // Neck extension isometrics
          title: 'exercises.nociceptive.facetJointSyndromeNeckWeek35.neckStrengthening.title',
          description: 'exercises.nociceptive.facetJointSyndromeNeckWeek35.neckStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck"],
          repetitions: "10-12x"
        },
      ]
    }
  ],
  
  // MIDDLE BACK ✅
  'nociceptive-facet joint syndrome-middle back': [
    {
      title: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek02.title',
      description: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek02.description',
      advices: [1, 3], // Reference to advice IDs
      videos: [
        {
          videoId: 'oAxVF_ktAi0', // Thorax rotation sitting
          title: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek02.thoracicRotationWithExtension.title',
          description: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek02.thoracicRotationWithExtension.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dxzegzGNdaU', // Middle-back ball massage
          title: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek02.thoracicSpineMassage.title',
          description: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek02.thoracicSpineMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
          repetitions: "10-12x"
        },
      ],
    },
    {
      title: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.title',
      description: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.description',
      advices: [1, 3], // Reference to advice IDs
      videos: [
        {
          videoId: 'oVJqu0FEw-Y', //Middle-back strenthening - 3exc.
          title: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.interscapularStrengthening.title',
          description: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["middle-back","neck"],
          repetitions: "10-12x"
        },
        {
          videoId: 'rhPOJA3S-IQ', // Thorax extensions wall
          title: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.thoracicExtension.title',
          description: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.thoracicExtension.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'OKsRn5e2VJY', // Thorax rotation open book lying
          title: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.bookOpening.title',
          description: 'exercises.nociceptive.facetJointSyndromeMiddleBackWeek35.bookOpening.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        }
      ]  
    }
  ],
    
  // LOWER BACK ✅
  'nociceptive-facet joint syndrome-lower back': [
    {
      title: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.title',
      description: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.description',
      advices: [1, 3, 4], // Reference to advice IDs
      videos: [
        {
          videoId: 'L1Mf3NxYwgY', // Pelvis tilting sitting
          title: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.pelvicTilting.title',
          description: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.pelvicTilting.description',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'PMJsVceAnnY', // Glute stretches
          title: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.glutealStretching.title',
          description: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.glutealStretching.description',
          importance: 2,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'XspRg50nn30', // Lx stretch sitting flexion
          title: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.spinalStretching.title',
          description: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek03.spinalStretching.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
      ],
    },
    {  
      title: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek46.title',
      description: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek46.description',
      advices: [1, 3, 4], // Reference to advice IDs
      videos: [
        {
          videoId: 'Xp33YgPZgns', // Glute bridges
          title: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek46.bridge.title',
          description: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek46.bridge.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek46.squats90.title',
          description: 'exercises.nociceptive.facetJointSyndromeLowerBackWeek46.squats90.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // Nociceptive - SIJ Syndrome ✅
  'nociceptive-SIJ syndrome-lower back': [
    {
      title: 'exercises.nociceptive.sijSyndromeWeek02.title',
      description: 'exercises.nociceptive.sijSyndromeWeek02.description',
      advices: [1, 3, 4], // Reference to advice IDs
      videos: [
        {
          videoId: 'Wan8QnjTmiQ', // Butt to heels flexion
          title: 'exercises.nociceptive.sijSyndromeWeek02.sijMobilization.title',
          description: 'exercises.nociceptive.sijSyndromeWeek02.sijMobilization.description',
          importance: 1,
          mainGroup: ["mobility","pain-relief"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.nociceptive.sijSyndromeWeek02.squats90.title',
          description: 'exercises.nociceptive.sijSyndromeWeek02.squats90.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ],
    },
    {
      title: 'exercises.nociceptive.sijSyndromeWeek36.title',
      description: 'exercises.nociceptive.sijSyndromeWeek36.description',
      advices: [1, 3, 4], // Reference to advice IDs
      videos: [
        {
          videoId: 'BnWLb1h6kfQ', // One-leg squats + bridges
          title: 'exercises.nociceptive.sijSyndromeWeek36.glutealStrengthening.title',
          description: 'exercises.nociceptive.sijSyndromeWeek36.glutealStrengthening.description',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
      ]
    }
  ],

  // DEFAULT exercises ✅
  // NECK ✅
  'nociceptive-default-neck': [
    {
      title: 'exercises.nociceptive.defaultNeck.title',
      description: 'exercises.nociceptive.defaultNeck.description',
      advices: [1, 3], // Reference to advice IDs
      videos: [
        {
          videoId: '844ILxo5xsA', // Neck ball massage
          title: 'exercises.nociceptive.defaultNeck.wallBallMassage.title',
          description: 'exercises.nociceptive.defaultNeck.wallBallMassage.description',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["middle-back","neck"],
          repetitions: "10-12x"
        },
        {
          videoId: 'PK62xMsZfG0', // Praying stretch
          title: 'exercises.nociceptive.defaultNeck.prayer.title',
          description: 'exercises.nociceptive.defaultNeck.prayer.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', '844ILxo5xsA'], // Alternative stretching and mobility exercises
          repetitions: "10-12x"
        },
        {
          videoId: 'L94T55NiI34', // Self massage suboccipitals
          title: 'exercises.nociceptive.defaultNeck.upperCervicalMassage.title',
          description: 'exercises.nociceptive.defaultNeck.upperCervicalMassage.description',
          importance: 3,
          mainGroup: ["pain-relief"],
          bodyPart:["neck"],
          repetitions: "10-12x"
        }
      ]
    }
  ],
  
  //MIDDLE BACK ✅
  'nociceptive-default-middle back': [
    {
      title: 'exercises.nociceptive.defaultMiddleBack.title',
      description: 'exercises.nociceptive.defaultMiddleBack.description',
      advices: [1, 3, 4], // Reference to advice IDs
      videos: [
        {
          videoId: 'PK62xMsZfG0', // Praying stretch
          title: 'exercises.nociceptive.defaultMiddleBack.prayer.title',
          description: 'exercises.nociceptive.defaultMiddleBack.prayer.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back",],
          alternatives: ['dxzegzGNdaU', 'OKsRn5e2VJY', 'oAxVF_ktAi0'], // Alternative stretching and mobility exercises
          repetitions: "10-12x"
        },
        {
          videoId: 'dxzegzGNdaU', // Neck ball massage
          title: 'exercises.nociceptive.defaultMiddleBack.thoracicSpineMassage.title',
          description: 'exercises.nociceptive.defaultMiddleBack.thoracicSpineMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
          repetitions: "10-12x"
        },
        {
          videoId: 'OKsRn5e2VJY', // Thorax rotation open book lying
          title: 'exercises.nociceptive.defaultMiddleBack.bookOpening.title',
          description: 'exercises.nociceptive.defaultMiddleBack.bookOpening.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  //LOWER BACK ✅
  'nociceptive-default-lower back': [
    {
      title: 'exercises.nociceptive.defaultLowerBack.title',
      description: 'exercises.nociceptive.defaultLowerBack.description',
      advices: [1, 3, 4, 5], // Reference to advice IDs
      videos: [
        {
          videoId: 'PMJsVceAnnY', // Glute stretches
          title: 'exercises.nociceptive.defaultLowerBack.glutealStretching.title',
          description: 'exercises.nociceptive.defaultLowerBack.glutealStretching.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
          alternatives: ['zhzW4-tq9HM'],
          repetitions: "10-12x"
        },
        {
          videoId: 'L1Mf3NxYwgY', // Pelvis tilting sitting
          title: 'exercises.nociceptive.defaultLowerBack.pelvicTilting.title',
          description: 'exercises.nociceptive.defaultLowerBack.pelvicTilting.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
          alternatives: ['2of247Kt0tU'],
          repetitions: "10-12x"
        }
      ]
    }
  ]
};