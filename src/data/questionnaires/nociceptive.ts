
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
        {
          id: 'yes-rest',
          text: 'questionnaire.nociceptive.options.yesRest',
          differentials: ['facet joint syndrome']
        },
        {
          id: 'no-rest',
          text: 'questionnaire.nociceptive.options.no',
          differentials: ['disc herniation']
        }
      ]
    },
    {
      id: 'worst-time',
      text: 'questionnaire.nociceptive.questions.worstTime',
      description: 'questionnaire.nociceptive.descriptions.worstTime',
      type: 'radio',
      options: [
        {
          id: 'morning',
          text: 'questionnaire.nociceptive.options.worstTime.morning',
          differentials: ['disc herniation']
        },
        {
          id: 'daytime',
          text: 'questionnaire.nociceptive.options.worstTime.daytime',
          differentials: ['facet joint syndrome', 'SIJ syndrome', 'muscle pain']
        },
        {
          id: 'nighttime',
          text: 'questionnaire.nociceptive.options.worstTime.nighttime',
          differentials: ['red flag']
        }
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
