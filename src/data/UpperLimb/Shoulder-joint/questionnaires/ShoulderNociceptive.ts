
import { Questionnaire } from '@/utils/types';
import { painLocationQuestion } from './pain-location';
import { restHelpsPainQuestion, painTimingQuestion } from './rest-and-timing';
import { aggravatingMovementsQuestion } from './movement-aggravation';
import { clickingLockingQuestion, shoulderDislocationQuestion } from './mechanical-symptoms';
import { menopauseQuestion, breastExamsQuestion } from './women-specific';

export const shoulderNociceptiveQuestionnaire: Questionnaire = {
  id: 'shoulder-nociceptive',
  title: 'Hodnotenie nociceptívnej bolesti ramena',
  description: 'Tento dotazník nám pomôže lepšie pochopiť povahu vašej bolesti ramena.',
  forMechanism: 'nociceptive',
  questions: [
    painLocationQuestion,
    restHelpsPainQuestion,
    aggravatingMovementsQuestion,
    painTimingQuestion,
    clickingLockingQuestion,
    shoulderDislocationQuestion,
    menopauseQuestion,
    breastExamsQuestion
  ];
};
