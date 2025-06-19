
import { upperLimbGeneralQuestionnaire } from './general';
import { upperLimbNeckQuestionnaire } from './UpperLimb-NeckQuestions';
import { Questionnaire } from '@/utils/types';

export const upperLimbQuestionnaires: Record<string, Questionnaire> = {
  general: upperLimbGeneralQuestionnaire,
  'upper-limb-neck-questions': upperLimbNeckQuestionnaire
};

export {
  upperLimbGeneralQuestionnaire,
  upperLimbNeckQuestionnaire
};
