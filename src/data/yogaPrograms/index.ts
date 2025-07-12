import { morningFlowProgram } from "./morningFlow";
import { powerFlowProgram } from "./powerFlow";
import { legFocusProgram } from "./legFocus";
import { armBalanceProgram } from "./armBalance";

export const yogaPrograms = {
  "morning-flow": morningFlowProgram,
  "power-flow": powerFlowProgram,
  "leg-focus": legFocusProgram,
  "arm-balance": armBalanceProgram,
};

export { morningFlowProgram, powerFlowProgram, legFocusProgram, armBalanceProgram };