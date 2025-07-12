export interface StrengthCard {
  id: string;
  image: string;
  title: string;
  description: string;
  description2: string;
  time: string;
  strength_group: string[];
}

export interface FilterButton {
  key: string;
  label: string;
}