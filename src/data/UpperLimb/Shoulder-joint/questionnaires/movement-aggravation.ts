
import { Question } from '@/utils/types';

export const aggravatingMovementsQuestion: Question = {
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
};
