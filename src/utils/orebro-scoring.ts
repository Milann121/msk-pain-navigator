import { OrebroAnswers, OrebroScoreResult } from '@/types/orebro';

export const calculateOrebroScore = (answers: Partial<OrebroAnswers>): OrebroScoreResult => {
  let score = 0;

  // Question 5 (Question 0 in our implementation): Pain location - count sites multiply by 2 (max 10)
  if (answers.painLocation) {
    const painSiteCount = answers.painLocation.length;
    score += Math.min(painSiteCount * 2, 10);
  }

  // Question 6 (Question 1): Work days missed - use bracketed numbers
  const workDaysScores: Record<string, number> = {
    '0days': 0,
    '1-2days': 1,
    '3-7days': 2,
    '8-14days': 3,
    '15-30days': 4,
    '1month': 5,
    '2months': 6,
    '3-6months': 7,
    '6-12months': 8,
    'over1year': 9
  };
  if (answers.workDaysMissed && workDaysScores[answers.workDaysMissed] !== undefined) {
    score += workDaysScores[answers.workDaysMissed];
  }

  // Question 7 (Question 2): Pain duration - use bracketed numbers  
  const painDurationScores: Record<string, number> = {
    '0-1week': 1,
    '1-2weeks': 2,
    '3-4weeks': 3,
    '4-5weeks': 4,
    '6-8weeks': 5,
    '9-11weeks': 6,
    '3-6months': 7,
    '6-9months': 8,
    '9-12months': 9,
    'over1year': 10
  };
  if (answers.painDuration && painDurationScores[answers.painDuration] !== undefined) {
    score += painDurationScores[answers.painDuration];
  }

  // Questions 8, 9, 10, 11, 13, 14, 15, 18, 19, 20 (Questions 3, 4, 5, 6, 8, 9, 10, 13, 14, 15): Use selected number directly
  const directScoreQuestions = [
    'workHeaviness', 'painThisWeek', 'painThreeMonths', 'painFrequency', 
    'anxiety', 'depression', 'persistentRisk', 'normalWork', 'lightWork', 'walking'
  ];
  directScoreQuestions.forEach(key => {
    const value = answers[key as keyof OrebroAnswers];
    if (typeof value === 'number') {
      score += value;
    }
  });

  // Questions 12, 16, 17, 21, 22, 23, 24, 25 (Questions 7, 11, 12, 16, 17, 18, 19, 20): Use 10 minus selected number
  const inverseScoreQuestions = [
    'painCoping', 'workChances', 'jobSatisfaction', 'physicalActivity', 
    'stopActivity', 'householdChores', 'shopping', 'sleep'
  ];
  inverseScoreQuestions.forEach(key => {
    const value = answers[key as keyof OrebroAnswers];
    if (typeof value === 'number') {
      score += (10 - value);
    }
  });

  // Determine risk level based on total score
  let riskLevel = 'low';
  if (score >= 105) {
    riskLevel = 'high';
  } else if (score >= 90) {
    riskLevel = 'medium';
  }

  return { totalScore: score, riskLevel };
};