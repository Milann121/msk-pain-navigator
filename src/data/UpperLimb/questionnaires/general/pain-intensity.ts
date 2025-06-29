
import { Question } from '@/utils/types';

export const painIntensityQuestion: Question = {
  id: 'pain-intensity-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.painIntensity',
  description: '',
  type: 'scale',
  scale: {
    min: 0,
    max: 10,
    minLabel: 'questionnaire.upperLimbGeneral.painScale.noPain',
    maxLabel: 'questionnaire.upperLimbGeneral.painScale.worstPain'
  }
};
