
import { Question } from '@/utils/types';

export const painMovementQuestion: Question = {
  id: 'pain-with-movement-upper-limb',
  text: 'Zvyšuje sa vaša bolesť pri určitých pohyboch alebo aktivitách?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-movement-upper-limb',
      text: 'Áno',
      mechanisms: ['nociceptive', 'neuropathic'],      
      followUp: [
        {
          id: 'pain-intensity-increase-upper-limb',
          text: 'Ako intenzívnou sa vtedy stáva vaša bolesť?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'significantly-upper-limb',
              text: 'Výrazne',
              sinGroups: ['high SIN']
            },
            {
              id: 'moderately-upper-limb',
              text: 'Stredne',
              sinGroups: ['mid SIN']
            },
            {
              id: 'minimally-upper-limb',
              text: 'Minimálne',
              sinGroups: ['low SIN']
            }
          ]
        },
        {
          id: 'pain-onset-timing-upper-limb',
          text: 'Ako rýchlo sa bolesť objaví po týchto pohyboch/aktivitách?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'immediately-upper-limb',
              text: 'Okamžite',             
              sinGroups: ['high SIN']
            },
            {
              id: 'later-upper-limb',
              text: 'Neskôr',
              sinGroups: ['mid SIN']
            }
          ]
        },
        {
          id: 'pain-subsiding-upper-limb',
          text: 'Ako dlho trvá, kým bolesť ustúpi/zníži sa po ukončení týchto aktivít/pohybu?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'immediately-subside-upper-limb',
              text: 'Okamžite',              
              sinGroups: ['low SIN']
            },
            {
              id: 'later-subside-upper-limb',
              text: 'Neskôr',              
              sinGroups: ['mid SIN']
            }
          ]
        }
      ]
    },
    {
      id: 'no-movement-upper-limb',
      text: 'Nie',
      mechanisms: ['none'],      
    }
  ]
};
