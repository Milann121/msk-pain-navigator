
import { Questionnaire } from '@/utils/types';

export const upperLimbNeckQuestionnaire: Questionnaire = {
  id: 'upper-limb-neck-questions',
  title: 'Hodnotenie bolesti hornej končatiny súvisiacej s krkom',
  description: 'Špecifické otázky pre bolesť hornej končatiny súvisiacu s krkom',
  questions: [
    {
      id: 'shoulder-blade-pain',
      text: 'Pociťujete bolesť okolo alebo nad lopatkou na strane bolesti?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-one-side',
          text: 'Áno, len na jednej strane',
          mechanisms: ['neuropathic'],
          differentials: ['cervical-radiculopathy']
        },
        {
          id: 'yes-both-sides',
          text: 'Áno, na oboch stranách',
          mechanisms: ['neuropathic'],
          differentials: ['cervical-radiculopathy']
        },
        {
          id: 'no-shoulder-blade',
          text: 'Nie',
          mechanisms: ['neuropathic'],
          differentials: ['none']
        }
      ]
    },
    {
      id: 'abnormal-sensations',
      text: 'Pociťujete abnormálne pocity ako mravčenie, pálenie alebo "elektrické výboje" pozdĺž postihnutej končatiny?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-sensations',
          text: 'Áno, pociťujem mravčenie, pálenie alebo pocity ako elektrický výboj pozdĺž špecifickej dráhy v mojej končatine.',
          mechanisms: ['neuropathic'],
          differentials: ['radicular-pain']
        },
        {
          id: 'no-sensations',
          text: 'Nie',
          mechanisms: ['neuropathic'],
          differentials: ['radiculopathy']
        }
      ]
    },
    {
      id: 'numbness-reduced-sensation',
      text: 'Pociťujete necitlivosť alebo znížené cítenie v špecifickej oblasti vašej končatiny?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-numbness',
          text: 'Áno, cítim necitlivosť alebo nedostatok cítenia v špecifickej oblasti mojej končatiny.',
          mechanisms: ['neuropathic'],
          differentials: ['radiculopathy']
        },
        {
          id: 'no-numbness',
          text: 'Nie',
          mechanisms: ['neuropathic'],
          differentials: ['radicular-pain']
        }
      ]
    },
    {
      id: 'muscle-weakness',
      text: 'Všimli ste si svalovú slabosť v postihnutej končatine, ktorá sťažuje uchopenie predmetov, zdvihnutie nohy alebo normálny pohyb?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-weakness',
          text: 'Áno, mám svalovú slabosť, ktorá ovplyvňuje moju schopnosť pohybovať sa alebo používať končatinu správne.',
          mechanisms: ['neuropathic'],
          differentials: ['radiculopathy']
        },
        {
          id: 'no-weakness',
          text: 'Nie',
          mechanisms: ['neuropathic'],
          differentials: ['radicular-pain']
        }
      ]
    },
    {
      id: 'lost-reflexes',
      text: 'Stratili ste reflexy vo vašej postihnutej končatine, čo potvrdil zdravotnícky pracovník?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-reflexes',
          text: 'Áno, zdravotnícky pracovník potvrdil znížené alebo chýbajúce reflexy.',
          mechanisms: ['neuropathic'],
          differentials: ['radiculopathy']
        },
        {
          id: 'no-reflexes',
          text: 'Nie',
          mechanisms: ['neuropathic'],
          differentials: ['radicular-pain']
        }
      ]
    }
  ]
};
