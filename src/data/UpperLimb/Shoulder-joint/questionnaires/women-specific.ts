
import { Question } from '@/utils/types';

export const menopauseQuestion: Question = {
  id: 'menopause-phase',
  text: 'Už ste vstúpili do fázy menopauzy?',
  description: '',
  type: 'radio',
  showIf: {
    // This will be handled by conditional logic based on gender and age
  },
  options: [
    {
      id: 'yes-confirmed-doctor',
      text: 'Áno, potvrdené lekárom',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'think-so',
      text: 'Myslím, že áno',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'do-not-think-so',
      text: 'Myslím, že nie',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'no-not-entered',
      text: 'Nie, ešte som nevstúpila do fázy menopauzy',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    }
  ]
};

export const breastExamsQuestion: Question = {
  id: 'breast-exams-mammograms',
  text: 'Chodíte pravidelne na vyšetrenia prsníkov alebo mamografiu?',
  description: '',
  type: 'radio',
  showIf: {
    // This will be handled by conditional logic based on gender and age
  },
  options: [
    {
      id: 'yes-regularly',
      text: 'Áno, pravidelne',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'yes-irregularly',
      text: 'Áno, nepravidelne',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'no-do-not-know',
      text: 'Nie, neviem',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    }
  ]
};

// Export the required women-specific question
export const womenSpecificQuestion = menopauseQuestion;
