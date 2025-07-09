import { Questionnaire } from '@/utils/types';

export const orebroQuestionnaire: Questionnaire = {
  id: 'orebro',
  title: 'Wellness Check-in',
  description: 'Please answer the following questions about your pain and work capacity.',
  questions: [
    {
      id: 'pain-location',
      text: 'Where do you have pain? (Place a tick for all appropriate sites)',
      type: 'multiple',
      options: [
        { id: 'neck', text: 'Neck' },
        { id: 'shoulder', text: 'Shoulder' },
        { id: 'arm', text: 'Arm' },
        { id: 'upper-back', text: 'Upper Back' },
        { id: 'lower-back', text: 'Lower Back' },
        { id: 'leg', text: 'Leg' },
        { id: 'other', text: 'Other (state)' }
      ]
    },
    {
      id: 'missed-work-days',
      text: 'How many days of work have you missed because of pain during the past 18 months?',
      type: 'radio',
      options: [
        { id: '0', text: '0 days' },
        { id: '1-2', text: '1–2 days' },
        { id: '3-7', text: '3–7 days' },
        { id: '8-14', text: '8–14 days' },
        { id: '15-30', text: '15–30 days' },
        { id: '1m', text: '1 month' },
        { id: '2m', text: '2 months' },
        { id: '3-6m', text: '3–6 months' },
        { id: '6-12m', text: '6–12 months' },
        { id: 'over-1y', text: 'Over 1 year' }
      ]
    },
    {
      id: 'pain-duration',
      text: 'How long have you had your current pain problem?',
      type: 'radio',
      options: [
        { id: '0-1w', text: '0–1 week' },
        { id: '1-2w', text: '1–2 weeks' },
        { id: '3-4w', text: '3–4 weeks' },
        { id: '4-5w', text: '4–5 weeks' },
        { id: '6-8w', text: '6–8 weeks' },
        { id: '9-11w', text: '9–11 weeks' },
        { id: '3-6m', text: '3–6 months' },
        { id: '6-9m', text: '6–9 months' },
        { id: '9-12m', text: '9–12 months' },
        { id: 'over-1y', text: 'Over 1 year' }
      ]
    },
    {
      id: 'work-heavy',
      text: 'Is your work heavy or monotonous?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Not at all',
        maxLabel: 'Extremely'
      }
    },
    {
      id: 'pain-past-week',
      text: 'How would you rate the pain that you have had during the past week?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'No pain',
        maxLabel: 'Pain as bad as it could be'
      }
    },
    {
      id: 'average-pain-3-months',
      text: 'In the past three months, on average, how bad was your pain on a 0–10 scale?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'No pain',
        maxLabel: 'Pain as bad as it could be'
      }
    },
    {
      id: 'pain-frequency',
      text: 'How often would you say that you have experienced pain episodes during the past three months?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Never',
        maxLabel: 'Always'
      }
    },
    {
      id: 'coping-decrease',
      text: 'On an average day, how much are you able to decrease your pain with coping strategies?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: "Can’t decrease at all",
        maxLabel: 'Can decrease completely'
      }
    },
    {
      id: 'anxiety',
      text: 'How tense or anxious have you felt in the past week?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Absolutely calm',
        maxLabel: 'As tense/anxious as ever'
      }
    },
    {
      id: 'depression',
      text: 'How much have you been bothered by feeling depressed in the past week?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Not at all',
        maxLabel: 'Extremely'
      }
    },
    {
      id: 'persistent-risk',
      text: 'How large is the risk that your current pain may become persistent?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'No risk',
        maxLabel: 'Very large risk'
      }
    },
    {
      id: 'work-chance',
      text: 'What are the chances that you will be able to work in six months?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'No chance',
        maxLabel: 'Very large chance'
      }
    },
    {
      id: 'job-satisfaction',
      text: 'How satisfied are you with your job (considering routines, management, salary, promotion, workmates)?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Not satisfied at all',
        maxLabel: 'Completely satisfied'
      }
    },
    {
      id: 'activity-worsens',
      text: 'Physical activity makes my pain worse.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Completely disagree',
        maxLabel: 'Completely agree'
      }
    },
    {
      id: 'stop-if-pain',
      text: 'An increase in pain is an indication that I should stop what I’m doing until the pain decreases.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Completely disagree',
        maxLabel: 'Completely agree'
      }
    },
    {
      id: 'avoid-normal-work',
      text: 'I should not do my normal work with my present pain.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Completely disagree',
        maxLabel: 'Completely agree'
      }
    },
    {
      id: 'light-work-hour',
      text: 'I can do light work for an hour.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: "Can’t do it because of pain",
        maxLabel: 'Can do it without pain being a problem'
      }
    },
    {
      id: 'walk-hour',
      text: 'I can walk for an hour.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: "Can’t do it because of pain",
        maxLabel: 'Can do it without pain being a problem'
      }
    },
    {
      id: 'household-chores',
      text: 'I can do ordinary household chores.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: "Can’t do it because of pain",
        maxLabel: 'Can do it without pain being a problem'
      }
    },
    {
      id: 'weekly-shopping',
      text: 'I can do the weekly shopping.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: "Can’t do it because of pain",
        maxLabel: 'Can do it without pain being a problem'
      }
    },
    {
      id: 'sleep-night',
      text: 'I can sleep at night.',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: "Can’t do it because of pain",
        maxLabel: 'Can do it without pain being a problem'
      }
    }
  ]
};

export default orebroQuestionnaire;
