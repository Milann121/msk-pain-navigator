
import { Questionnaire } from '@/utils/types';
import { painLocationQuestion } from './pain-location';
import { nightPainQuestion, restPositionQuestion } from './rest-and-timing';
import { movementAggravationQuestion } from './movement-aggravation';
import { clickingLockingQuestion, shoulderDislocationQuestion } from './mechanical-symptoms';

export const shoulderNociceptiveQuestionnaire: Questionnaire = {
  id: 'shoulder-nociceptive',
  title: 'questionnaire.shoulderNociceptive.title',
  description: 'questionnaire.shoulderNociceptive.description',
  questions: [
    painLocationQuestion,
    nightPainQuestion,
    restPositionQuestion,
    movementAggravationQuestion,
    clickingLockingQuestion,
    shoulderDislocationQuestion,
  ]
};
