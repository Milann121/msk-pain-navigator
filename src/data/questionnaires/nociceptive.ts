
import { Questionnaire } from '@/utils/types';

export const nociceptiveQuestionnaire: Questionnaire = {
  id: 'nociceptive',
  title: 'questionnaire.nociceptive.title',
  description: 'questionnaire.nociceptive.description',
  questions: [
    {
      id: 'rest-helps',
      text: 'questionnaire.nociceptive.questions.restHelps',
      description: 'questionnaire.nociceptive.descriptions.restHelps',
      type: 'radio',
      options: [
        { id: 'yes', text: 'questionnaire.nociceptive.options.yesNo.yes' },
        { id: 'no', text: 'questionnaire.nociceptive.options.yesNo.no' }
      ]
    },
    {
      id: 'worst-time',
      text: 'questionnaire.nociceptive.questions.worstTime',
      description: 'questionnaire.nociceptive.descriptions.worstTime',
      type: 'radio',
      options: [
        { id: 'morning', text: 'questionnaire.nociceptive.options.worstTime.morning' },
        { id: 'daytime', text: 'questionnaire.nociceptive.options.worstTime.daytime' },
        { id: 'nighttime', text: 'questionnaire.nociceptive.options.worstTime.nighttime' }
      ]
    },
    {
      id: 'spine-abnormality',
      text: 'questionnaire.nociceptive.questions.spineAbnormality',
      description: 'questionnaire.nociceptive.descriptions.spineAbnormality',
      type: 'radio',
      options: [
        { id: 'yes', text: 'questionnaire.nociceptive.options.yesNo.yes' },
        { id: 'no', text: 'questionnaire.nociceptive.options.yesNo.no' }
      ]
    }
  ]
};
