
import { Question } from '@/utils/types';

export const restHelpsPainQuestion: Question = {
  id: 'rest-helps-pain',
  text: 'questionnaire.shoulderNociceptive.questions.restHelpsPain',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-rest-helps',
      text: 'questionnaire.shoulderNociceptive.options.restPain.yes-rest-helps',
      differentials: ["none"]
    },
    {
      id: 'no-rest-not-help',
      text: 'questionnaire.shoulderNociceptive.options.restPain.no-rest-not-help',
      differentials: ["frozen-shoulder", "labral-leason"],
      followUp: [
        {
          id: 'pain-24-hours',
          text: 'questionnaire.shoulderNociceptive.questions.pain24Hours',
          description: '',
          type: 'radio',
          options: [
            {
              id: '24-hour-pain',
              text: 'questionnaire.shoulderNociceptive.options.restPain.24-hour-pain',
              differentials: ["red flag"]
            },
            {
              id: 'can-find-relief',
              text: 'questionnaire.shoulderNociceptive.options.restPain.can-find-relief',
              differentials: ["frozen-shoulder", "labral-leason"]
            }
          ]
        }
      ]
    }
  ]
};

export const painTimingQuestion: Question = {
  id: 'when-pain-noticeable',
  text: 'questionnaire.shoulderNociceptive.questions.whenPainNoticeable',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'during-activity-overhead',
      text: 'questionnaire.shoulderNociceptive.options.whenPainNoticeable.during-activity-overhead',
      differentials: ["subacromional-impingement-syndrome", "labral-leason", "biceps-tear-long-head", "rotator-cuff-tendinopathy", "rotator-cuff-tear"]
    },
    {
      id: 'at-rest-night',
      text: 'questionnaire.shoulderNociceptive.options.whenPainNoticeable.at-rest-night',
      differentials: ["frozen-shoulder", "labral-leason"]
    },
    {
      id: 'randomly-sleep-light',
      text: 'questionnaire.shoulderNociceptive.options.whenPainNoticeable.randomly-sleep-light',
      differentials: ["frozen-shoulder"]
    }
  ]
};

// Export the required questions
export const nightPainQuestion = painTimingQuestion;
export const restPositionQuestion = restHelpsPainQuestion;
