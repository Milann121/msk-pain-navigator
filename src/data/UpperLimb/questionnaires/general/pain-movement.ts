
import { Question } from '@/utils/types';

export const painMovementQuestion: Question = {
  id: 'pain-with-movement-upper-limb',
  text: 'Does your pain increase with certain movements or activities?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-movement-upper-limb',
      text: 'Yes',
      mechanisms: ['nociceptive', 'neuropathic'],
      followUp: [
        {
          id: 'pain-intensity-increase-upper-limb',
          text: 'How intense does the pain get?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'significantly-upper-limb',
              text: 'Significantly',
              sinGroups: ['high SIN']
            },
            {
              id: 'moderately-upper-limb',
              text: 'Moderately',
              sinGroups: ['mid SIN']
            },
            {
              id: 'minimally-upper-limb',
              text: 'Minimally',
              sinGroups: ['low SIN']
            }
          ]
        },
        {
          id: 'pain-onset-timing-upper-limb',
          text: 'How quickly do you experience pain after movements/activities?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'immediately-upper-limb',
              text: 'Immediately',
              sinGroups: ['high SIN']
            },
            {
              id: 'later-upper-limb',
              text: 'Later',
              sinGroups: ['mid SIN']
            }
          ]
        },
        {
          id: 'pain-subsiding-upper-limb',
          text: 'How long does it take for the pain to subside/reduce after stopping the aggravating activities/movement?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'immediately-subside-upper-limb',
              text: 'Immediately',
              sinGroups: ['low SIN']
            },
            {
              id: 'later-subside-upper-limb',
              text: 'Later',
              sinGroups: ['mid SIN']
            }
          ]
        }
      ]
    },
    {
      id: 'no-movement-upper-limb',
      text: 'No',
      mechanisms: ['none']
    }
  ]
};
