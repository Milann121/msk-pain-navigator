
import { Question } from '@/utils/types';

export const clickingLockingQuestion: Question = {
  id: 'clicking-locking-catching',
  text: 'questionnaire.shoulderNociceptive.questions.clickingLockingCatching',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-clicking',
      text: 'questionnaire.shoulderNociceptive.options.clickingLocking.yes-clicking',
      differentials: ["labral-leason","subacromional-impingement-syndrome", "unstable-shoulder"]
    },
    {
      id: 'no-clicking',
      text: 'questionnaire.shoulderNociceptive.options.clickingLocking.no-clicking',      
      differentials: ["none"]
    },
    {
      id: 'rarely-sports-only',
      text: 'questionnaire.shoulderNociceptive.options.clickingLocking.rarely-sports-only',
      differentials: ["labral-leason","subacromional-impingement-syndrome", "unstable-shoulder"]
    }
  ]
};

export const shoulderDislocationQuestion: Question = {
  id: 'shoulder-dislocation-past',
  text: 'questionnaire.shoulderNociceptive.questions.shoulderDislocationPast',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-confirmed-diagnosis',
      text: 'questionnaire.shoulderNociceptive.options.shoulderDislocation.yes-confirmed-diagnosis',
      differentials: ["shoulder-dislocation", "unstable-shoulder"]
    },
    {
      id: 'no-dislocation',
      text: 'questionnaire.shoulderNociceptive.options.shoulderDislocation.no-dislocation',
      differentials: ["none"]
    },
    {
      id: 'not-sure-popped-out',
      text: 'questionnaire.shoulderNociceptive.options.shoulderDislocation.not-sure-popped-out',
      differentials: ["shoulder-dislocation", "unstable-shoulder"]
    }
  ]
};
