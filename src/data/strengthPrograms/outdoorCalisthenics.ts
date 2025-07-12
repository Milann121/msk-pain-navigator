import { StrengthProgram } from "@/types/strengthProgram";

export const outdoorCalisthenicsProgram: StrengthProgram = {
  id: "outdoor-calisthenics",
  title: "strengthPrograms.outdoorCalisthenics.title",
  description: "strengthPrograms.outdoorCalisthenics.description",
  listDescription: [
    "strengthPrograms.outdoorCalisthenics.listDescription.1",
    "strengthPrograms.outdoorCalisthenics.listDescription.2",
    "strengthPrograms.outdoorCalisthenics.listDescription.3",
    "strengthPrograms.outdoorCalisthenics.listDescription.4"
  ],
  time: "25 min",
  image: "/lovable-uploads/stretchingCard_images/8.png",
  focus_bodyPart: ["full-body", "functional-movement"],
  avoid_differentials: ["recent injury"],
  exercises: [
    {
      title: "strengthPrograms.outdoorCalisthenics.exercises.parkBenchWorkout.title",
      description: "strengthPrograms.outdoorCalisthenics.exercises.parkBenchWorkout.description",
      video: {
        videoId: "bSEKHOCwP0E",
        title: "strengthPrograms.outdoorCalisthenics.exercises.parkBenchWorkout.video.title",
        description: "strengthPrograms.outdoorCalisthenics.exercises.parkBenchWorkout.video.description"
      },
      focus_bodyPart: ["legs", "chest", "core"],
      avoid_differentials: ["knee pain"]
    },
    {
      title: "strengthPrograms.outdoorCalisthenics.exercises.playgroundWorkout.title",
      description: "strengthPrograms.outdoorCalisthenics.exercises.playgroundWorkout.description",
      video: {
        videoId: "pZVCH5lSZJs",
        title: "strengthPrograms.outdoorCalisthenics.exercises.playgroundWorkout.video.title",
        description: "strengthPrograms.outdoorCalisthenics.exercises.playgroundWorkout.video.description"
      },
      focus_bodyPart: ["full-body", "functional-movement"],
      avoid_differentials: ["wrist pain"]
    },
    {
      title: "strengthPrograms.outdoorCalisthenics.exercises.hillSprints.title",
      description: "strengthPrograms.outdoorCalisthenics.exercises.hillSprints.description",
      video: {
        videoId: "TiHaE0Qv_8E",
        title: "strengthPrograms.outdoorCalisthenics.exercises.hillSprints.video.title",
        description: "strengthPrograms.outdoorCalisthenics.exercises.hillSprints.video.description"
      },
      focus_bodyPart: ["legs", "cardiovascular"],
      avoid_differentials: ["ankle injury", "knee pain"]
    }
  ]
};