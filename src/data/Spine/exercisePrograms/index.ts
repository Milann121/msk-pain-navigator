
import { centralExercises } from './central';
import { neuropathicExercises } from './neuropathic';
import { nociceptiveExercises } from './nociceptive';

const exercisesByDifferential = {
  central: centralExercises,
  neuropathic: neuropathicExercises,
  nociceptive: nociceptiveExercises
};

export default exercisesByDifferential;
