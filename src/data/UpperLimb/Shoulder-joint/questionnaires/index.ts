
import { shoulderNociceptiveQuestionnaire } from './ShoulderNociceptive';
import { Questionnaire } from '@/utils/types';

export const shoulderQuestionnaires: Record<string, Questionnaire> = {
  nociceptive: shoulderNociceptiveQuestionnaire
};

export {
  shoulderNociceptiveQuestionnaire
};
