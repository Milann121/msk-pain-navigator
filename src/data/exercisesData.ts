
import { Exercise } from "@/types/exercise";

// Exercise data organized by differential diagnosis and body part
const exercisesByDifferential: Record<string, Exercise[]> = {
  // Nociceptive - Disc Herniation
  'nociceptive-disc herniation-neck': [
    {
      title: 'Program 0-3 týždeň',
      description: 'Cvičenia na redukciu bolesti, ktoré pomáhajú stabilizovať krčnú chrbticu a znížiť tlak na medzistavcové platničky.',
      videos: [
        {
          videoId: 'eL5KxSe3c1g',
          title: 'McKenzie záklony krčnej chrbtice',
          description: 'Postup:\n➜ posaďte sa a uvoľnite trapézy\n➜ vtiahnite bradu dnu (zásuvka), ale nezdvíhajte pri tom plecia, ani hlavu nepredkláňajte\n➜ zakloňte hlavu do rozsahu, ktorý je vám komfortný a nespôsobuje veľa bolesti\n➜ v záklone urobte krátke rotácie hlavy do oboch strán\n➜ OPAKOVANIA: záklon opakujte 5-10x za sebou s 3-5 rotáciami do každej strany ➜ 5x denne. ',
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: 'Postup:\n➜posaďte sa a uvoľnite trapézy\n➜ upažte ruku s dlaňou smerujúcou hore\n➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n➜ vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte \n➜ OPAKOVANIA: zopakujte 10-15 x /5x denne',
        },
        {
          videoId: ' ',
          title: '...',
          description: '...',
        }
      ]
    },
    {
      title: 'Program 4-6 týždeň',
      description: '.....',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: '.........',
          description: '......'
        },
        {
          videoId: 'dQw4w9WgXcQ',
          title: '.......',
          description: '........'
        }
      ]
    }
  ],

  // LUMBAR SPINE - Fixed the syntax error here
  'nociceptive-disc herniation-lower back': [
    {
      title: 'Pogram cvičení 0-3 týždeň',
      description: 'Základné cvičenia pri pravdepodobnom poškodení platničiek s cieľom redukovať bolesť a zabrániť ďaľšiemu poškodeniu.',
      videos: [
        {
          videoId: 'tIZppe-RB0g',
          title: 'McKenzie záklony',
          description: 'Postup:\n➜ uložte sa na brucho s rukami podľa videa\n➜ dlaňami odtlačte trup od podložky do záklonu\n➜ upozornenie: držte zadok uvoľnený, nezatínajte sedacie svaly!\n➜ zakláňajte sa iba do bodu, pokiaľ je pohyb komfortný a nespôsobuje vám viac bolesti\nOPAKOVANIA: 10x / 4-5x denne'
        },
        {
          videoId: '3A27NLPe2bs',
          title: 'Neurodynamika sedacieho nervu',
          description: 'Popis vo videu.\nOPAKOVANIA: 15x / 3-5x denne\nUPOZORNENIE: ihneď po cvičení môžete pociťovať mierne trnutie nohy. Malo by prejsť do pól minúty, v opačnom prípade znížte počet opakovaní alebo cvik vynechajte.'
        },
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\nOPAKOVANIA: 5x denne.'
        }
      ]
    },
    {
      title: 'Program cvičení 4-6 týždeň',
      description: 'Pokročilé cvičenia na posilnenie krčnej chrbtice a prevenciu ďaľšieho poškodenia vašich platiničiek.',
      videos: [
        {
          videoId: '....',
          title:'......',
          description: '......'
        }
      ]
    }
  ],

  // NOCICEPTIVE - Facet Joint Syndrome
  'nociceptive-facet joint syndrome-neck': [
    {
      title: 'Jemná rotácia krku',
      description: 'Cvičenie na zlepšenie mobility facetových kĺbov v krčnej oblasti pri minimálnom zaťažení.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'nociceptive-facet joint syndrome-middle back': [
    {
      title: 'Rotačné cvičenia pre hrudnú chrbticu',
      description: 'Jemné rotačné pohyby pre zlepšenie mobility facetových kĺbov v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'nociceptive-facet joint syndrome-lower back': [
    {
      title: 'Rotačné cvičenia pre driek',
      description: 'Cvičenia zamerané na mobilizáciu facetových kĺbov v driekovej oblasti s dôrazom na kontrolovaný pohyb.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // Nociceptive - SIJ Syndrome
  'nociceptive-SIJ syndrome-lower back': [
    {
      title: 'Stabilizačné cvičenia pre SI kĺb',
      description: 'Cvičenia zamerané na stabilizáciu sakroiliakálneho kĺbu a zlepšenie jeho funkcie.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    },
    {
      title: 'Mobilizácia panvy',
      description: 'Jemné cvičenia na zlepšenie mobility panvy a sakroiliakálneho kĺbu.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // NEUROPATHIC - Radicular Pain
  'neuropathic-Radicular Pain-neck': [
    {
      title: 'Nervové napínacie cvičenia pre krk',
      description: 'Jemné cvičenia na uvoľnenie nervových koreňov v krčnej oblasti a zníženie neurologických príznakov.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'neuropathic-Radicular Pain-middle back': [
    {
      title: 'Nervové mobilizačné cvičenia pre hrudnú chrbticu',
      description: 'Cvičenia zamerané na mobilizáciu nervových koreňov v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
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

  // CENTRAL - Central Sensitisation
  'central-Central Sensitisation-neck': [
    {
      title: 'Relaxačné cvičenia pre krk',
      description: 'Jemné cvičenia zamerané na relaxáciu a zníženie napätia v krčnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    },
    {
      title: 'Dychové cvičenia',
      description: 'Cvičenia zamerané na dychové techniky pomáhajúce znížiť stres a napätie, ktoré môžu prispievať k centrálnej senzitizácii.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-Central Sensitisation-middle back': [
    {
      title: 'Joga pre hrudnú chrbticu',
      description: 'Jemné jogové cvičenia pre relaxáciu hrudnej chrbtice a zníženie celkového napätia v tele.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-Central Sensitisation-lower back': [
    {
      title: 'Relaxačné cvičenia pre driek',
      description: 'Jemné cvičenia zamerané na relaxáciu a zníženie napätia v driekovej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    },
    {
      title: 'Meditatívne dychové techniky',
      description: 'Techniky pre zníženie stresu a napätia, ktoré môžu prispievať k centrálnej senzitizácii bolesti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],

  // DEFAULT exercises for when specific combinations aren't found
  'nociceptive-default-neck': [
    {
      title: 'Základné cvičenia pre krčnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu krčnej chrbtice.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'nociceptive-default-middle back': [
    {
      title: 'Základné cvičenia pre hrudnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu hrudnej chrbtice.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'nociceptive-default-lower back': [
    {
      title: 'Pogram cvičení 0-3 týždeň',
      description: 'Základné cvičenia pri pravdepodobnom poškodení platničiek s cieľom redukovať bolesť a zabrániť ďaľšiemu poškodeniu.',
      videos: [
        {
          videoId: 'tIZppe-RB0g',
          title: 'McKenzie záklony',
          description: 'Postup:\n➜ uložte sa na brucho s rukami podľa videa\n➜ dlaňami odtlačte trup od podložky do záklonu\n➜ upozornenie: držte zadok uvoľnený, nezatínajte sedacie svaly!\n➜ zakláňajte sa iba do bodu, pokiaľ je pohyb komfortný a nespôsobuje vám viac bolesti\nOPAKOVANIA: 10x / 4-5x denne'
        },
        {
          videoId: '3A27NLPe2bs',
          title: 'Neurodynamika sedacieho nervu',
          description: 'Popis vo videu.\nOPAKOVANIA: 15x / 3-5x denne\nUPOZORNENIE: ihneď po cvičení môžete pociťovať mierne trnutie nohy. Malo by prejsť do pól minúty, v opačnom prípade znížte počet opakovaní alebo cvik vynechajte.'
        },
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\nOPAKOVANIA: 5x denne.'
        }
      ]
    }
  ],
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
  ],
  'central-default-neck': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - krk',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v krčnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-default-middle back': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - hrudník',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v hrudnej oblasti.',
      videos: [
        {
          videoId: 'dQw4w9WgXcQ',
          title: 'Základné cvičenie',
          description: 'Začnite s týmto základným cvičením pre správnu techniku.'
        }
      ]
    }
  ],
  'central-default-lower back': [
    {
      title: 'Základné cvičenia pre centrálnu senzitizáciu - driek',
      description: 'Relaxačné a dychové cvičenia pre zníženie citlivosti na bolesť v driekovej oblasti.',
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

export default exercisesByDifferential;
