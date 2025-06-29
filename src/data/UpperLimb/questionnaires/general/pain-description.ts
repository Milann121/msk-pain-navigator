
import { Question } from '@/utils/types';

export const painDescriptionQuestion: Question = {
  id: 'pain-description-upper-limb',
  text: 'questionnaire.upperLimbGeneral.questions.painDescription',
  description: '',
  type: 'multiple',
  options: [
    {
      id: 'burning-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.burning',
      mechanisms: ['neuropathic', 'nociceptive'],      
    },
    {
      id: 'electric-shocks-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.electric-shocks',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'shooting-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.shooting',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'dull-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.dull',
      mechanisms: ['nociceptive'],      
    },
    {
      id: 'pins-needles-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.pins-needles',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'numbness-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.numbness',
      mechanisms: ['neuropathic'],      
    },
    {
      id: 'toothache-like-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.toothache-like',
      mechanisms: ['nociceptive'],      
    },
    {
      id: 'diffuse-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.diffuse',
      mechanisms: ['central'],      
    },
    {
      id: 'stiffness-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.stiffness',
      mechanisms: ['nociceptive'],      
    },
    {
      id: 'changes-upper-limb',
      text: 'questionnaire.upperLimbGeneral.options.painDescription.changes',
      mechanisms: ['central'],      
    }
  ]
};
