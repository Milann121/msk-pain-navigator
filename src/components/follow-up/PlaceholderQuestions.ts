
import { FollowUpQuestionType } from './QuestionRenderer';

export const placeholderQuestions: FollowUpQuestionType[] = [
  {
    id: 'current-pain',
    type: 'scale',
    text: 'Ako by ste ohodnotili svoju aktuálnu bolesť?',
    min: 0,
    max: 10,
    minLabel: 'Žiadna bolesť',
    maxLabel: 'Najhoršia predstaviteľná bolesť'
  },
  {
    id: 'pain-frequency',
    type: 'single-choice',
    text: 'Ako často pociťujete bolesť?',
    options: [
      'Stále',
      'Niekoľkokrát za deň',
      'Raz denne',
      'Niekoľkokrát za týždeň',
      'Zriedkavo'
    ]
  },
  {
    id: 'activities',
    type: 'multiple-choice',
    text: 'Ktoré aktivity vám spôsobujú bolesť?',
    options: [
      'Chôdza',
      'Sedenie',
      'Státie',
      'Predklon',
      'Zdvíhanie predmetov',
      'Otáčanie tela',
      'Žiadne z uvedených'
    ]
  }
];
