
import { Exercise } from "@/types/exercise";

//'slap-tear'
//'labral-leason'
//'shoulder-bursa'
//'rotator-cuff-tear'
//'rotator-cuff-tendinopathy'
//'biceps-tendinopathy'
//'biceps-tear-long-head'
//'shoulder-dislocation'
//'unstable-shoulder'

export const shoulderNociceptiveExercises: Record<string, Exercise[]> = {
  // Frozen shoulder and stiff shoulder exercises
  'nociceptive-frozen-shoulder-upper limb': [
    {
      title: 'Cvičenia pre zmrznuté rameno',
      description: '',
      videos: [
        {
          videoId: 'xxgqT6Jn4pc',
          title: 'Kyvadlové cvičenia',
          description: 'Predkloňte sa a začnite vykonávať jemné kyvadlové pohyby na uvoľnenie napätia v ramene. Stačia mierne pohyby v tolerancii bolesti.',
          importance: 2,
          mainGroup: ['mobility'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'PY9H8ulsUTDHig3I', 
          title: 'Izometrická vonkajšia rotácia ramena',
          description: 'Pristúpte k stene s pokrčeným laťom v 90° uhle pri tele. Medzi vonkajšiu stranu dlane a stenu uložte zložený uterák. Uvoľnite plecia a po celý čas ich držte dole -> dbajte na to, aby vám pri cvičení plecia nestúpali k ušiam. Následne zatlačte vonkajšou stranou dlane do steny s neustále pritiahnutým lakťom pri tele. OPAKOVANIA: 6-8 sekúnd x 3-5x za sebou. 1-2x denne.',
          importance: 1,
          mainGroup: ['pain-relief', 'stability'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'RTIYgvFHIXHggL0Z',
          title: 'Uvoľnenie rotátorovej manžety',
          description: 'Zoberte si tenisovú loptu a uložte si ju na lopatku zo zadu. Oprite sa o stenu a pomaly masírujte svaly rotátorovej manžety. V prípade, že nájdete bolestivý bod, zastavte na tomto mieste a bez pohybu tlačte po dobu 30 sekúnd (ostrá bolesť sa môžte šíriť do prednej časti ramena).',
        
        } 
      ]
    }
  ],

  // Rotator cuff tear exercises
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

  // Shoulder impingement exercises
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



