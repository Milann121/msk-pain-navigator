
import { Question } from '@/utils/types';

export const painIntensityQuestion: Question = {
  id: 'pain-intensity',
  text: 'Aká je vaša intenzita bolesti v priemere?',
  type: 'scale',
  scale: {
    min: 0,
    max: 10,
    minLabel: 'Žiadna bolesť',
    maxLabel: 'Najhoršia predstaviteľná bolesť'
  }
};
