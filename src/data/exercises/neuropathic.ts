import { Exercise } from "@/types/exercise";

export const neuropathicExercises: Record<string, Exercise[]> = {
  // Radicular Pain
  // NECK ✅
  'neuropathic-Radicular Pain-neck': [
    {
      title: '0-3 týžeň',
      description: 'Jemné cvičenia na uvoľnenie nervových koreňov v krčnej oblasti a zníženie neurologických príznakov.',
      videos: [
        {
          videoId: 'oaB4o_qeMdQ',
          title: 'Zásuvka krku',
          description: 'Posaďte sa a uvoľnite ramená. Uložte si ukazovák jednej ruky na bradu a pomaly zasuňte bradu smerom dnu (podľa videa). Rozsah zásuvky robte iba tak, aby vám bol komfortný, tento cvik by nemal produkovať žiadnu bolesť! Následne bradu opäť vysuňte mierne dopredu. Celý čas sa snažte mať uvoľené plecia, nenapínať ich a hlavu držať v rovine bez pohybov do predklonu alebo záklonu. \n ➜ OPAKOVANIA: 10x / kedykoľvek v priebehu dňa.',
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: "Postup: Posaďte sa a uvoľnite trapézy\n ➜ upažte ruku s dlaňou smerujúcou hore\n ➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n Vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte\nOPAKOVANIA: zopakujte 10-15 x /5x denne",
        },
        {
          videoId: 'AefUaX7yLGw',
          title: 'Úklony krku',
          description: 'Posaďte sa a začnite vykonávať úklony do strany. Rozsah úklonu vykonávajte maximálne po bolesť a nezotrvávajte v tejto polohe - hneď sa vráťte naspäť do neutrálnej polohy.\n ➜ OPAKOVANIA: 6-8x do každej strany.\n ➜ UPOZORNENIE: ak bude jedna strana bolestivejšia, obmedzte rozsah aj opakovania do tejto polohy. ',
        }
      ]
    },
    {
      title: '4-6 týždeň',
      description: 'Zvýšenie pohyblivosti v krčnej chrbtici a redukcia bolesti.',
      videos: [
        {
          videoId: 'PK62xMsZfG0',
          title: 'Modlenie - uvoľnenie krku a lopatiek',
          description: 'Spojte dlane a lakte v 90 stupňovom uhle v lakti a ramenách. So sústavným spojením pomaly zdvíhajte lakte vyššie, ale stále DRŽTE SPOJENÉ lakte aj dlane. UPOZORNENIE: snažte sa, aby vám prsty stále smerovali do stropu. OPAKOVANIA: 20 sekúnd / 2x za sebou / 2x denne.',
        },
        {
          videoId: '1PQmk7pE8',
          title: 'Masáž loptičkou o stenu',
          description: 'Na tento cvik použite ideálne tenisovú loptičku. Položte si loptičku na trapéz, oprite sa o stenu a masírujte svaly šije ako na videu. V prípade, že nájdete bolestivé miesta, môžete staticky zatlačiť po dobu 20-30 sekúnd. Premasírujte celú oblasť trapézov a medzilopatkového priestoru.',
        }
      ]
    }
  ],

  'neuropathic-Radicular Pain-lower back': [
    {
      title: 'Nervové napínacie cvičenia pre driek',
      description: 'Cvičenia zamerané na jemnú mobilizáciu nervových štruktúr v driekovej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // NEUROPAHIC - Radiculopathy
  'neuropathic-Radiculopathy-neck': [
    {
      title: 'Cvičenia na posilnenie krčných svalov',
      description: 'Cvičenia zamerané na posilnenie svalov, ktoré podporujú krčnú chrbticu a znižujú tlak na nervové korene.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-Radiculopathy-lower back': [
    {
      title: 'Cvičenia na posilnenie core',
      description: 'Cvičenia zamerané na posilnenie core svalov na podporu driekovej chrbtice a zníženie tlaku na nervové korene.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // Default exercises
  'neuropathic-default-neck': [
    {
      title: 'Základné neuropatické cvičenia pre krk',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v krčnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-default-middle back': [
    {
      title: 'Základné neuropatické cvičenia pre hrudník',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-default-lower back': [
    {
      title: 'Základné neuropatické cvičenia pre driek',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v driekovej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ]
};
