
import { Question } from '@/utils/types';

export const nightPainQuestion: Question = {
  id: 'night-pain-upper-limb',
  text: 'Do you experience night pain as well?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-night-pain',
      text: 'Yes'
    },
    {
      id: 'no-night-pain',
      text: 'No'
    }
  ]
};

export const injuryStartQuestion: Question = {
  id: 'injury-start-upper-limb',
  text: 'Did your pain start after an injury or trauma?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-injury-upper-limb',
      text: 'Yes',
      mechanisms: ['nociceptive']
    },
    {
      id: 'no-injury-upper-limb',
      text: 'No',
      mechanisms: ['none']
    }
  ]
};

export const activityStartQuestion: Question = {
  id: 'activity-start-upper-limb',
  text: 'Did your pain start after a specific activity/movement?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-activity-upper-limb',
      text: 'Yes',
      mechanisms: ['nociceptive', 'neuropathic']
    },
    {
      id: 'no-activity-upper-limb',
      text: 'No',
      mechanisms: ['central']
    }
  ]
};

export const reflexesQuestion: Question = {
  id: 'reflexes-upper-limb',
  text: 'Have you been informed, by a medically trained professional, that you have significantly reduced or absent reflexes?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-reflexes-upper-limb',
      text: 'Yes',
      mechanisms: ['neuropathic']
    },
    {
      id: 'no-reflexes-upper-limb',
      text: 'No',
      mechanisms: ['neuropathic']
    },
    {
      id: 'not-visited-upper-limb',
      text: 'I have not visited any medical professional',
      mechanisms: ['none']
    }
  ]
};

export const sensitivityQuestion: Question = {
  id: 'sensitivity-upper-limb',
  text: 'Do you experience increased sensitivity to light, sound, or smell?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-sensitivity-upper-limb',
      text: 'Yes',
      mechanisms: ['central']
    },
    {
      id: 'no-sensitivity-upper-limb',
      text: 'No',
      mechanisms: ['none']
    }
  ]
};

export const variableImpactQuestion: Question = {
  id: 'variable-impact-upper-limb',
  text: 'Do you find that the impact of movements/activities (same) on pain to be variable, unpredictable, or inconsistent?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-variable-upper-limb',
      text: 'Yes',
      mechanisms: ['central']
    },
    {
      id: 'no-variable-upper-limb',
      text: 'No',
      mechanisms: ['none']
    }
  ]
};
