
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
      differentials: ["subacromional-impingement-syndrome", "frozen-shoulder", "stiff-shoulder"],
      followUp: [
        {
          id: 'painful-degree',
          text: 'Pri zdvíhaní paže nad hlavu, pri akom stupni je to bolestivé?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'around-45-60-degrees',
              text: 'Približne 45-60 stupňov',              
              differentials: ["stiff-shoulder", "frozen-shoulder"]
            },
            {
              id: 'around-90-degrees',
              text: 'Približne 90 stupňov',              
              differentials: ["subacromional-impingement-syndrome"]
            },
            {
              id: 'above-90-degrees',
              text: 'Nad 90 stupňov',              
              differentials: ["subacromional-impingement-syndrome","slap-tear"],
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
                      differentials: ["slap-tear"]
                    },
                    {
                      id: 'more-painful-palm-up',
                      text: 'Áno, bolestivejšie s dlaňou otočenou nahor',                      
                      differentials: ["slap-tear", "labral-leason", "biceps-tear-long-head"]
                    },
                    {
                      id: 'less-painful',
                      text: 'Menej bolestivé',                      
                      differentials: ["subacromional-impingement-syndrome"]
                    },
                    {
                      id: 'do-not-want-try',
                      text: 'Nechcem to skúšať',                      
                      differentials: ["none"]
                    }
                  ]
                }
              ]
            },
            {
              id: 'do-not-know-degree',
              text: 'Neviem',              
              differentials: ["none"]
            }
          ]
        }
      ]
    },
    {
      id: 'reaching-behind-back',
      text: 'Siahanie za chrbát, obliekanie kabáta alebo zapínanie podprsenky (vnútorná rotácia)',      
      differentials: ["subacromional-impingement-syndrome","frozen-shoulder","biceps-tear-long-head"]
    },
    {
      id: 'scratching-back-head',
      text: 'Škrabanie sa na zadnej časti hlavy (vonkajšia rotácia)',      
      differentials: ["frozen-shoulder"]
    },
    {
      id: 'throwing-overhead-sports',
      text: 'Hádzanie alebo športová aktivita nad hlavou',      
      differentials: ["rotator-cuff-tendinopathy","rotator-cuff-tear", "subacromional-impingement-syndrome"]
    },
    {
      id: 'sudden-movement-heavy',
      text: 'Náhly pohyb alebo nosenie ťažkého predmetu',      
      differentials: ["unstable-shoulder", "subacromional-impingement-syndrome"]
    }
  ]
};

// Export the movement aggravation question with the correct name
export const movementAggravationQuestion = aggravatingMovementsQuestion;
export const overheadActivitiesQuestion = aggravatingMovementsQuestion;
