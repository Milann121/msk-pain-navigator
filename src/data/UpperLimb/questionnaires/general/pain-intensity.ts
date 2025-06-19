
import { Question } from '@/utils/types';

export const painIntensityQuestion: Question = {
  id: 'pain-intensity-upper-limb',
  text: 'Aká je vaša intenzita bolesti v priemere?',
  description: '',
  type: 'scale',
  scale: {
    min: 0,
    max: 10,
    minLabel: 'Žiadna bolesť',
    maxLabel: 'Najhoršia predstaviteľná bolesť'
  }
};
