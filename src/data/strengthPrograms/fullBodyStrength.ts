import { StrengthProgram } from "@/types/strengthProgram";

export const fullBodyStrengthProgram: StrengthProgram = {
  id: "full-body-strength",
  title: "strengthPrograms.fullBodyStrength.title",
  description: "strengthPrograms.fullBodyStrength.description",
  listDescription: [
    "strengthPrograms.fullBodyStrength.listDescription.0",
    "strengthPrograms.fullBodyStrength.listDescription.1",
    "strengthPrograms.fullBodyStrength.listDescription.2",
    "strengthPrograms.fullBodyStrength.listDescription.3"
  ],
  time: "25 min",
  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
  focus_bodyPart: ["full-body", "strength", "muscle-building"],
  avoid_differentials: ["acute-injury", "post-surgery", "severe-pain"],
  exercises: [
    {
      title: "strengthPrograms.fullBodyStrength.exercises.bodyweightSquats.title",
      description: "strengthPrograms.fullBodyStrength.exercises.bodyweightSquats.description",
      video: {
        videoId: "m0GcZ24pK6k",
        title: "strengthPrograms.fullBodyStrength.exercises.bodyweightSquats.video.title",
        description: "strengthPrograms.fullBodyStrength.exercises.bodyweightSquats.video.description"
      },
      focus_bodyPart: ["legs", "glutes", "quadriceps", "hamstrings"],
      avoid_differentials: ["knee-injury", "patellofemoral-dysfunction", "meniscal-irritation"],
      repetitions: "12-15 reps"
    },
    {
      title: "strengthPrograms.fullBodyStrength.exercises.pushUps.title",
      description: "strengthPrograms.fullBodyStrength.exercises.pushUps.description",
      video: {
        videoId: "HHRDXEG1YCU",
        title: "strengthPrograms.fullBodyStrength.exercises.pushUps.video.title",
        description: "strengthPrograms.fullBodyStrength.exercises.pushUps.video.description"
      },
      focus_bodyPart: ["chest", "triceps", "shoulders", "core"],
      avoid_differentials: ["shoulder-injury", "wrist-pain", "elbow-problems"],
      repetitions: "8-12 reps"
    },
    {
      title: "strengthPrograms.fullBodyStrength.exercises.reverseLunges.title",
      description: "strengthPrograms.fullBodyStrength.exercises.reverseLunges.description",
      video: {
        videoId: "xrPteyQLGAo",
        title: "strengthPrograms.fullBodyStrength.exercises.reverseLunges.video.title",
        description: "strengthPrograms.fullBodyStrength.exercises.reverseLunges.video.description"
      },
      focus_bodyPart: ["legs", "glutes", "quadriceps", "hamstrings", "core"],
      avoid_differentials: ["knee-injury", "hip-instability", "patellar-tendon-stress"],
      repetitions: "10-12 reps each leg"
    },
    {
      title: "strengthPrograms.fullBodyStrength.exercises.gluteBridge.title",
      description: "strengthPrograms.fullBodyStrength.exercises.gluteBridge.description",
      video: {
        videoId: "ktSiNvWzYWY",
        title: "strengthPrograms.fullBodyStrength.exercises.gluteBridge.video.title",
        description: "strengthPrograms.fullBodyStrength.exercises.gluteBridge.video.description"
      },
      focus_bodyPart: ["glutes", "hamstrings", "core", "hip-flexors"],
      avoid_differentials: ["acute-back-pain", "disc-herniation"],
      repetitions: "12-15 reps"
    },
    {
      title: "strengthPrograms.fullBodyStrength.exercises.calfRaises.title",
      description: "strengthPrograms.fullBodyStrength.exercises.calfRaises.description",
      video: {
        videoId: "g_QWWxD-XhY",
        title: "strengthPrograms.fullBodyStrength.exercises.calfRaises.video.title",
        description: "strengthPrograms.fullBodyStrength.exercises.calfRaises.video.description"
      },
      focus_bodyPart: ["calves", "ankles", "balance"],
      avoid_differentials: ["achilles-tendinopathy", "plantar-fasciitis"],
      repetitions: "15-20 reps"
    },
    {
      title: "strengthPrograms.fullBodyStrength.exercises.superman.title",
      description: "strengthPrograms.fullBodyStrength.exercises.superman.description",
      video: {
        videoId: "VD6ma6oe4ZA",
        title: "strengthPrograms.fullBodyStrength.exercises.superman.video.title",
        description: "strengthPrograms.fullBodyStrength.exercises.superman.video.description"
      },
      focus_bodyPart: ["back", "glutes", "hamstrings", "shoulders"],
      avoid_differentials: ["acute-disc-herniation", "severe-back-pain"],
      repetitions: "10-12 reps"
    },
    {
      title: "strengthPrograms.fullBodyStrength.exercises.sideLunges.title",
      description: "strengthPrograms.fullBodyStrength.exercises.sideLunges.description",
      video: {
        videoId: "xIM5z2nwE4U",
        title: "strengthPrograms.fullBodyStrength.exercises.sideLunges.video.title",
        description: "strengthPrograms.fullBodyStrength.exercises.sideLunges.video.description"
      },
      focus_bodyPart: ["glutes", "inner-thighs", "outer-thighs", "quadriceps", "hips"],
      avoid_differentials: ["groin-injury", "hip-joint-irritation", "adductor-weakness"],
      repetitions: "8-10 reps each side"
    }
  ]
};