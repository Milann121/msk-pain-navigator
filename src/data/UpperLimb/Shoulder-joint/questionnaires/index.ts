
import { shoulderNociceptiveQuestionnaire } from './ShoulderNociceptive';
import { Questionnaire } from '@/utils/types';

export const shoulderQuestionnaires: Record<string, Questionnaire> = {
  'nociceptive': shoulderNociceptiveQuestionnaire,
  // Add other mechanisms when available
  // 'neuropathic': shoulderNeuropathicQuestionnaire,
  // 'central': shoulderCentralQuestionnaire,
};

export {
  shoulderNociceptiveQuestionnaire
};
