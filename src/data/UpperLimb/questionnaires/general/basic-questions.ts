
import { Question } from '@/utils/types';

export const nightPainQuestion: Question = {
  id: 'night-pain-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.nightPain',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-night-pain',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ['nociceptive', "red-flag"],
    },
    {
      id: 'no-night-pain',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ['none'],      
    }
  ]
};

export const injuryStartQuestion: Question = {
  id: 'injury-start-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.injuryStart',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-injury-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ['nociceptive'],      
    },
    {
      id: 'no-injury-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ['none'],      
    }
  ]
};

export const activityStartQuestion: Question = {
  id: 'activity-start-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.activityStart',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-activity-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ['nociceptive', 'neuropathic'],      
    },
    {
      id: 'no-activity-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ['central'],      
    }
  ]
};

export const reflexesQuestion: Question = {
  id: 'reflexes-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.reflexes',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-reflexes-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'no-reflexes-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ['neuropathic'],
    },
    {
      id: 'not-visited-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.reflexes.notVisited',
      mechanisms: ['none'],
    }
  ]
};

export const sensitivityQuestion: Question = {
  id: 'sensitivity-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.sensitivity',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-sensitivity-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ['central'],
    },
    {
      id: 'no-sensitivity-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ['none'],
    }
  ]
};

export const variableImpactQuestion: Question = {
  id: 'variable-impact-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.variableImpact',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-variable-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ['central'],
    },
    {
      id: 'no-variable-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ['none'],
    }
  ]
};
