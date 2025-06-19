
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
      differentials: ["labral-lesion","subacromional-impingement-syndrome", "shoulder-instability"]
    },
    {
      id: 'no-clicking',
      text: 'Nie',      
      differentials: ["none"]
    },
    {
      id: 'rarely-sports-only',
      text: 'Zriedka, a len pri športe',
      differentials: ["labral-lesion","subacromional-impingement-syndrome", "shoulder-instability"]
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
      differentials: ["shoulder-dislocation", "shoulder-instability"]
    },
    {
      id: 'no-dislocation',
      text: 'Nie',
      differentials: ["none"]
    },
    {
      id: 'not-sure-popped-out',
      text: 'Nie som si istý/á, ale rameno sa cítilo, akoby sa vykĺbilo',
      differentials: ["shoulder-dislocation", "shoulder-instability"]
    }
  ]
};
