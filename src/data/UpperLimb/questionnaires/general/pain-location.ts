
import { Question } from '@/utils/types';

export const painLocationQuestion: Question = {
  id: 'pain-location-upper-limb',
  text: 'Pociťujete bolesť len na jednej strane alebo na oboch stranách?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'unilateral-upper-limb',
      text: 'Len na jednej strane (unilaterálne)'
    },
    {
      id: 'bilateral-upper-limb',
      text: 'Na oboch stranách (bilaterálne)'
    }
  ]
};
