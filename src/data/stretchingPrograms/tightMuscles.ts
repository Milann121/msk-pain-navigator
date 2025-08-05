import { StretchingProgram } from "@/types/stretchingProgram";

export const tightMusclesProgram: StretchingProgram = {
  id: "tight-muscles",
  title: "stretchingPrograms.tightMuscles.title",
  description: "stretchingPrograms.tightMuscles.description",
  listDescription: [
    "stretchingPrograms.tightMuscles.listDescription.1",
    "stretchingPrograms.tightMuscles.listDescription.2",
    "stretchingPrograms.tightMuscles.listDescription.3",
    "stretchingPrograms.tightMuscles.listDescription.4"
  ],
  time: "12 min",
  image: "/lovable-uploads/stretchingCard_images/7.png",
  focus_bodyPart: ["full-body", "hips", "back", "legs"],
  avoid_differentials: ["disc herniation", "acute lumbar strain"],
  exercises: [
    {
      title: "stretchingPrograms.tightMuscles.exercises.piriformisStretch.title",
      description: "stretchingPrograms.tightMuscles.exercises.piriformisStretch.description",
      video: {
        videoId: "-g0nuyTHMrI",
        title: "stretchingPrograms.tightMuscles.exercises.piriformisStretch.video.title",
        description: "stretchingPrograms.tightMuscles.exercises.piriformisStretch.video.description"
      },
      focus_bodyPart: ["glutes", "hips"],
      avoid_differentials: ["disc herniation", "piriformis syndrome"],
      repetitions: "30s each side"
    },
    {
      title: "stretchingPrograms.tightMuscles.exercises.hipFlexorStretch.title",
      description: "stretchingPrograms.tightMuscles.exercises.hipFlexorStretch.description",
      video: {
        videoId: "tsGPYSQbZx4",
        title: "stretchingPrograms.tightMuscles.exercises.hipFlexorStretch.video.title",
        description: "stretchingPrograms.tightMuscles.exercises.hipFlexorStretch.video.description"
      },
      focus_bodyPart: ["hips", "groin"],
      avoid_differentials: ["femoroacetabular impingement"],
      repetitions: "30s each side"
    },
    {
      title: "stretchingPrograms.tightMuscles.exercises.hamstringStretch.title",
      description: "stretchingPrograms.tightMuscles.exercises.hamstringStretch.description",
      video: {
        videoId: "W5ZRsgwi9ec",
        title: "stretchingPrograms.tightMuscles.exercises.hamstringStretch.video.title",
        description: "stretchingPrograms.tightMuscles.exercises.hamstringStretch.video.description"
      },
      focus_bodyPart: ["hamstrings", "lower-back"],
      avoid_differentials: ["sciatic nerve irritation"],
      repetitions: "30s each leg"
    },
    {
      title: "stretchingPrograms.tightMuscles.exercises.childsPose.title",
      description: "stretchingPrograms.tightMuscles.exercises.childsPose.description",
      video: {
        videoId: "_ZX_zTOBgp8",
        title: "stretchingPrograms.tightMuscles.exercises.childsPose.video.title",
        description: "stretchingPrograms.tightMuscles.exercises.childsPose.video.description"
      },
      focus_bodyPart: ["back", "hips", "shoulders"],
      avoid_differentials: ["disc herniation", "knee injuries"],
      repetitions: "45s hold"
    },
    {
      title: "stretchingPrograms.tightMuscles.exercises.downwardDog.title",
      description: "stretchingPrograms.tightMuscles.exercises.downwardDog.description",
      video: {
        videoId: "ayQoxw8sRTk",
        title: "stretchingPrograms.tightMuscles.exercises.downwardDog.video.title",
        description: "stretchingPrograms.tightMuscles.exercises.downwardDog.video.description"
      },
      focus_bodyPart: ["hamstrings", "calves", "shoulders", "back"],
      avoid_differentials: ["rotator cuff impingement", "wrist injuries"],
      repetitions: "30s hold"
    },
    {
      title: "stretchingPrograms.tightMuscles.exercises.spinalTwist.title",
      description: "stretchingPrograms.tightMuscles.exercises.spinalTwist.description",
      video: {
        videoId: "sI44ZU33DjA",
        title: "stretchingPrograms.tightMuscles.exercises.spinalTwist.video.title",
        description: "stretchingPrograms.tightMuscles.exercises.spinalTwist.video.description"
      },
      focus_bodyPart: ["spine", "glutes", "chest"],
      avoid_differentials: ["acute back injury", "disc herniation"],
      repetitions: "30s each side"
    }
  ]
};