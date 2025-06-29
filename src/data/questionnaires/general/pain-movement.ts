
import { Question } from '@/utils/types';

export const painMovementQuestion: Question = {
  id: 'pain-with-movement',
  text: 'questionnaire.general.questions.painWithMovement',
  description: 'questionnaire.general.descriptions.painWithMovement',
  type: 'radio',
  options: [
    {
      id: 'yes-movement',
      text: 'questionnaire.general.options.yesNo.yes',
      mechanisms: ['nociceptive', 'neuropathic'],
      followUp: [
        {
          id: 'pain-intensity-increase',
          text: 'questionnaire.general.questions.painIntensityIncrease',
          description: 'questionnaire.general.descriptions.painIntensityIncrease',
          type: 'radio',
          options: [
            {
              id: 'significantly',
              text: 'questionnaire.general.options.intensityIncrease.significantly',
              sinGroups: ['high SIN']
            },
            {
              id: 'moderately',
              text: 'questionnaire.general.options.intensityIncrease.moderately',
              sinGroups: ['mid SIN']
            },
            {
              id: 'minimally',
              text: 'questionnaire.general.options.intensityIncrease.minimally',
              sinGroups: ['low SIN']
            }
          ]
        },
        {
          id: 'pain-onset-timing',
          text: 'questionnaire.general.questions.painOnsetTiming',
          description: 'questionnaire.general.descriptions.painOnsetTiming',
          type: 'radio',
          options: [
            {
              id: 'immediately',
              text: 'questionnaire.general.options.onsetTiming.immediately',
              sinGroups: ['high SIN']
            },
            {
              id: 'later',
              text: 'questionnaire.general.options.onsetTiming.later',
              sinGroups: ['mid SIN']
            }
          ]
        },
        {
          id: 'pain-subsiding',
          text: 'questionnaire.general.questions.painSubsiding',
          description: 'questionnaire.general.descriptions.painSubsiding',
          type: 'radio',
          options: [
            {
              id: 'immediately-subside',
              text: 'questionnaire.general.options.subsiding.immediately',
              sinGroups: ['low SIN']
            },
            {
              id: 'later-subside',
              text: 'questionnaire.general.options.subsiding.later',
              sinGroups: ['mid SIN']
            }
          ]
        }
      ]
    },
    {
      id: 'no-movement',
      text: 'questionnaire.general.options.yesNo.no',
      mechanisms: ['none']
    }
  ]
};
