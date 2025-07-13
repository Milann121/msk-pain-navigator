import { YogaProgram } from "@/types/yogaProgram";

export const morningFlowProgram: YogaProgram = {
  id: "morning-flow",
  title: "yogaPrograms.morningFlow.title",
  description: "yogaPrograms.morningFlow.description",
  listDescription: [
    "yogaPrograms.morningFlow.listDescription.1",
    "yogaPrograms.morningFlow.listDescription.2",
    "yogaPrograms.morningFlow.listDescription.3",
    "yogaPrograms.morningFlow.listDescription.4"
  ],
  time: "20 min",
  image: "/lovable-uploads/stretchingCard_images/1.png",
  focus_bodyPart: ["full-body", "spine", "hips"],
  avoid_differentials: ["recent spinal injury"],
  exercises: [
    {
      title: "yogaPrograms.morningFlow.exercises.sunSalutation.title",
      description: "yogaPrograms.morningFlow.exercises.sunSalutation.description",
      video: {
        videoId: "73e-w1-4D8E",
        title: "yogaPrograms.morningFlow.exercises.sunSalutation.video.title",
        description: "yogaPrograms.morningFlow.exercises.sunSalutation.video.description"
      },
      focus_bodyPart: ["full-body", "spine"],
      avoid_differentials: ["wrist pain", "lower back pain"],
      repetitions: "10-12x"
    },
    {
      title: "yogaPrograms.morningFlow.exercises.catCow.title",
      description: "yogaPrograms.morningFlow.exercises.catCow.description",
      video: {
        videoId: "kqnua4rHVVA",
        title: "yogaPrograms.morningFlow.exercises.catCow.video.title",
        description: "yogaPrograms.morningFlow.exercises.catCow.video.description"
      },
      focus_bodyPart: ["spine", "core"],
      avoid_differentials: ["wrist pain"],
      repetitions: "10-12x"
    },
    {
      title: "yogaPrograms.morningFlow.exercises.downwardDog.title",
      description: "yogaPrograms.morningFlow.exercises.downwardDog.description",
      video: {
        videoId: "wmN7guFLu4I",
        title: "yogaPrograms.morningFlow.exercises.downwardDog.video.title",
        description: "yogaPrograms.morningFlow.exercises.downwardDog.video.description"
      },
      focus_bodyPart: ["shoulders", "hamstrings", "calves"],
      avoid_differentials: ["wrist pain", "shoulder impingement"],
      repetitions: "10-12x"
    }
  ]
};