
import { Question } from '@/utils/types';

export const painIntensityQuestion: Question = {
  id: 'pain-intensity',
  text: 'questionnaire.general.questions.painIntensity',
  description: 'questionnaire.general.descriptions.painIntensity',
  type: 'scale',
  scale: {
    min: 0,
    max: 10,
    minLabel: 'questionnaire.general.painScale.noPain',
    maxLabel: 'questionnaire.general.painScale.worstPain'
  }
};
