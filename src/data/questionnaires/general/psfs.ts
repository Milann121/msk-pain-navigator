import { Question } from '@/utils/types';

export const psfsQuestion: Question = {
  id: 'psfs',
  text: 'questionnaire.general.questions.psfs.title',
  description: 'questionnaire.general.descriptions.psfs',
  type: 'psfs',
  psfs: {
    questions: [
      {
        id: 'household',
        text: 'questionnaire.general.questions.psfs.household',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'questionnaire.general.psfsScale.unable',
          maxLabel: 'questionnaire.general.psfsScale.able'
        }
      },
      {
        id: 'sport',
        text: 'questionnaire.general.questions.psfs.sport',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'questionnaire.general.psfsScale.unable',
          maxLabel: 'questionnaire.general.psfsScale.able'
        }
      },
      {
        id: 'heavyLoads',
        text: 'questionnaire.general.questions.psfs.heavyLoads',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'questionnaire.general.psfsScale.unable',
          maxLabel: 'questionnaire.general.psfsScale.able'
        }
      },
      {
        id: 'stairs',
        text: 'questionnaire.general.questions.psfs.stairs',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'questionnaire.general.psfsScale.unable',
          maxLabel: 'questionnaire.general.psfsScale.able'
        }
      },
      {
        id: 'caregiving',
        text: 'questionnaire.general.questions.psfs.caregiving',
        scale: {
          min: 0,
          max: 10,
          minLabel: 'questionnaire.general.psfsScale.unable',
          maxLabel: 'questionnaire.general.psfsScale.able'
        }
      }
    ]
  }
};