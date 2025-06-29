
import { Question } from '@/utils/types';

export const painLocationQuestion: Question = {
  id: 'shoulder-pain-location',
  text: 'questionnaire.shoulderNociceptive.questions.shoulderPainLocation',
  description: '',
  type: 'multiple',
  options: [
    {
      id: 'lateral-upper-arm',
      text: 'questionnaire.shoulderNociceptive.options.painLocation.lateral-upper-arm',
      differentials: ["frozen-shoulder", "stiff-shoulder"]
    },
    {
      id: 'deep-shoulder-joint',
      text: 'questionnaire.shoulderNociceptive.options.painLocation.deep-shoulder-joint',
      differentials: ["frozen-shoulder","subacromional-impingement-syndrome"]
    },
    {
      id: 'front-shoulder',
      text: 'questionnaire.shoulderNociceptive.options.painLocation.front-shoulder',
      differentials: ["slap-tear","labral-leason" ]
    },
    {
      id: 'below-behind-bone',
      text: 'questionnaire.shoulderNociceptive.options.painLocation.below-behind-bone',
      differentials: ["shoulder-bursa","subacromional-impingement-syndrome", "labral-leason"]
    },
    {
      id: 'from-shoulderblade',
      text: 'questionnaire.shoulderNociceptive.options.painLocation.from-shoulderblade',
      differentials: ["frozen-shoulder", "stiff-shoulder", "rotator-cuff-tear", "rotator-cuff-tendinopathy"]
    },
    {
      id: 'entire-shoulder',
      text: 'questionnaire.shoulderNociceptive.options.painLocation.entire-shoulder',
      differentials: ["frozen-shoulder", "stiff-shoulder"]
    }
  ]
};
