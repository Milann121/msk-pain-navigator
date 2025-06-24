
import { Exercise } from "@/types/exercise";

export const centralExercises: Record<string, Exercise[]> = {
  // Central Sensitisation ✅
  // NECK ✅
  'central-Central Sensitisation-neck': [
    {
      title: 'exercises.centralSensitisation.neck.title',
      description: 'exercises.centralSensitisation.neck.description',
      videos: [
        {
          videoId: '844ILxo5xsA',
          title: 'exercises.centralSensitisation.neck.wallMassage.title',
          description: 'exercises.centralSensitisation.neck.wallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
         videoId: 'oVJqu0FEw-Y',
          title: 'exercises.centralSensitisation.neck.interscapularStrengthening.title',
          description: 'exercises.centralSensitisation.neck.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: '5NPvv40gd3Q',
          title: 'exercises.centralSensitisation.neck.wallPushUps.title',
          description: 'exercises.centralSensitisation.neck.wallPushUps.description',
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
      title: 'exercises.centralSensitisation.middleBack.title',
      description: 'exercises.centralSensitisation.middleBack.description',
      videos: [
        {
          videoId: 'PK62xMsZfG0',
          title: 'exercises.centralSensitisation.middleBack.prayer.title',
          description: 'exercises.centralSensitisation.middleBack.prayer.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'exercises.centralSensitisation.middleBack.thoracicMassage.title',
          description: 'exercises.centralSensitisation.middleBack.thoracicMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'exercises.centralSensitisation.middleBack.bookOpening.title',
          description: 'exercises.centralSensitisation.middleBack.bookOpening.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.centralSensitisation.middleBack.interscapularStrengthening.title',
          description: 'exercises.centralSensitisation.neck.interscapularStrengthening.description',
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
      title: 'exercises.centralSensitisation.lowerBack.title',
      description: 'exercises.centralSensitisation.lowerBack.description',
      videos: [
        {
        videoId: 'PMJsVceAnnY',
        title:'exercises.centralSensitisation.lowerBack.glutealStretch.title',
        description: 'exercises.centralSensitisation.lowerBack.glutealStretch.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        },
        {
          videoId: 'Xp33YgPZgns',
          title:'exercises.centralSensitisation.lowerBack.bridge.title',
          description: 'exercises.centralSensitisation.lowerBack.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'exercises.centralSensitisation.lowerBack.squats.title',
          description: 'exercises.centralSensitisation.lowerBack.squats.description',
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
      title: 'exercises.defaultNeck.title',
      description: 'exercises.defaultNeck.description',
      videos: [
        {
          videoId: '844ILxo5xsA',
          title: 'exercises.defaultNeck.wallMassage.title',
          description: 'exercises.defaultNeck.wallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
         videoId: 'oVJqu0FEw-Y',
          title: 'exercises.defaultNeck.interscapularStrengthening.title',
          description: 'exercises.defaultNeck.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: '5NPvv40gd3Q',
          title: 'exercises.defaultNeck.wallPushUps.title',
          description: 'exercises.defaultNeck.wallPushUps.description',
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
      title: 'exercises.defaultMiddleBack.phase1.title',
      description: 'exercises.defaultMiddleBack.phase1.description',
      videos: [
        {
          videoId: 'oAxVF_ktAi0',
          title: 'exercises.defaultMiddleBack.phase1.thoracicRotation.title',
          description: 'exercises.defaultMiddleBack.phase1.thoracicRotation.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'exercises.defaultMiddleBack.phase1.thoracicMassage.title',
          description: 'exercises.defaultMiddleBack.phase1.thoracicMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
        },
      ],
    },
    {
      title: 'exercises.defaultMiddleBack.phase2.title',
      description: 'exercises.defaultMiddleBack.phase2.description',
      videos: [
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.defaultMiddleBack.phase2.interscapularStrengthening.title',
          description: 'exercises.defaultMiddleBack.phase2.interscapularStrengthening.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["middle-back","neck"],
        },
        {
          videoId: 'rhPOJA3S-IQ',
          title: 'exercises.defaultMiddleBack.phase2.thoracicExtension.title',
          description: 'exercises.defaultMiddleBack.phase2.thoracicExtension.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'exercises.defaultMiddleBack.phase2.bookOpening.title',
          description: 'exercises.defaultMiddleBack.phase2.bookOpening.description',
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
      title: 'exercises.defaultLowerBack.title',
      description: 'exercises.defaultLowerBack.description',
      videos: [
        {
        videoId: 'PMJsVceAnnY',
        title:'exercises.defaultLowerBack.glutealStretch.title',
        description: 'exercises.defaultLowerBack.glutealStretch.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        
        },
        {
          videoId: 'Xp33YgPZgns',
          title:'exercises.defaultLowerBack.bridge.title',
          description: 'exercises.defaultLowerBack.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'exercises.defaultLowerBack.squats.title',
          description: 'exercises.defaultLowerBack.squats.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        }
      ]
    },
  ],
}
