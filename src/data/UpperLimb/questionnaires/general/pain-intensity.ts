
import { Question } from '@/utils/types';

export const painIntensityQuestion: Question = {
  id: 'pain-intensity-upper-limb',
  text: 'What is your pain intensity on average?',
  description: '',
  type: 'scale',
  scale: {
    min: 0,
    max: 10,
    minLabel: 'No pain',
    maxLabel: 'Worst imaginable pain'
  }
};
