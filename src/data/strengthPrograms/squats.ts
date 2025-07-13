import { StrengthProgram } from "@/types/strengthProgram";

export const squatsProgram: StrengthProgram = {
  id: "squats",
  title: "strengthPrograms.squats.title",
  description: "strengthPrograms.squats.description",
  listDescription: [
    "strengthPrograms.squats.listDescription.1",
    "strengthPrograms.squats.listDescription.2",
    "strengthPrograms.squats.listDescription.3",
    "strengthPrograms.squats.listDescription.4"
  ],
  time: "15 min",
  image: "/lovable-uploads/stretchingCard_images/3.png",
  focus_bodyPart: ["quadriceps", "glutes", "hamstrings", "core"],
  avoid_differentials: ["knee pain"],
  exercises: [
    {
      title: "strengthPrograms.squats.exercises.bodyweightSquat.title",
      description: "strengthPrograms.squats.exercises.bodyweightSquat.description",
      video: {
        videoId: "YaXPRqUwItQ",
        title: "strengthPrograms.squats.exercises.bodyweightSquat.video.title",
        description: "strengthPrograms.squats.exercises.bodyweightSquat.video.description"
      },
      focus_bodyPart: ["quadriceps", "glutes"],
      avoid_differentials: ["knee pain", "ankle stiffness"],
      repetitions: "10-12x"
    },
    {
      title: "strengthPrograms.squats.exercises.gobletSquat.title",
      description: "strengthPrograms.squats.exercises.gobletSquat.description",
      video: {
        videoId: "MeIiIdhvXT4",
        title: "strengthPrograms.squats.exercises.gobletSquat.video.title",
        description: "strengthPrograms.squats.exercises.gobletSquat.video.description"
      },
      focus_bodyPart: ["quadriceps", "glutes", "core"],
      avoid_differentials: ["knee pain"],
      repetitions: "10-12x"
    },
    {
      title: "strengthPrograms.squats.exercises.jumpSquat.title",
      description: "strengthPrograms.squats.exercises.jumpSquat.description",
      video: {
        videoId: "A-cFYWvaHr0",
        title: "strengthPrograms.squats.exercises.jumpSquat.video.title",
        description: "strengthPrograms.squats.exercises.jumpSquat.video.description"
      },
      focus_bodyPart: ["quadriceps", "glutes", "calves"],
      avoid_differentials: ["knee pain", "ankle injury"],
      repetitions: "10-12x"
    }
  ]
};