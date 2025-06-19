
import { Question } from '@/utils/types';

export const neckPainConnectionQuestion: Question = {
  id: 'neck-pain-connection',
  text: 'Je vaša bolesť sprevádzaná bolesťou krku?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-neck-pain',
      text: 'Áno',
      mechanisms: [],
      sinGroups: [],
      followUp: [
        {
          id: 'neck-movement-causes-pain',
          text: 'Spôsobuje pohyb vášho krku priamo bolesť hornej končatiny?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'yes-neck-movement',
              text: 'Áno',
              mechanisms: [],
              sinGroups: [],
              followUp: [
                {
                  id: 'pain-spread-location',
                  text: 'Kam sa bolesť šíri?',
                  description: '',
                  type: 'multiple',
                  options: [
                    {
                      id: 'shoulder',
                      text: 'Rameno',
                      mechanisms: [],
                      sinGroups: []
                    },
                    {
                      id: 'elbow',
                      text: 'Lakeť',
                      mechanisms: [],
                      sinGroups: []
                    },
                    {
                      id: 'forearm',
                      text: 'Predlaktie',
                      mechanisms: [],
                      sinGroups: []
                    },
                    {
                      id: 'hand',
                      text: 'Ruka',
                      mechanisms: [],
                      sinGroups: []
                    },
                    {
                      id: 'fingers',
                      text: 'Prsty',
                      mechanisms: [],
                      sinGroups: []
                    }
                  ]
                }
              ]
            },
            {
              id: 'no-neck-movement',
              text: 'Nie',
              mechanisms: [],
              sinGroups: []
            }
          ]
        }
      ]
    },
    {
      id: 'no-neck-pain',
      text: 'Nie',
      mechanisms: [],
      sinGroups: []
    }
  ]
};
