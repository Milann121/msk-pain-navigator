
import { Questionnaire } from '@/utils/types';

export const neuropathicQuestionnaire: Questionnaire = {
  id: 'neuropathic',
  title: 'Hodnotenie neuropatickej bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vašu bolesť súvisiacu s nervami.',
  forMechanism: 'neuropathic',
  questions: [
    {
      id: 'coughing-pain',
      text: 'Zhoršuje sa vaša bolesť pri kašeľaní, kýchaní alebo napínaní sa?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-coughing',
          text: 'Áno, moja bolesť sa pri týchto aktivitách zvyšuje.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-coughing',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'abnormal-sensations',
      text: 'Cítite nezvyčajné pocity ako mravčenie, pálenie alebo "elektrické šoky" pozdĺž postihnutej končatiny?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-sensations',
          text: 'Áno, pociťujem mravčenie, pálenie alebo pocity podobné elektrickým šokom pozdĺž špecifickej dráhy v končatine.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-sensations',
          text: 'Nie',
          differentials: ['Radiculopathy']
        }
      ]
    },
    {
      id: 'numbness',
      text: 'Pociťujete znecitlivenie alebo zníženú citlivosť v konkrétnej oblasti končatiny?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-numbness',
          text: 'Áno, cítim znecitlivenie alebo nedostatok citlivosti v špecifickej oblasti končatiny.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-numbness',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'muscle-weakness',
      text: 'Všimli ste si svalovú slabosť v postihnutej končatine, ktorá sťažuje uchopenie predmetov, zdvihnutie nohy alebo normálny pohyb?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-weakness',
          text: 'Áno, mám svalovú slabosť, ktorá ovplyvňuje moju schopnosť hýbať sa alebo používať končatinu správne.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-weakness',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'reflex-loss',
      text: 'Stratili ste reflexy v postihnutej končatine, ktorých stratu vám potvrdil zdravotnícky pracovník?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'yes-reflex-loss',
          text: 'Áno, zdravotnícky pracovník potvrdil znížené alebo chýbajúce reflexy.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-reflex-loss',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'spine-abnormality-neuro',
      text: 'Všimli ste si nejakú priehlbinu v chrbtici alebo vystupujúci stavec?',
      description: '', // Add description here later
      type: 'radio',
      options: [
        {
          id: 'hole-neuro',
          text: 'Áno, spozoroval/a som priehlbinu v chrbte',
          differentials: ['ventral spondylolisthesis'],
          followUp: [
            {
              id: 'lying-helps-neuro',
              text: 'Máte pocit, že ľah na chrbte zmierňuje vaše príznaky?',
              description: '', // Add description here later
              type: 'radio',
              options: [
                {
                  id: 'yes-lying-neuro',
                  text: 'Áno',
                  differentials: ['ventral spondylolisthesis']
                },
                {
                  id: 'no-lying-neuro',
                  text: 'Nie',
                  differentials: ['none']
                }
              ]
            }
          ]
        },
        {
          id: 'sticking-out-neuro',
          text: 'Áno, zdá sa, že môj stavec mierne vystupuje',
          differentials: ['dorsal spondylolisthesis']
        },
        {
          id: 'no-abnormality-neuro',
          text: 'Nie',
          differentials: ['none']
        }
      ]
    }
  ]
};
