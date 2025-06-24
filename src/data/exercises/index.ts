
import { Exercise } from "@/types/exercise";
import { nociceptiveExercises } from "./nociceptive";
import { neuropathicExercises } from "./neuropathic";
import { centralExercises } from "./central";
import { shoulderNociceptiveExercises } from '@/data/UpperLimb/Shoulder-joint/shoulderExercises/shoulderNociceptiveExercises';

const exercisesByDifferential = {
  ...nociceptiveExercises,
  ...neuropathicExercises,
  ...centralExercises,

  // Upper limb shoulder exercises - nociceptive with specific differentials
  'nociceptive-frozen-shoulder-upper limb': shoulderNociceptiveExercises['nociceptive-frozen-shoulder-upper limb'],
  'nociceptive-rotator-cuff-tear-upper limb': shoulderNociceptiveExercises['nociceptive-rotator-cuff-tear-upper limb'],
  'nociceptive-subacromional-impingement-syndrome-upper limb': shoulderNociceptiveExercises['nociceptive-subacromional-impingement-syndrome-upper limb'],
  'nociceptive-rotator-cuff-tendinopathy-upper limb': shoulderNociceptiveExercises['nociceptive-default-upper limb'],
  'nociceptive-labral-leason-upper limb': shoulderNociceptiveExercises['nociceptive-default-upper limb'],
  'nociceptive-unstable-shoulder-upper limb': shoulderNociceptiveExercises['nociceptive-default-upper limb'],
  'nociceptive-default-upper limb': shoulderNociceptiveExercises['nociceptive-default-upper limb'],

  // Upper limb neck exercises - neuropathic (use existing neck exercises)
  'neuropathic-cervical-radiculopathy-neck': neuropathicExercises['neuropathic-cervical-radiculopathy-neck'],
  'neuropathic-radicular-pain-neck': neuropathicExercises['neuropathic-radicular-pain-neck'],
  'neuropathic-radiculopathy-neck': neuropathicExercises['neuropathic-radiculopathy-neck'],
  'neuropathic-default-neck': neuropathicExercises['neuropathic-default-neck'],
};

export default exercisesByDifferential;
