
import { Questionnaire } from '@/utils/types';
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
  title: 'Hodnotenie bolesti hornej končatiny',
  description: 'Tento dotazník nám pomôže lepšie pochopiť povahu vašej bolesti hornej končatiny.',
  questions: [
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
