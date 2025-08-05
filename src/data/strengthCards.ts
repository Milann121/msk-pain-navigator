import { StrengthCard } from "@/types/strength";

export const getStrengthCards = (t: (key: string) => string): StrengthCard[] => [
  {
    id: "push-ups",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop",
    title: t('strength.cards.push_ups.title'),
    description: t('strength.cards.push_ups.description'),
    description2: t('strength.cards.push_ups.description2'),
    time: t('strength.cards.push_ups.time'),
    strength_group: ["home"]
  },
  {
    id: "squats", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
    title: t('strength.cards.squats.title'),
    description: t('strength.cards.squats.description'),
    description2: t('strength.cards.squats.description2'),
    time: t('strength.cards.squats.time'),
    strength_group: ["home", "gym"]
  },
  {
    id: "deadlifts",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=500&fit=crop",
    title: t('strength.cards.deadlifts.title'),
    description: t('strength.cards.deadlifts.description'),
    description2: t('strength.cards.deadlifts.description2'),
    time: t('strength.cards.deadlifts.time'),
    strength_group: ["gym"]
  },
  {
    id: "outdoor-calisthenics",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
    title: t('strength.cards.outdoor_calisthenics.title'),
    description: t('strength.cards.outdoor_calisthenics.description'),
    description2: t('strength.cards.outdoor_calisthenics.description2'),
    time: t('strength.cards.outdoor_calisthenics.time'),
    strength_group: ["outside"]
  },
  {
    id: "pull-ups",
    image: "https://images.unsplash.com/photo-1599058918533-8f0bab35cc4a?w=500&h=500&fit=crop",
    title: t('strength.cards.pull_ups.title'),
    description: t('strength.cards.pull_ups.description'),
    description2: t('strength.cards.pull_ups.description2'),
    time: t('strength.cards.pull_ups.time'),
    strength_group: ["home", "outside"]
  },
  {
    id: "bodyweight-circuit",
    image: "https://images.unsplash.com/photo-1591019479261-d17271ad22d8?w=500&h=500&fit=crop",
    title: t('strength.cards.bodyweight_circuit.title'),
    description: t('strength.cards.bodyweight_circuit.description'),
    description2: t('strength.cards.bodyweight_circuit.description2'),
    time: t('strength.cards.bodyweight_circuit.time'),
    strength_group: ["home", "outside"]
  },
  {
    id: "full-body-strength",
    image: "/lovable-uploads/38240b28-cfec-4471-866b-e9508ac0e092.png",
    title: t('strength.cards.full_body_strength.title'),
    description: t('strength.cards.full_body_strength.description'),
    description2: t('strength.cards.full_body_strength.description2'),
    time: t('strength.cards.full_body_strength.time'),
    strength_group: ["home"]
  }
];