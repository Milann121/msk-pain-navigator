import { FavoriteActivity } from '@/hooks/useFavoriteActivities';

export interface BodyAreaAnalysis {
  selectedBodyArea: string;
  bodyAreaCounts: Record<string, number>;
  ratioType: 'same' | 'majority' | 'tie';
  questionnaire: string;
  reasoning: string;
}

export function analyzeBodyAreas(favoriteActivities: FavoriteActivity[]): BodyAreaAnalysis {
  // Count body area selections
  const bodyAreaCounts: Record<string, number> = {};
  const validActivities = favoriteActivities.filter(activity => activity.pain_area);
  
  validActivities.forEach(activity => {
    const bodyArea = activity.pain_area!;
    bodyAreaCounts[bodyArea] = (bodyAreaCounts[bodyArea] || 0) + 1;
  });

  // Determine most common body area
  const bodyAreaEntries = Object.entries(bodyAreaCounts);
  bodyAreaEntries.sort((a, b) => b[1] - a[1]);
  
  const spineAreas = ['neck', 'middle back', 'lower back'];
  
  // Analysis logic
  if (bodyAreaEntries.length === 1) {
    // All same body area
    const selectedBodyArea = bodyAreaEntries[0][0];
    return {
      selectedBodyArea,
      bodyAreaCounts,
      ratioType: 'same',
      questionnaire: getQuestionnaireForBodyArea(selectedBodyArea),
      reasoning: `All activities selected for ${selectedBodyArea}`
    };
  } else if (bodyAreaEntries[0][1] > bodyAreaEntries[1][1]) {
    // Clear majority
    const selectedBodyArea = bodyAreaEntries[0][0];
    return {
      selectedBodyArea,
      bodyAreaCounts,
      ratioType: 'majority',
      questionnaire: getQuestionnaireForBodyArea(selectedBodyArea),
      reasoning: `Majority of activities (${bodyAreaEntries[0][1]}) selected for ${selectedBodyArea}`
    };
  } else {
    // Tie scenario - prefer spine areas
    const hasSpineArea = bodyAreaEntries.some(([area]) => spineAreas.includes(area));
    
    if (hasSpineArea) {
      const spineArea = bodyAreaEntries.find(([area]) => spineAreas.includes(area))?.[0];
      const hasMultipleSpineAreas = bodyAreaEntries.filter(([area]) => spineAreas.includes(area)).length > 1;
      
      if (hasMultipleSpineAreas) {
        return {
          selectedBodyArea: 'spine',
          bodyAreaCounts,
          ratioType: 'tie',
          questionnaire: 'general',
          reasoning: 'Multiple spine areas selected - using general spine assessment'
        };
      } else {
        return {
          selectedBodyArea: spineArea!,
          bodyAreaCounts,
          ratioType: 'tie',
          questionnaire: getQuestionnaireForBodyArea(spineArea!),
          reasoning: `Tie broken by preferring spine area: ${spineArea}`
        };
      }
    } else {
      // No spine area in tie - use first one
      const selectedBodyArea = bodyAreaEntries[0][0];
      return {
        selectedBodyArea,
        bodyAreaCounts,
        ratioType: 'tie',
        questionnaire: getQuestionnaireForBodyArea(selectedBodyArea),
        reasoning: `Tie between non-spine areas - selected ${selectedBodyArea}`
      };
    }
  }
}

function getQuestionnaireForBodyArea(bodyArea: string): string {
  switch (bodyArea) {
    case 'neck':
    case 'middle back':
    case 'lower back':
    case 'spine':
      return 'general';
    case 'upper limb':
      return 'upperLimb'; // Will need to create this
    default:
      return 'general';
  }
}

export function createPsfsUserInfo(bodyAreaAnalysis: BodyAreaAnalysis) {
  return {
    name: '',
    age: 0,
    gender: 'other' as const,
    job: 'mixed' as const,
    painArea: bodyAreaAnalysis.selectedBodyArea === 'spine' ? 'lower back' : bodyAreaAnalysis.selectedBodyArea,
    consentGiven: true
  };
}