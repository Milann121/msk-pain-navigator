import { StretchingProgram } from "@/types/stretchingProgram";

export const morningFlowProgram: StretchingProgram = {
  id: "morning-flow",
  title: "stretchingPrograms.morningFlow.title",
  description: "stretchingPrograms.morningFlow.description",
  listDescription: [
    "stretchingPrograms.morningFlow.listDescription.1",
    "stretchingPrograms.morningFlow.listDescription.2",
    "stretchingPrograms.morningFlow.listDescription.3",
    "stretchingPrograms.morningFlow.listDescription.4",
    "stretchingPrograms.morningFlow.listDescription.5"
  ],
  time: "8 min",
  image: "/lovable-uploads/stretchingCard_images/1.png",
  focus_bodyPart: ["full-body", "spine", "hips"],
  avoid_differentials: [],
  exercises: [
    {
      title: "stretchingPrograms.morningFlow.exercises.spinalWave.title",
      description: "stretchingPrograms.morningFlow.exercises.spinalWave.description",
      video: {
        videoId: "L1Mf3NxYwgY",
        title: "stretchingPrograms.morningFlow.exercises.spinalWave.video.title",
        description: "stretchingPrograms.morningFlow.exercises.spinalWave.video.description"
      },
      focus_bodyPart: ["spine", "lower-back"],
      avoid_differentials: ["facet joint syndrome"]
    },
    {
      title: "stretchingPrograms.morningFlow.exercises.hipOpener.title",
      description: "stretchingPrograms.morningFlow.exercises.hipOpener.description",
      video: {
        videoId: "PMJsVceAnnY",
        title: "stretchingPrograms.morningFlow.exercises.hipOpener.video.title",
        description: "stretchingPrograms.morningFlow.exercises.hipOpener.video.description"
      },
      focus_bodyPart: ["hips", "glutes"],
      avoid_differentials: []
    },
    {
      title: "stretchingPrograms.morningFlow.exercises.thoracicExtension.title",
      description: "stretchingPrograms.morningFlow.exercises.thoracicExtension.description",
      video: {
        videoId: "rhPOJA3S-IQ",
        title: "stretchingPrograms.morningFlow.exercises.thoracicExtension.video.title",
        description: "stretchingPrograms.morningFlow.exercises.thoracicExtension.video.description"
      },
      focus_bodyPart: ["middle-back", "chest"],
      avoid_differentials: []
    }
  ]
};