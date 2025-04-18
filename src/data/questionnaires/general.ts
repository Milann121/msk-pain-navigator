import { Questionnaire } from '@/utils/types';

export const generalQuestionnaire: Questionnaire = {
  id: 'general',
  title: 'Základné hodnotenie bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť povahu vašej bolesti.',
  questions: [
    {
      id: 'pain-intensity',
      text: 'Aká je vaša intenzita bolesti v priemere?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Žiadna bolesť',
        maxLabel: 'Najhoršia predstaviteľná bolesť'
      }
    },
    {
      id: 'pain-with-movement',
      text: 'Zvyšuje sa vaša bolesť pri určitých pohyboch alebo aktivitách?',
      type: 'radio',
      options: [
        {
          id: 'yes-movement',
          text: 'Áno',
          mechanisms: ['nociceptive', 'neuropathic'],
          followUp: [
            {
              id: 'pain-intensity-increase',
              text: 'Ako intenzívnou sa vtedy stáva vaša bolesť?',
              type: 'radio',
              options: [
                {
                  id: 'significantly',
                  text: 'Výrazne',
                  sinGroups: ['high SIN']
                },
                {
                  id: 'moderately',
                  text: 'Stredne',
                  sinGroups: ['mid SIN']
                },
                {
                  id: 'minimally',
                  text: 'Minimálne',
                  sinGroups: ['low SIN']
                }
              ]
            },
            {
              id: 'pain-onset-timing',
              text: 'Ako rýchlo sa bolesť objaví po týchto pohyboch/aktivitách?',
              type: 'radio',
              options: [
                {
                  id: 'immediately',
                  text: 'Okamžite',
                  sinGroups: ['high SIN']
                },
                {
                  id: 'later',
                  text: 'Neskôr',
                  sinGroups: ['mid SIN']
                }
              ]
            },
            {
              id: 'pain-subsiding',
              text: 'Ako dlho trvá, kým bolesť ustúpi/zníži sa po ukončení týchto aktivít/pohybu?',
              type: 'radio',
              options: [
                {
                  id: 'immediately-subside',
                  text: 'Okamžite',
                  sinGroups: ['low SIN']
                },
                {
                  id: 'later-subside',
                  text: 'Neskôr',
                  sinGroups: ['mid SIN']
                }
              ]
            }
          ]
        },
        {
          id: 'no-movement',
          text: 'Nie',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'pain-description',
      text: 'Ako by ste opísali vašu bolesť?',
      type: 'multiple',
      options: [
        {
          id: 'burning',
          text: 'Pálivá',
          mechanisms: ['neuropathic']
        },
        {
          id: 'electric-shocks',
          text: 'Elektrizujúca',
          mechanisms: ['neuropathic']
        },
        {
          id: 'shooting',
          text: 'Vystreľujúca',
          mechanisms: ['neuropathic']
        },
        {
          id: 'dull',
          text: 'Tupá',
          mechanisms: ['nociceptive']
        },
        {
          id: 'pins-needles',
          text: 'Pichanie a mravčenie',
          mechanisms: ['neuropathic']
        },
        {
          id: 'numbness',
          text: 'Necitlivosť',
          mechanisms: ['neuropathic']
        },
        {
          id: 'toothache-like',
          text: 'Ako bolesť zuba',
          mechanisms: ['nociceptive']
        },
        {
          id: 'diffuse',
          text: 'Rozptýlená (ťažko lokalizovateľná)',
          mechanisms: ['central']
        },
        {
          id: 'stiffness',
          text: 'Stuhnutosť/napätie',
          mechanisms: ['nociceptive']
        },
        {
          id: 'changes',
          text: 'Neustále sa mení',
          mechanisms: ['central']
        }
      ]
    },
    {
      id: 'injury-start',
      text: 'Začala sa vaša bolesť po zranení alebo úraze?',
      type: 'radio',
      options: [
        {
          id: 'yes-injury',
          text: 'Áno',
          mechanisms: ['nociceptive']
        },
        {
          id: 'no-injury',
          text: 'Nie',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'activity-start',
      text: 'Začala sa vaša bolesť po konkrétnej aktivite/pohybe?',
      type: 'radio',
      options: [
        {
          id: 'yes-activity',
          text: 'Áno',
          mechanisms: ['nociceptive', 'neuropathic']
        },
        {
          id: 'no-activity',
          text: 'Nie',
          mechanisms: ['central']
        }
      ]
    },
    {
      id: 'reflexes',
      text: 'Boli ste informovaný/á lekárom alebo fyzioterapeutom, že máte výrazne znížené alebo chýbajúce reflexy?',
      type: 'radio',
      options: [
        {
          id: 'yes-reflexes',
          text: 'Áno',
          mechanisms: ['neuropathic']
        },
        {
          id: 'no-reflexes',
          text: 'Nie',
          mechanisms: ['neuropathic']
        },
        {
          id: 'not-visited',
          text: 'Nenavštívil/a som zdravotníckeho pracovníka',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'sensitivity',
      text: 'Máte zvýšenú citlivosť na svetlo, zvuk alebo vône?',
      type: 'radio',
      options: [
        {
          id: 'yes-sensitivity',
          text: 'Áno',
          mechanisms: ['central']
        },
        {
          id: 'no-sensitivity',
          text: 'Nie',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'variable-impact',
      text: 'Je vplyv pohybov/aktivít (rovnakých) na bolesť premenlivý, nepredvídateľný alebo nekonzistentný?',
      type: 'radio',
      options: [
        {
          id: 'yes-variable',
          text: 'Áno',
          mechanisms: ['central']
        },
        {
          id: 'no-variable',
          text: 'Nie',
          mechanisms: ['none']
        }
      ]
    }
  ]
};
