import { Questionnaire } from '@/utils/types';

export const centralQuestionnaire: Questionnaire = {
  id: 'central',
  title: 'Hodnotenie centrálnej senzitizácie',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vaše príznaky súvisiace so spracovaním bolesti.',
  questions: [
    {
      id: 'pain-spread',
      text: 'Šíri sa vaša bolesť do oblastí, ktoré pôvodne neboli postihnuté?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-spread',
          text: 'Áno, moja bolesť sa rozšírila za pôvodnú oblasť.',
          differentials: ['Central Sensitisation']
        },
        {
          id: 'no-spread',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'allodynia',
      text: 'Pociťujete bolesť pri podnetoch, ktoré by normálne nemali byť bolestivé (napr. ľahký dotyk, oblečenie, mierny tlak)?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-allodynia',
          text: 'Áno, aj jemný dotyk alebo tlak spôsobuje bolesť.',
          differentials: ['Central Sensitisation - Allodynia']
        },
        {
          id: 'no-allodynia',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'disproportionate',
      text: 'Zdá sa vám intenzita bolesti neprimeraná vášmu problému alebo stavu?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-disproportionate',
          text: 'Áno, moja bolesť sa zdá byť oveľa horšia, ako by som očakával/a pri mojom stave.',
          differentials: ['Central Sensitisation']
        },
        {
          id: 'no-disproportionate',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'sensory-sensitivity',
      text: 'Pociťujete spolu s bolesťou citlivosť na svetlo, hluk alebo vône?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-sensory',
          text: 'Áno, som citlivejší/ia na svetlo, hluk alebo vône.',
          differentials: ['Central Sensitisation - Sensory Hypersensitivity']
        },
        {
          id: 'no-sensory',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'cognitive-symptoms',
      text: 'Máte spolu s bolesťou príznaky ako zhoršená koncentrácia ("mozgová hmla"), únava alebo poruchy spánku?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-cognitive',
          text: 'Áno, pociťujem únavu, mozgovú hmlu alebo zhoršený spánok spolu s bolesťou.',
          differentials: ['Central Sensitisation - Cognitive Symptoms']
        },
        {
          id: 'no-cognitive',
          text: 'Nie',
          differentials: ['none']
        }
      ]
    }
  ]
};
