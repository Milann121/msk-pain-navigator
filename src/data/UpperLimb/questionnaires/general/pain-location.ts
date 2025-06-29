
import { Question } from '@/utils/types';

export const painLocationQuestion: Question = {
  id: 'pain-location-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.painLocation',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'unilateral-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.location.unilateral',
      mechanisms: ['nociceptive', 'neuropathic'],      
    },
    {
      id: 'bilateral-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.location.bilateral',
      mechanisms: ['neuropathic'],      
    }
  ]
};
