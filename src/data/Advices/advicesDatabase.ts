
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
  bodyParts: Array<'neck' | 'middle-back' | 'lower-back' | 'upper limb' | 'shoulder'>;
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
    adviceImageUrl: "public/lovable-uploads/adviceImages/advice1.png",
    adviceLink: "",
    bodyParts: ['neck', 'middle-back', 'lower-back'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation','sciatica']
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
    adviceImageUrl: "public/lovable-uploads/adviceImages/advice3.png",
    adviceLink:"",
    bodyParts: ['neck', "middle-back"],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation', 'facet-joint-syndrome', 'muscle-pain', 'cervical-radiculopathy']
  },
  // Advice 4 - Lumbar Pad
  {
    adviceTitle: "lumbarPad",
    adviceId: 4,
    adviceSubtitle:"",
    advicePriority: "low",
    adviceRule: "lumbarPadBreaks",
    adviceDescription: "lumbarPadDescription",
    adviceImageUrl: "public/lovable-uploads/adviceImages/advice4.png",
    adviceLink:"",
    bodyParts: ['lower-back','middle-back'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation', 'facet-joint-syndrome', 'SIJ-syndrome']
  },
  // Advice 5 - Object lifting
  {
    adviceTitle: "objectLifting",
    adviceId: 5,
    adviceSubtitle:"",
    advicePriority: "medium",
    adviceRule: "objectLiftingRule",
    adviceDescription: "objectLiftingDescription",
    adviceImageUrl: "",
    adviceLink:"",
    bodyParts: ['lower-back'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation', 'facet-joint-syndrome', 'SIJ-syndrome', 'sciatica']
  },
  // Advice 6 - Superman sleep position
  {
    adviceTitle: "supermanSleep",
    adviceId: 6,
    adviceSubtitle:"",
    advicePriority: "high",
    adviceRule: "supermanSleepRule",
    adviceDescription: "supermanSleepDescription",
    adviceImageUrl: "",
    adviceLink:"",
    bodyParts: ['upper limb','shoulder'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['frozen-shoulder', 'subacromional-impingement-syndrome', 'slap-tear', 'stiff-shoulder', 'labral-leason','biceps-tear-long-head','unstable-shoulder', 'shoulder-dislocation']
  },
];
