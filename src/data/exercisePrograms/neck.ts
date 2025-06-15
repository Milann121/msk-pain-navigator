import exercisesByDifferential from "../exercisePrograms";

/**
 * Collect all exercises (videos) that target the neck.
 */
export function getNeckExercises() {
  const results: Array<{
    exerciseTitle: string;
    videoId: string;
    description?: string;
    importance?: 1 | 2 | 3;
    mainGroup?: string[] | string;
    bodyPart?: string[] | string;
  }> = [];

  Object.values(exercisesByDifferential).forEach(programArray => {
    (programArray as any[]).forEach(program => {
      if (Array.isArray(program.videos)) {
        program.videos.forEach((vid: any) => {
          if (
            (Array.isArray(vid.bodyPart) && vid.bodyPart.includes('neck')) ||
            vid.bodyPart === 'neck'
          ) {
            results.push({
              exerciseTitle: vid.title || program.title,
              videoId: vid.videoId,
              description: vid.description,
              importance: vid.importance,
              mainGroup: vid.mainGroup,
              bodyPart: vid.bodyPart,
            });
          }
        });
      }
    });
  });

  return results;
}

export const neckExercises = getNeckExercises();

