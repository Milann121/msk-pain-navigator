
import { Questionnaire } from '@/utils/types';
import { painIntensityQuestion } from './general/pain-intensity';
import { painMovementQuestion } from './general/pain-movement';
import { painDescriptionQuestion } from './general/pain-description';
import { 
  injuryStartQuestion, 
  activityStartQuestion, 
  reflexesQuestion,
  sensitivityQuestion,
  variableImpactQuestion
} from './general/basic-questions';

export const generalQuestionnaire: Questionnaire = {
  id: 'general',
  title: 'Základné hodnotenie bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť povahu vašej bolesti.',
  questions: [
    painIntensityQuestion,
    painMovementQuestion,
    painDescriptionQuestion,
    injuryStartQuestion,
    activityStartQuestion,
    reflexesQuestion,
    sensitivityQuestion,
    variableImpactQuestion
  ]
};
