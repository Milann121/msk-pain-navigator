import { FollowUpQuestion } from './types';

export const placeholderQuestions: Record<string, FollowUpQuestion[]> = {
  nociceptive: [
    {
      id: 'pain-level-change',
      text: 'questionnaire.followUp.questions.painLevelChange',
      description: 'questionnaire.followUp.descriptions.painLevelChange',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'questionnaire.followUp.painScale.noPain',
        maxLabel: 'questionnaire.followUp.painScale.worstPain'
      }
    },
    {
      id: 'overall-feel',
      text: 'questionnaire.followUp.questions.overallFeel',
      type: 'single',
      options: [
        { id: 'better', text: 'questionnaire.followUp.options.overallFeel.better' },
        { id: 'same', text: 'questionnaire.followUp.options.overallFeel.same' },
        { id: 'worse', text: 'questionnaire.followUp.options.overallFeel.worse' }
      ]
    },
    {
      id: 'pain-nature-changed',
      text: 'questionnaire.followUp.questions.painNatureChanged',
      description: 'questionnaire.followUp.descriptions.painNatureChanged',
      type: 'single',
      options: [
        { id: 'no', text: 'questionnaire.followUp.options.yesNo.no' },
        { id: 'yes', text: 'questionnaire.followUp.options.yesNo.yes' }
      ]
    },
    // Conditional sub-question for pain-nature-changed: yes
    {
      id: 'pain-nature-description',
      text: 'questionnaire.followUp.questions.painNatureDescription',
      type: 'multiple',
      options: [
        { id: 'burning', text: 'questionnaire.followUp.options.painNatureDescription.burning' },
        { id: 'shooting', text: 'questionnaire.followUp.options.painNatureDescription.shooting' },
        { id: 'dull', text: 'questionnaire.followUp.options.painNatureDescription.dull' },
        { id: 'pins-needles', text: 'questionnaire.followUp.options.painNatureDescription.pins-needles' },
        { id: 'numbness', text: 'questionnaire.followUp.options.painNatureDescription.numbness' },
        { id: 'toothache-like', text: 'questionnaire.followUp.options.painNatureDescription.toothache-like' },
        { id: 'diffuse', text: 'questionnaire.followUp.options.painNatureDescription.diffuse' },
        { id: 'stiffness', text: 'questionnaire.followUp.options.painNatureDescription.stiffness' },
        { id: 'changes', text: 'questionnaire.followUp.options.painNatureDescription.changes' }
      ]
    },
    {
      id: 'pain-spreading',
      text: 'questionnaire.followUp.questions.painSpreading',
      type: 'single',
      options: [
        { id: 'yes', text: 'questionnaire.followUp.options.yesNo.yes' },
        { id: 'no', text: 'questionnaire.followUp.options.yesNo.no' }
      ]
    },
    // Conditional sub-question for pain-spreading: yes
    {
      id: 'new-pain-area',
      text: 'questionnaire.followUp.questions.newPainArea',
      type: 'multiple',
      options: [
        { id: 'upper-limb-elbow-up', text: 'questionnaire.followUp.options.newPainArea.upper-limb-elbow-up' },
        { id: 'upper-limb-below-elbow', text: 'questionnaire.followUp.options.newPainArea.upper-limb-below-elbow' },
        { id: 'upper-limb-hand-fingers', text: 'questionnaire.followUp.options.newPainArea.upper-limb-hand-fingers' },
        { id: 'lower-limb-buttock', text: 'questionnaire.followUp.options.newPainArea.lower-limb-buttock' },
        { id: 'lower-limb-knee-up', text: 'questionnaire.followUp.options.newPainArea.lower-limb-knee-up' },
        { id: 'lower-limb-below-knee', text: 'questionnaire.followUp.options.newPainArea.lower-limb-below-knee' },
        { id: 'lower-limb-feet-fingers', text: 'questionnaire.followUp.options.newPainArea.lower-limb-feet-fingers' },
        { id: 'chest', text: 'questionnaire.followUp.options.newPainArea.chest' },
        { id: 'head', text: 'questionnaire.followUp.options.newPainArea.head' },
        { id: 'face', text: 'questionnaire.followUp.options.newPainArea.face' }
      ]
    }
  ],
  neuropathic: [
    {
      id: 'pain-level-change',
      text: 'questionnaire.followUp.questions.painLevelChange',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'questionnaire.followUp.painScale.noPain',
        maxLabel: 'questionnaire.followUp.painScale.worstPain'
      }
    },
    {
      id: 'nerve-symptoms',
      text: 'questionnaire.followUp.questions.nerveSymptoms',
      type: 'single',
      options: [
        { id: 'improved', text: 'questionnaire.followUp.options.nerveSymptoms.improved' },
        { id: 'unchanged', text: 'questionnaire.followUp.options.nerveSymptoms.unchanged' },
        { id: 'worse', text: 'questionnaire.followUp.options.nerveSymptoms.worse' }
      ]
    }
  ],
  central: [
    {
      id: 'pain-level-change',
      text: 'questionnaire.followUp.questions.painLevelChange',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'questionnaire.followUp.painScale.noPain',
        maxLabel: 'questionnaire.followUp.painScale.worstPain'
      }
    },
    {
      id: 'sensitivity-change',
      text: 'questionnaire.followUp.questions.sensitivityChange',
      type: 'single',
      options: [
        { id: 'less-sensitive', text: 'questionnaire.followUp.options.sensitivityChange.less-sensitive' },
        { id: 'same', text: 'questionnaire.followUp.options.sensitivityChange.same' },
        { id: 'more-sensitive', text: 'questionnaire.followUp.options.sensitivityChange.more-sensitive' }
      ]
    }
  ]
};
