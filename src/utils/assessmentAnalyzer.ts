import { 
  PainMechanism, 
  SINGroup, 
  Differential, 
  ScoreTracker, 
  AssessmentResults, 
  UserInfo 
} from './types';
import { questionnaires } from '@/data/questionnaires';

// Initialize score tracker
export const initializeScoreTracker = (): ScoreTracker => ({
  nociceptive: 0,
  neuropathic: 0,
  central: 0,
  lowSIN: 0,
  midSIN: 0,
  highSIN: 0,
  differentials: {
    'disc herniation': 0,
    'facet joint syndrome': 0,
    'SIJ syndrome': 0,
    'muscle pain': 0,
    'red flag': 0,
    'ventral spondylolisthesis': 0,
    'dorsal spondylolisthesis': 0,
    'costovertebral joint syndrome': 0,
    'Radicular Pain': 0,
    'Radiculopathy': 0,
    'Central Sensitisation': 0,
    'Central Sensitisation - Allodynia': 0,
    'Central Sensitisation - Sensory Hypersensitivity': 0,
    'Central Sensitisation - Cognitive Symptoms': 0,
    'spinal stenosis': 0,
    'spondylolisthesis': 0,
    'nerve compression': 0,
    'peripheral neuropathy': 0,
    'central sensitization': 0,
    'fibromyalgia': 0,
    'none': 0
  }
});

// Process general questionnaire answers
export const processGeneralQuestionnaire = (
  answers: Record<string, any>
): { scores: ScoreTracker; primaryMechanism: PainMechanism; sinGroup: SINGroup } => {
  const scores = initializeScoreTracker();
  
  // Process pain intensity for SIN scoring
  const painIntensity = answers['pain-intensity'] || answers['pain-intensity-upper-limb'] || 0;
  if (painIntensity >= 0 && painIntensity <= 4) {
    scores.lowSIN += 1;
  } else if (painIntensity >= 5 && painIntensity <= 7) {
    scores.midSIN += 1;
  } else if (painIntensity >= 8 && painIntensity <= 10) {
    scores.highSIN += 1;
  }
  
  // Process the general questionnaire
  Object.entries(answers).forEach(([questionId, answer]) => {
    // Skip pain intensity as it was already processed
    if (questionId === 'pain-intensity' || questionId === 'pain-intensity-upper-limb') return;
    
    const question = questionnaires.general.questions.find(q => q.id === questionId);
    if (!question) return;
    
    if (Array.isArray(answer)) {
      // Handle multiple choice answers
      answer.forEach(optionId => {
        const option = question.options?.find(opt => opt.id === optionId);
        if (option) {
          // Add scores for pain mechanisms
          option.mechanisms?.forEach(mechanism => {
            if (mechanism !== 'none') {
              scores[mechanism] += 1;
            }
          });
          
          // Add scores for SIN groups
          option.sinGroups?.forEach(sin => {
            if (sin === 'low SIN') scores.lowSIN += 1;
            else if (sin === 'mid SIN') scores.midSIN += 1;
            else if (sin === 'high SIN') scores.highSIN += 1;
          });
        }
      });
    } else {
      // Handle single choice answers
      const option = question.options?.find(opt => opt.id === answer);
      if (option) {
        // Add scores for pain mechanisms
        option.mechanisms?.forEach(mechanism => {
          if (mechanism !== 'none') {
            scores[mechanism] += 1;
          }
        });
        
        // Add scores for SIN groups
        option.sinGroups?.forEach(sin => {
          if (sin === 'low SIN') scores.lowSIN += 1;
          else if (sin === 'mid SIN') scores.midSIN += 1;
          else if (sin === 'high SIN') scores.highSIN += 1;
        });
      }
    }
  });
  
  // Determine primary pain mechanism
  let primaryMechanism: PainMechanism = 'none';
  let maxMechanismScore = 0;
  
  // Check for red-flag first as it takes priority
  if (scores['red-flag'] && scores['red-flag'] > 0) {
    primaryMechanism = 'red-flag';
  } else {
    if (scores.nociceptive > maxMechanismScore) {
      maxMechanismScore = scores.nociceptive;
      primaryMechanism = 'nociceptive';
    }
    
    if (scores.neuropathic > maxMechanismScore) {
      maxMechanismScore = scores.neuropathic;
      primaryMechanism = 'neuropathic';
    }
    
    if (scores.central > maxMechanismScore) {
      maxMechanismScore = scores.central;
      primaryMechanism = 'central';
    }
  }
  
  // Determine SIN group
  let sinGroup: SINGroup = 'none';
  let maxSINScore = 0;
  
  if (scores.lowSIN > maxSINScore) {
    maxSINScore = scores.lowSIN;
    sinGroup = 'low SIN';
  }
  
  if (scores.midSIN > maxSINScore) {
    maxSINScore = scores.midSIN;
    sinGroup = 'mid SIN';
  }
  
  if (scores.highSIN > maxSINScore) {
    maxSINScore = scores.highSIN;
    sinGroup = 'high SIN';
  }
  
  return { scores, primaryMechanism, sinGroup };
};

// Process follow-up questionnaire answers
export const processFollowUpQuestionnaire = (
  questionnaire: 'nociceptive' | 'neuropathic' | 'central',
  answers: Record<string, any>,
  existingScores: ScoreTracker
): { scores: ScoreTracker; primaryDifferential: Differential } => {
  const scores = { ...existingScores };
  
  // Process the follow-up questionnaire answers
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questionnaires[questionnaire].questions.find(q => q.id === questionId);
    if (!question) return;
    
    if (Array.isArray(answer)) {
      // Handle multiple choice answers
      answer.forEach(optionId => {
        const option = question.options?.find(opt => opt.id === optionId);
        if (option) {
          // Add scores for differentials
          option.differentials?.forEach(differential => {
            if (differential !== 'none' && scores.differentials[differential] !== undefined) {
              scores.differentials[differential] += 1;
            }
          });
        }
      });
    } else {
      // Handle single choice answers
      const option = question.options?.find(opt => opt.id === answer);
      if (option) {
        // Add scores for differentials
        option.differentials?.forEach(differential => {
          if (differential !== 'none' && scores.differentials[differential] !== undefined) {
            scores.differentials[differential] += 1;
          }
        });
      }
    }
  });
  
  // Determine primary differential
  let primaryDifferential: Differential = 'none';
  let maxDifferentialScore = 0;
  
  Object.entries(scores.differentials).forEach(([differential, score]) => {
    if (typeof score === 'number' && score > maxDifferentialScore && differential !== 'none') {
      maxDifferentialScore = score;
      primaryDifferential = differential as Differential;
    }
  });
  
  return { scores, primaryDifferential };
};

// Create the final assessment results
export const createAssessmentResults = (
  userInfo: UserInfo,
  primaryMechanism: PainMechanism,
  sinGroup: SINGroup,
  primaryDifferential: Differential,
  scores: ScoreTracker
): AssessmentResults => {
  return {
    userInfo,
    mechanism: primaryMechanism,
    primaryMechanism,
    sinGroup,
    differential: primaryDifferential,
    primaryDifferential,
    scores,
    timestamp: new Date().toISOString()
  };
};
