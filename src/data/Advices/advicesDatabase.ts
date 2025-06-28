
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
  // Matching criteria
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
    adviceImageUrl: "/lovable-uploads/Icons/arrow-down-up.svg",
    adviceLink: "",
    bodyParts: ['neck', 'middle-back', 'lower-back'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation']
  },
  // Advice 2 - Gradual Load Increase
  {
    adviceTitle: "gradualLoadIncrease",
    adviceId: 2,
    adviceSubtitle: "",
    advicePriority: "medium",
    adviceRule: "increaseIntensityWeekly",
    adviceDescription: "gradualLoadIncreaseDescription",
    adviceImageUrl: "",
    adviceLink: "",
    bodyParts: ['lower-back'],
    mechanisms: ['nociceptive'],
    differentials:[''],
  },
  // Advice 3 - Sleep Positions
  {
    adviceTitle: "sleepPositionNeck",
    adviceId: 3,
    adviceSubtitle:"",
    advicePriority: "medium",
    adviceRule:"",
    adviceDescription: "sleepPositionNeckDescription",
    adviceImageUrl: "/lovable-uploads/Icons/bed-svgrepo-com.svg",
    adviceLink:"",
    bodyParts: ['neck', "middle-back"],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation', 'facet-joint-syndrome', 'muscle-pain']
  },
  // Advice 4 - Lumbar Pad
  {
    adviceTitle: "lumbarPad",
    adviceId: 4,
    adviceSubtitle:"",
    advicePriority: "low",
    adviceRule: "lumbarPadBreaks",
    adviceDescription: "lumbarPadDescription",
    adviceImageUrl: "",
    adviceLink:"",
    bodyParts: ['lower-back','middle-back'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation', 'facet-joint-syndrome', 'SIJ-syndrome']
  },
];
