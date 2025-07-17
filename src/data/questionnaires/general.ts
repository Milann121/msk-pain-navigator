
import { Questionnaire } from '@/utils/types';
import { painIntensityQuestion } from './general/pain-intensity';
import { painMovementQuestion } from './general/pain-movement';
import { painDescriptionQuestion } from './general/pain-description';
import { psfsQuestion } from './general/psfs';
import { 
  injuryStartQuestion, 
  activityStartQuestion, 
  reflexesQuestion,
  variableImpactQuestion
} from './general/basic-questions';

export const generalQuestionnaire: Questionnaire = {
  id: 'general',
  title: 'questionnaire.general.title',
  description: 'questionnaire.general.description',
  questions: [
    painIntensityQuestion,
    painMovementQuestion,
    painDescriptionQuestion,
    psfsQuestion,
    injuryStartQuestion,
    activityStartQuestion,
    reflexesQuestion,
    //sensitivityQuestion,
    //variableImpactQuestion
  ]
};
