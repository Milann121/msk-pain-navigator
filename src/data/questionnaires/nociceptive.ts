
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
      description: 'Snažte sa zamyslieť, ktorá časť dňa je pre vás najhoršia a odpovedajte čo najpresnejšie. Ak máte bolesti počas celého dňa, kedy je bolesť najčastejšie najhoršia? Napríklad, ráno pri vstávaní? Alebo počas dňa v práci? Dajte si záležať na odpovedi.',
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
      description: 'Ak si nie ste istý/á, požiadajte rodinného príslušníka o pomoc -> TEST č.1 = Ľahnite si na brucho na tvrdú zem a vyhrnutým tričkom aby bolo vidno krížovú oblasť chrbtice, s rukami vedľa seba a čelom opretým o zem. Požiadajte blízku osobu, aby sledovala váš chrbát, či v driekovej oblasti nevznikla výtazná priehlbina v jednom malom bode priamo v chrbtici. Ak áno, odpovedajte KLADNE. TEST č.2 = Postavte sa vzpriamene, vyhrňte si tričko a požiadajte blízku osobu, aby sledovala tvar vašej chrbtice v krížovej oblasti. Ak spozorujete vystupujúci stavec oproti ostatným, odpovedajte KLADNE.',
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
              description: 'Ak neviete, vyskúšajte jednoduchý test => Uložte sa na chrbát, pokrčte kolená, zrelaxujte a chvíľu počkajte či vašej symptómy neodoznejú.',
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
      description: 'Touto otázkou sa snažíme zistiť, či sa u vás prejavujú aj symptómy v prednej časti hrudníka, v oblasti rebier a hrudnej kosti.',
      type: 'radio',
      showIf: { painArea: 'middle back' },
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
      description: 'Touto otázkou sa snažíme zistiť symtómy ako napr. pichanie v hrudníku, tuhosť hrudníku pri nádychu alebo ťažkosť s roztiahnutím hrudníka. Ak niektoré z toho pociťujete, odpovedajte KLADNE.',
      type: 'radio',
      showIf: { painArea: 'middle back' },
      options: [
        {
          id: 'yes-breathing',
          text: 'Áno, nádych vyvoláva bolesť alebo tuhosť',
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
