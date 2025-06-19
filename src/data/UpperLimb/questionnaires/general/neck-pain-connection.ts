
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
      mechanisms: ["nociceptive", "neuropathic"],
      redirectTo: 'upper-limb-neck-questions',
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
              mechanisms: ["nociceptive", "neuropathic"],
              redirectTo: 'upper-limb-neck-questions',
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
                      mechanisms: ["nociceptive", "neuropathic"],                
                    },
                    {
                      id: 'elbow',
                      text: 'Lakeť',
                      mechanisms: ["nociceptive","neuropathic"],                
                    },
                    {
                      id: 'forearm',
                      text: 'Predlaktie',
                      mechanisms: ["neuropathic"],                      
                    },
                    {
                      id: 'hand',
                      text: 'Ruka',
                      mechanisms: ["neuropathic"],                      
                    },
                    {
                      id: 'fingers',
                      text: 'Prsty',
                      mechanisms: ["neuropathic"],                      
                    }
                  ]
                }
              ]
            },
            {
              id: 'no-neck-movement',
              text: 'Nie',
              mechanisms: ["nociceptive"],              
            }
          ]
        }
      ]
    },
    {
      id: 'no-neck-pain',
      text: 'Nie',
      mechanisms: ["nociceptive"],      
    }
  ]
};
