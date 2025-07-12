import { StretchingProgram } from "@/types/stretchingProgram";

export const eveningRelaxationProgram: StretchingProgram = {
  id: "evening-relaxation",
  title: "stretchingPrograms.eveningRelaxation.title",
  description: "stretchingPrograms.eveningRelaxation.description",
  listDescription: [
    "stretchingPrograms.eveningRelaxation.listDescription.1",
    "stretchingPrograms.eveningRelaxation.listDescription.2",
    "stretchingPrograms.eveningRelaxation.listDescription.3",
    "stretchingPrograms.eveningRelaxation.listDescription.4"
  ],
  time: "12 min",
  image: "/lovable-uploads/stretchingCard_images/7.png",
  focus_bodyPart: ["full-body", "mind"],
  avoid_differentials: [],
  exercises: [
    {
      title: "stretchingPrograms.eveningRelaxation.exercises.gentleRotation.title",
      description: "stretchingPrograms.eveningRelaxation.exercises.gentleRotation.description",
      video: {
        videoId: "OKsRn5e2VJY",
        title: "stretchingPrograms.eveningRelaxation.exercises.gentleRotation.video.title",
        description: "stretchingPrograms.eveningRelaxation.exercises.gentleRotation.video.description"
      },
      focus_bodyPart: ["middle-back", "spine"],
      avoid_differentials: []
    },
    {
      title: "stretchingPrograms.eveningRelaxation.exercises.deepBreathing.title",
      description: "stretchingPrograms.eveningRelaxation.exercises.deepBreathing.description",
      video: {
        videoId: "PK62xMsZfG0",
        title: "stretchingPrograms.eveningRelaxation.exercises.deepBreathing.video.title",
        description: "stretchingPrograms.eveningRelaxation.exercises.deepBreathing.video.description"
      },
      focus_bodyPart: ["chest", "mind"],
      avoid_differentials: []
    },
    {
      title: "stretchingPrograms.eveningRelaxation.exercises.gentleMassage.title",
      description: "stretchingPrograms.eveningRelaxation.exercises.gentleMassage.description",
      video: {
        videoId: "dxzegzGNdaU",
        title: "stretchingPrograms.eveningRelaxation.exercises.gentleMassage.video.title",
        description: "stretchingPrograms.eveningRelaxation.exercises.gentleMassage.video.description"
      },
      focus_bodyPart: ["middle-back", "neck"],
      avoid_differentials: []
    }
  ]
};