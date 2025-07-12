import { StrengthProgram } from "@/types/strengthProgram";

export const pullUpsProgram: StrengthProgram = {
  id: "pull-ups",
  title: "strengthPrograms.pullUps.title",
  description: "strengthPrograms.pullUps.description",
  listDescription: [
    "strengthPrograms.pullUps.listDescription.1",
    "strengthPrograms.pullUps.listDescription.2",
    "strengthPrograms.pullUps.listDescription.3",
    "strengthPrograms.pullUps.listDescription.4"
  ],
  time: "18 min",
  image: "/lovable-uploads/stretchingCard_images/7.png",
  focus_bodyPart: ["lats", "biceps", "rhomboids", "rear-delts"],
  avoid_differentials: ["shoulder impingement", "elbow pain"],
  exercises: [
    {
      title: "strengthPrograms.pullUps.exercises.assistedPullUp.title",
      description: "strengthPrograms.pullUps.exercises.assistedPullUp.description",
      video: {
        videoId: "fO3dKSQayfg",
        title: "strengthPrograms.pullUps.exercises.assistedPullUp.video.title",
        description: "strengthPrograms.pullUps.exercises.assistedPullUp.video.description"
      },
      focus_bodyPart: ["lats", "biceps"],
      avoid_differentials: ["shoulder impingement"]
    },
    {
      title: "strengthPrograms.pullUps.exercises.negativesPullUp.title",
      description: "strengthPrograms.pullUps.exercises.negativesPullUp.description",
      video: {
        videoId: "mRznU6pzez0",
        title: "strengthPrograms.pullUps.exercises.negativesPullUp.video.title",
        description: "strengthPrograms.pullUps.exercises.negativesPullUp.video.description"
      },
      focus_bodyPart: ["lats", "rhomboids"],
      avoid_differentials: ["elbow pain"]
    },
    {
      title: "strengthPrograms.pullUps.exercises.chinUps.title",
      description: "strengthPrograms.pullUps.exercises.chinUps.description",
      video: {
        videoId: "brhRXlOhkAM",
        title: "strengthPrograms.pullUps.exercises.chinUps.video.title",
        description: "strengthPrograms.pullUps.exercises.chinUps.video.description"
      },
      focus_bodyPart: ["biceps", "lats"],
      avoid_differentials: ["elbow pain", "wrist pain"]
    }
  ]
};