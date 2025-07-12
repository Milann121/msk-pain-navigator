import { YogaProgram } from "@/types/yogaProgram";

export const legFocusProgram: YogaProgram = {
  id: "leg-focus",
  title: "yogaPrograms.legFocus.title",
  description: "yogaPrograms.legFocus.description",
  listDescription: [
    "yogaPrograms.legFocus.listDescription.1",
    "yogaPrograms.legFocus.listDescription.2",
    "yogaPrograms.legFocus.listDescription.3",
    "yogaPrograms.legFocus.listDescription.4"
  ],
  time: "25 min",
  image: "/lovable-uploads/stretchingCard_images/7.png",
  focus_bodyPart: ["hips", "quadriceps", "hamstrings", "glutes"],
  avoid_differentials: ["knee injury"],
  exercises: [
    {
      title: "yogaPrograms.legFocus.exercises.pigeonPose.title",
      description: "yogaPrograms.legFocus.exercises.pigeonPose.description",
      video: {
        videoId: "0_VJ0isNCHM",
        title: "yogaPrograms.legFocus.exercises.pigeonPose.video.title",
        description: "yogaPrograms.legFocus.exercises.pigeonPose.video.description"
      },
      focus_bodyPart: ["hips", "glutes"],
      avoid_differentials: ["knee injury", "hip injury"]
    },
    {
      title: "yogaPrograms.legFocus.exercises.lizardPose.title",
      description: "yogaPrograms.legFocus.exercises.lizardPose.description",
      video: {
        videoId: "qG_Nuub4W6Q",
        title: "yogaPrograms.legFocus.exercises.lizardPose.video.title",
        description: "yogaPrograms.legFocus.exercises.lizardPose.video.description"
      },
      focus_bodyPart: ["hip-flexors", "quadriceps"],
      avoid_differentials: ["groin strain"]
    },
    {
      title: "yogaPrograms.legFocus.exercises.seatedForwardFold.title",
      description: "yogaPrograms.legFocus.exercises.seatedForwardFold.description",
      video: {
        videoId: "Z2KYFbsP1mE",
        title: "yogaPrograms.legFocus.exercises.seatedForwardFold.video.title",
        description: "yogaPrograms.legFocus.exercises.seatedForwardFold.video.description"
      },
      focus_bodyPart: ["hamstrings", "calves"],
      avoid_differentials: ["lower back injury"]
    }
  ]
};