import { StrengthCard } from "@/types/strength";

export const getStrengthCards = (t: (key: string) => string): StrengthCard[] => [
  {
    id: "full-body-strength",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
    title: t('strength.cards.full_body_strength.title'),
    description: t('strength.cards.full_body_strength.description'),
    description2: t('strength.cards.full_body_strength.description2'),
    time: t('strength.cards.full_body_strength.time'),
    strength_group: ["home"]
  },
  {
    id: "upper-body-strength",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop",
    title: t('strength.cards.upper_body_strength.title'),
    description: t('strength.cards.upper_body_strength.description'),
    description2: t('strength.cards.upper_body_strength.description2'),
    time: t('strength.cards.upper_body_strength.time'),
    strength_group: ["home"]
  }
];