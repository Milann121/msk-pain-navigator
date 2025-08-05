import { StretchingProgram } from "@/types/stretchingProgram";

export const morningRoutineProgram: StretchingProgram = {
  id: "morning-routine",
  title: "stretchingPrograms.morningRoutine.title",
  description: "stretchingPrograms.morningRoutine.description",
  listDescription: [
    "stretchingPrograms.morningRoutine.listDescription.1",
    "stretchingPrograms.morningRoutine.listDescription.2",
    "stretchingPrograms.morningRoutine.listDescription.3",
    "stretchingPrograms.morningRoutine.listDescription.4",
    "stretchingPrograms.morningRoutine.listDescription.5",
    "stretchingPrograms.morningRoutine.listDescription.6"
  ],
  time: "12 min",
  image: "/lovable-uploads/stretchingCard_images/2.png",
  focus_bodyPart: ["full-body", "spine", "hips", "hamstrings", "calves", "shoulders"],
  avoid_differentials: ["facet joint syndrome", "nerve compression", "disc herniation", "achilles tendinopathy", "hip injury"],
  exercises: [
    {
      title: "stretchingPrograms.morningRoutine.exercises.catCow.title",
      description: "stretchingPrograms.morningRoutine.exercises.catCow.description",
      video: {
        videoId: "LIVJZZyZ2qM",
        title: "stretchingPrograms.morningRoutine.exercises.catCow.video.title",
        description: "stretchingPrograms.morningRoutine.exercises.catCow.video.description"
      },
      focus_bodyPart: ["spine", "lower-back", "shoulders", "neck"],
      avoid_differentials: ["facet joint syndrome"],
      repetitions: "8-10 repetitions"
    },
    {
      title: "stretchingPrograms.morningRoutine.exercises.sideBend.title",
      description: "stretchingPrograms.morningRoutine.exercises.sideBend.description",
      video: {
        videoId: "QNw-mjxePb8",
        title: "stretchingPrograms.morningRoutine.exercises.sideBend.video.title",
        description: "stretchingPrograms.morningRoutine.exercises.sideBend.video.description"
      },
      focus_bodyPart: ["core", "obliques", "middle-back"],
      avoid_differentials: ["nerve compression"],
      repetitions: "5-8 repetitions each side"
    },
    {
      title: "stretchingPrograms.morningRoutine.exercises.forwardBend.title",
      description: "stretchingPrograms.morningRoutine.exercises.forwardBend.description",
      video: {
        videoId: "inLULJztZh0",
        title: "stretchingPrograms.morningRoutine.exercises.forwardBend.video.title",
        description: "stretchingPrograms.morningRoutine.exercises.forwardBend.video.description"
      },
      focus_bodyPart: ["hamstrings", "calves", "lower-back"],
      avoid_differentials: ["nerve compression"],
      repetitions: "Hold for 20-30 seconds"
    },
    {
      title: "stretchingPrograms.morningRoutine.exercises.hipFlexor.title",
      description: "stretchingPrograms.morningRoutine.exercises.hipFlexor.description",
      video: {
        videoId: "tsGPYSQbZx4",
        title: "stretchingPrograms.morningRoutine.exercises.hipFlexor.video.title",
        description: "stretchingPrograms.morningRoutine.exercises.hipFlexor.video.description"
      },
      focus_bodyPart: ["hips", "hip-flexors", "core"],
      avoid_differentials: ["hip injury"],
      repetitions: "Hold for 30 seconds each leg"
    },
    {
      title: "stretchingPrograms.morningRoutine.exercises.calfStretch.title",
      description: "stretchingPrograms.morningRoutine.exercises.calfStretch.description",
      video: {
        videoId: "dEJgPRgsnnY",
        title: "stretchingPrograms.morningRoutine.exercises.calfStretch.video.title",
        description: "stretchingPrograms.morningRoutine.exercises.calfStretch.video.description"
      },
      focus_bodyPart: ["calves"],
      avoid_differentials: ["achilles tendinopathy"],
      repetitions: "Hold for 30 seconds each leg"
    },
    {
      title: "stretchingPrograms.morningRoutine.exercises.downwardDog.title",
      description: "stretchingPrograms.morningRoutine.exercises.downwardDog.description",
      video: {
        videoId: "ayQoxw8sRTk",
        title: "stretchingPrograms.morningRoutine.exercises.downwardDog.video.title",
        description: "stretchingPrograms.morningRoutine.exercises.downwardDog.video.description"
      },
      focus_bodyPart: ["full-body", "shoulders", "hamstrings", "calves"],
      avoid_differentials: ["disc herniation"],
      repetitions: "Hold for 30-45 seconds"
    }
  ]
};