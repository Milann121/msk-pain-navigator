
// Common interface for all advices
export interface Advice {
  adviceId: number;
  adviceTitle: string; // translation key
  adviceSubtitle: string; // translation key
  advicePriority: string; // translation key
  adviceRule: string; // translation key
  adviceDescription: string; // translation key
  adviceImageUrl: string;
  adviceLink: string;
  // New matching criteria
  bodyParts: Array<'neck' | 'middle-back' | 'lower-back' | 'upper limb'>;
  mechanisms: Array<'nociceptive' | 'neuropathic' | 'central'>;
  differentials?: Array<string>; // Optional for more specific targeting
}

// Advice data sorted by ID for easy reference
export const advices: Advice[] = [
  // Advice 1 - Regular Position Change
  {
    adviceId: 1,
    adviceTitle: "regularPositionChange",
    adviceSubtitle: "",
    advicePriority: "high",
    adviceRule: "every45to60min",
    adviceDescription: "regularPositionChangeDescription",
    adviceImageUrl: "",
    adviceLink: "",
    bodyParts: ['neck', 'middle-back', 'lower-back'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation']
  },
  // Advice 2 - Gradual Load Increase
  {
    adviceId: 2,
    adviceTitle: "gradualLoadIncrease",
    adviceSubtitle: "forNociceptivePain",
    advicePriority: "medium",
    adviceRule: "increaseIntensityWeekly",
    adviceDescription: "gradualLoadIncreaseDescription",
    adviceImageUrl: "",
    adviceLink: "",
    bodyParts: ['lower-back', 'middle-back', 'neck'],
    mechanisms: ['nociceptive'],
    differentials:[''],
  },
];
