
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
};
