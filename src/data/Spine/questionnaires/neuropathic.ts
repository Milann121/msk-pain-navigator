
import { Questionnaire } from '@/utils/types';

export const neuropathicQuestionnaire: Questionnaire = {
  id: 'neuropathic',
  title: 'Hodnotenie neuropatickej bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vašu nervovú bolesť.',
  forMechanism: 'neuropathic',
  questions: [
    {
      id: 'nerve-distribution',
      text: 'Sleduje vaša bolesť jasný vzorec nervového rozloženia (napr. vyžaruje po nohe alebo ruke)?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-distribution',
          text: 'Áno, moja bolesť sleduje jasný vzorec po končatine',
          differentials: ['radicular pain']
        },
        {
          id: 'no-distribution',
          text: 'Nie',
          differentials: ['none']
        }
      ]
    },
    {
      id: 'muscle-weakness',
      text: 'Pociťujete svalovú slabosť v oblasti postihnutej bolesťou?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-weakness',
          text: 'Áno, pociťujem svalovú slabosť',
          differentials: ['radicular pain']
        },
        {
          id: 'no-weakness',
          text: 'Nie',
          differentials: ['radiculopathy']
        }
      ]
    },
    {
      id: 'sensory-changes',
      text: 'Máte zmeny citlivosti (necitlivosť, mravčenie) v postihnutej oblasti?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-sensory',
          text: 'Áno, mám zmeny citlivosti',
          differentials: ['radiculopathy']
        },
        {
          id: 'no-sensory',
          text: 'Nie',
          differentials: ['radicular pain']
        }
      ]
    },
    {
      id: 'cough-strain',
      text: 'Zhoršuje sa vaša bolesť pri kašlaní, kýchaní alebo napínaní?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-cough',
          text: 'Áno, zhoršuje sa pri týchto aktivitách',
          differentials: ['radiculopathy']
        },
        {
          id: 'no-cough',
          text: 'Nie',
          differentials: ['radicular pain']
        }
      ]
    },
    {
      id: 'position-dependent',
      text: 'Je vaša bolesť závislá od polohy (lepšie v určitých polohách)?',
      description: '',
      type: 'radio',
      options: [
        {
          id: 'yes-position',
          text: 'Áno, určité polohy pomáhają',
          differentials: ['radiculopathy']
        },
        {
          id: 'no-position',
          text: 'Nie',
          differentials: ['radicular pain']
        }
      ]
    }
  ]
};
