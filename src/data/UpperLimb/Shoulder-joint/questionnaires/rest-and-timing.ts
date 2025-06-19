
import { Question } from '@/utils/types';

export const restHelpsPainQuestion: Question = {
  id: 'rest-helps-pain',
  text: 'Pomáha odpočinok alebo vyhýbanie sa pohybom, ktoré zhoršujú bolesť, znížiť vašu bolesť?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-rest-helps',
      text: 'Áno, moja bolesť sa zlepší, keď si oddýchnem',      
      differentials: ["none"]
    },
    {
      id: 'no-rest-not-help',
      text: 'Nie',      
      differentials: ["frozen-shoulder", "labral-lesion"],
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
              differentials: ["red-flag"]
            },
            {
              id: 'can-find-relief',
              text: 'Niekedy si viem nájsť pozície, ktoré bolesť zmierňujú',              
              differentials: ["frozen-shoulder", "labral-lesion"]
            }
          ]
        }
      ]
    }
  ]
};

export const painTimingQuestion: Question = {
  id: 'when-pain-noticeable',
  text: 'Kedy je bolesť najvýraznejšia?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'during-activity-overhead',
      text: 'Počas aktivity, najmä nad hlavou',      
      differentials: ["subacromional-impingement-syndrome", "labral-lesion", "biceps-tear-long-head", "rotator-cuff-tendinopathy", "rotator-cuff-tear"]
    },
    {
      id: 'at-rest-night',
      text: 'V pokoji a v noci, najmä pri ležaní na ramene',      
      differentials: ["frozen-shoulder", "labral-lesion"]
    },
    {
      id: 'randomly-sleep-light',
      text: 'Náhodne, dokonca aj počas spánku alebo ľahkej aktivity',      
      differentials: ["frozen-shoulder"]
    }
  ]
};
