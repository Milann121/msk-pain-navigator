
// Types for the MSK Pain Navigator application

// User Information type
export interface UserInfo {
  firstName: string;
  age: number;
  painArea: 'neck' | 'middle back' | 'lower back';
  gender: 'Muž' | 'Žena';
}

// Pain Mechanism types
export type PainMechanism = 'nociceptive' | 'neuropathic' | 'central' | 'none';

// SIN (Severity, Irritability, Nature) Group types
export type SINGroup = 'low SIN' | 'mid SIN' | 'high SIN' | 'none';

// Differential types for specific conditions
export type Differential = 
  | 'disc herniation'
  | 'facet joint syndrome'
  | 'SIJ syndrome'
  | 'muscle pain'
  | 'red flag'
  | 'ventral spondylolisthesis'
  | 'dorsal spondylolisthesis'
  | 'costovertebral joint syndrome'
  | 'Radicular Pain'
  | 'Radiculopathy'
  | 'Central Sensitisation'
  | 'Central Sensitisation - Allodynia'
  | 'Central Sensitisation - Sensory Hypersensitivity'
  | 'Central Sensitisation - Cognitive Symptoms'
  | 'none';

// Score tracking for mechanisms and SIN
export interface ScoreTracker {
  nociceptive: number;
  neuropathic: number;
  central: number;
  lowSIN: number;
  midSIN: number;
  highSIN: number;
  differentials: Record<Differential, number>;
}

// Final Results
export interface AssessmentResults {
  userInfo: UserInfo;
  primaryMechanism: PainMechanism;
  sinGroup: SINGroup;
  primaryDifferential: Differential;
  scores: ScoreTracker;
  timestamp: string;
}

// Question Types
export interface Question {
  id: string;
  text: string;
  description?: string; // Added optional description field
  type: 'single' | 'multiple' | 'scale' | 'radio';
  options?: Array<{
    id: string;
    text: string;
    mechanisms?: PainMechanism[];
    sinGroups?: SINGroup[];
    differentials?: Differential[];
    followUp?: Question[];
  }>;
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

// Questionnaire Types
export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  forMechanism?: PainMechanism;
}
