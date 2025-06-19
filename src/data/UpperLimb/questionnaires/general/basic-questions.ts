
import { Question } from '@/utils/types';

export const nightPainQuestion: Question = {
  id: 'night-pain-upper-limb',
  text: 'Pociťujete aj nočnú bolesť?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-night-pain',
      text: 'Áno'
    },
    {
      id: 'no-night-pain',
      text: 'Nie'
    }
  ]
};

export const injuryStartQuestion: Question = {
  id: 'injury-start-upper-limb',
  text: 'Začala sa vaša bolesť po zranení alebo úraze?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-injury-upper-limb',
      text: 'Áno',
      mechanisms: ['nociceptive']
    },
    {
      id: 'no-injury-upper-limb',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};

export const activityStartQuestion: Question = {
  id: 'activity-start-upper-limb',
  text: 'Začala sa vaša bolesť po konkrétnej aktivite/pohybe?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-activity-upper-limb',
      text: 'Áno',
      mechanisms: ['nociceptive', 'neuropathic']
    },
    {
      id: 'no-activity-upper-limb',
      text: 'Nie',
      mechanisms: ['central']
    }
  ]
};

export const reflexesQuestion: Question = {
  id: 'reflexes-upper-limb',
  text: 'Boli ste informovaný/á lekárom, že máte výrazne znížené alebo chýbajúce reflexy?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-reflexes-upper-limb',
      text: 'Áno',
      mechanisms: ['neuropathic']
    },
    {
      id: 'no-reflexes-upper-limb',
      text: 'Nie',
      mechanisms: ['neuropathic']
    },
    {
      id: 'not-visited-upper-limb',
      text: 'Nenavštívil/a som zdravotníckeho pracovníka',
      mechanisms: ['none']
    }
  ]
};

export const sensitivityQuestion: Question = {
  id: 'sensitivity-upper-limb',
  text: 'Máte zvýšenú citlivosť na svetlo, zvuk alebo vône?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-sensitivity-upper-limb',
      text: 'Áno',
      mechanisms: ['central']
    },
    {
      id: 'no-sensitivity-upper-limb',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};

export const variableImpactQuestion: Question = {
  id: 'variable-impact-upper-limb',
  text: 'Je vplyv pohybov/aktivít (rovnakých) na bolesť premenlivý, nepredvídateľný alebo nekonzistentný?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-variable-upper-limb',
      text: 'Áno',
      mechanisms: ['central']
    },
    {
      id: 'no-variable-upper-limb',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};
