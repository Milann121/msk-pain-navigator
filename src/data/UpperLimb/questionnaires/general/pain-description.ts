
import { Question } from '@/utils/types';

export const painDescriptionQuestion: Question = {
  id: 'pain-description-upper-limb',
  text: 'Ako by ste opísali vašu bolesť?',
  description: '',
  type: 'multiple',
  options: [
    {
      id: 'burning-upper-limb',
      text: 'Pálivá',
      mechanisms: ['neuropathic'],
      sinGroups: []
    },
    {
      id: 'electric-shocks-upper-limb',
      text: 'Elektrizujúca',
      mechanisms: ['neuropathic'],
      sinGroups: []
    },
    {
      id: 'shooting-upper-limb',
      text: 'Vystreľujúca',
      mechanisms: ['neuropathic'],
      sinGroups: []
    },
    {
      id: 'dull-upper-limb',
      text: 'Tupá',
      mechanisms: ['nociceptive'],
      sinGroups: []
    },
    {
      id: 'pins-needles-upper-limb',
      text: 'Pichanie a mravčenie',
      mechanisms: ['neuropathic'],
      sinGroups: []
    },
    {
      id: 'numbness-upper-limb',
      text: 'Necitlivosť',
      mechanisms: ['neuropathic'],
      sinGroups: []
    },
    {
      id: 'toothache-like-upper-limb',
      text: 'Ako bolesť zuba',
      mechanisms: ['nociceptive'],
      sinGroups: []
    },
    {
      id: 'diffuse-upper-limb',
      text: 'Rozptýlená (ťažko lokalizovateľná)',
      mechanisms: ['central'],
      sinGroups: []
    },
    {
      id: 'stiffness-upper-limb',
      text: 'Stuhnutosť/napätie',
      mechanisms: ['nociceptive'],
      sinGroups: []
    },
    {
      id: 'changes-upper-limb',
      text: 'Neustále sa mení',
      mechanisms: ['central'],
      sinGroups: []
    }
  ]
};
