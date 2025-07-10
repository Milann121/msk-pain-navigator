export interface OrebroAnswers {
  painLocation: string[];
  workDaysMissed: string;
  painDuration: string;
  workHeaviness: number;
  painThisWeek: number;
  painThreeMonths: number;
  painFrequency: number;
  painCoping: number;
  anxiety: number;
  depression: number;
  persistentRisk: number;
  workChances: number;
  jobSatisfaction: number;
  physicalActivity: number;
  stopActivity: number;
  normalWork: number;
  lightWork: number;
  walking: number;
  householdChores: number;
  shopping: number;
  sleep: number;
}

export interface OrebroScoreResult {
  totalScore: number;
  riskLevel: string;
}