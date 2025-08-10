
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

  // Pick the most frequent differential from this questionnaire only (with deterministic tie-breaking)
  const entries = Object.entries(diffCounts).filter(([d, c]) => d !== 'none' && (c as number) > 0);
  let maxCount = 0;
  entries.forEach(([_, count]) => { if ((count as number) > maxCount) maxCount = count as number; });
  const candidates = entries.filter(([_, count]) => (count as number) === maxCount).map(([d]) => d as Differential);

  console.log('Differential tally', { questionnaireId: questionnaire.id, diffCounts, maxCount, candidates });

  if (maxCount > 0) {
    // mechanism-aware priority
    const priorityMap: Record<string, number> = {};
    const prioritiesByMechanism: Record<typeof primaryMechanism, string[]> = {
      nociceptive: [
        'disc herniation',
        'spinal stenosis',
        'spondylolisthesis',
        'ventral spondylolisthesis',
        'dorsal spondylolisthesis',
        'facet joint syndrome',
        'subacromional-impingement-syndrome',
        'rotator-cuff-tendinopathy',
        'rotator-cuff-tear',
        'frozen-shoulder',
        'stiff-shoulder',
        'shoulder-bursa',
        'slap-tear',
        'labral-leason',
        'biceps-tendinopathy',
        'biceps-tear-long-head',
        'shoulder-dislocation',
        'unstable-shoulder',
        'SIJ syndrome',
        'muscle pain'
      ],
      neuropathic: [
        'cervical-radiculopathy',
        'radiculopathy',
        'radicular-pain',
        'nerve compression',
        'peripheral neuropathy'
      ],
      central: [
        'central sensitization'
      ]
    };
    prioritiesByMechanism[primaryMechanism].forEach((k, idx) => { priorityMap[k] = idx; });

    // choose best candidate by priority, fallback to lexicographic
    let selected = candidates[0];
    candidates.forEach(c => {
      const a = priorityMap[c] ?? Number.MAX_SAFE_INTEGER;
      const b = priorityMap[selected] ?? Number.MAX_SAFE_INTEGER;
      if (a < b || (a === b && c.localeCompare(selected) < 0)) {
        selected = c;
      }
    });

    console.log('Primary differential determined by tally:', selected);
    return { scores: updatedScores, primaryDifferential: selected as Differential };
  }

  // If no differentials were tallied, avoid misleading legacy defaults for nociceptive
  if (primaryMechanism === 'nociceptive') {
    console.log('No differentials tallied; returning none for nociceptive path');
    return { scores: updatedScores, primaryDifferential: 'none' };
  }

  // 2) Fallback to legacy mechanism-specific logic for other mechanisms
  if (primaryMechanism === 'neuropathic') {
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
