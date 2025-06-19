
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
              followUp: [
                {
                  id: 'pain-spread-location',
                  text: 'Kam sa bolesť šíri?',
                  description: '',
                  type: 'multiple',
                  options: [
                    {
                      id: 'shoulder',
                      text: 'Rameno'
                    },
                    {
                      id: 'elbow',
                      text: 'Lakeť'
                    },
                    {
                      id: 'forearm',
                      text: 'Predlaktie'
                    },
                    {
                      id: 'hand',
                      text: 'Ruka'
                    },
                    {
                      id: 'fingers',
                      text: 'Prsty'
                    }
                  ]
                }
              ]
            },
            {
              id: 'no-neck-movement',
              text: 'Nie'
            }
          ]
        }
      ]
    },
    {
      id: 'no-neck-pain',
      text: 'Nie'
    }
  ]
};
