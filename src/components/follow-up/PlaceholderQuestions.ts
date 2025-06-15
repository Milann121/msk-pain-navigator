import { FollowUpQuestion } from './types';

export const placeholderQuestions: Record<string, FollowUpQuestion[]> = {
  nociceptive: [
    {
      id: 'pain-level-change',
      text: 'Aká je vaša aktuálna úroveň bolesti?',
      description: 'Ohodnoťte aktuálnu intenzitu bolesti na stupnici 0 (žiadna bolesť) až 10 (najhoršia predstaviteľná bolesť).',
      type: 'scale',
      scale: {
        min: 0,
        max: 10,
        minLabel: 'Žiadna bolesť',
        maxLabel: 'Najhoršia bolesť'
      }
    },
    {
      id: 'overall-feel',
      text: 'Ako sa celkovo cítite po cvičení programu?',
      type: 'single',
      options: [
        { id: 'better', text: 'Lepšie' },
        { id: 'same', text: 'Rovnako' },
        { id: 'worse', text: 'Horšie' }
      ]
    },
    {
      id: 'pain-nature-changed',
      text: 'Zmenila sa povaha vašej bolesti?',
      description: 'Znamená to, či je vaša bolesť iného charakteru než doteraz (napr. pálenie, vystreľovanie, stuhnutosť, atď.).',
      type: 'single',
      options: [
        { id: 'no', text: 'Nie' },
        { id: 'yes', text: 'Áno' }
      ]
    },
    // Conditional sub-question for pain-nature-changed: yes
    {
      id: 'pain-nature-description',
      text: 'Ako by ste opísali povahu vašej bolesti?',
      type: 'multiple',
      options: [
        { id: 'burning', text: 'Pálenie' },          // neuropathic
        { id: 'shooting', text: 'Vystreľovanie' },   // neuropathic
        { id: 'dull', text: 'Tupá' },                // nociceptive
        { id: 'pins-needles', text: 'Mravčenie' },   // neuropathic
        { id: 'numbness', text: 'Necitlivosť' },     // neuropathic
        { id: 'toothache-like', text: 'Zubovité bolesti' }, // neuropathic
        { id: 'diffuse', text: 'Difúzna' },          // neuropathic
        { id: 'stiffness', text: 'Stuhnutosť' },     // nociceptive
        { id: 'changes', text: 'Mení sa' }           // central
      ]
    },
    {
      id: 'pain-spreading',
      text: 'Rozširuje sa vaša bolesť do oblastí, ktoré predtým neboli postihnuté?',
      type: 'single',
      options: [
        { id: 'yes', text: 'Áno' },
        { id: 'no', text: 'Nie' }
      ]
    },
    // Conditional sub-question for pain-spreading: yes
    {
      id: 'new-pain-area',
      text: 'Kde sa objavila nová bolesť? (Môžete vybrať viac možností)',
      type: 'multiple',
      options: [
        { id: 'upper-limb-elbow-up', text: 'Horná končatina – po lakeť' },
        { id: 'upper-limb-below-elbow', text: 'Horná končatina – pod lakeť' },
        { id: 'upper-limb-hand-fingers', text: 'Horná končatina – až do ruky/prstov' },
        { id: 'lower-limb-buttock', text: 'Dolná končatina – v sedacej oblasti' },
        { id: 'lower-limb-knee-up', text: 'Dolná končatina – po koleno' },
        { id: 'lower-limb-below-knee', text: 'Dolná končatina – pod koleno' },
        { id: 'lower-limb-feet-fingers', text: 'Dolná končatina – až do chodidla/prstov' },
        { id: 'chest', text: 'Hrudník' },
        { id: 'head', text: 'Hlava' },
        { id: 'face', text: 'Tvár' }
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
