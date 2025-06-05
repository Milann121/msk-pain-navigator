
import { Questionnaire } from '@/utils/types';

export const nociceptiveQuestionnaire: Questionnaire = {
  id: 'nociceptive',
  title: 'Hodnotenie nociceptívnej bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vašu bolesť.',
  forMechanism: 'nociceptive',
  questions: [
    {
      id: 'rest-helps',
      text: 'Pomáha vám odpočinok alebo vyhýbanie sa pohybom, ktoré vyvolávajú bolesť?',
      description: 'Má oddych priamo pozitívny vplyv na vašu bolesť/stav?',
      type: 'radio',
      options: [
        {
          id: 'yes-rest',
          text: 'Áno, moja bolesť sa pri odpočinku zlepšuje',
          differentials: ['facet joint syndrome']
        },
        {
          id: 'no-rest',
          text: 'Nie',
          differentials: ['disc herniation']
        }
      ]
    },
    {
      id: 'worst-time',
      text: 'V ktorej časti dňa je bolesť zvyčajne najhoršia?',
      description: 'Snažte sa zamyslieť, ktorá časť dňa je pre vás najhoršia a odpovedajte čo najpresnejšie. Ak máte bolesti počas celého dňa, kedy je bolesť najčastejšie najhoršia? Napríklad, ráno pri vstávaní? Alebo počas dňa v práci? Dajte si záležať na odpovedi.', // Add description here later
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
      description: '', // Add description here later
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
              description: '', // Add description here later
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
      description: '', // Add description here later
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
      description: '', // Add description here later
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
