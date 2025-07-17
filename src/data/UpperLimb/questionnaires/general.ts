
import { Questionnaire } from '@/utils/types';
import { painLocationQuestion } from './general/pain-location';
import { neckPainConnectionQuestion } from './general/neck-pain-connection';
import { painIntensityQuestion } from './general/pain-intensity';
import { painMovementQuestion } from './general/pain-movement';
import { painDescriptionQuestion } from './general/pain-description';

import { 
  nightPainQuestion,
  injuryStartQuestion,
  activityStartQuestion,
  reflexesQuestion,
  sensitivityQuestion,
  variableImpactQuestion
} from './general/basic-questions';

export const upperLimbGeneralQuestionnaire: Questionnaire = {
  id: 'upper-limb-general',
  title: 'questionnaire.upperLimbGeneral.title',
  description: 'questionnaire.upperLimbGeneral.description',
  questions: [
    painLocationQuestion,
    neckPainConnectionQuestion,
    painIntensityQuestion,
    painMovementQuestion,
    painDescriptionQuestion,
    
    nightPainQuestion,
    injuryStartQuestion,
    activityStartQuestion,
    reflexesQuestion,
    sensitivityQuestion,
    variableImpactQuestion
  ]
};
