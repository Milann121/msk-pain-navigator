import { pushUpsProgram } from "./pushUps";
import { squatsProgram } from "./squats";
import { bodyweightCircuitProgram } from "./bodyweightCircuit";
import { pullUpsProgram } from "./pullUps";
import { deadliftsProgram } from "./deadlifts";
import { outdoorCalisthenicsProgram } from "./outdoorCalisthenics";
import { fullBodyStrengthProgram } from "./fullBodyStrength";

export const strengthPrograms = {
  "push-ups": pushUpsProgram,
  "squats": squatsProgram,
  "bodyweight-circuit": bodyweightCircuitProgram,
  "pull-ups": pullUpsProgram,
  "deadlifts": deadliftsProgram,
  "outdoor-calisthenics": outdoorCalisthenicsProgram,
  "full-body-strength": fullBodyStrengthProgram,
};

export { pushUpsProgram, squatsProgram, bodyweightCircuitProgram, pullUpsProgram, deadliftsProgram, outdoorCalisthenicsProgram, fullBodyStrengthProgram };