import { StretchingProgram } from "@/types/stretchingProgram";

export const atOfficeProgram: StretchingProgram = {
  id: "at-office",
  title: "stretchingPrograms.atOffice.title",
  description: "stretchingPrograms.atOffice.description", 
  listDescription: [
    "stretchingPrograms.atOffice.listDescription.1",
    "stretchingPrograms.atOffice.listDescription.2",
    "stretchingPrograms.atOffice.listDescription.3",
    "stretchingPrograms.atOffice.listDescription.4",
    "stretchingPrograms.atOffice.listDescription.5"
  ],
  time: "8 min",
  image: "/lovable-uploads/stretchingCard_images/11.png",
  focus_bodyPart: ["neck", "shoulders", "back", "glutes", "calves"],
  avoid_differentials: ["nerve involvement", "rotator cuff tendinopathy", "cervical radiculopathy"],
  exercises: [
    {
      title: "stretchingPrograms.atOffice.exercises.seatedSideBend.title",
      description: "stretchingPrograms.atOffice.exercises.seatedSideBend.description",
      video: {
        videoId: "RTZf-pIlaWg",
        title: "stretchingPrograms.atOffice.exercises.seatedSideBend.video.title",
        description: "stretchingPrograms.atOffice.exercises.seatedSideBend.video.description"
      },
      focus_bodyPart: ["obliques", "back"],
      avoid_differentials: ["nerve involvement", "rib issues"],
      repetitions: "30s each side"
    },
    {
      title: "stretchingPrograms.atOffice.exercises.crossBodyShoulder.title",
      description: "stretchingPrograms.atOffice.exercises.crossBodyShoulder.description",
      video: {
        videoId: "h_5_0zAzU5Y",
        title: "stretchingPrograms.atOffice.exercises.crossBodyShoulder.video.title",
        description: "stretchingPrograms.atOffice.exercises.crossBodyShoulder.video.description"
      },
      focus_bodyPart: ["shoulders", "posterior-deltoid"],
      avoid_differentials: ["rotator cuff tendinopathy"],
      repetitions: "30s each side"
    },
    {
      title: "stretchingPrograms.atOffice.exercises.earToShoulder.title",
      description: "stretchingPrograms.atOffice.exercises.earToShoulder.description",
      video: {
        videoId: "WgtMA-xi_EY",
        title: "stretchingPrograms.atOffice.exercises.earToShoulder.video.title",
        description: "stretchingPrograms.atOffice.exercises.earToShoulder.video.description"
      },
      focus_bodyPart: ["neck", "upper-trapezius"],
      avoid_differentials: ["cervical radiculopathy"],
      repetitions: "30s each side"
    },
    {
      title: "stretchingPrograms.atOffice.exercises.figureFourGlute.title",
      description: "stretchingPrograms.atOffice.exercises.figureFourGlute.description",
      video: {
        videoId: "2E8WWX4cOc4",
        title: "stretchingPrograms.atOffice.exercises.figureFourGlute.video.title",
        description: "stretchingPrograms.atOffice.exercises.figureFourGlute.video.description"
      },
      focus_bodyPart: ["glutes", "hips"],
      avoid_differentials: ["sciatic nerve issues"],
      repetitions: "30s each side"
    },
    {
      title: "stretchingPrograms.atOffice.exercises.calfStretchChair.title",
      description: "stretchingPrograms.atOffice.exercises.calfStretchChair.description",
      video: {
        videoId: "dEJgPRgsnnY",
        title: "stretchingPrograms.atOffice.exercises.calfStretchChair.video.title",
        description: "stretchingPrograms.atOffice.exercises.calfStretchChair.video.description"
      },
      focus_bodyPart: ["calves"],
      avoid_differentials: ["vascular issues"],
      repetitions: "30s each side"
    }
  ]
};