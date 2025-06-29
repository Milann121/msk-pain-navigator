
import { Question } from '@/utils/types';

export const painDescriptionQuestion: Question = {
  id: 'pain-description',
  text: 'questionnaire.general.questions.painDescription',
  description: 'questionnaire.general.descriptions.painDescription',
  type: 'multiple',
  options: [
    {
      id: 'burning',
      text: 'questionnaire.general.options.painDescription.burning',
      mechanisms: ['neuropathic']
    },
    {
      id: 'electric-shocks',
      text: 'questionnaire.general.options.painDescription.electric-shocks',
      mechanisms: ['neuropathic']
    },
    {
      id: 'shooting',
      text: 'questionnaire.general.options.painDescription.shooting',
      mechanisms: ['neuropathic']
    },
    {
      id: 'dull',
      text: 'questionnaire.general.options.painDescription.dull',
      mechanisms: ['nociceptive']
    },
    {
      id: 'pins-needles',
      text: 'questionnaire.general.options.painDescription.pins-needles',
      mechanisms: ['neuropathic']
    },
    {
      id: 'numbness',
      text: 'questionnaire.general.options.painDescription.numbness',
      mechanisms: ['neuropathic']
    },
    {
      id: 'toothache-like',
      text: 'questionnaire.general.options.painDescription.toothache-like',
      mechanisms: ['nociceptive']
    },
    {
      id: 'diffuse',
      text: 'questionnaire.general.options.painDescription.diffuse',
      mechanisms: ['central']
    },
    {
      id: 'stiffness',
      text: 'questionnaire.general.options.painDescription.stiffness',
      mechanisms: ['nociceptive']
    },
    {
      id: 'changes',
      text: 'questionnaire.general.options.painDescription.changes',
      mechanisms: ['central']
    }
  ]
};
