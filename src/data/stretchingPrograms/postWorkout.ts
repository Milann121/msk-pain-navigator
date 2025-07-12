import { StretchingProgram } from "@/types/stretchingProgram";

export const postWorkoutProgram: StretchingProgram = {
  id: "post-workout",
  title: "stretchingPrograms.postWorkout.title",
  description: "stretchingPrograms.postWorkout.description",
  listDescription: [
    "stretchingPrograms.postWorkout.listDescription.1",
    "stretchingPrograms.postWorkout.listDescription.2",
    "stretchingPrograms.postWorkout.listDescription.3",
    "stretchingPrograms.postWorkout.listDescription.4",
    "stretchingPrograms.postWorkout.listDescription.5"
  ],
  time: "15 min",
  image: "/lovable-uploads/stretchingCard_images/8.png",
  focus_bodyPart: ["legs", "back", "recovery"],
  avoid_differentials: [],
  exercises: [
    {
      title: "stretchingPrograms.postWorkout.exercises.gluteStretch.title",
      description: "stretchingPrograms.postWorkout.exercises.gluteStretch.description",
      video: {
        videoId: "PMJsVceAnnY",
        title: "stretchingPrograms.postWorkout.exercises.gluteStretch.video.title",
        description: "stretchingPrograms.postWorkout.exercises.gluteStretch.video.description"
      },
      focus_bodyPart: ["glutes", "hips"],
      avoid_differentials: []
    },
    {
      title: "stretchingPrograms.postWorkout.exercises.spinalMobility.title",
      description: "stretchingPrograms.postWorkout.exercises.spinalMobility.description",
      video: {
        videoId: "XspRg50nn30",
        title: "stretchingPrograms.postWorkout.exercises.spinalMobility.video.title",
        description: "stretchingPrograms.postWorkout.exercises.spinalMobility.video.description"
      },
      focus_bodyPart: ["spine", "lower-back"],
      avoid_differentials: ["disc herniation"]
    },
    {
      title: "stretchingPrograms.postWorkout.exercises.recoveryBreathing.title",
      description: "stretchingPrograms.postWorkout.exercises.recoveryBreathing.description",
      video: {
        videoId: "Wan8QnjTmiQ",
        title: "stretchingPrograms.postWorkout.exercises.recoveryBreathing.video.title",
        description: "stretchingPrograms.postWorkout.exercises.recoveryBreathing.video.description"
      },
      focus_bodyPart: ["core", "mind"],
      avoid_differentials: []
    }
  ]
};