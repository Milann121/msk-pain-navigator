import { StrengthProgram } from "@/types/strengthProgram";

export const lowerBodyStrengthProgram: StrengthProgram = {
  id: "lower-body-strength",
  title: "strengthPrograms.lowerBodyStrength.title",
  description: "strengthPrograms.lowerBodyStrength.description",
  listDescription: [
    "strengthPrograms.lowerBodyStrength.listDescription.0",
    "strengthPrograms.lowerBodyStrength.listDescription.1",
    "strengthPrograms.lowerBodyStrength.listDescription.2",
    "strengthPrograms.lowerBodyStrength.listDescription.3"
  ],
  time: "22 min",
  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
  focus_bodyPart: ["lower-body", "legs", "glutes", "calves"],
  avoid_differentials: ["knee-injury", "ankle-problems", "hip-pain"],
  exercises: [
    {
      title: "strengthPrograms.lowerBodyStrength.exercises.bodyweightSquats.title",
      description: "strengthPrograms.lowerBodyStrength.exercises.bodyweightSquats.description",
      video: {
        videoId: "m0GcZ24pK6k",
        title: "strengthPrograms.lowerBodyStrength.exercises.bodyweightSquats.video.title",
        description: "strengthPrograms.lowerBodyStrength.exercises.bodyweightSquats.video.description"
      },
      focus_bodyPart: ["quadriceps", "glutes", "hamstrings"],
      avoid_differentials: ["knee-injury", "patellofemoral-dysfunction"],
      repetitions: "12-15 reps"
    },
    {
      title: "strengthPrograms.lowerBodyStrength.exercises.reverseLunges.title",
      description: "strengthPrograms.lowerBodyStrength.exercises.reverseLunges.description",
      video: {
        videoId: "xrPteyQLGAo",
        title: "strengthPrograms.lowerBodyStrength.exercises.reverseLunges.video.title",
        description: "strengthPrograms.lowerBodyStrength.exercises.reverseLunges.video.description"
      },
      focus_bodyPart: ["legs", "glutes", "balance"],
      avoid_differentials: ["knee-injury", "patellar-tendon-stress"],
      repetitions: "10-12 reps each leg"
    },
    {
      title: "strengthPrograms.lowerBodyStrength.exercises.sideLunges.title",
      description: "strengthPrograms.lowerBodyStrength.exercises.sideLunges.description",
      video: {
        videoId: "xIM5z2nwE4U",
        title: "strengthPrograms.lowerBodyStrength.exercises.sideLunges.video.title",
        description: "strengthPrograms.lowerBodyStrength.exercises.sideLunges.video.description"
      },
      focus_bodyPart: ["adductors", "abductors", "glutes"],
      avoid_differentials: ["groin-injury", "medial-knee-pain"],
      repetitions: "8-10 reps each side"
    },
    {
      title: "strengthPrograms.lowerBodyStrength.exercises.gluteBridge.title",
      description: "strengthPrograms.lowerBodyStrength.exercises.gluteBridge.description",
      video: {
        videoId: "ktSiNvWzYWY",
        title: "strengthPrograms.lowerBodyStrength.exercises.gluteBridge.video.title",
        description: "strengthPrograms.lowerBodyStrength.exercises.gluteBridge.video.description"
      },
      focus_bodyPart: ["glutes", "hamstrings", "hip-extensors"],
      avoid_differentials: ["lower-back-pain", "hamstring-cramps"],
      repetitions: "12-15 reps"
    },
    {
      title: "strengthPrograms.lowerBodyStrength.exercises.calfRaises.title",
      description: "strengthPrograms.lowerBodyStrength.exercises.calfRaises.description",
      video: {
        videoId: "g_QWWxD-XhY",
        title: "strengthPrograms.lowerBodyStrength.exercises.calfRaises.video.title",
        description: "strengthPrograms.lowerBodyStrength.exercises.calfRaises.video.description"
      },
      focus_bodyPart: ["calves", "ankles"],
      avoid_differentials: ["achilles-tendinopathy", "plantar-fasciitis"],
      repetitions: "15-20 reps"
    },
    {
      title: "strengthPrograms.lowerBodyStrength.exercises.superman.title",
      description: "strengthPrograms.lowerBodyStrength.exercises.superman.description",
      video: {
        videoId: "VD6ma6oe4ZA",
        title: "strengthPrograms.lowerBodyStrength.exercises.superman.video.title",
        description: "strengthPrograms.lowerBodyStrength.exercises.superman.video.description"
      },
      focus_bodyPart: ["glutes", "hamstrings", "back-extensors"],
      avoid_differentials: ["lower-back-pain", "neck-problems"],
      repetitions: "10-12 reps"
    }
  ]
};