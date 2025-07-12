import { YogaProgram } from "@/types/yogaProgram";

export const powerFlowProgram: YogaProgram = {
  id: "power-flow",
  title: "yogaPrograms.powerFlow.title",
  description: "yogaPrograms.powerFlow.description",
  listDescription: [
    "yogaPrograms.powerFlow.listDescription.1",
    "yogaPrograms.powerFlow.listDescription.2",
    "yogaPrograms.powerFlow.listDescription.3",
    "yogaPrograms.powerFlow.listDescription.4",
    "yogaPrograms.powerFlow.listDescription.5"
  ],
  time: "35 min",
  image: "/lovable-uploads/stretchingCard_images/3.png",
  focus_bodyPart: ["full-body", "core", "strength"],
  avoid_differentials: ["high blood pressure", "recent injury"],
  exercises: [
    {
      title: "yogaPrograms.powerFlow.exercises.warriorSequence.title",
      description: "yogaPrograms.powerFlow.exercises.warriorSequence.description",
      video: {
        videoId: "oBu-pQG6sTY",
        title: "yogaPrograms.powerFlow.exercises.warriorSequence.video.title",
        description: "yogaPrograms.powerFlow.exercises.warriorSequence.video.description"
      },
      focus_bodyPart: ["legs", "core", "balance"],
      avoid_differentials: ["knee pain", "ankle instability"]
    },
    {
      title: "yogaPrograms.powerFlow.exercises.chatupranga.title",
      description: "yogaPrograms.powerFlow.exercises.chatupranga.description",
      video: {
        videoId: "4pLVqJElCas",
        title: "yogaPrograms.powerFlow.exercises.chatupranga.video.title",
        description: "yogaPrograms.powerFlow.exercises.chatupranga.video.description"
      },
      focus_bodyPart: ["arms", "core", "chest"],
      avoid_differentials: ["wrist pain", "shoulder impingement"]
    },
    {
      title: "yogaPrograms.powerFlow.exercises.armBalance.title",
      description: "yogaPrograms.powerFlow.exercises.armBalance.description",
      video: {
        videoId: "whVDHWwK3QM",
        title: "yogaPrograms.powerFlow.exercises.armBalance.video.title",
        description: "yogaPrograms.powerFlow.exercises.armBalance.video.description"
      },
      focus_bodyPart: ["arms", "core", "balance"],
      avoid_differentials: ["wrist pain", "shoulder injury"]
    }
  ]
};