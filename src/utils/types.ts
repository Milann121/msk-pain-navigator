
export type UserInfo = {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  job: 'sedentary' | 'physical' | 'mixed';
  painArea: 'neck' | 'middle back' | 'lower back' | 'upper limb';
  painSubArea?: string | string[];
  consentGiven: boolean;
};

export type PainMechanism = 
  | 'nociceptive' 
  | 'neuropathic' 
  | 'central' 
  | 'red-flag'
  | 'none';

export type SINGroup = 
  | 'low SIN' 
  | 'mid SIN' 
  | 'high SIN'
  | 'none';

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
  | 'spinal stenosis'
  | 'spondylolisthesis'
  | 'nerve compression'
  | 'peripheral neuropathy'
  | 'central sensitization'
  | 'fibromyalgia'
  | 'frozen-shoulder'
  | 'slap-tear'
  | 'subacromional-impingement-syndrome'
  | 'stiff-shoulder'
  | 'labral-leason'
  | 'shoulder-bursa'
  | 'rotator-cuff-tear'
  | 'rotator-cuff-tendinopathy'
  | 'biceps-tendinopathy'
  | 'biceps-tear-long-head'
  | 'shoulder-dislocation'
  | 'unstable-shoulder'
  | 'cervical-radiculopathy'
  | 'radicular-pain'
  | 'radiculopathy'
  | 'none';

export interface QuestionOption {
  id: string;
  text: string;
  mechanisms?: PainMechanism[];
  sinGroups?: SINGroup[];
  differentials?: Differential[];
  redirectTo?: string;
  followUp?: Question[];
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  type: 'radio' | 'multiple' | 'scale';
  options?: QuestionOption[];
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  showIf?: {
    painArea?: string;
  };
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface ScoreTracker {
  nociceptive: number;
  neuropathic: number;
  central: number;
  lowSIN: number;
  midSIN: number;
  highSIN: number;
  differentials: Record<string, number>;
}

export interface AssessmentResults {
  userInfo: UserInfo;
  mechanism: PainMechanism;
  primaryMechanism: PainMechanism;
  sinGroup: SINGroup;
  differential: Differential;
  primaryDifferential: Differential;
  scores: ScoreTracker;
  timestamp: string;
}
