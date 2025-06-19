
import { generalQuestionnaire } from './general';
import { nociceptiveQuestionnaire } from './nociceptive';
import { neuropathicQuestionnaire } from './neuropathic';
import { centralQuestionnaire } from './central';
import { Questionnaire } from '@/utils/types';

export const questionnaires: Record<string, Questionnaire> = {
  general: generalQuestionnaire,
  nociceptive: nociceptiveQuestionnaire,
  neuropathic: neuropathicQuestionnaire,
  central: centralQuestionnaire
};

export {
  generalQuestionnaire,
  nociceptiveQuestionnaire,
  neuropathicQuestionnaire,
  centralQuestionnaire
};
