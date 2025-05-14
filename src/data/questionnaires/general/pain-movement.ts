
import { Question } from '@/utils/types';

export const painMovementQuestion: Question = {
  id: 'pain-with-movement',
  text: 'Zvyšuje sa vaša bolesť pri určitých pohyboch alebo aktivitách?',
  type: 'radio',
  options: [
    {
      id: 'yes-movement',
      text: 'Áno',
      mechanisms: ['nociceptive', 'neuropathic'],
      followUp: [
        {
          id: 'pain-intensity-increase',
          text: 'Ako intenzívnou sa vtedy stáva vaša bolesť?',
          type: 'radio',
          options: [
            {
              id: 'significantly',
              text: 'Výrazne',
              sinGroups: ['high SIN']
            },
            {
              id: 'moderately',
              text: 'Stredne',
              sinGroups: ['mid SIN']
            },
            {
              id: 'minimally',
              text: 'Minimálne',
              sinGroups: ['low SIN']
            }
          ]
        },
        {
          id: 'pain-onset-timing',
          text: 'Ako rýchlo sa bolesť objaví po týchto pohyboch/aktivitách?',
          type: 'radio',
          options: [
            {
              id: 'immediately',
              text: 'Okamžite',
              sinGroups: ['high SIN']
            },
            {
              id: 'later',
              text: 'Neskôr',
              sinGroups: ['mid SIN']
            }
          ]
        },
        {
          id: 'pain-subsiding',
          text: 'Ako dlho trvá, kým bolesť ustúpi/zníži sa po ukončení týchto aktivít/pohybu?',
          type: 'radio',
          options: [
            {
              id: 'immediately-subside',
              text: 'Okamžite',
              sinGroups: ['low SIN']
            },
            {
              id: 'later-subside',
              text: 'Neskôr',
              sinGroups: ['mid SIN']
            }
          ]
        }
      ]
    },
    {
      id: 'no-movement',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};
