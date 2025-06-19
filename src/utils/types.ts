
export interface UserInfo {
  firstName: string;
  age: number;
  gender: 'muž' | 'žena';
  painArea: 'neck' | 'middle back' | 'lower back';
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  forMechanism?: PainMechanism;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  type: 'radio' | 'multiple' | 'scale';
  showIf?: {
    painArea?: 'neck' | 'middle back' | 'lower back';
  };
  options?: QuestionOption[];
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
}

export interface QuestionOption {
  id: string;
  text: string;
  followUp?: Question[];
  differentials?: Differential[];
  mechanisms?: PainMechanism[];
  sinGroups?: SINGroup[];
}

export type PainMechanism = 'nociceptive' | 'neuropathic' | 'central' | 'none';
export type SINGroup = 'low SIN' | 'mid SIN' | 'high SIN' | 'none';
export type Differential =
  | 'facet joint syndrome'
  | 'SIJ syndrome'
  | 'muscle pain'
  | 'disc herniation'
  | 'spinal stenosis'
  | 'spondylolisthesis'
  | 'nerve compression'
  | 'peripheral neuropathy'
  | 'central sensitization'
  | 'fibromyalgia'
  | 'red flag'
  | 'costovertebral joint syndrome'
  | 'dorsal spondylolisthesis'
  | 'ventral spondylolisthesis'
  | 'radicular pain'
  | 'radiculopathy'
  | 'central sensitisation'
  | 'central sensitisation - allodynia'
  | 'central sensitisation - sensory hypersensitivity'
  | 'central sensitisation - cognitive symptoms'
  | 'none';

export interface ScoreTracker {
  nociceptive: number;
  neuropathic: number;
  central: number;
  lowSIN: number;
  midSIN: number;
  highSIN: number;
  differentials: Record<Differential, number>;
}

export interface AssessmentResults {
  userInfo: UserInfo;
  primaryMechanism: PainMechanism;
  sinGroup: SINGroup;
  primaryDifferential: Differential;
  scores: ScoreTracker;
  timestamp: string;
}
