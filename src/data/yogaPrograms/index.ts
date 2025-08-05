import { morningEnergizerProgram } from "./morningEnergizer";
import { powerFlowProgram } from "./powerFlow";
import { legFocusProgram } from "./legFocus";
import { armBalanceProgram } from "./armBalance";

export const yogaPrograms = {
  "morning-energizer": morningEnergizerProgram,
  "power-flow": powerFlowProgram,
  "leg-focus": legFocusProgram,
  "arm-balance": armBalanceProgram,
};

export { morningEnergizerProgram, powerFlowProgram, legFocusProgram, armBalanceProgram };