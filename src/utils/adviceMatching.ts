
import { advices, type Advice } from '@/data/Advices/advicesDatabase';

export const getAdvicesForExerciseProgram = (
  mechanism: string,
  differential: string,
  painArea: string
): number[] => {
  // Normalize pain area to match our advice body parts
  const normalizedPainArea = normalizePainArea(painArea);
  const normalizedDifferential = normalizeDifferential(differential);
  
  // Filter advices based on matching criteria
  const matchingAdvices = advices.filter(advice => {
    // Check if the advice applies to this body part
    const bodyPartMatch = advice.bodyParts.includes(normalizedPainArea as any);

    // Check if the advice applies to this mechanism
    const mechanismMatch = advice.mechanisms.includes(mechanism as any);

    // Differential must be explicitly provided and match after normalization
    const differentialMatch =
      Array.isArray(advice.differentials) &&
      advice.differentials.some(d => normalizeDifferential(d) === normalizedDifferential);

    return bodyPartMatch && mechanismMatch && differentialMatch;
  });
  
  // Sort by priority (high > medium > low) and return IDs
  const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
  
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

const normalizeDifferential = (differential: string): string =>
  differential.toLowerCase().replace(/-/g, ' ').trim();
