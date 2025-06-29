
import { Question } from '@/utils/types';

export const painMovementQuestion: Question = {
  id: 'pain-with-movement-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.painWithMovement',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-movement-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ['nociceptive', 'neuropathic'],      
      followUp: [
        {
          id: 'pain-intensity-increase-upper-limb',
          text: 'questionnaire.upperLimbGeneral.questions.painIntensityIncrease',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'significantly-upper-limb',
              text: 'questionnaire.upperLimbGeneral.options.intensityIncrease.significantly',
              sinGroups: ['high SIN']
            },
            {
              id: 'moderately-upper-limb',
              text: 'questionnaire.upperLimbGeneral.options.intensityIncrease.moderately',
              sinGroups: ['mid SIN']
            },
            {
              id: 'minimally-upper-limb',
              text: 'questionnaire.upperLimbGeneral.options.intensityIncrease.minimally',
              sinGroups: ['low SIN']
            }
          ]
        },
        {
          id: 'pain-onset-timing-upper-limb',
          text: 'questionnaire.upperLimbGeneral.questions.painOnsetTiming',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'immediately-upper-limb',
              text: 'questionnaire.upperLimbGeneral.options.onsetTiming.immediately',
              sinGroups: ['high SIN']
            },
            {
              id: 'later-upper-limb',
              text: 'questionnaire.upperLimbGeneral.options.onsetTiming.later',
              sinGroups: ['mid SIN']
            }
          ]
        },
        {
          id: 'pain-subsiding-upper-limb',
          text: 'questionnaire.upperLimbGeneral.questions.painSubsiding',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'immediately-subside-upper-limb',
              text: 'questionnaire.upperLimbGeneral.options.subsiding.immediately',
              sinGroups: ['low SIN']
            },
            {
              id: 'later-subside-upper-limb',
              text: 'questionnaire.upperLimbGeneral.options.subsiding.later',
              sinGroups: ['mid SIN']
            }
          ]
        }
      ]
    },
    {
      id: 'no-movement-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ['none'],      
    }
  ]
};
