
import { Question } from '@/utils/types';

export const injuryStartQuestion: Question = {
  id: 'injury-start',
  text: 'Začala sa vaša bolesť po zranení alebo úraze?',
  description: '', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-injury',
      text: 'Áno',
      mechanisms: ['nociceptive']
    },
    {
      id: 'no-injury',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};

export const activityStartQuestion: Question = {
  id: 'activity-start',
  text: 'Začala sa vaša bolesť po konkrétnej aktivite/pohybe?',
  description: '', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-activity',
      text: 'Áno',
      mechanisms: ['nociceptive', 'neuropathic']
    },
    {
      id: 'no-activity',
      text: 'Nie',
      mechanisms: ['central']
    }
  ]
};

export const reflexesQuestion: Question = {
  id: 'reflexes',
  text: 'Boli ste informovaný/á lekárom alebo fyzioterapeutom, že máte výrazne znížené alebo chýbajúce reflexy?',
  description: '', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-reflexes',
      text: 'Áno',
      mechanisms: ['neuropathic']
    },
    {
      id: 'no-reflexes',
      text: 'Nie',
      mechanisms: ['neuropathic']
    },
    {
      id: 'not-visited',
      text: 'Nenavštívil/a som zdravotníckeho pracovníka',
      mechanisms: ['none']
    }
  ]
};

export const sensitivityQuestion: Question = {
  id: 'sensitivity',
  text: 'Máte zvýšenú citlivosť na svetlo, zvuk alebo vône?',
  description: '', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-sensitivity',
      text: 'Áno',
      mechanisms: ['central']
    },
    {
      id: 'no-sensitivity',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};

export const variableImpactQuestion: Question = {
  id: 'variable-impact',
  text: 'Je vplyv pohybov/aktivít (rovnakých) na bolesť premenlivý, nepredvídateľný alebo nekonzistentný?',
  description: '', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-variable',
      text: 'Áno',
      mechanisms: ['central']
    },
    {
      id: 'no-variable',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};
