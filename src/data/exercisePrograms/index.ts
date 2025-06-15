
// Update imports to new folder name (was exercises, now exercisePrograms)
import { Exercise } from "@/types/exercise";
import { nociceptiveExercises } from "./nociceptive";
import { neuropathicExercises } from "./neuropathic";
import { centralExercises } from "./central";

const exercisesByDifferential: Record<string, Exercise[]> = {
  ...nociceptiveExercises,
  ...neuropathicExercises,
  ...centralExercises
};

export default exercisesByDifferential;
