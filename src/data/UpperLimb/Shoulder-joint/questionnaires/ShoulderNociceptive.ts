
import { Questionnaire } from '@/utils/types';
import { painLocationQuestion } from './pain-location';
import { nightPainQuestion, restPositionQuestion } from './rest-and-timing';
import { movementAggravationQuestion, overheadActivitiesQuestion } from './movement-aggravation';
import { clickingLockingQuestion, shoulderDislocationQuestion } from './mechanical-symptoms';
import { womenSpecificQuestion } from './women-specific';

export const shoulderNociceptiveQuestionnaire: Questionnaire = {
  id: 'shoulder-nociceptive',
  title: 'Hodnotenie bolesti ramena - Nociceptívna bolesť',
  description: 'Špecifické otázky pre nociceptívnu bolesť ramena',
  questions: [
    painLocationQuestion,
    nightPainQuestion,
    restPositionQuestion,
    movementAggravationQuestion,
    overheadActivitiesQuestion,
    clickingLockingQuestion,
    shoulderDislocationQuestion,
    womenSpecificQuestion
  ]
};
