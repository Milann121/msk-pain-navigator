
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
    adviceImageUrl: "/lovable-uploads/133826c0-fff0-4a91-91fe-4e633b6f23ae.png",
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
    adviceImageUrl: "/lovable-uploads/16d5e659-d4bc-4980-b090-fc7512bd2ace.png",
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
    adviceImageUrl: "/lovable-uploads/2b0f850b-8374-47d7-bc43-d873e567633c.png",
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
    adviceImageUrl: "/lovable-uploads/603332be-d99c-428d-af60-0062a83a4b91.png",
    adviceLink:"",
    bodyParts: ['lower-back','middle-back'],
    mechanisms: ['nociceptive', 'neuropathic'],
    differentials: ['disc-herniation', 'facet-joint-syndrome', 'SIJ-syndrome']
  },
];
