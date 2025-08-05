import { morningEnergizerProgram } from "./morningEnergizer";
import { lowerBodyProgram } from "./lowerBody";
import { upperBodyProgram } from "./upperBody";
import { eveningCalmingProgram } from "./eveningCalming";
import { dynamicFullBodyProgram } from "./dynamicFullBody";

export const yogaPrograms = {
  "morning-energizer": morningEnergizerProgram,
  "lower-body": lowerBodyProgram,
  "upper-body": upperBodyProgram,
  "evening-calming": eveningCalmingProgram,
  "dynamic-full-body": dynamicFullBodyProgram,
};

export { morningEnergizerProgram, lowerBodyProgram, upperBodyProgram, eveningCalmingProgram, dynamicFullBodyProgram };