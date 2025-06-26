
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
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    // Matching criteria - applies to all body parts and mechanisms
    bodyParts: ['neck', 'middle-back', 'lower-back', 'upper limb'],
    mechanisms: ['nociceptive', 'neuropathic', 'central']
  },
  // Advice 2 - Gradual Load Increase
  {
    adviceId: 2,
    adviceTitle: "gradualLoadIncrease",
    adviceSubtitle: "forNociceptivePain",
    advicePriority: "medium",
    adviceRule: "increaseIntensityWeekly",
    adviceDescription: "gradualLoadIncreaseDescription",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['lower-back', 'middle-back', 'neck'],
    mechanisms: ['nociceptive']
  },
  // Advice 3 - Watch for Neural Symptoms
  {
    adviceId: 3,
    adviceTitle: "neuralSymptomsWarning",
    adviceSubtitle: "forNeuropathicPain",
    advicePriority: "high",
    adviceRule: "stopImmediatelyIfWorse",
    adviceDescription: "neuralSymptomsWarningDescription",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['lower-back', 'neck', 'upper limb'],
    mechanisms: ['neuropathic']
  },
  // Advice 4 - Respect Pain with Central Sensitization
  {
    adviceId: 4,
    adviceTitle: "respectPainCentral",
    adviceSubtitle: "forCentralPain",
    advicePriority: "high",
    adviceRule: "dontForceExercise",
    adviceDescription: "respectPainCentralDescription",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['neck', 'middle-back', 'lower-back', 'upper limb'],
    mechanisms: ['central']
  },
  // Advice 5 - Special Shoulder Care
  {
    adviceId: 5,
    adviceTitle: "shoulderSpecialCare",
    adviceSubtitle: "forShoulderProblems",
    advicePriority: "medium",
    adviceRule: "avoidPainfulPositions",
    adviceDescription: "shoulderSpecialCareDescription",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['upper limb'],
    mechanisms: ['nociceptive'],
    differentials: ['frozen-shoulder', 'rotator-cuff-tear', 'subacromional-impingement-syndrome']
  }
];
