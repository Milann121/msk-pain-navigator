
import { FollowUpQuestion } from './types';

export const placeholderQuestions: Record<string, FollowUpQuestion[]> = {
  nociceptive: [
    {
      id: 'pain-level-change',
      text: 'Ako by ste hodnotili vašu bolesť v porovnaní s posledným hodnotením?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Žiadna bolesť',
        maxLabel: 'Najhoršia predstaviteľná bolesť'
      }
    },
    {
      id: 'exercise-effectiveness',
      text: 'Ako účinné sú cvičenia na zmiernenie vašej bolesti?',
      type: 'single',
      options: [
        { id: 'very-effective', text: 'Veľmi účinné' },
        { id: 'somewhat-effective', text: 'Čiastočne účinné' },
        { id: 'not-effective', text: 'Neúčinné' }
      ]
    }
  ],
  neuropathic: [
    {
      id: 'pain-level-change',
      text: 'Ako by ste hodnotili vašu bolesť v porovnaní s posledným hodnotením?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Žiadna bolesť',
        maxLabel: 'Najhoršia predstaviteľná bolesť'
      }
    },
    {
      id: 'nerve-symptoms',
      text: 'Zmenili sa vaše príznaky mravčenia alebo necitlivosti?',
      type: 'single',
      options: [
        { id: 'improved', text: 'Zlepšili sa' },
        { id: 'unchanged', text: 'Bez zmeny' },
        { id: 'worse', text: 'Zhoršili sa' }
      ]
    }
  ],
  central: [
    {
      id: 'pain-level-change',
      text: 'Ako by ste hodnotili vašu bolesť v porovnaní s posledným hodnotením?',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Žiadna bolesť',
        maxLabel: 'Najhoršia predstaviteľná bolesť'
      }
    },
    {
      id: 'sensitivity-change',
      text: 'Zmenila sa vaša citlivosť na dotyky, svetlo alebo zvuky?',
      type: 'single',
      options: [
        { id: 'less-sensitive', text: 'Menej citlivý/á' },
        { id: 'same', text: 'Rovnako' },
        { id: 'more-sensitive', text: 'Viac citlivý/á' }
      ]
    }
  ]
};
