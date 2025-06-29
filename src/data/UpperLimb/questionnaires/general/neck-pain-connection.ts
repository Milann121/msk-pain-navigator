
import { Question } from '@/utils/types';

export const neckPainConnectionQuestion: Question = {
  id: 'neck-pain-connection',
  text: 'questionnaire.upperLimbGeneral.questions.neckPainConnection',
  description: '',
  type: 'radio',
  options: [
    {
      id: 'yes-neck-pain',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
      mechanisms: ["nociceptive", "neuropathic"],
      redirectTo: 'upper-limb-neck-questions',
      followUp: [
        {
          id: 'neck-movement-causes-pain',
          text: 'questionnaire.upperLimbGeneral.questions.neckMovementCausesPain',
          description: '',
          type: 'radio',
          options: [
            {
              id: 'yes-neck-movement',
              text: 'questionnaire.upperLimbGeneral.options.yesNo.yes',
              mechanisms: ["nociceptive", "neuropathic"],
              redirectTo: 'upper-limb-neck-questions',
              followUp: [
                {
                  id: 'pain-spread-location',
                  text: 'questionnaire.upperLimbGeneral.questions.painSpreadLocation',
                  description: '',
                  type: 'multiple',
                  options: [
                    {
                      id: 'shoulder',
                      text: 'questionnaire.upperLimbGeneral.options.spreadLocation.shoulder',
                      mechanisms: ["nociceptive", "neuropathic"],                
                    },
                    {
                      id: 'elbow',
                      text: 'questionnaire.upperLimbGeneral.options.spreadLocation.elbow',
                      mechanisms: ["nociceptive","neuropathic"],                
                    },
                    {
                      id: 'forearm',
                      text: 'questionnaire.upperLimbGeneral.options.spreadLocation.forearm',
                      mechanisms: ["neuropathic"],                      
                    },
                    {
                      id: 'hand',
                      text: 'questionnaire.upperLimbGeneral.options.spreadLocation.hand',
                      mechanisms: ["neuropathic"],                      
                    },
                    {
                      id: 'fingers',
                      text: 'questionnaire.upperLimbGeneral.options.spreadLocation.fingers',
                      mechanisms: ["neuropathic"],                      
                    }
                  ]
                }
              ]
            },
            {
              id: 'no-neck-movement',
              text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
              mechanisms: ["nociceptive"],              
            }
          ]
        }
      ]
    },
    {
      id: 'no-neck-pain',
      text: 'questionnaire.upperLimbGeneral.options.yesNo.no',
      mechanisms: ["nociceptive"],      
    }
  ]
};
