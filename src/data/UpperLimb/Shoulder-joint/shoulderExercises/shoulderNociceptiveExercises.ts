
import { Exercise } from "@/types/exercise";

export const shoulderNociceptiveExercises: Record<string, Exercise[]> = {
  // Frozen shoulder nociceptive exercises
  'nociceptive-frozen-shoulder-upper limb': [
    {
      title: 'Cvičenia pre zmrznuté rameno - nociceptívna bolesť',
      description: 'Jemné cvičenia na zlepšenie pohyblivosti ramena pri zmrznutom ramene s nociceptívnou bolesťou.\n\nTieto cvičenia pomáhajú postupne obnoviť rozsah pohybu v ramene.\nVykonávajte ich pomaly a opatrne, v prípade bolesti cvičenie prerušte.',
      videos: [
        {
          videoId: 'example1',
          title: 'Pasívne ohýbanie ramena',
          description: 'Jemné pasívne pohyby ramena na zlepšenie pohyblivosti.',
          importance: 1,
          mainGroup: ['mobility'],
          bodyPart: ['upper limb']
        },
        {
          videoId: 'example2', 
          title: 'Kyvadlové cvičenia',
          description: 'Jemné kyvadlové pohyby na uvoľnenie napätia v ramene.',
          importance: 1,
          mainGroup: ['pain-relief'],
          bodyPart: ['upper limb']
        }
      ]
    }
  ],

  // Rotator cuff tear nociceptive exercises
  'nociceptive-rotator-cuff-tear-upper limb': [
    {
      title: 'Cvičenia pre trhnutie rotátorovej manžety - nociceptívna bolesť',
      description: 'Špecializované cvičenia na posilnenie a rehabilitáciu po trhnutí rotátorovej manžety.\n\nTieto cvičenia pomáhajú obnoviť funkciu ramena a predchádzajú ďalším zraneniam.\nZačnite s ľahkými cvičeniami a postupne zvyšujte intenzitu.',
      videos: [
        {
          videoId: 'example3',
          title: 'Izometrické posilňovanie rotátorovej manžety',
          description: 'Jemné izometrické cvičenia na posilnenie rotátorovej manžety.',
          importance: 1,
          mainGroup: ['stability'],
          bodyPart: ['upper limb']
        },
        {
          videoId: 'example4',
          title: 'Pasívne protahovanie ramena',
          description: 'Jemné protahovacie cvičenia na zlepšenie pohyblivosti.',
          importance: 2,
          mainGroup: ['mobility'],
          bodyPart: ['upper limb']
        }
      ]
    }
  ],

  // Shoulder impingement nociceptive exercises
  'nociceptive-subacromional-impingement-syndrome-upper limb': [
    {
      title: 'Cvičenia pre subakromiálny impingment syndróm - nociceptívna bolesť',
      description: 'Cvičenia zamerané na zlepšenie priestoru pod akromiónom a zníženie bolesti.\n\nTieto cvičenia pomáhajú zlepšiť mechaniku ramena a znižujú tlak na šľachy.\nVyhýbajte sa pohybom nad hlavou, ktoré zhoršujú príznaky.',
      videos: [
        {
          videoId: 'example5',
          title: 'Posilňovanie dolných trapcov',
          description: 'Cvičenia na posilnenie dolných vlákien trapezu na zlepšenie mechaniky ramena.',
          importance: 1,
          mainGroup: ['stability'],
          bodyPart: ['upper limb']
        },
        {
          videoId: 'example6',
          title: 'Protahovanie prednej časti ramena',
          description: 'Protahovacie cvičenia na uvoľnenie napätia v prednej časti ramena.',
          importance: 1,
          mainGroup: ['mobility'],
          bodyPart: ['upper limb']
        }
      ]
    }
  ],

  // Default nociceptive shoulder exercises
  'nociceptive-default-upper limb': [
    {
      title: 'Všeobecné cvičenia pre rameno - nociceptívna bolesť',
      description: 'Základné cvičenia vhodné pre rôzne typy nociceptívnej bolesti ramena.\n\nTieto cvičenia pomáhajú zlepšiť celkovú funkciu ramena a znížiť bolesť.\nVykonávajte ich pravidelne, ale rešpektujte hranice bolesti.',
      videos: [
        {
          videoId: 'example7',
          title: 'Základné pohyblivostné cvičenia ramena',
          description: 'Jemné cvičenia na zlepšenie pohyblivosti vo všetkých smeroch.',
          importance: 1,
          mainGroup: ['mobility'],
          bodyPart: ['upper limb']
        },
        {
          videoId: 'example8',
          title: 'Základné posilňovacie cvičenia',
          description: 'Ľahké posilňovacie cvičenia na stabilizáciu ramena.',
          importance: 2,
          mainGroup: ['stability'],
          bodyPart: ['upper limb']
        }
      ]
    }
  ]
};
