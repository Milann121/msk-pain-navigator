import { neckShoulderProgram } from "./neckShoulder";
import { morningFlowProgram } from "./morningFlow";
import { eveningRelaxationProgram } from "./eveningRelaxation";
import { postWorkoutProgram } from "./postWorkout";

export const stretchingPrograms = {
  "neck-shoulder": neckShoulderProgram,
  "morning-flow": morningFlowProgram,
  "evening-relaxation": eveningRelaxationProgram,
  "post-workout": postWorkoutProgram,
};

export { neckShoulderProgram, morningFlowProgram, eveningRelaxationProgram, postWorkoutProgram };