
import { Question, Questionnaire } from '@/utils/types';

// General Pain Questionnaire (for all pain areas)
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

// Nociceptive Follow-up Questionnaire
export const nociceptiveQuestionnaire: Questionnaire = {
  id: 'nociceptive',
  title: 'Hodnotenie nociceptívnej bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vašu bolesť.',
  forMechanism: 'nociceptive',
  questions: [
    {
      id: 'rest-helps',
      text: 'Pomáha vám odpočinok alebo vyhýbanie sa pohybom, ktoré vyvolávajú bolesť?',
      type: 'radio',
      options: [
        {
          id: 'yes-rest',
          text: 'Áno, moja bolesť sa pri odpočinku zlepšuje'
        },
        {
          id: 'no-rest',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'worst-time',
      text: 'V ktorej časti dňa je bolesť zvyčajne najhoršia?',
      type: 'radio',
      options: [
        {
          id: 'morning',
          text: 'Ráno, po prebudení',
          differentials: ['disc herniation']
        },
        {
          id: 'daytime',
          text: 'Počas dňa, pri aktivitách',
          differentials: ['facet joint syndrome', 'SIJ syndrome', 'muscle pain']
        },
        {
          id: 'nighttime',
          text: 'V noci',
          differentials: ['red flag']
        }
      ]
    },
    {
      id: 'spine-abnormality',
      text: 'Všimli ste si nejakú priehlbinu v chrbtici alebo vystupujúci stavec?',
      type: 'radio',
      options: [
        {
          id: 'hole',
          text: 'Áno, spozoroval/a som priehlbinu v chrbte',
          differentials: ['ventral spondylolisthesis'],
          followUp: [
            {
              id: 'lying-helps',
              text: 'Zistili ste, že ľah na chrbte zmierňuje vaše príznaky?',
              type: 'radio',
              options: [
                {
                  id: 'yes-lying',
                  text: 'Áno',
                  differentials: ['ventral spondylolisthesis']
                },
                {
                  id: 'no-lying',
                  text: 'Nie',
                  differentials: ['none']
                }
              ]
            }
          ]
        },
        {
          id: 'sticking-out',
          text: 'Áno, zdá sa, že môj stavec mierne vystupuje',
          differentials: ['dorsal spondylolisthesis']
        },
        {
          id: 'no-abnormality',
          text: 'Nie',
          differentials: ['none']
        }
      ]
    },
    {
      id: 'chest-tightness',
      text: 'Pociťujete nejakú stuhnutosť v hrudníku?',
      type: 'radio',
      options: [
        {
          id: 'yes-tightness',
          text: 'Áno',
          differentials: ['costovertebral joint syndrome', 'facet joint syndrome']
        },
        {
          id: 'no-tightness',
          text: 'Nie',
          differentials: ['muscle pain']
        }
      ]
    },
    {
      id: 'breathing-pain',
      text: 'Cítite pri nádychu bolesť alebo iné príznaky?',
      type: 'radio',
      options: [
        {
          id: 'yes-breathing',
          text: 'Áno, nádych vyvoláva bolesť',
          differentials: ['costovertebral joint syndrome', 'facet joint syndrome', 'red flag']
        },
        {
          id: 'no-breathing',
          text: 'Nie',
          differentials: ['muscle pain']
        }
      ]
    }
  ]
};

// Neuropathic Follow-up Questionnaire
export const neuropathicQuestionnaire: Questionnaire = {
  id: 'neuropathic',
  title: 'Hodnotenie neuropatickej bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vašu bolesť súvisiacu s nervami.',
  forMechanism: 'neuropathic',
  questions: [
    {
      id: 'coughing-pain',
      text: 'Zhoršuje sa vaša bolesť pri kašeľaní, kýchaní alebo napínaní sa?',
      type: 'radio',
      options: [
        {
          id: 'yes-coughing',
          text: 'Áno, moja bolesť sa pri týchto aktivitách zvyšuje.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-coughing',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'abnormal-sensations',
      text: 'Cítite nezvyčajné pocity ako mravčenie, pálenie alebo "elektrické šoky" pozdĺž postihnutej končatiny?',
      type: 'radio',
      options: [
        {
          id: 'yes-sensations',
          text: 'Áno, pociťujem mravčenie, pálenie alebo pocity podobné elektrickým šokom pozdĺž špecifickej dráhy v končatine.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-sensations',
          text: 'Nie',
          differentials: ['Radiculopathy']
        }
      ]
    },
    {
      id: 'numbness',
      text: 'Pociťujete znecitlivenie alebo zníženú citlivosť v konkrétnej oblasti končatiny?',
      type: 'radio',
      options: [
        {
          id: 'yes-numbness',
          text: 'Áno, cítim znecitlivenie alebo nedostatok citlivosti v špecifickej oblasti končatiny.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-numbness',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'muscle-weakness',
      text: 'Všimli ste si svalovú slabosť v postihnutej končatine, ktorá sťažuje uchopenie predmetov, zdvihnutie nohy alebo normálny pohyb?',
      type: 'radio',
      options: [
        {
          id: 'yes-weakness',
          text: 'Áno, mám svalovú slabosť, ktorá ovplyvňuje moju schopnosť hýbať sa alebo používať končatinu správne.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-weakness',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'reflex-loss',
      text: 'Stratili ste reflexy v postihnutej končatine, ktorých stratu vám potvrdil zdravotnícky pracovník?',
      type: 'radio',
      options: [
        {
          id: 'yes-reflex-loss',
          text: 'Áno, zdravotnícky pracovník potvrdil znížené alebo chýbajúce reflexy.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-reflex-loss',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'spine-abnormality-neuro',
      text: 'Všimli ste si nejakú priehlbinu v chrbtici alebo vystupujúci stavec?',
      type: 'radio',
      options: [
        {
          id: 'hole-neuro',
          text: 'Áno, spozoroval/a som priehlbinu v chrbte',
          differentials: ['ventral spondylolisthesis'],
          followUp: [
            {
              id: 'lying-helps-neuro',
              text: 'Máte pocit, že ľah na chrbte zmierňuje vaše príznaky?',
              type: 'radio',
              options: [
                {
                  id: 'yes-lying-neuro',
                  text: 'Áno',
                  differentials: ['ventral spondylolisthesis']
                },
                {
                  id: 'no-lying-neuro',
                  text: 'Nie',
                  differentials: ['none']
                }
              ]
            }
          ]
        },
        {
          id: 'sticking-out-neuro',
          text: 'Áno, zdá sa, že môj stavec mierne vystupuje',
          differentials: ['dorsal spondylolisthesis']
        },
        {
          id: 'no-abnormality-neuro',
          text: 'Nie',
          differentials: ['none']
        }
      ]
    }
  ]
};

// Central Follow-up Questionnaire
export const centralQuestionnaire: Questionnaire = {
  id: 'central',
  title: 'Hodnotenie centrálnej senzitizácie',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vaše príznaky súvisiace so spracovaním bolesti.',
  forMechanism: 'central',
  questions: [
    {
      id: 'pain-spread',
      text: 'Šíri sa vaša bolesť do oblastí, ktoré pôvodne neboli postihnuté?',
      type: 'radio',
      options: [
        {
          id: 'yes-spread',
          text: 'Áno, moja bolesť sa rozšírila za pôvodnú oblasť.',
          differentials: ['Central Sensitisation']
        },
        {
          id: 'no-spread',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'allodynia',
      text: 'Pociťujete bolesť pri podnetoch, ktoré by normálne nemali byť bolestivé (napr. ľahký dotyk, oblečenie, mierny tlak)?',
      type: 'radio',
      options: [
        {
          id: 'yes-allodynia',
          text: 'Áno, aj jemný dotyk alebo tlak spôsobuje bolesť.',
          differentials: ['Central Sensitisation - Allodynia']
        },
        {
          id: 'no-allodynia',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'disproportionate',
      text: 'Zdá sa vám intenzita bolesti neprimeraná vášmu problému alebo stavu?',
      type: 'radio',
      options: [
        {
          id: 'yes-disproportionate',
          text: 'Áno, moja bolesť sa zdá byť oveľa horšia, ako by som očakával/a pri mojom stave.',
          differentials: ['Central Sensitisation']
        },
        {
          id: 'no-disproportionate',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'sensory-sensitivity',
      text: 'Pociťujete spolu s bolesťou citlivosť na svetlo, hluk alebo vône?',
      type: 'radio',
      options: [
        {
          id: 'yes-sensory',
          text: 'Áno, som citlivejší/ia na svetlo, hluk alebo vône.',
          differentials: ['Central Sensitisation - Sensory Hypersensitivity']
        },
        {
          id: 'no-sensory',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'cognitive-symptoms',
      text: 'Máte spolu s bolesťou príznaky ako zhoršená koncentrácia ("mozgová hmla"), únava alebo poruchy spánku?',
      type: 'radio',
      options: [
        {
          id: 'yes-cognitive',
          text: 'Áno, pociťujem únavu, mozgovú hmlu alebo zhoršený spánok spolu s bolesťou.',
          differentials: ['Central Sensitisation - Cognitive Symptoms']
        },
        {
          id: 'no-cognitive',
          text: 'Nie',
          differentials: ['none']
        }
      ]
    }
  ]
};

// Export all questionnaires
export const questionnaires: Record<string, Questionnaire> = {
  general: generalQuestionnaire,
  nociceptive: nociceptiveQuestionnaire,
  neuropathic: neuropathicQuestionnaire,
  central: centralQuestionnaire
};
