
import { Question, Questionnaire } from '@/utils/types';

// General Pain Questionnaire (for all pain areas)
export const generalQuestionnaire: Questionnaire = {
  id: 'general',
  title: 'General Pain Assessment',
  description: 'This questionnaire will help us understand the nature of your pain better.',
  questions: [
    {
      id: 'pain-intensity',
      text: 'What is your pain intensity on average?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'No Pain',
        maxLabel: 'Worst Pain Imaginable'
      }
    },
    {
      id: 'pain-with-movement',
      text: 'Does your pain increase with certain movements or activities?',
      type: 'radio',
      options: [
        {
          id: 'yes-movement',
          text: 'Yes',
          mechanisms: ['nociceptive', 'neuropathic'],
          followUp: [
            {
              id: 'pain-intensity-increase',
              text: 'How intense does the pain get?',
              type: 'radio',
              options: [
                {
                  id: 'significantly',
                  text: 'Significantly',
                  sinGroups: ['high SIN']
                },
                {
                  id: 'moderately',
                  text: 'Moderately',
                  sinGroups: ['mid SIN']
                },
                {
                  id: 'minimally',
                  text: 'Minimally',
                  sinGroups: ['low SIN']
                }
              ]
            },
            {
              id: 'pain-onset-timing',
              text: 'How quickly do you experience pain after movements/activities?',
              type: 'radio',
              options: [
                {
                  id: 'immediately',
                  text: 'Immediately',
                  sinGroups: ['high SIN']
                },
                {
                  id: 'later',
                  text: 'Later',
                  sinGroups: ['mid SIN']
                }
              ]
            },
            {
              id: 'pain-subsiding',
              text: 'How long does it take for the pain to subside/reduce after stopping the aggravating activities/movement?',
              type: 'radio',
              options: [
                {
                  id: 'immediately-subside',
                  text: 'Immediately',
                  sinGroups: ['low SIN']
                },
                {
                  id: 'later-subside',
                  text: 'Later',
                  sinGroups: ['mid SIN']
                }
              ]
            }
          ]
        },
        {
          id: 'no-movement',
          text: 'No',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'pain-description',
      text: 'How would you describe your pain?',
      type: 'multiple',
      options: [
        {
          id: 'burning',
          text: 'Burning',
          mechanisms: ['neuropathic']
        },
        {
          id: 'electric-shocks',
          text: 'Electric shocks',
          mechanisms: ['neuropathic']
        },
        {
          id: 'shooting',
          text: 'Shooting',
          mechanisms: ['neuropathic']
        },
        {
          id: 'dull',
          text: 'Dull',
          mechanisms: ['nociceptive']
        },
        {
          id: 'pins-needles',
          text: 'Pins & needles',
          mechanisms: ['neuropathic']
        },
        {
          id: 'numbness',
          text: 'Numbness',
          mechanisms: ['neuropathic']
        },
        {
          id: 'toothache-like',
          text: 'Toothache-like',
          mechanisms: ['nociceptive']
        },
        {
          id: 'diffuse',
          text: 'Diffuse (hard to localize)',
          mechanisms: ['central']
        },
        {
          id: 'stiffness',
          text: 'Stiffness/tightness',
          mechanisms: ['nociceptive']
        },
        {
          id: 'changes',
          text: 'Changes all the time',
          mechanisms: ['central']
        }
      ]
    },
    {
      id: 'injury-start',
      text: 'Did your pain start after an injury or trauma?',
      type: 'radio',
      options: [
        {
          id: 'yes-injury',
          text: 'Yes',
          mechanisms: ['nociceptive']
        },
        {
          id: 'no-injury',
          text: 'No',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'activity-start',
      text: 'Did your pain start after a specific activity/movement?',
      type: 'radio',
      options: [
        {
          id: 'yes-activity',
          text: 'Yes',
          mechanisms: ['nociceptive', 'neuropathic']
        },
        {
          id: 'no-activity',
          text: 'No',
          mechanisms: ['central']
        }
      ]
    },
    {
      id: 'reflexes',
      text: 'Have you been informed, by a medically trained professional, that you have significantly reduced or absent reflexes?',
      type: 'radio',
      options: [
        {
          id: 'yes-reflexes',
          text: 'Yes',
          mechanisms: ['neuropathic']
        },
        {
          id: 'no-reflexes',
          text: 'No',
          mechanisms: ['neuropathic']
        },
        {
          id: 'not-visited',
          text: 'I have not visited any medical professional',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'sensitivity',
      text: 'Do you experience increased sensitivity to light, sound, or smell?',
      type: 'radio',
      options: [
        {
          id: 'yes-sensitivity',
          text: 'Yes',
          mechanisms: ['central']
        },
        {
          id: 'no-sensitivity',
          text: 'No',
          mechanisms: ['none']
        }
      ]
    },
    {
      id: 'variable-impact',
      text: 'Do you find that the impact of movements/activities (same) on pain to be variable, unpredictable, or inconsistent?',
      type: 'radio',
      options: [
        {
          id: 'yes-variable',
          text: 'Yes',
          mechanisms: ['central']
        },
        {
          id: 'no-variable',
          text: 'No',
          mechanisms: ['none']
        }
      ]
    }
  ]
};

// Nociceptive Follow-up Questionnaire
export const nociceptiveQuestionnaire: Questionnaire = {
  id: 'nociceptive',
  title: 'Nociceptive Pain Assessment',
  description: 'This questionnaire will help us understand your pain better.',
  forMechanism: 'nociceptive',
  questions: [
    {
      id: 'rest-helps',
      text: 'Does rest or avoiding aggravating movements help reduce your pain?',
      type: 'radio',
      options: [
        {
          id: 'yes-rest',
          text: 'Yes, my pain improves when I rest'
        },
        {
          id: 'no-rest',
          text: 'No'
        }
      ]
    },
    {
      id: 'worst-time',
      text: 'What time of the day is worst for you?',
      type: 'radio',
      options: [
        {
          id: 'morning',
          text: 'Morning, waking up',
          differentials: ['disc herniation']
        },
        {
          id: 'daytime',
          text: 'Day time, when being active',
          differentials: ['facet joint syndrome', 'SIJ syndrome', 'muscle pain']
        },
        {
          id: 'nighttime',
          text: 'Night time',
          differentials: ['red flag']
        }
      ]
    },
    {
      id: 'spine-abnormality',
      text: 'Have you noticed some hole in your spine, or a vertebra seems to be sticking out?',
      type: 'radio',
      options: [
        {
          id: 'hole',
          text: 'Yes, I have noticed a hole in my back',
          differentials: ['ventral spondylolisthesis'],
          followUp: [
            {
              id: 'lying-helps',
              text: 'Have you found lying on your back release your symptoms?',
              type: 'radio',
              options: [
                {
                  id: 'yes-lying',
                  text: 'Yes',
                  differentials: ['ventral spondylolisthesis']
                },
                {
                  id: 'no-lying',
                  text: 'No',
                  differentials: ['none']
                }
              ]
            }
          ]
        },
        {
          id: 'sticking-out',
          text: 'Yes, my vertebra seems to be sticking out a bit',
          differentials: ['dorsal spondylolisthesis']
        },
        {
          id: 'no-abnormality',
          text: 'No',
          differentials: ['none']
        }
      ]
    },
    {
      id: 'chest-tightness',
      text: 'Have you experienced any chest tightness?',
      type: 'radio',
      options: [
        {
          id: 'yes-tightness',
          text: 'Yes',
          differentials: ['costovertebral joint syndrome', 'facet joint syndrome']
        },
        {
          id: 'no-tightness',
          text: 'No',
          differentials: ['muscle pain']
        }
      ]
    },
    {
      id: 'breathing-pain',
      text: 'Do you feel any pain or symptom when breathing in?',
      type: 'radio',
      options: [
        {
          id: 'yes-breathing',
          text: 'Yes, breathing in reproduces pain',
          differentials: ['costovertebral joint syndrome', 'facet joint syndrome', 'red flag']
        },
        {
          id: 'no-breathing',
          text: 'No',
          differentials: ['muscle pain']
        }
      ]
    }
  ]
};

// Neuropathic Follow-up Questionnaire
export const neuropathicQuestionnaire: Questionnaire = {
  id: 'neuropathic',
  title: 'Neuropathic Pain Assessment',
  description: 'This questionnaire will help us understand your nerve-related pain better.',
  forMechanism: 'neuropathic',
  questions: [
    {
      id: 'coughing-pain',
      text: 'Does your pain worsen with movements such as coughing, sneezing, or straining?',
      type: 'radio',
      options: [
        {
          id: 'yes-coughing',
          text: 'Yes, my pain increases with these movements.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-coughing',
          text: 'No'
        }
      ]
    },
    {
      id: 'abnormal-sensations',
      text: 'Do you feel abnormal sensations like tingling, burning, or "electric shocks" along the affected limb?',
      type: 'radio',
      options: [
        {
          id: 'yes-sensations',
          text: 'Yes, I experience tingling, burning, or electric shock-like sensations along a specific path in my limb.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-sensations',
          text: 'No',
          differentials: ['Radiculopathy']
        }
      ]
    },
    {
      id: 'numbness',
      text: 'Do you experience numbness or reduced sensation in a specific area of your limb?',
      type: 'radio',
      options: [
        {
          id: 'yes-numbness',
          text: 'Yes, I feel numbness or a lack of sensation in a specific region of my limb.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-numbness',
          text: 'No',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'muscle-weakness',
      text: 'Have you noticed muscle weakness in the affected limb, making it difficult to grip objects, lift your foot, or move normally?',
      type: 'radio',
      options: [
        {
          id: 'yes-weakness',
          text: 'Yes, I have muscle weakness that affects my ability to move or use my limb properly.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-weakness',
          text: 'No',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'reflex-loss',
      text: 'Have you lost reflexes in your affected limb, as confirmed by a healthcare provider?',
      type: 'radio',
      options: [
        {
          id: 'yes-reflex-loss',
          text: 'Yes, a healthcare provider has confirmed reduced or absent reflexes.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-reflex-loss',
          text: 'No',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'spine-abnormality-neuro',
      text: 'Have you noticed some hole in your spine, or a vertebra seems to be sticking out?',
      type: 'radio',
      options: [
        {
          id: 'hole-neuro',
          text: 'Yes, I have noticed a hole in my back',
          differentials: ['ventral spondylolisthesis'],
          followUp: [
            {
              id: 'lying-helps-neuro',
              text: 'Have you found lying on your back release your symptoms?',
              type: 'radio',
              options: [
                {
                  id: 'yes-lying-neuro',
                  text: 'Yes',
                  differentials: ['ventral spondylolisthesis']
                },
                {
                  id: 'no-lying-neuro',
                  text: 'No',
                  differentials: ['none']
                }
              ]
            }
          ]
        },
        {
          id: 'sticking-out-neuro',
          text: 'Yes, my vertebra seems to be sticking out a bit',
          differentials: ['dorsal spondylolisthesis']
        },
        {
          id: 'no-abnormality-neuro',
          text: 'No',
          differentials: ['none']
        }
      ]
    }
  ]
};

// Central Follow-up Questionnaire
export const centralQuestionnaire: Questionnaire = {
  id: 'central',
  title: 'Central Sensitization Assessment',
  description: 'This questionnaire will help us understand your pain processing symptoms better.',
  forMechanism: 'central',
  questions: [
    {
      id: 'pain-spread',
      text: 'Does your pain spread to areas that were not originally present?',
      type: 'radio',
      options: [
        {
          id: 'yes-spread',
          text: 'Yes, my pain has spread beyond the initial area.',
          differentials: ['Central Sensitisation']
        },
        {
          id: 'no-spread',
          text: 'No'
        }
      ]
    },
    {
      id: 'allodynia',
      text: 'Do you experience pain from things that shouldn\'t normally be painful (e.g., light touch, clothing, mild pressure)?',
      type: 'radio',
      options: [
        {
          id: 'yes-allodynia',
          text: 'Yes, even gentle touch or pressure causes pain.',
          differentials: ['Central Sensitisation - Allodynia']
        },
        {
          id: 'no-allodynia',
          text: 'No'
        }
      ]
    },
    {
      id: 'disproportionate',
      text: 'Does your pain intensity seem out of proportion to your problem or condition?',
      type: 'radio',
      options: [
        {
          id: 'yes-disproportionate',
          text: 'Yes, my pain feels much worse than expected for my condition.',
          differentials: ['Central Sensitisation']
        },
        {
          id: 'no-disproportionate',
          text: 'No'
        }
      ]
    },
    {
      id: 'sensory-sensitivity',
      text: 'Do you experience sensitivity to light, noise, or smells, along with your pain?',
      type: 'radio',
      options: [
        {
          id: 'yes-sensory',
          text: 'Yes, I am more sensitive to light, noise, or smells.',
          differentials: ['Central Sensitisation - Sensory Hypersensitivity']
        },
        {
          id: 'no-sensory',
          text: 'No'
        }
      ]
    },
    {
      id: 'cognitive-symptoms',
      text: 'Do you have symptoms like poor concentration ("brain fog"), fatigue, or sleep disturbances along with your pain?',
      type: 'radio',
      options: [
        {
          id: 'yes-cognitive',
          text: 'Yes, I experience fatigue, brain fog, or poor sleep with my pain.',
          differentials: ['Central Sensitisation - Cognitive Symptoms']
        },
        {
          id: 'no-cognitive',
          text: 'No',
          differentials: ['none']
        }
      ]
    }
  ]
};

// Export all questionnaires
export const questionnaires: Record<string, Questionnaire> = {
  general: generalQuestionnaire,
  nociceptive: nociceptiveQuestionnaire,
  neuropathic: neuropathicQuestionnaire,
  central: centralQuestionnaire
};
