
import { shoulderNociceptiveExercises } from '../UpperLimb/Shoulder-joint/shoulderExercises/shoulderNociceptiveExercises';
import { middleBackExercises } from './middle-back';
import { lowerBackExercises } from './lower-back';
import { neckExercises } from './neck';
import { neuropathicExercises } from './neuropathic';
import { centralExercises } from './central';

// Combine all exercises into a single object
const exercisesByDifferential = {
  // Shoulder exercises (already updated with translation keys)
  ...shoulderNociceptiveExercises,
  
  // Middle back exercises
  ...middleBackExercises,
  
  // Lower back exercises
  ...lowerBackExercises,
  
  // Neck exercises
  ...neckExercises,
  
  // Neuropathic exercises
  ...neuropathicExercises,
  
  // Central sensitization exercises
  ...centralExercises
};

export default exercisesByDifferential;
