
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
      mechanisms: ['neuropathic', 'nociceptive'],      
    },
    {
      id: 'electric-shocks-upper-limb',
      text: 'Elektrizujúca',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'shooting-upper-limb',
      text: 'Vystreľujúca',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'dull-upper-limb',
      text: 'Tupá',
      mechanisms: ['nociceptive'],      
    },
    {
      id: 'pins-needles-upper-limb',
      text: 'Pichanie a mravčenie',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'numbness-upper-limb',
      text: 'Necitlivosť',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'toothache-like-upper-limb',
      text: 'Ako bolesť zuba',
      mechanisms: ['nociceptive'],      
    },
    {
      id: 'diffuse-upper-limb',
      text: 'Rozptýlená (ťažko lokalizovateľná)',
      mechanisms: ['central'],      
    },
    {
      id: 'stiffness-upper-limb',
      text: 'Stuhnutosť/napätie',
      mechanisms: ['nociceptive'],      
    },
    {
      id: 'changes-upper-limb',
      text: 'Neustále sa mení',
      mechanisms: ['central'],      
    }
  ]
};
