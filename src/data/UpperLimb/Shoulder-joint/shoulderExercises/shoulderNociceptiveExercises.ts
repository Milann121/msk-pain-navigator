
import { Exercise } from "@/types/exercise";

export const shoulderNociceptiveExercises: Record<string, Exercise[]> = {
  // Frozen shoulder and stiff shoulder exercises
  'nociceptive-frozen-shoulder-upper limb': [
    {
      title: '0-3 týždne',
      description: 'Základné cvičenia na zmrznuté rameno s cieľom znížiť bolesť a zvýšiť rozsah pohybu.',
      videos: [
        {
          videoId: 'Ak0QVHhwkQg',
          title: 'Kyvadlové cvičenia',
          description: 'Predkloňte sa a začnite vykonávať jemné kyvadlové pohyby na uvoľnenie napätia v ramene. Stačia mierne pohyby v tolerancii bolesti.',
          importance: 3,
          mainGroup: ['mobility'],
          bodyPart: ['shoulder']
        },
        {
          videoId: '1uz4DoaSY2M', 
          title: 'Izometrická vonkajšia rotácia ramena',
          description: 'Pristúpte k stene s pokrčeným laťom v 90° uhle pri tele. Medzi vonkajšiu stranu dlane a stenu uložte zložený uterák. Uvoľnite plecia a po celý čas ich držte dole -> dbajte na to, aby vám pri cvičení plecia nestúpali k ušiam. Následne zatlačte vonkajšou stranou dlane do steny s neustále pritiahnutým lakťom pri tele. OPAKOVANIA: 6-8 sekúnd x 3-5x za sebou. 1-2x denne.',
          importance: 1,
          mainGroup: ['pain-relief', 'stability'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'un6jXuY',
          title: 'Uvoľnenie rotátorovej manžety',
          description: 'Zoberte si tenisovú loptu a uložte si ju na lopatku zo zadu. Oprite sa o stenu a pomaly masírujte svaly rotátorovej manžety. V prípade, že nájdete bolestivý bod, zastavte na tomto mieste a bez pohybu tlačte po dobu 30 sekúnd (ostrá bolesť sa môžte šíriť do prednej časti ramena).',
          importance: 1,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'NUhSjqTpw5k',
          title: 'Nahrievanie ramenného kĺbu',
          description: 'Zvoľte výhrevnú podložku, alebo využite fén. V prípade fénu si VŽDY ULOŽTE UTERÁK na pokožku a zohrievajte uterák! Začnite zohrievať rameno z prednej strany a neskôr zo zadnej strany -> zohrievajte po dobu 10-15 minút, aby ste kompletne prehriali svaly ramena. Vždy si dávajte pozor, aby ste si nepopálili pokožku! OPAKOVANIA: 2x denne 10-15min.',
          importance: 2,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder']
        }
      ]
    },
    {
      title: '4-6 týždeň',
      description: 'Cvičenia na zvýšenie svalovej sily a návrat k pohybu.',
      videos: [
        {
          videoId: 'ldMl3J7MzXE',
          title: 'Izometrické tlaky ramena',
          description: 'Uložte sa chrbtom k stene a zatlačte lakťom do steny. OPAKOVANIA: 6-8 sekúnd x 3 série. Otočte sa čelom k stene, pokrčte lakeť a dlaňou (alebo rukou v päsť) zatlačte do steny. OPAKOVANIA: 6-8 sekúnd 3 série.',
          importance: 2,
          mainGroup: ['stability'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'whyp41YIN8A',
          title: 'Kliky o stenu',
          description: 'Uložte ruky na stenu na úroveň hrudníka, mierne širšie ako šírka pliec. Opatrne sa s vystretým telom priblížte k stene a odtiahnite sa od steny. Dávajte pozor, aby ste nezdvíhali ramená k ušiam a rešpektujte bolesť vášho zmrznutého ramena. OPAKOVANIA: 10-12x 2 série denne',
          importance: 3,
          mainGroup: ['stability'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'Posiľnenie medzilopatkových svalov',
          description: 'Uchyťte odporovú gumu podľa videa. Tieto 3 cviky môžete striedať, alebo si vybrať ktorýkoľvek z nich. \n➜ UPOZORNЕНИЕ: pri týchto cvikoch nesmiete pociťovať namáhanie trapézov! Celý čas sa snažte tlačiť lopatky a ramená smerom dole od uší, aby pracovali medzilopatkové svaly. Dbajte na to, aby ste počas vykonávania cvikov viac cítili svaly medzi lopatkami, nie ramená a trapézy - to dosiahnete práve tlačením pliec dole. \n➜ OPAKOVANIA: 10-15x / 3 série / 1x denne. ',
          importance: 2,
          mainGroup: ['stability'],
          bodyPart: ['shoulder']
        }
      ]
    }
  ],

  // Subacromional impingement syndrome exercises
  'nociceptive-subacromional-impingement-syndrome-upper limb': [
    {
      title: 'Cvičenia pre subakromiálny impingment syndróm',
      description: 'Cvičenia zamerané na zlepšenie priestoru pod akromiónom a zníženie bolesti.\n\nTieto cvičenia pomáhajú zlepšiť mechaniku ramena a znižujú tlak na šľachy.\nVyhýbajte sa pohybom nad hlavou, ktoré zhoršujú príznaky.',
      videos: [
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'Posiľnenie medzilopatkových svalov',
          description: 'Uchyťte odporovú gumu podľa videa. Tieto 3 cviky môžete striedať, alebo si vybrať ktorýkoľvek z nich. \n➜ UPOZORNЕНИЕ: pri týchto cvikoch nesmiete pociťovať namáhanie trapézov! Celý čas sa snažte tlačiť lopatky a ramená smerom dole od uší, aby pracovali medzilopatkové svaly.',
          importance: 1,
          mainGroup: ['stability'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'Ak0QVHhwkQg',
          title: 'Jemné kyvadlové cvičenia',
          description: 'Predkloňte sa a začnite vykonávať jemné kyvadlové pohyby na uvoľnenie napätia v ramene.',
          importance: 2,
          mainGroup: ['mobility'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'NUhSjqTpw5k',
          title: 'Nahrievanie pred cvičením',
          description: 'Zohrievajte rameno pred cvičením na zlepšenie cirkulácie a pripravenosť svalov.',
          importance: 3,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder']
        }
      ]
    }
  ],

  // Rotator cuff tear exercises
  'nociceptive-rotator-cuff-tear-upper limb': [
    {
      title: 'Cvičenia pre trhnutie rotátorovej manžety',
      description: 'Špecializované cvičenia na posilnenie a rehabilitáciu po trhnutí rotátorovej manžety.\n\nTieto cvičenia pomáhajú obnoviť funkciu ramena a predchádzajú ďalším zraneniam.\nZačnite s ľahkými cvičeniami a postupne zvyšujte intenzitu.',
      videos: [
        {
          videoId: '1uz4DoaSY2M',
          title: 'Izometrické posilňovanie rotátorovej manžety',
          description: 'Jemné izometrické cvičenia na posilnenie rotátorovej manžety bez nadmernej záťaže.',
          importance: 1,
          mainGroup: ['stability'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'un6jXuY',
          title: 'Masáž rotátorovej manžety',
          description: 'Jemná masáž na zlepšenie cirkulácie a uvoľnenie napätia v rotátorovej manžete.',
          importance: 2,
          mainGroup: ['pain-relief'],
          bodyPart: ['shoulder']
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
          videoId: 'Ak0QVHhwkQg',
          title: 'Základné pohyblivostné cvičenia ramena',
          description: 'Jemné cvičenia na zlepšenie pohyblivosti vo všetkých smeroch.',
          importance: 1,
          mainGroup: ['mobility'],
          bodyPart: ['shoulder']
        },
        {
          videoId: 'ldMl3J7MzXE',
          title: 'Základné posilňovacie cvičenia',
          description: 'Ľahké posilňovacie cvičenia na stabilizáciu ramena.',
          importance: 2,
          mainGroup: ['stability'],
          bodyPart: ['shoulder']
        }
      ]
    }
  ]
};
