import { StrengthProgram } from "@/types/strengthProgram";

export const pushUpsProgram: StrengthProgram = {
  id: "push-ups",
  title: "strengthPrograms.pushUps.title",
  description: "strengthPrograms.pushUps.description",
  listDescription: [
    "strengthPrograms.pushUps.listDescription.1",
    "strengthPrograms.pushUps.listDescription.2",
    "strengthPrograms.pushUps.listDescription.3",
    "strengthPrograms.pushUps.listDescription.4"
  ],
  time: "10 min",
  image: "/lovable-uploads/stretchingCard_images/1.png",
  focus_bodyPart: ["chest", "shoulders", "triceps", "core"],
  avoid_differentials: ["shoulder impingement"],
  exercises: [
    {
      title: "strengthPrograms.pushUps.exercises.basicPushUp.title",
      description: "strengthPrograms.pushUps.exercises.basicPushUp.description",
      video: {
        videoId: "IODxDxX7oi4",
        title: "strengthPrograms.pushUps.exercises.basicPushUp.video.title",
        description: "strengthPrograms.pushUps.exercises.basicPushUp.video.description"
      },
      focus_bodyPart: ["chest", "shoulders", "triceps"],
      avoid_differentials: ["shoulder impingement", "wrist pain"],
      repetitions: "10-12x"
    },
    {
      title: "strengthPrograms.pushUps.exercises.inclinePushUp.title",
      description: "strengthPrograms.pushUps.exercises.inclinePushUp.description",
      video: {
        videoId: "4dF1DOWzf20",
        title: "strengthPrograms.pushUps.exercises.inclinePushUp.video.title",
        description: "strengthPrograms.pushUps.exercises.inclinePushUp.video.description"
      },
      focus_bodyPart: ["chest", "shoulders"],
      avoid_differentials: [],
      repetitions: "10-12x"
    },
    {
      title: "strengthPrograms.pushUps.exercises.diamondPushUp.title",
      description: "strengthPrograms.pushUps.exercises.diamondPushUp.description",
      video: {
        videoId: "J0DnG1_S92I",
        title: "strengthPrograms.pushUps.exercises.diamondPushUp.video.title",
        description: "strengthPrograms.pushUps.exercises.diamondPushUp.video.description"
      },
      focus_bodyPart: ["triceps", "chest"],
      avoid_differentials: ["wrist pain", "elbow pain"],
      repetitions: "10-12x"
    }
  ]
};