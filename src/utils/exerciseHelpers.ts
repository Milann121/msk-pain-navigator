
// Update import to reflect new location
import exercisesByDifferential from "@/data/exercises";

/**
 * Finds a new exercise matching the same bodyPart & mainGroup but a different videoId.
 */
export function findReplacementExercise(currentVideoId: string, bodyPart: string, mainGroup: string) {
  // Flatten all exercises and videos
  const allExercises: Array<{
    exerciseTitle: string;
    videoId: string;
    bodyPart: string;
    mainGroup: string;
    description?: string;
  }> = [];

  Object.values(exercisesByDifferential).forEach((arr: any) => {
    (arr as any[]).forEach((exercise) => {
      if (!exercise.videos) return;
      exercise.videos.forEach((vid: any) => {
        if (
          vid.bodyPart === bodyPart &&
          vid.mainGroup === mainGroup &&
          vid.videoId !== currentVideoId
        ) {
          allExercises.push({
            exerciseTitle: vid.title || exercise.title || "",
            videoId: vid.videoId,
            description: vid.description,
            bodyPart: vid.bodyPart,
            mainGroup: vid.mainGroup,
          });
        }
      });
    });
  });

  // Return first match, or undefined
  return allExercises.length > 0 ? allExercises[0] : undefined;
}
