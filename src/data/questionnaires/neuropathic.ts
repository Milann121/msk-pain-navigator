
import { Questionnaire } from '@/utils/types';

export const neuropathicQuestionnaire: Questionnaire = {
  id: 'neuropathic',
  title: 'questionnaire.neuropathic.title',
  description: 'questionnaire.neuropathic.description',
  questions: [
    {
      id: 'coughing-pain',
      text: 'questionnaire.neuropathic.questions.coughingPain',
      description: 'questionnaire.neuropathic.descriptions.coughingPain',
      type: 'radio',
      options: [
        { id: 'yes', text: 'questionnaire.neuropathic.options.yesNo.yes' },
        { id: 'no', text: 'questionnaire.neuropathic.options.yesNo.no' }
      ]
    },
    {
      id: 'abnormal-sensations',
      text: 'questionnaire.neuropathic.questions.abnormalSensations',
      description: 'questionnaire.neuropathic.descriptions.abnormalSensations',
      type: 'radio',
      options: [
        { id: 'yes', text: 'questionnaire.neuropathic.options.yesNo.yes' },
        { id: 'no', text: 'questionnaire.neuropathic.options.yesNo.no' }
      ]
    },
    {
      id: 'numbness',
      text: 'questionnaire.neuropathic.questions.numbness',
      description: 'questionnaire.neuropathic.descriptions.numbness',
      type: 'radio',
      options: [
        { id: 'yes', text: 'questionnaire.neuropathic.options.yesNo.yes' },
        { id: 'no', text: 'questionnaire.neuropathic.options.yesNo.no' }
      ]
    },
    {
      id: 'muscle-weakness',
      text: 'questionnaire.neuropathic.questions.muscleWeakness',
      description: 'questionnaire.neuropathic.descriptions.muscleWeakness',
      type: 'radio',
      options: [
        { id: 'yes', text: 'questionnaire.neuropathic.options.yesNo.yes' },
        { id: 'no', text: 'questionnaire.neuropathic.options.yesNo.no' }
      ]
    }
  ]
};
