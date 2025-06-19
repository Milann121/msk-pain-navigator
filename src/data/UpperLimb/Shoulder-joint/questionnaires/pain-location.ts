
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
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'deep-shoulder-joint',
      text: 'Hlboko vo vnútri ramenného kĺbu',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'front-shoulder',
      text: 'Predná časť ramena',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'below-behind-bone',
      text: 'Pod a trochu za kostnatou štruktúrou nad ramenom',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    },
    {
      id: 'entire-shoulder',
      text: 'Celé rameno, ťažko lokalizovateľné',
      mechanisms: [],
      sinGroups: [],
      differentials: []
    }
  ]
};
