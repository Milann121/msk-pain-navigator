
import { Question } from '@/utils/types';

export const painDescriptionQuestion: Question = {
  id: 'pain-description',
  text: 'Ako by ste opísali vašu bolesť?',
  type: 'multiple',
  options: [
    {
      id: 'burning',
      text: 'Pálivá',
      mechanisms: ['neuropathic']
    },
    {
      id: 'electric-shocks',
      text: 'Elektrizujúca',
      mechanisms: ['neuropathic']
    },
    {
      id: 'shooting',
      text: 'Vystreľujúca',
      mechanisms: ['neuropathic']
    },
    {
      id: 'dull',
      text: 'Tupá',
      mechanisms: ['nociceptive']
    },
    {
      id: 'pins-needles',
      text: 'Pichanie a mravčenie',
      mechanisms: ['neuropathic']
    },
    {
      id: 'numbness',
      text: 'Necitlivosť',
      mechanisms: ['neuropathic']
    },
    {
      id: 'toothache-like',
      text: 'Ako bolesť zuba',
      mechanisms: ['nociceptive']
    },
    {
      id: 'diffuse',
      text: 'Rozptýlená (ťažko lokalizovateľná)',
      mechanisms: ['central']
    },
    {
      id: 'stiffness',
      text: 'Stuhnutosť/napätie',
      mechanisms: ['nociceptive']
    },
    {
      id: 'changes',
      text: 'Neustále sa mení',
      mechanisms: ['central']
    }
  ]
};
