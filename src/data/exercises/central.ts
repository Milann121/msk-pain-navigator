
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
          videoId: '844ILxo5xsA',
          title: 'exercises.central.centralSensitisationNeck.wallBallMassage.title',
          description: 'exercises.central.centralSensitisationNeck.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
         videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.centralSensitisationNeck.interscapularStrengthening.title',
          description: 'exercises.central.centralSensitisationNeck.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: '5NPvv40gd3Q',
          title: 'exercises.central.centralSensitisationNeck.wallPushUps.title',
          description: 'exercises.central.centralSensitisationNeck.wallPushUps.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
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
          videoId: 'PK62xMsZfG0',
          title: 'exercises.central.centralSensitisationMiddleBack.prayer.title',
          description: 'exercises.central.centralSensitisationMiddleBack.prayer.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'exercises.central.centralSensitisationMiddleBack.thoracicSpineMassage.title',
          description: 'exercises.central.centralSensitisationMiddleBack.thoracicSpineMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'exercises.central.centralSensitisationMiddleBack.bookOpening.title',
          description: 'exercises.central.centralSensitisationMiddleBack.bookOpening.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.centralSensitisationMiddleBack.interscapularStrengthening.title',
          description: 'exercises.central.centralSensitisationMiddleBack.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["middle-back"],
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
        videoId: 'PMJsVceAnnY',
        title: 'exercises.central.centralSensitisationLowerBack.glutealStretching.title',
        description: 'exercises.central.centralSensitisationLowerBack.glutealStretching.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        },
        {
          videoId: 'Xp33YgPZgns',
          title: 'exercises.central.centralSensitisationLowerBack.bridge.title',
          description: 'exercises.central.centralSensitisationLowerBack.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title: 'exercises.central.centralSensitisationLowerBack.squats90.title',
          description: 'exercises.central.centralSensitisationLowerBack.squats90.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
          
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
          videoId: '844ILxo5xsA',
          title: 'exercises.central.defaultNeck.wallBallMassage.title',
          description: 'exercises.central.defaultNeck.wallBallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
         videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.defaultNeck.interscapularStrengthening.title',
          description: 'exercises.central.defaultNeck.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: '5NPvv40gd3Q',
          title: 'exercises.central.defaultNeck.wallPushUps.title',
          description: 'exercises.central.defaultNeck.wallPushUps.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
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
          videoId: 'oAxVF_ktAi0',
          title: 'exercises.central.defaultMiddleBackWeek02.thoracicRotationWithExtension.title',
          description: 'exercises.central.defaultMiddleBackWeek02.thoracicRotationWithExtension.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'exercises.central.defaultMiddleBackWeek02.thoracicSpineMassage.title',
          description: 'exercises.central.defaultMiddleBackWeek02.thoracicSpineMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
        },
      ],
    },
    {
      title: 'exercises.central.defaultMiddleBackWeek35.title',
      description: 'exercises.central.defaultMiddleBackWeek35.description',
      advices: [1], // Reference to advice IDs
      videos: [
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.defaultMiddleBackWeek35.interscapularStrengthening.title',
          description: 'exercises.central.defaultMiddleBackWeek35.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["middle-back","neck"],
        },
        {
          videoId: 'rhPOJA3S-IQ',
          title: 'exercises.central.defaultMiddleBackWeek35.thoracicExtension.title',
          description: 'exercises.central.defaultMiddleBackWeek35.thoracicExtension.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'exercises.central.defaultMiddleBackWeek35.bookOpening.title',
          description: 'exercises.central.defaultMiddleBackWeek35.bookOpening.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
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
        videoId: 'PMJsVceAnnY',
        title: 'exercises.central.defaultLowerBack.glutealStretching.title',
        description: 'exercises.central.defaultLowerBack.glutealStretching.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        
        },
        {
          videoId: 'Xp33YgPZgns',
          title: 'exercises.central.defaultLowerBack.bridge.title',
          description: 'exercises.central.defaultLowerBack.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title: 'exercises.central.defaultLowerBack.squats90.title',
          description: 'exercises.central.defaultLowerBack.squats90.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        }
      ]
    },
  ],
}
