import { neckShoulderProgram } from "./neckShoulder";
import { morningFlowProgram } from "./morningFlow";
import { eveningRelaxationProgram } from "./eveningRelaxation";
import { postWorkoutProgram } from "./postWorkout";
import { morningRoutineProgram } from "./morningRoutine";

export const stretchingPrograms = {
  "neck-shoulder": neckShoulderProgram,
  "morning-flow": morningFlowProgram,
  "evening-relaxation": eveningRelaxationProgram,
  "post-workout": postWorkoutProgram,
  "morning-routine": morningRoutineProgram,
};

export { neckShoulderProgram, morningFlowProgram, eveningRelaxationProgram, postWorkoutProgram, morningRoutineProgram };