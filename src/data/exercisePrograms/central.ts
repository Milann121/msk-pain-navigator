import { Program } from "@/types/exerciseProgram";

export const centralExercises: Record<string, Program[]> = {
  // Central Sensitisation - NECK
  'central-Central Sensitisation-neck': [
    {
      title: 'Všeobecné cvičenie na zníženie bolestí krčnej chrbtice',
      description: '',
      videos: [
        { id: 'neck-1', importance: 1 },
        { id: 'neck-2', importance: 2 },
        { id: 'neck-3', importance: 3 }
      ]
    }
  ],
  // Central Sensitisation - MIDDLE BACK
  'central-Central Sensitisation-middle back': [
    {
      title: 'Všeobecné cvičenie pre zníženie bolesti v hrudnej chrbtici',
      description: '',
      videos: [
        { id: 'middle-back-1', importance: 1 },
        { id: 'middle-back-2', importance: 2 },
        { id: 'middle-back-3', importance: 3 },
        { id: 'middle-back-4', importance: 2 }
      ]
    }
  ],
  // Central Sensitisation - LOWER BACK
  'central-Central Sensitisation-lower back': [
    {
      title: 'Všeobecné cvičenie pre zníženie bolesti v driekovej chrbtici',
      description: '',
      videos: [
        { id: 'lower-back-1', importance: 1 },
        { id: 'lower-back-2', importance: 2 },
        { id: 'lower-back-3', importance: 3 }
      ]
    },
  ],
  // Default exercises
  // NECK
  'central-default-neck': [
    {
      title: 'Všeobecné cvičenie na zníženie bolestí krčnej chrbtice',
      description: '',
      videos: [
        { id: 'neck-4', importance: 1 },
        { id: 'neck-5', importance: 2 },
        { id: 'neck-6', importance: 3 }
      ]
    }
  ],
  //MIDDLE BACK
  'central-default-middle back': [
    {
      title: '0-2 týždeň',
      description: 'Jemné rotačné pohyby pre zlepšenie mobility v hrudnej oblasti a redukciu bolesti.',
      videos: [
        { id: 'middle-back-5', importance: 2 },
        { id: 'middle-back-6', importance: 1 },
      ],
    },
    {
      title: '3-5 týždeň',
      description: 'Jemné rotačné pohyby pre zlepšenie mobility v hrudnej oblasti a redukciu bolesti.',
      videos: [
        { id: 'middle-back-7', importance: 2 },
        { id: 'middle-back-8', importance: 3 },
        { id: 'middle-back-9', importance: 1 }
      ]
    }
  ],
  //LUMBAR SPINE
  'central-default-lower back': [
    {
      title: 'Všeobecné cvičenie pre zníženie bolesti v driekovej chrbtici',
      description: '',
      videos: [
        { id: 'lower-back-4', importance: 1 },
        { id: 'lower-back-5', importance: 2 },
        { id: 'lower-back-6', importance: 3 }
      ]
    },
  ],
}
