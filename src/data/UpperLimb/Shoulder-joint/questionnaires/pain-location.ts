
import { Question } from '@/utils/types';

export const painLocationQuestion: Question = {
  id: 'shoulder-pain-location',
  text: 'Kde sa nachádza vaša bolesť ramena predovšetkým?',
  description: '',
  type: 'multiple',
  options: [
    {
      id: 'lateral-upper-arm',
      text: 'Bočná strana hornej časti paže',      
      differentials: ["frozen-shoulder", "stiff-shoulder"]
    },
    {
      id: 'deep-shoulder-joint',
      text: 'Hlboko vo vnútri ramenného kĺbu',
      differentials: ["frozens-shoulder","subacromional-impingement-syndrome"]
    },
    {
      id: 'front-shoulder',
      text: 'Predná časť ramena',
      differentials: ["slap-tear","labral-lesion" ]
    },
    {
      id: 'below-behind-bone',
      text: 'Pod a trochu za kostnatou štruktúrou nad ramenom',
      differentials: ["shoulder-bursa","subacromional-impingement-syndrome", "labral-lesion"]
    },
    {
      id: 'from-shoulderblade',
      text: 'Od lopatky až dopredu',
      differentials: ["fozen-shoulder", "stiff-shoulder", "rotato-cuff-tear", "rotator-cuff-tendinopathy"]
    },
    {
      id: 'entire-shoulder',
      text: 'Celé rameno, ťažko lokalizovateľné',
      differentials: ["fozen-shoulder", "stiff-shoulder"]
    }
  ]
};
