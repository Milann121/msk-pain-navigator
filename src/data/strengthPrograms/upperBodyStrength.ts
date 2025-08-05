import { StrengthProgram } from "@/types/strengthProgram";

export const upperBodyStrengthProgram: StrengthProgram = {
  id: "upper-body-strength",
  title: "strengthPrograms.upperBodyStrength.title",
  description: "strengthPrograms.upperBodyStrength.description",
  listDescription: [
    "strengthPrograms.upperBodyStrength.listDescription.0",
    "strengthPrograms.upperBodyStrength.listDescription.1",
    "strengthPrograms.upperBodyStrength.listDescription.2",
    "strengthPrograms.upperBodyStrength.listDescription.3"
  ],
  time: "20 min",
  image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop",
  focus_bodyPart: ["upper-body", "chest", "shoulders", "triceps", "core"],
  avoid_differentials: ["shoulder-injury", "wrist-pain", "elbow-problems"],
  exercises: [
    {
      title: "strengthPrograms.upperBodyStrength.exercises.pushUps.title",
      description: "strengthPrograms.upperBodyStrength.exercises.pushUps.description",
      video: {
        videoId: "HHRDXEG1YCU",
        title: "strengthPrograms.upperBodyStrength.exercises.pushUps.video.title",
        description: "strengthPrograms.upperBodyStrength.exercises.pushUps.video.description"
      },
      focus_bodyPart: ["chest", "shoulders", "triceps"],
      avoid_differentials: ["shoulder-injury", "elbow-pain"],
      repetitions: "8-12 reps"
    },
    {
      title: "strengthPrograms.upperBodyStrength.exercises.tricepDips.title",
      description: "strengthPrograms.upperBodyStrength.exercises.tricepDips.description",
      video: {
        videoId: "n8svblH-Nwo",
        title: "strengthPrograms.upperBodyStrength.exercises.tricepDips.video.title",
        description: "strengthPrograms.upperBodyStrength.exercises.tricepDips.video.description"
      },
      focus_bodyPart: ["triceps", "shoulders", "chest"],
      avoid_differentials: ["shoulder-injury", "elbow-pain"],
      repetitions: "8-10 reps"
    },
    {
      title: "strengthPrograms.upperBodyStrength.exercises.plankShoulderTaps.title",
      description: "strengthPrograms.upperBodyStrength.exercises.plankShoulderTaps.description",
      video: {
        videoId: "J9QSqLq4L6U",
        title: "strengthPrograms.upperBodyStrength.exercises.plankShoulderTaps.video.title",
        description: "strengthPrograms.upperBodyStrength.exercises.plankShoulderTaps.video.description"
      },
      focus_bodyPart: ["core", "shoulders", "arms"],
      avoid_differentials: ["wrist-pain", "shoulder-injury"],
      repetitions: "10-12 taps each side"
    },
    {
      title: "strengthPrograms.upperBodyStrength.exercises.plank.title",
      description: "strengthPrograms.upperBodyStrength.exercises.plank.description",
      video: {
        videoId: "koxeNKdWm3c",
        title: "strengthPrograms.upperBodyStrength.exercises.plank.video.title",
        description: "strengthPrograms.upperBodyStrength.exercises.plank.video.description"
      },
      focus_bodyPart: ["core", "shoulders", "back"],
      avoid_differentials: ["lower-back-pain", "shoulder-injury"],
      repetitions: "30-60 seconds"
    },
    {
      title: "strengthPrograms.upperBodyStrength.exercises.superman.title",
      description: "strengthPrograms.upperBodyStrength.exercises.superman.description",
      video: {
        videoId: "VD6ma6oe4ZA",
        title: "strengthPrograms.upperBodyStrength.exercises.superman.video.title",
        description: "strengthPrograms.upperBodyStrength.exercises.superman.video.description"
      },
      focus_bodyPart: ["back", "glutes", "hamstrings"],
      avoid_differentials: ["lower-back-pain", "neck-problems"],
      repetitions: "10-12 reps"
    }
  ]
};