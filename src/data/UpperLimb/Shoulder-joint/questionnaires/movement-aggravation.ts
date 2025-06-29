
import { Question } from '@/utils/types';

// Follow-up question displayed when the user selects
// the "lifting-arm-overhead" option. It asks at what
// degree the movement becomes painful and retains the
// existing translation keys and option structure.
const overheadActivitiesQuestion: Question = {
  id: 'painful-degree',
  text: 'questionnaire.shoulderNociceptive.questions.painfulDegree',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'around-45-60-degrees',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.around-45-60-degrees',
      differentials: ['stiff-shoulder', 'frozen-shoulder']
    },
    {
      id: 'around-90-degrees',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.around-90-degrees',
      differentials: ['subacromional-impingement-syndrome']
    },
    {
      id: 'above-90-degrees',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.above-90-degrees',
      differentials: ['subacromional-impingement-syndrome', 'slap-tear'],
      followUp: [
        {
          id: 'palm-facing-up',
          text: 'questionnaire.shoulderNociceptive.questions.palmFacingUp',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'same-pain',
              text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.same-pain',
              differentials: ['slap-tear']
            },
            {
              id: 'more-painful-palm-up',
              text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.more-painful-palm-up',
              differentials: ['slap-tear', 'labral-leason', 'biceps-tear-long-head']
            },
            {
              id: 'less-painful',
              text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.less-painful',
              differentials: ['subacromional-impingement-syndrome']
            },
            {
              id: 'do-not-want-try',
              text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.do-not-want-try',
              differentials: ['none']
            }
          ]
        }
      ]
    },
    {
      id: 'do-not-know-degree',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.do-not-know-degree',
      differentials: ['none']
    }
  ]
};

export const aggravatingMovementsQuestion: Question = {
  id: 'aggravating-movements',
  text: 'questionnaire.shoulderNociceptive.questions.aggravatingMovements',
  description: '',
  type: 'multiple',
  options: [
    {
      id: 'lifting-arm-overhead',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.lifting-arm-overhead',
      differentials: ['subacromional-impingement-syndrome', 'frozen-shoulder', 'stiff-shoulder'],
      followUp: [overheadActivitiesQuestion]
    },
    {
      id: 'reaching-behind-back',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.reaching-behind-back',
      differentials: ["subacromional-impingement-syndrome","frozen-shoulder","biceps-tear-long-head"]
    },
    {
      id: 'scratching-back-head',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.scratching-back-head',
      differentials: ["frozen-shoulder"]
    },
    {
      id: 'throwing-overhead-sports',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.throwing-overhead-sports',
      differentials: ["rotator-cuff-tendinopathy","rotator-cuff-tear", "subacromional-impingement-syndrome"]
    },
    {
      id: 'sudden-movement-heavy',
      text: 'questionnaire.shoulderNociceptive.options.aggravatingMovements.sudden-movement-heavy',
      differentials: ["unstable-shoulder", "subacromional-impingement-syndrome"]
    }
  ]
};

// Export the movement aggravation question with the correct name
export const movementAggravationQuestion = aggravatingMovementsQuestion;
