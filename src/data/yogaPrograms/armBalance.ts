import { YogaProgram } from "@/types/yogaProgram";

export const armBalanceProgram: YogaProgram = {
  id: "arm-balance",
  title: "yogaPrograms.armBalance.title",
  description: "yogaPrograms.armBalance.description",
  listDescription: [
    "yogaPrograms.armBalance.listDescription.1",
    "yogaPrograms.armBalance.listDescription.2",
    "yogaPrograms.armBalance.listDescription.3",
    "yogaPrograms.armBalance.listDescription.4"
  ],
  time: "30 min",
  image: "/lovable-uploads/stretchingCard_images/8.png",
  focus_bodyPart: ["arms", "core", "balance", "wrists"],
  avoid_differentials: ["wrist injury", "shoulder impingement"],
  exercises: [
    {
      title: "yogaPrograms.armBalance.exercises.crowPose.title",
      description: "yogaPrograms.armBalance.exercises.crowPose.description",
      video: {
        videoId: "Hml31hm-Zkg",
        title: "yogaPrograms.armBalance.exercises.crowPose.video.title",
        description: "yogaPrograms.armBalance.exercises.crowPose.video.description"
      },
      focus_bodyPart: ["arms", "core", "balance"],
      avoid_differentials: ["wrist pain", "neck injury"]
    },
    {
      title: "yogaPrograms.armBalance.exercises.sideCrow.title",
      description: "yogaPrograms.armBalance.exercises.sideCrow.description",
      video: {
        videoId: "QcT3CJpz4bE",
        title: "yogaPrograms.armBalance.exercises.sideCrow.video.title",
        description: "yogaPrograms.armBalance.exercises.sideCrow.video.description"
      },
      focus_bodyPart: ["obliques", "arms", "balance"],
      avoid_differentials: ["wrist pain", "shoulder injury"]
    },
    {
      title: "yogaPrograms.armBalance.exercises.firefly.title",
      description: "yogaPrograms.armBalance.exercises.firefly.description",
      video: {
        videoId: "9fB27Gf3nuE",
        title: "yogaPrograms.armBalance.exercises.firefly.video.title",
        description: "yogaPrograms.armBalance.exercises.firefly.video.description"
      },
      focus_bodyPart: ["arms", "core", "hamstrings"],
      avoid_differentials: ["wrist injury", "hamstring strain"]
    }
  ]
};