
import { Question } from '@/utils/types';

export const clickingLockingQuestion: Question = {
  id: 'clicking-locking-catching',
  text: 'Pociťujete cvakanie, blokovanie alebo zachytávanie v ramene?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-clicking',
      text: 'Áno',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'no-clicking',
      text: 'Nie',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'rarely-sports-only',
      text: 'Zriedka, a len pri športe',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    }
  ]
};

export const shoulderDislocationQuestion: Question = {
  id: 'shoulder-dislocation-past',
  text: 'Mali ste v minulosti vykĺbené rameno?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-confirmed-diagnosis',
      text: 'Áno, s potvrdenou diagnózou',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'no-dislocation',
      text: 'Nie',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'not-sure-popped-out',
      text: 'Nie som si istý/á, ale rameno sa cítilo, akoby sa vykĺbilo',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    }
  ]
};
