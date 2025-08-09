
import { Question } from '@/utils/types';

export const injuryStartQuestion: Question = {
  id: 'injury-start',
  text: 'questionnaire.general.questions.injuryStart',
  description: 'questionnaire.general.descriptions.injuryStart',
  type: 'radio',
  options: [
    {
      id: 'yes-injury',
      text: 'questionnaire.general.options.yesNo.yes',
      mechanisms: ['nociceptive']
    },
    {
      id: 'no-injury',
      text: 'questionnaire.general.options.yesNo.no',
      mechanisms: ['none']
    }
  ]
};

export const activityStartQuestion: Question = {
  id: 'activity-start',
  text: 'questionnaire.general.questions.activityStart',
  description: 'questionnaire.general.descriptions.activityStart',
  type: 'radio',
  options: [
    {
      id: 'yes-activity',
      text: 'questionnaire.general.options.yesNo.yes',
      mechanisms: ['nociceptive', 'neuropathic']
    },
    {
      id: 'no-activity',
      text: 'questionnaire.general.options.yesNo.no',
      mechanisms: ['central']
    }
  ]
};

export const reflexesQuestion: Question = {
  id: 'reflexes',
  text: 'questionnaire.general.questions.reflexes',
  description: 'questionnaire.general.descriptions.reflexes',
  type: 'radio',
  options: [
    {
      id: 'yes-reflexes',
      text: 'questionnaire.general.options.yesNo.yes',
      mechanisms: ['neuropathic']
    },
    {
      id: 'no-reflexes',
      text: 'questionnaire.general.options.yesNo.no',
      mechanisms: ['nociceptive']
    },
    {
      id: 'not-visited',
      text: 'questionnaire.general.options.notVisited',
      mechanisms: ['none']
    }
  ]
};

//export const sensitivityQuestion: Question = {
  //id: 'sensitivity',
  //text: 'questionnaire.general.questions.sensitivity',
  //description: 'questionnaire.general.descriptions.sensitivity',
  //type: 'radio',
  //options: [
    //{
      //id: 'yes-sensitivity',
      //text: 'questionnaire.general.options.yesNo.yes',
      //mechanisms: ['central']
    //},
    //{
      //id: 'no-sensitivity',
      //text: 'questionnaire.general.options.yesNo.no',
      //mechanisms: ['none']
    //}
  //]
//};

export const variableImpactQuestion: Question = {
  id: 'variable-impact',
  text: 'questionnaire.general.questions.variableImpact',
  description: 'questionnaire.general.descriptions.variableImpact',
  type: 'radio',
  options: [
    {
      id: 'yes-variable',
      text: 'questionnaire.general.options.yesNo.yes',
      mechanisms: ['central']
    },
    {
      id: 'no-variable',
      text: 'questionnaire.general.options.yesNo.no',
      mechanisms: ['none']
    }
  ]
};
