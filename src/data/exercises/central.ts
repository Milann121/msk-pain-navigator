
import { Exercise } from "@/types/exercise";

export const centralExercises: Record<string, Exercise[]> = {
  // Central Sensitisation ✅
  // NECK ✅
  'central-Central Sensitisation-neck': [
    {
      title: 'exercises.central.neck.generalProgram.title',
      description: 'exercises.central.neck.generalProgram.description',
      videos: [
        {
          videoId: '844ILxo5xsA',
          title: 'exercises.central.neck.generalProgram.wallMassage.title',
          description: 'exercises.central.neck.generalProgram.wallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
         videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.neck.generalProgram.interscapularStrength.title',
          description: 'exercises.central.neck.generalProgram.interscapularStrength.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: '5NPvv40gd3Q',
          title: 'exercises.central.neck.generalProgram.wallPushUps.title',
          description: 'exercises.central.neck.generalProgram.wallPushUps.description',
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
      title: 'exercises.central.middleBack.generalProgram.title',
      description: 'exercises.central.middleBack.generalProgram.description',
      videos: [
        {
          videoId: 'PK62xMsZfG0',
          title: 'exercises.central.middleBack.generalProgram.prayer.title',
          description: 'exercises.central.middleBack.generalProgram.prayer.description',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'exercises.central.middleBack.generalProgram.thoracicMassage.title',
          description: 'exercises.central.middleBack.generalProgram.thoracicMassage.description',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'exercises.central.middleBack.generalProgram.bookOpening.title',
          description: 'exercises.central.middleBack.generalProgram.bookOpening.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.middleBack.generalProgram.interscapularStrength.title',
          description: 'exercises.central.middleBack.generalProgram.interscapularStrength.description',
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
      title: 'exercises.central.lowerBack.generalProgram.title',
      description: 'exercises.central.lowerBack.generalProgram.description',
      videos: [
        {
        videoId: 'PMJsVceAnnY',
        title:'exercises.central.lowerBack.generalProgram.glutealStretch.title',
        description: 'exercises.central.lowerBack.generalProgram.glutealStretch.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        },
        {
          videoId: 'Xp33YgPZgns',
          title:'exercises.central.lowerBack.generalProgram.bridge.title',
          description: 'exercises.central.lowerBack.generalProgram.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'exercises.central.lowerBack.generalProgram.squats.title',
          description: 'exercises.central.lowerBack.generalProgram.squats.description',
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
      title: 'exercises.central.neck.generalProgram.title',
      description: 'exercises.central.neck.generalProgram.description',
      videos: [
        {
          videoId: '844ILxo5xsA',
          title: 'exercises.central.neck.generalProgram.wallMassage.title',
          description: 'exercises.central.neck.generalProgram.wallMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        },
        {
         videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.neck.generalProgram.interscapularStrength.title',
          description: 'exercises.central.neck.generalProgram.interscapularStrength.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: '5NPvv40gd3Q',
          title: 'exercises.central.neck.generalProgram.wallPushUps.title',
          description: 'exercises.central.neck.generalProgram.wallPushUps.description',
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
      title: 'exercises.central.middleBack.phase1.title',
      description: 'exercises.central.middleBack.phase1.description',
      videos: [
        {
          videoId: 'oAxVF_ktAi0',
          title: 'exercises.central.middleBack.phase1.thoracicRotation.title',
          description: 'exercises.central.middleBack.phase1.thoracicRotation.description',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'exercises.central.middleBack.phase1.thoracicMassage.title',
          description: 'exercises.central.middleBack.phase1.thoracicMassage.description',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
        },
      ],
    },
    {
      title: 'exercises.central.middleBack.phase2.title',
      description: 'exercises.central.middleBack.phase2.description',
      videos: [
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'exercises.central.middleBack.phase2.interscapularStrength.title',
          description: 'exercises.central.middleBack.phase2.interscapularStrength.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["middle-back","neck"],
        },
        {
          videoId: 'rhPOJA3S-IQ',
          title: 'exercises.central.middleBack.phase2.thoracicExtension.title',
          description: 'exercises.central.middleBack.phase2.thoracicExtension.description',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'exercises.central.middleBack.phase2.bookOpening.title',
          description: 'exercises.central.middleBack.phase2.bookOpening.description',
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
      title: 'exercises.central.lowerBack.generalProgram.title',
      description: 'exercises.central.lowerBack.generalProgram.description',
      videos: [
        {
        videoId: 'PMJsVceAnnY',
        title:'exercises.central.lowerBack.generalProgram.glutealStretch.title',
        description: 'exercises.central.lowerBack.generalProgram.glutealStretch.description',
        importance: 1,
        mainGroup: ["mobility","pain-relief"],
        bodyPart:["lower-back"],
        
        },
        {
          videoId: 'Xp33YgPZgns',
          title:'exercises.central.lowerBack.generalProgram.bridge.title',
          description: 'exercises.central.lowerBack.generalProgram.bridge.description',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'exercises.central.lowerBack.generalProgram.squats.title',
          description: 'exercises.central.lowerBack.generalProgram.squats.description',
          importance: 3,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        }
      ]
    },
  ],
}
