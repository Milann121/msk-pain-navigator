import { Exercise } from "@/types/exercise";

export const centralExercises: Record<string, Exercise[]> = {
  // Central Sensitisation ✅
  // NECK ✅
  'central-Central Sensitisation-neck': [
    {
      title: 'exercises.central.centralSensitisationNeck.title',
      description: 'exercises.central.centralSensitisationNeck.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: '844ILxo5xsA', // Neck ball massage
          title: 'exercises.central.centralSensitisationNeck.wallBallMassage.title',
          description: 'exercises.central.centralSensitisationNeck.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        },
        {
         videoId: 'oVJqu0FEw-Y', //Middle-back strenthening - 3exc.
          title: 'exercises.central.centralSensitisationNeck.interscapularStrengthening.title',
          description: 'exercises.central.centralSensitisationNeck.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: '5NPvv40gd3Q', // Wall push-ups
          title: 'exercises.central.centralSensitisationNeck.wallPushUps.title',
          description: 'exercises.central.centralSensitisationNeck.wallPushUps.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // MIDDLE BACK ✅
  'central-Central Sensitisation-middle back': [
    {
      title: 'exercises.central.centralSensitisationMiddleBack.title',
      description: 'exercises.central.centralSensitisationMiddleBack.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'PK62xMsZfG0', // Praying stretch
          title: 'exercises.central.centralSensitisationMiddleBack.prayer.title',
          description: 'exercises.central.centralSensitisationMiddleBack.prayer.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dxzegzGNdaU', // Neck ball massage
          title: 'exercises.central.centralSensitisationMiddleBack.thoracicSpineMassage.title',
          description: 'exercises.central.centralSensitisationMiddleBack.thoracicSpineMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'OKsRn5e2VJY', // Thorax rotation open book lying
          title: 'exercises.central.centralSensitisationMiddleBack.bookOpening.title',
          description: 'exercises.central.centralSensitisationMiddleBack.bookOpening.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'oVJqu0FEw-Y', // Middle-back strenthening - 3exc.
          title: 'exercises.central.centralSensitisationMiddleBack.interscapularStrengthening.title',
          description: 'exercises.central.centralSensitisationMiddleBack.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  // LOWER BACK ✅
  'central-Central Sensitisation-lower back': [
    {
      title: 'exercises.central.centralSensitisationLowerBack.title',
      description: 'exercises.central.centralSensitisationLowerBack.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
        videoId: 'PMJsVceAnnY', // Glute stretches
        title: 'exercises.central.centralSensitisationLowerBack.glutealStretching.title',
        description: 'exercises.central.centralSensitisationLowerBack.glutealStretching.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        repetitions: "10-12x"
        },
        {
          videoId: 'Xp33YgPZgns', // Glute bridges
          title: 'exercises.central.centralSensitisationLowerBack.bridge.title',
          description: 'exercises.central.centralSensitisationLowerBack.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.central.centralSensitisationLowerBack.squats90.title',
          description: 'exercises.central.centralSensitisationLowerBack.squats90.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ]
    },
  ],

  
  // Default exercises ✅
  // NECK ✅
  'central-default-neck': [
    {
      title: 'exercises.central.defaultNeck.title',
      description: 'exercises.central.defaultNeck.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: '844ILxo5xsA', // Neck ball massage
          title: 'exercises.central.defaultNeck.wallBallMassage.title',
          description: 'exercises.central.defaultNeck.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        },
        {
         videoId: 'oVJqu0FEw-Y', // 90 degree squats
          title: 'exercises.central.defaultNeck.interscapularStrengthening.title',
          description: 'exercises.central.defaultNeck.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: '5NPvv40gd3Q', // Wall push-up
          title: 'exercises.central.defaultNeck.wallPushUps.title',
          description: 'exercises.central.defaultNeck.wallPushUps.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
          repetitions: "10-12x"
        }
      ]
    }
  ],

  //MIDDLE BACK ✅
  'central-default-middle back': [
    {
      title: 'exercises.central.defaultMiddleBackWeek02.title',
      description: 'exercises.central.defaultMiddleBackWeek02.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oAxVF_ktAi0', // Neck extension isometrics
          title: 'exercises.central.defaultMiddleBackWeek02.thoracicRotationWithExtension.title',
          description: 'exercises.central.defaultMiddleBackWeek02.thoracicRotationWithExtension.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dxzegzGNdaU', // Neck ball massage
          title: 'exercises.central.defaultMiddleBackWeek02.thoracicSpineMassage.title',
          description: 'exercises.central.defaultMiddleBackWeek02.thoracicSpineMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
          repetitions: "10-12x"
        },
      ],
    },
    {
      title: 'exercises.central.defaultMiddleBackWeek35.title',
      description: 'exercises.central.defaultMiddleBackWeek35.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oVJqu0FEw-Y', // Middle-back strenthening - 3exc.
          title: 'exercises.central.defaultMiddleBackWeek35.interscapularStrengthening.title',
          description: 'exercises.central.defaultMiddleBackWeek35.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["middle-back","neck"],
          repetitions: "10-12x"
        },
        {
          videoId: 'rhPOJA3S-IQ', // Thorax extensions wall
          title: 'exercises.central.defaultMiddleBackWeek35.thoracicExtension.title',
          description: 'exercises.central.defaultMiddleBackWeek35.thoracicExtension.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'OKsRn5e2VJY', // Thorax rotation open book lying
          title: 'exercises.central.defaultMiddleBackWeek35.bookOpening.title',
          description: 'exercises.central.defaultMiddleBackWeek35.bookOpening.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
          repetitions: "10-12x"
        }
      ]  
    }
  ],

  //LUMBAR SPINE ✅
  'central-default-lower back': [
    {
      title: 'exercises.central.defaultLowerBack.title',
      description: 'exercises.central.defaultLowerBack.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
        videoId: 'PMJsVceAnnY', // Glute stretches
        title: 'exercises.central.defaultLowerBack.glutealStretching.title',
        description: 'exercises.central.defaultLowerBack.glutealStretching.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        repetitions: "10-12x"
        },
        {
          videoId: 'Xp33YgPZgns', // Glute bridges
          title: 'exercises.central.defaultLowerBack.bridge.title',
          description: 'exercises.central.defaultLowerBack.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        },
        {
          videoId: 'dVjfUlXK93k', // 90 degree squats
          title: 'exercises.central.defaultLowerBack.squats90.title',
          description: 'exercises.central.defaultLowerBack.squats90.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          repetitions: "10-12x"
        }
      ]
    },
  ],
}