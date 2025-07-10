import { OrebroAnswers } from '@/types/orebro';

export const isCurrentQuestionAnswered = (currentQuestion: number, answers: Partial<OrebroAnswers>): boolean => {
  switch (currentQuestion) {
    case 0: return (answers.painLocation && answers.painLocation.length > 0);
    case 1: return !!answers.workDaysMissed;
    case 2: return !!answers.painDuration;
    case 3: return answers.workHeaviness !== undefined;
    case 4: return answers.painThisWeek !== undefined;
    case 5: return answers.painThreeMonths !== undefined;
    case 6: return answers.painFrequency !== undefined;
    case 7: return answers.painCoping !== undefined;
    case 8: return answers.anxiety !== undefined;
    case 9: return answers.depression !== undefined;
    case 10: return answers.persistentRisk !== undefined;
    case 11: return answers.workChances !== undefined;
    case 12: return answers.jobSatisfaction !== undefined;
    case 13: return answers.physicalActivity !== undefined;
    case 14: return answers.stopActivity !== undefined;
    case 15: return answers.normalWork !== undefined;
    case 16: return answers.lightWork !== undefined;
    case 17: return answers.walking !== undefined;
    case 18: return answers.householdChores !== undefined;
    case 19: return answers.shopping !== undefined;
    case 20: return answers.sleep !== undefined;
    default: return false;
  }
};