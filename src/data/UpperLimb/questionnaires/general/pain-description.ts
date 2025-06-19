
import { Question } from '@/utils/types';

export const painDescriptionQuestion: Question = {
  id: 'pain-description-upper-limb',
  text: 'How would you describe your pain?',
  description: '',
  type: 'multiple',
  options: [
    {
      id: 'burning-upper-limb',
      text: 'Burning',
      mechanisms: ['neuropathic']
    },
    {
      id: 'electric-shocks-upper-limb',
      text: 'Electric shocks',
      mechanisms: ['neuropathic']
    },
    {
      id: 'shooting-upper-limb',
      text: 'Shooting',
      mechanisms: ['neuropathic']
    },
    {
      id: 'dull-upper-limb',
      text: 'Dull',
      mechanisms: ['nociceptive']
    },
    {
      id: 'pins-needles-upper-limb',
      text: 'Pins & needles',
      mechanisms: ['neuropathic']
    },
    {
      id: 'numbness-upper-limb',
      text: 'Numbness',
      mechanisms: ['neuropathic']
    },
    {
      id: 'toothache-like-upper-limb',
      text: 'Toothache-like',
      mechanisms: ['nociceptive']
    },
    {
      id: 'diffuse-upper-limb',
      text: 'Diffuse (hard to localize)',
      mechanisms: ['central']
    },
    {
      id: 'stiffness-upper-limb',
      text: 'Stiffness/tightness',
      mechanisms: ['nociceptive']
    },
    {
      id: 'changes-upper-limb',
      text: 'Changes all the time',
      mechanisms: ['central']
    }
  ]
};
