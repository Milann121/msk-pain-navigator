
import {
  UserInfo,
  PainMechanism,
  SINGroup,
  Differential,
  Questionnaire,
  Question,
  ScoreTracker,
  AssessmentResults
} from '@/utils/types';
import { mapPainIntensityToSIN } from './scoreHelpers';

export const processGeneralQuestionnaire = (
  answers: Record<string, any>,
  questionnaire: Questionnaire
): {
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

  const addMechanisms = (mechs?: PainMechanism[]) => {
    if (!mechs) return;
    mechs.forEach(m => {
      if (m === 'nociceptive') scores.nociceptive += 1;
      if (m === 'neuropathic') scores.neuropathic += 1;
      if (m === 'central') scores.central += 1;
    });
  };

  const addSinGroups = (groups?: SINGroup[]) => {
    if (!groups) return;
    groups.forEach(g => {
      if (g === 'high SIN') scores.highSIN += 1;
      if (g === 'mid SIN') scores.midSIN += 1;
      if (g === 'low SIN') scores.lowSIN += 1;
    });
  };

  const processQuestion = (question: Question, answer: any) => {
    if (question.type === 'scale' && typeof answer === 'number') {
      addSinGroups([mapPainIntensityToSIN(answer)]);
      return;
    }

    if (!question.options) return;

    const handleOption = (optionId: string) => {
      const option = question.options!.find(o => o.id === optionId);
      if (!option) return;
      addMechanisms(option.mechanisms);
      addSinGroups(option.sinGroups);
      if (option.followUp) {
        option.followUp.forEach(fq => {
          const followAns = answers[fq.id];
          if (followAns !== undefined) {
            processQuestion(fq, followAns);
          }
        });
      }
    };

    if (Array.isArray(answer)) {
      answer.forEach(id => handleOption(id));
    } else {
      handleOption(answer);
    }
  };

  questionnaire.questions.forEach(q => {
    const ans = answers[q.id];
    if (ans !== undefined) {
      processQuestion(q, ans);
    }
  });

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

export const computeDifferentialCounts = (
  questionnaire: Questionnaire,
  answers: Record<string, any>
): Record<string, number> => {
  const counts: Record<string, number> = {};

  const processQuestion = (question: Question) => {
    const answer = answers[question.id];
    if (answer === undefined || !question.options) return;

    const handleOption = (optionId: string) => {
      const option = question.options!.find(o => o.id === optionId);
      if (!option) return;
      if (option.differentials && option.differentials.length) {
        option.differentials.forEach(d => {
          if (d !== 'none') {
            counts[d] = (counts[d] || 0) + 1;
          }
        });
      }
      if (option.followUp) {
        option.followUp.forEach(fq => processQuestion(fq));
      }
    };

    if (Array.isArray(answer)) {
      answer.forEach((id: string) => handleOption(id));
    } else if (typeof answer === 'string') {
      handleOption(answer);
    }
  };

  questionnaire.questions.forEach(q => processQuestion(q));
  return counts;
};

export const processFollowUpQuestionnaire = (
  primaryMechanism: 'nociceptive' | 'neuropathic' | 'central',
  answers: Record<string, any>,
  scores: ScoreTracker,
  questionnaire: Questionnaire
): { scores: ScoreTracker; primaryDifferential: Differential } => {
  const updatedScores = { ...scores };
  let primaryDifferential: Differential = 'none';

  console.log('Processing follow-up questionnaire:', { primaryMechanism, answers });

  // 1) Generic tally: count differentials from selected options in the provided questionnaire
  const diffCounts = computeDifferentialCounts(questionnaire, answers);

  // Update cumulative scores for transparency/history
  Object.entries(diffCounts).forEach(([diff, count]) => {
    updatedScores.differentials[diff] = (updatedScores.differentials[diff] || 0) + (count as number);
  });

  // Pick the most frequent differential from this questionnaire only
  let maxCount = 0;
  let topDifferential: Differential = 'none';
  Object.entries(diffCounts).forEach(([diff, count]) => {
    if (diff !== 'none' && (count as number) > maxCount) {
      maxCount = count as number;
      topDifferential = diff as Differential;
    }
  });

  // If we found a clear winner by counts, use it and return early
  if (maxCount > 0) {
    console.log('Primary differential determined by tally:', topDifferential, diffCounts);
    return { scores: updatedScores, primaryDifferential: topDifferential };
  }

  // 2) Fallback to legacy mechanism-specific logic when questionnaire lacks differentials
  if (primaryMechanism === 'nociceptive') {
    // Handle shoulder nociceptive questionnaires with correct question IDs
    console.log('Processing shoulder nociceptive questions (fallback)...');
    
    // Pain location assessment - using correct question ID from the questionnaire
    const painLocation = answers['shoulder-pain-location'];
    if (painLocation && Array.isArray(painLocation)) {
      console.log('Processing pain location array:', painLocation);
      
      painLocation.forEach((location: string) => {
        switch (location) {
          case 'lateral-upper-arm':
            updatedScores.differentials['frozen-shoulder'] += 2;
            updatedScores.differentials['stiff-shoulder'] += 2;
            break;
          case 'deep-shoulder-joint':
            updatedScores.differentials['frozen-shoulder'] += 3;
            updatedScores.differentials['subacromional-impingement-syndrome'] += 2;
            break;
          case 'front-shoulder':
            updatedScores.differentials['slap-tear'] += 3;
            updatedScores.differentials['labral-leason'] += 3;
            break;
          case 'below-behind-bone':
            updatedScores.differentials['shoulder-bursa'] += 2;
            updatedScores.differentials['subacromional-impingement-syndrome'] += 3;
            updatedScores.differentials['labral-leason'] += 2;
            break;
          case 'from-shoulderblade':
            updatedScores.differentials['frozen-shoulder'] += 2;
            updatedScores.differentials['stiff-shoulder'] += 2;
            updatedScores.differentials['rotator-cuff-tear'] += 2;
            updatedScores.differentials['rotator-cuff-tendinopathy'] += 2;
            break;
          case 'entire-shoulder':
            updatedScores.differentials['frozen-shoulder'] += 3;
            updatedScores.differentials['stiff-shoulder'] += 3;
            break;
        }
      });
    }
    
    // Rest helps pain - using correct question ID
    const restHelps = answers['rest-helps-pain'];
    if (restHelps === 'no-rest-not-help') {
      updatedScores.differentials['frozen-shoulder'] += 2;
      updatedScores.differentials['labral-leason'] += 2;
      
      // Check follow-up question
      const pain24Hours = answers['pain-24-hours'];
      if (pain24Hours === '24-hour-pain') {
        updatedScores.differentials['red flag'] += 4;
      } else if (pain24Hours === 'can-find-relief') {
        updatedScores.differentials['frozen-shoulder'] += 1;
        updatedScores.differentials['labral-leason'] += 1;
      }
    }
    
    // Pain timing assessment - using correct question ID
    const painTiming = answers['when-pain-noticeable'];
    if (painTiming) {
      switch (painTiming) {
        case 'during-activity-overhead':
          updatedScores.differentials['subacromional-impingement-syndrome'] += 3;
          updatedScores.differentials['labral-leason'] += 2;
          updatedScores.differentials['biceps-tear-long-head'] += 2;
          updatedScores.differentials['rotator-cuff-tendinopathy'] += 2;
          updatedScores.differentials['rotator-cuff-tear'] += 2;
          break;
        case 'at-rest-night':
          updatedScores.differentials['frozen-shoulder'] += 3;
          updatedScores.differentials['labral-leason'] += 2;
          break;
        case 'randomly-sleep-light':
          updatedScores.differentials['frozen-shoulder'] += 4;
          break;
      }
    }
    
    // Aggravating movements - using correct question ID
    const aggravatingMovements = answers['aggravating-movements'];
    if (aggravatingMovements && Array.isArray(aggravatingMovements)) {
      console.log('Processing aggravating movements:', aggravatingMovements);
      
      aggravatingMovements.forEach((movement: string) => {
        switch (movement) {
          case 'lifting-arm-overhead':
            updatedScores.differentials['subacromional-impingement-syndrome'] += 2;
            updatedScores.differentials['frozen-shoulder'] += 1;
            updatedScores.differentials['stiff-shoulder'] += 1;
            
            // Check painful degree follow-up
            const painfulDegree = answers['painful-degree'];
            if (painfulDegree === 'around-45-60-degrees') {
              updatedScores.differentials['stiff-shoulder'] += 2;
              updatedScores.differentials['frozen-shoulder'] += 2;
            } else if (painfulDegree === 'around-90-degrees') {
              updatedScores.differentials['subacromional-impingement-syndrome'] += 3;
            } else if (painfulDegree === 'above-90-degrees') {
              updatedScores.differentials['subacromional-impingement-syndrome'] += 2;
              updatedScores.differentials['slap-tear'] += 2;
              
              // Check palm facing up follow-up
              const palmFacingUp = answers['palm-facing-up'];
              if (palmFacingUp === 'more-painful-palm-up') {
                updatedScores.differentials['slap-tear'] += 3;
                updatedScores.differentials['labral-leason'] += 3;
                updatedScores.differentials['biceps-tear-long-head'] += 3;
              } else if (palmFacingUp === 'less-painful') {
                updatedScores.differentials['subacromional-impingement-syndrome'] += 2;
              }
            }
            break;
          case 'reaching-behind-back':
            updatedScores.differentials['subacromional-impingement-syndrome'] += 2;
            updatedScores.differentials['frozen-shoulder'] += 2;
            updatedScores.differentials['biceps-tear-long-head'] += 2;
            break;
          case 'scratching-back-head':
            updatedScores.differentials['frozen-shoulder'] += 3;
            break;
          case 'throwing-overhead-sports':
            updatedScores.differentials['rotator-cuff-tendinopathy'] += 2;
            updatedScores.differentials['rotator-cuff-tear'] += 2;
            updatedScores.differentials['subacromional-impingement-syndrome'] += 2;
            break;
          case 'sudden-movement-heavy':
            updatedScores.differentials['unstable-shoulder'] += 3;
            updatedScores.differentials['subacromional-impingement-syndrome'] += 1;
            break;
        }
      });
    }
    
    // Clicking/locking symptoms - using correct question ID
    const clickingLocking = answers['clicking-locking-catching'];
    if (clickingLocking) {
      switch (clickingLocking) {
        case 'yes-clicking':
          updatedScores.differentials['labral-leason'] += 3;
          updatedScores.differentials['subacromional-impingement-syndrome'] += 2;
          updatedScores.differentials['unstable-shoulder'] += 2;
          break;
        case 'rarely-sports-only':
          updatedScores.differentials['labral-leason'] += 2;
          updatedScores.differentials['subacromional-impingement-syndrome'] += 1;
          updatedScores.differentials['unstable-shoulder'] += 1;
          break;
      }
    }
    
    // Shoulder dislocation history - using correct question ID
    const shoulderDislocation = answers['shoulder-dislocation-past'];
    if (shoulderDislocation) {
      switch (shoulderDislocation) {
        case 'yes-confirmed-diagnosis':
          updatedScores.differentials['shoulder-dislocation'] += 4;
          updatedScores.differentials['unstable-shoulder'] += 4;
          break;
        case 'not-sure-popped-out':
          updatedScores.differentials['shoulder-dislocation'] += 2;
          updatedScores.differentials['unstable-shoulder'] += 2;
          break;
      }
    }

    // Handle other nociceptive cases (existing spine logic)
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

    // Determine primary differential based on highest score
    const shoulderDifferentials = [
      'frozen-shoulder',
      'subacromional-impingement-syndrome', 
      'rotator-cuff-tear',
      'rotator-cuff-tendinopathy',
      'labral-leason',
      'unstable-shoulder',
      'slap-tear',
      'stiff-shoulder',
      'shoulder-bursa',
      'biceps-tear-long-head',
      'shoulder-dislocation'
    ];
    
    const spineDifferentials = [
      'disc herniation',
      'facet joint syndrome',
      'muscle pain'
    ];
    
    let legacyMax = 0;
    let legacyTop: Differential = 'none';
    
    // Check shoulder differentials first
    shoulderDifferentials.forEach(diff => {
      const score = updatedScores.differentials[diff] || 0;
      if (score > legacyMax) {
        legacyMax = score;
        legacyTop = diff as Differential;
      }
    });
    
    // If no shoulder differential scored, check spine differentials
    if (legacyMax === 0) {
      spineDifferentials.forEach(diff => {
        const score = updatedScores.differentials[diff] || 0;
        if (score > legacyMax) {
          legacyMax = score;
          legacyTop = diff as Differential;
        }
      });
    }
    
    // Only use fallback if absolutely no scores were recorded
    if (legacyMax === 0) {
      const hasShoulderQuestions = answers['shoulder-pain-location'] || answers['aggravating-movements'];
      if (hasShoulderQuestions) {
        legacyTop = 'subacromional-impingement-syndrome';
      } else {
        legacyTop = 'muscle pain';
      }
    }
    
    primaryDifferential = legacyTop;
    
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

  console.log('Final differential determined (fallback):', primaryDifferential);
  console.log('Updated scores:', updatedScores.differentials);
  return { scores: updatedScores, primaryDifferential };
};
