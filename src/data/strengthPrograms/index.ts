import { pushUpsProgram } from "./pushUps";
import { squatsProgram } from "./squats";
import { bodyweightCircuitProgram } from "./bodyweightCircuit";
import { pullUpsProgram } from "./pullUps";

export const strengthPrograms = {
  "push-ups": pushUpsProgram,
  "squats": squatsProgram,
  "bodyweight-circuit": bodyweightCircuitProgram,
  "pull-ups": pullUpsProgram,
};

export { pushUpsProgram, squatsProgram, bodyweightCircuitProgram, pullUpsProgram };