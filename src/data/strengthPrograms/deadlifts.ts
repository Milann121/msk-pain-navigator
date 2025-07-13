import { StrengthProgram } from "@/types/strengthProgram";

export const deadliftsProgram: StrengthProgram = {
  id: "deadlifts",
  title: "strengthPrograms.deadlifts.title",
  description: "strengthPrograms.deadlifts.description",
  listDescription: [
    "strengthPrograms.deadlifts.listDescription.1",
    "strengthPrograms.deadlifts.listDescription.2",
    "strengthPrograms.deadlifts.listDescription.3",
    "strengthPrograms.deadlifts.listDescription.4"
  ],
  time: "20 min",
  image: "/lovable-uploads/stretchingCard_images/11.png",
  focus_bodyPart: ["hamstrings", "glutes", "lower-back", "traps"],
  avoid_differentials: ["lower back injury"],
  exercises: [
    {
      title: "strengthPrograms.deadlifts.exercises.conventionalDeadlift.title",
      description: "strengthPrograms.deadlifts.exercises.conventionalDeadlift.description",
      video: {
        videoId: "YZs24B9zb9c",
        title: "strengthPrograms.deadlifts.exercises.conventionalDeadlift.video.title",
        description: "strengthPrograms.deadlifts.exercises.conventionalDeadlift.video.description"
      },
      focus_bodyPart: ["hamstrings", "glutes", "lower-back"],
      avoid_differentials: ["lower back injury"],
      repetitions: "10-12x"
    },
    {
      title: "strengthPrograms.deadlifts.exercises.romanianDeadlift.title",
      description: "strengthPrograms.deadlifts.exercises.romanianDeadlift.description",
      video: {
        videoId: "JCXUYuzSNys",
        title: "strengthPrograms.deadlifts.exercises.romanianDeadlift.video.title",
        description: "strengthPrograms.deadlifts.exercises.romanianDeadlift.video.description"
      },
      focus_bodyPart: ["hamstrings", "glutes"],
      avoid_differentials: ["hamstring strain"],
      repetitions: "10-12x"
    },
    {
      title: "strengthPrograms.deadlifts.exercises.sumodeadlift.title",
      description: "strengthPrograms.deadlifts.exercises.sumodeadlift.description",
      video: {
        videoId: "LGIS9vs65Sk",
        title: "strengthPrograms.deadlifts.exercises.sumodeadlift.video.title",
        description: "strengthPrograms.deadlifts.exercises.sumodeadlift.video.description"
      },
      focus_bodyPart: ["glutes", "quadriceps", "adductors"],
      avoid_differentials: ["knee pain", "hip injury"],
      repetitions: "10-12x"
    }
  ]
};