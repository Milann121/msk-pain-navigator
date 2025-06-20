import { 
  UserInfo, 
  PainMechanism, 
  SINGroup, 
  Differential, 
  Questionnaire, 
  ScoreTracker,
  AssessmentResults
} from '@/utils/types';

export const processGeneralQuestionnaire = (answers: Record<string, any>): {
  scores: ScoreTracker;
  primaryMechanism: PainMechanism;
  sinGroup: SINGroup;
} => {
  const scores: ScoreTracker = {
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
      'frozen-shoulder': 0,
      'slap-tear': 0,
      'subacromional-impingement-syndrome': 0,
      'stiff-shoulder': 0,
      'labral-leason': 0,
      'shoulder-bursa': 0,
      'rotator-cuff-tear': 0,
      'rotator-cuff-tendinopathy': 0,
      'biceps-tendinopathy': 0,
      'biceps-tear-long-head': 0,
      'shoulder-dislocation': 0,
      'unstable-shoulder': 0,
      'cervical-radiculopathy': 0,
      'radicular-pain': 0,
      'radiculopathy': 0,
    }
  };
  let primaryMechanism: PainMechanism = 'none';
  let sinGroup: SINGroup = 'none';

  // Nociceptive questions
  if (answers['pain-description'] === 'sharp' || answers['pain-description'] === 'throbbing') {
    scores.nociceptive += 2;
  }

  // Neuropathic questions
  if (answers['pain-description'] === 'burning' || answers['pain-description'] === 'shooting') {
    scores.neuropathic += 2;
  }

  // Central sensitization questions
  if (answers['pain-description'] === 'diffuse' || answers['pain-description'] === 'unpredictable') {
    scores.central += 2;
  }

  // SIN group questions
  if (answers['pain-intensity'] >= 7 || answers['pain-intensity-upper-limb'] >= 7) {
    scores.highSIN += 2;
  }

  if (answers['pain-movement'] === 'yes') {
    scores.highSIN += 1;
  }

  if (answers['activity-start'] === 'yes') {
    scores.lowSIN += 2;
  }

  if (answers['variable-impact'] === 'yes') {
    scores.midSIN += 2;
  }

  // Determine primary mechanism
  if (scores.nociceptive >= scores.neuropathic && scores.nociceptive >= scores.central) {
    primaryMechanism = 'nociceptive';
  } else if (scores.neuropathic >= scores.nociceptive && scores.neuropathic >= scores.central) {
    primaryMechanism = 'neuropathic';
  } else {
    primaryMechanism = 'central';
  }

  // Determine SIN group
  if (scores.highSIN >= scores.midSIN && scores.highSIN >= scores.lowSIN) {
    sinGroup = 'high SIN';
  } else if (scores.midSIN >= scores.highSIN && scores.midSIN >= scores.lowSIN) {
    sinGroup = 'mid SIN';
  } else {
    sinGroup = 'low SIN';
  }

  return { scores, primaryMechanism, sinGroup };
};

export const createAssessmentResults = (
  userInfo: UserInfo,
  primaryMechanism: PainMechanism,
  sinGroup: SINGroup,
  primaryDifferential: Differential,
  scores: ScoreTracker
): AssessmentResults => {
  return {
    userInfo: userInfo,
    mechanism: primaryMechanism,
    primaryMechanism: primaryMechanism,
    sinGroup: sinGroup,
    differential: primaryDifferential,
    primaryDifferential: primaryDifferential,
    scores: scores,
    timestamp: new Date().toISOString(),
  };
};

export const processFollowUpQuestionnaire = (
  primaryMechanism: 'nociceptive' | 'neuropathic' | 'central',
  answers: Record<string, any>,
  scores: ScoreTracker
): { scores: ScoreTracker; primaryDifferential: Differential } => {
  const updatedScores = { ...scores };
  let primaryDifferential: Differential = 'none';

  console.log('Processing follow-up questionnaire:', { primaryMechanism, answers });

  if (primaryMechanism === 'nociceptive') {
    // Handle shoulder nociceptive questionnaires
    if (answers['pain-location-shoulder']) {
      const painLocation = answers['pain-location-shoulder'];
      if (painLocation === 'front-shoulder' || painLocation === 'side-shoulder') {
        primaryDifferential = 'subacromional-impingement-syndrome';
      } else if (painLocation === 'deep-shoulder') {
        primaryDifferential = 'frozen-shoulder';
      }
    }
    
    // Additional shoulder differential logic
    if (answers['clicking-locking']) {
      const clickingLocking = answers['clicking-locking'];
      if (clickingLocking === 'yes-catching') {
        primaryDifferential = 'labral-leason';
      } else if (clickingLocking === 'yes-clicking') {
        primaryDifferential = 'rotator-cuff-tear';
      }
    }
    
    if (answers['shoulder-dislocation'] === 'yes-multiple') {
      primaryDifferential = 'unstable-shoulder';
    }
    
    // Night pain and movement patterns for frozen shoulder
    if (answers['night-pain'] === 'yes-severe' && answers['overhead-activities'] === 'impossible') {
      primaryDifferential = 'frozen-shoulder';
    }
    
    // Default shoulder differential if none specific found but we're in shoulder context
    if (primaryDifferential === 'none' && (
      answers['pain-location-shoulder'] || 
      answers['clicking-locking'] || 
      answers['shoulder-dislocation'] || 
      answers['night-pain'] || 
      answers['overhead-activities']
    )) {
      primaryDifferential = 'rotator-cuff-tendinopathy';
    }

    // Handle other nociceptive cases (existing logic)
    if (answers['worse-bending-forward'] === 'yes') {
      updatedScores.differentials['disc herniation'] += 2;
    }
    
    if (answers['worse-extending-back'] === 'yes') {
      updatedScores.differentials['facet joint syndrome'] += 2;
    }
    
    if (answers['worse-sitting'] === 'yes') {
      updatedScores.differentials['disc herniation'] += 1;
    }
    
    if (answers['morning-stiffness'] === 'yes') {
      updatedScores.differentials['facet joint syndrome'] += 1;
    }

    // Determine primary differential for non-shoulder cases if not already set
    if (primaryDifferential === 'none') {
      const maxScore = Math.max(
        updatedScores.differentials['disc herniation'] || 0,
        updatedScores.differentials['facet joint syndrome'] || 0,
        updatedScores.differentials['muscle pain'] || 0
      );
      
      if (updatedScores.differentials['disc herniation'] === maxScore) {
        primaryDifferential = 'disc herniation';
      } else if (updatedScores.differentials['facet joint syndrome'] === maxScore) {
        primaryDifferential = 'facet joint syndrome';
      } else {
        primaryDifferential = 'muscle pain';
      }
    }
  } else if (primaryMechanism === 'neuropathic') {
    // Handle neuropathic cases - mostly neck/cervical
    if (answers['abnormal-sensations'] === 'yes-sensations') {
      primaryDifferential = 'radicular-pain';
    } else if (answers['abnormal-sensations'] === 'no-sensations') {
      primaryDifferential = 'radiculopathy';
    }
    
    // Additional neuropathic logic
    if (answers['numbness-reduced-sensation'] === 'yes-numbness' || 
        answers['muscle-weakness'] === 'yes-weakness' || 
        answers['lost-reflexes'] === 'yes-reflexes') {
      primaryDifferential = 'radiculopathy';
    }
    
    // Default to cervical radiculopathy for upper limb neuropathic cases
    if (primaryDifferential === 'none') {
      primaryDifferential = 'cervical-radiculopathy';
    }
  } else if (primaryMechanism === 'central') {
    // Handle central sensitization cases
    if (answers['sensitivity-light-touch'] === 'yes') {
      updatedScores.differentials['Central Sensitisation - Allodynia'] += 2;
      primaryDifferential = 'Central Sensitisation - Allodynia';
    }
    
    if (answers['sensitivity-temperature'] === 'yes') {
      updatedScores.differentials['Central Sensitisation - Sensory Hypersensitivity'] += 2;
      primaryDifferential = 'Central Sensitisation - Sensory Hypersensitivity';
    }
    
    if (answers['cognitive-symptoms'] === 'yes') {
      updatedScores.differentials['Central Sensitisation - Cognitive Symptoms'] += 1;
    }
    
    if (primaryDifferential === 'none') {
      primaryDifferential = 'central sensitization';
    }
  }

  console.log('Final differential determined:', primaryDifferential);
  return { scores: updatedScores, primaryDifferential };
};
