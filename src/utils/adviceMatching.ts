
import { advices, type Advice } from '@/data/Advices/advicesDatabase';

export const getAdvicesForExerciseProgram = (
  mechanism: string,
  differential: string,
  painArea: string
): number[] => {
  // Normalize pain area to match our advice body parts
  const normalizedPainArea = normalizePainArea(painArea);
  
  // Filter advices based on matching criteria
  const matchingAdvices = advices.filter(advice => {
    // Check if the advice applies to this body part
    const bodyPartMatch = advice.bodyParts.includes(normalizedPainArea as any);

    // Check if the advice applies to this mechanism
    const mechanismMatch = advice.mechanisms.includes(mechanism as any);

    // Differential must be explicitly provided and match
    const differentialMatch =
      Array.isArray(advice.differentials) &&
      advice.differentials.includes(differential);

    return bodyPartMatch && mechanismMatch && differentialMatch;
  });
  
  // Sort by priority (Vysoká > Stredná > Nízka) and return IDs
  const priorityOrder = { 'Vysoká': 3, 'Stredná': 2, 'Nízka': 1 };
  
  return matchingAdvices
    .sort((a, b) => {
      const aPriority = priorityOrder[a.advicePriority as keyof typeof priorityOrder] || 0;
      const bPriority = priorityOrder[b.advicePriority as keyof typeof priorityOrder] || 0;
      return bPriority - aPriority;
    })
    .map(advice => advice.adviceId);
};

const normalizePainArea = (painArea: string): string => {
  // Map pain area strings to our body part categories
  const mapping: Record<string, string> = {
    'neck': 'neck',
    'middle back': 'middle-back',
    'lower back': 'lower-back',
    'upper limb': 'upper limb'
  };
  
  return mapping[painArea] || painArea;
};
