import { morningEnergizerProgram } from "./morningEnergizer";
import { lowerBodyProgram } from "./lowerBody";
import { upperBodyProgram } from "./upperBody";
import { eveningCalmingProgram } from "./eveningCalming";
import { dynamicFullBodyProgram } from "./dynamicFullBody";
import { powerYogaProgram } from "./powerYoga";

export const yogaPrograms = {
  "morning-energizer": morningEnergizerProgram,
  "lower-body": lowerBodyProgram,
  "upper-body": upperBodyProgram,
  "evening-calming": eveningCalmingProgram,
  "dynamic-full-body": dynamicFullBodyProgram,
  "power-yoga": powerYogaProgram,
};

export { morningEnergizerProgram, lowerBodyProgram, upperBodyProgram, eveningCalmingProgram, dynamicFullBodyProgram, powerYogaProgram };