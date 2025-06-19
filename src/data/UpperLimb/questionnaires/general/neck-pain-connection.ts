
import { Question } from '@/utils/types';

export const neckPainConnectionQuestion: Question = {
  id: 'neck-pain-connection',
  text: 'Is your pain accompanied with a neck pain?',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-neck-pain',
      text: 'Yes',
      followUp: [
        {
          id: 'neck-movement-causes-pain',
          text: 'Does the movement of your neck directly cause a upper limb pain?',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'yes-neck-movement',
              text: 'Yes',
              followUp: [
                {
                  id: 'pain-spread-location',
                  text: 'Where does the pain spread?',
                  description: '',
                  type: 'multiple',
                  options: [
                    {
                      id: 'shoulder',
                      text: 'Shoulder'
                    },
                    {
                      id: 'elbow',
                      text: 'Elbow'
                    },
                    {
                      id: 'forearm',
                      text: 'Forearm'
                    },
                    {
                      id: 'hand',
                      text: 'Hand'
                    },
                    {
                      id: 'fingers',
                      text: 'Fingers'
                    }
                  ]
                }
              ]
            },
            {
              id: 'no-neck-movement',
              text: 'No'
            }
          ]
        }
      ]
    },
    {
      id: 'no-neck-pain',
      text: 'No'
    }
  ]
};
