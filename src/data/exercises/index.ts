
import { neckExercises } from './neck';
import { middleBackExercises } from './middle-back';
import { lowerBackExercises } from './lower-back';

/**
 * All exercises by id for lookup.
 */
const allExercises = [
  ...neckExercises,
  ...middleBackExercises,
  ...lowerBackExercises,
];

/**
 * Maps all exercises by their unique id.
 */
export const exercisesById: Record<string, typeof allExercises[number]> = allExercises.reduce((acc, ex) => {
  acc[ex.id] = ex;
  return acc;
}, {} as Record<string, typeof allExercises[number]>);

/**
 * Helper to fetch multiple exercises by their ids.
 */
export function getExercisesByIds(ids: string[]) {
  return ids.map(id => exercisesById[id]).filter(Boolean);
}
