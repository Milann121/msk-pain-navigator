
import { Questionnaire } from '@/utils/types';

export const shoulderNociceptiveQuestionnaire: Questionnaire = {
  id: 'shoulder-nociceptive',
  title: 'Hodnotenie nociceptívnej bolesti ramena',
  description: 'Tento dotazník nám pomôže lepšie pochopiť povahu vašej bolesti ramena.',
  forMechanism: 'nociceptive',
  questions: [
    {
      id: 'shoulder-pain-location',
      text: 'Kde sa nachádza vaša bolesť ramena predovšetkým?',
      description: '',
      type: 'multiple',
      options: [
        {
          id: 'lateral-upper-arm',
          text: 'Bočná strana hornej časti paže',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'deep-shoulder-joint',
          text: 'Hlboko vo vnútri ramenného kĺbu',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'front-shoulder',
          text: 'Predná časť ramena',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'below-behind-bone',
          text: 'Pod a trochu za kostnatou štruktúrou nad ramenom',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'entire-shoulder',
          text: 'Celé rameno, ťažko lokalizovateľné',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        }
      ]
    },
    {
      id: 'rest-helps-pain',
      text: 'Pomáha odpočinok alebo vyhýbanie sa pohybom, ktoré zhoršujú bolesť, znížiť vašu bolesť?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-rest-helps',
          text: 'Áno, moja bolesť sa zlepší, keď si oddýchnem',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'no-rest-not-help',
          text: 'Nie',
          mechanisms: [],
          sinGroups: [],
          differentials: [],
          followUp: [
            {
              id: 'pain-24-hours',
              text: 'Je vaša bolesť 24 hodín denne alebo zažívate v priebehu dňa obdobia bez bolesti?',
              description: '',
              type: 'radio',
              options: [
                {
                  id: '24-hour-pain',
                  text: 'Je to 24-hodinová bolesť bez akéhokoľvek zníženia úrovne bolesti',
                  mechanisms: [],
                  sinGroups: [],
                  differentials: []
                },
                {
                  id: 'can-find-relief',
                  text: 'Niekedy si viem nájsť pozície, ktoré bolesť zmierňujú',
                  mechanisms: [],
                  sinGroups: [],
                  differentials: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aggravating-movements',
      text: 'Aký druh pohybu(ov) najviac zhoršuje vašu bolesť?',
      description: '',
      type: 'multiple',
      options: [
        {
          id: 'lifting-arm-overhead',
          text: 'Zdvíhanie paže nad hlavu',
          mechanisms: [],
          sinGroups: [],
          differentials: [],
          followUp: [
            {
              id: 'painful-degree',
              text: 'Pri zdvíhaní paže nad hlavu, pri akom stupni je to bolestivé?',
              description: '',
              type: 'radio',
              options: [
                {
                  id: 'around-45-degrees',
                  text: 'Približne 45 stupňov',
                  mechanisms: [],
                  sinGroups: [],
                  differentials: []
                },
                {
                  id: 'around-90-degrees',
                  text: 'Približne 90 stupňov',
                  mechanisms: [],
                  sinGroups: [],
                  differentials: []
                },
                {
                  id: 'above-90-degrees',
                  text: 'Nad 90 stupňov',
                  mechanisms: [],
                  sinGroups: [],
                  differentials: [],
                  followUp: [
                    {
                      id: 'palm-facing-up',
                      text: 'Je tento pohyb bolestivý aj s dlaňou otočenou nahor?',
                      description: '',
                      type: 'radio',
                      options: [
                        {
                          id: 'same-pain',
                          text: 'Áno, je to rovnaké',
                          mechanisms: [],
                          sinGroups: [],
                          differentials: []
                        },
                        {
                          id: 'more-painful-palm-up',
                          text: 'Áno, bolestivejšie s dlaňou otočenou nahor',
                          mechanisms: [],
                          sinGroups: [],
                          differentials: []
                        },
                        {
                          id: 'less-painful',
                          text: 'Menej bolestivé',
                          mechanisms: [],
                          sinGroups: [],
                          differentials: []
                        },
                        {
                          id: 'do-not-want-try',
                          text: 'Nechcem to skúšať',
                          mechanisms: [],
                          sinGroups: [],
                          differentials: []
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'do-not-know-degree',
                  text: 'Neviem',
                  mechanisms: [],
                  sinGroups: [],
                  differentials: []
                }
              ]
            }
          ]
        },
        {
          id: 'reaching-behind-back',
          text: 'Siahanie za chrbát, obliekanie kabáta alebo zapínanie podprsenky (vnútorná rotácia)',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'scratching-back-head',
          text: 'Škrabanie sa na zadnej časti hlavy (vonkajšia rotácia)',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'throwing-overhead-sports',
          text: 'Hádzanie alebo športová aktivita nad hlavou',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'sudden-movement-heavy',
          text: 'Náhly pohyb alebo nosenie ťažkého predmetu',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        }
      ]
    },
    {
      id: 'when-pain-noticeable',
      text: 'Kedy je bolesť najvýraznejšia?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'during-activity-overhead',
          text: 'Počas aktivity, najmä nad hlavou',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'at-rest-night',
          text: 'V pokoji a v noci, najmä pri ležaní na ramene',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'only-sports-specific',
          text: 'Len počas športu alebo špecifických pozícií',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'randomly-sleep-light',
          text: 'Náhodne, dokonca aj počas spánku alebo ľahkej aktivity',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        }
      ]
    },
    {
      id: 'clicking-locking-catching',
      text: 'Pociťujete cvakanie, blokovanie alebo zachytávanie v ramene?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-clicking',
          text: 'Áno',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'no-clicking',
          text: 'Nie',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'rarely-sports-only',
          text: 'Zriedka, a len pri športe',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        }
      ]
    },
    {
      id: 'shoulder-dislocation-past',
      text: 'Mali ste v minulosti vykĺbené rameno?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-confirmed-diagnosis',
          text: 'Áno, s potvrdenou diagnózou',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'no-dislocation',
          text: 'Nie',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'not-sure-popped-out',
          text: 'Nie som si istý/á, ale rameno sa cítilo, akoby sa vykĺbilo',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        }
      ]
    },
    {
      id: 'menopause-phase',
      text: 'Už ste vstúpili do fázy menopauzy?',
      description: '',
      type: 'radio',
      showIf: {
        // This will be handled by conditional logic based on gender and age
      },
      options: [
        {
          id: 'yes-confirmed-doctor',
          text: 'Áno, potvrdené lekárom',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'think-so',
          text: 'Myslím, že áno',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'do-not-think-so',
          text: 'Myslím, že nie',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'no-not-entered',
          text: 'Nie, ešte som nevstúpila do fázy menopauzy',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        }
      ]
    },
    {
      id: 'breast-exams-mammograms',
      text: 'Chodíte pravidelne na vyšetrenia prsníkov alebo mamografiu?',
      description: '',
      type: 'radio',
      showIf: {
        // This will be handled by conditional logic based on gender and age
      },
      options: [
        {
          id: 'yes-regularly',
          text: 'Áno, pravidelne',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'yes-irregularly',
          text: 'Áno, nepravidelne',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        },
        {
          id: 'no-do-not-know',
          text: 'Nie, neviem',
          mechanisms: [],
          sinGroups: [],
          differentials: []
        }
      ]
    }
  ]
};
