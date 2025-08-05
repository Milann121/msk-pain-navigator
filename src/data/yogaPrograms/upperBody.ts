import { YogaProgram } from "@/types/yogaProgram";

export const upperBodyProgram: YogaProgram = {
  id: "upper-body",
  title: "yogaPrograms.upperBody.title",
  description: "yogaPrograms.upperBody.description",
  listDescription: [
    "yogaPrograms.upperBody.listDescription.1",
    "yogaPrograms.upperBody.listDescription.2",
    "yogaPrograms.upperBody.listDescription.3",
    "yogaPrograms.upperBody.listDescription.4",
    "yogaPrograms.upperBody.listDescription.5"
  ],
  time: "25 min",
  image: "/lovable-uploads/stretchingCard_images/5.png",
  focus_bodyPart: ["chest", "shoulders", "neck", "upper back"],
  avoid_differentials: ["neck injury", "shoulder injury"],
  exercises: [
    {
      title: "yogaPrograms.upperBody.exercises.cobraPose.title",
      description: "yogaPrograms.upperBody.exercises.cobraPose.description",
      video: {
        videoId: "QxQWFSJ7MwI",
        title: "yogaPrograms.upperBody.exercises.cobraPose.video.title",
        description: "yogaPrograms.upperBody.exercises.cobraPose.video.description"
      },
      focus_bodyPart: ["chest", "upper back"],
      avoid_differentials: ["cervical disc issues"],
      repetitions: "8-10x"
    },
    {
      title: "yogaPrograms.upperBody.exercises.crossBodyStretch.title",
      description: "yogaPrograms.upperBody.exercises.crossBodyStretch.description",
      video: {
        videoId: "h_5_0zAzU5Y",
        title: "yogaPrograms.upperBody.exercises.crossBodyStretch.video.title",
        description: "yogaPrograms.upperBody.exercises.crossBodyStretch.video.description"
      },
      focus_bodyPart: ["shoulders", "upper back"],
      avoid_differentials: ["rotator cuff injury"],
      repetitions: "Hold 30 sec each side"
    },
    {
      title: "yogaPrograms.upperBody.exercises.earToShoulder.title",
      description: "yogaPrograms.upperBody.exercises.earToShoulder.description",
      video: {
        videoId: "WgtMA-xi_EY",
        title: "yogaPrograms.upperBody.exercises.earToShoulder.video.title",
        description: "yogaPrograms.upperBody.exercises.earToShoulder.video.description"
      },
      focus_bodyPart: ["neck", "upper trapezius"],
      avoid_differentials: ["cervical radiculopathy"],
      repetitions: "Hold 30 sec each side"
    },
    {
      title: "yogaPrograms.upperBody.exercises.downwardDog.title",
      description: "yogaPrograms.upperBody.exercises.downwardDog.description",
      video: {
        videoId: "ayQoxw8sRTk",
        title: "yogaPrograms.upperBody.exercises.downwardDog.video.title",
        description: "yogaPrograms.upperBody.exercises.downwardDog.video.description"
      },
      focus_bodyPart: ["shoulders", "chest", "lats"],
      avoid_differentials: ["rotator cuff tears"],
      repetitions: "Hold 1-2 min"
    },
    {
      title: "yogaPrograms.upperBody.exercises.catCow.title",
      description: "yogaPrograms.upperBody.exercises.catCow.description",
      video: {
        videoId: "LIVJZZyZ2qM",
        title: "yogaPrograms.upperBody.exercises.catCow.video.title",
        description: "yogaPrograms.upperBody.exercises.catCow.video.description"
      },
      focus_bodyPart: ["thoracic spine", "shoulders"],
      avoid_differentials: ["rib dysfunction"],
      repetitions: "10-12x"
    },
    {
      title: "yogaPrograms.upperBody.exercises.happyBaby.title",
      description: "yogaPrograms.upperBody.exercises.happyBaby.description",
      video: {
        videoId: "TeCPb2NXrmQ",
        title: "yogaPrograms.upperBody.exercises.happyBaby.video.title",
        description: "yogaPrograms.upperBody.exercises.happyBaby.video.description"
      },
      focus_bodyPart: ["thoracic spine", "hips"],
      avoid_differentials: ["neck injury", "knee injury"],
      repetitions: "Hold 1-2 min"
    }
  ]
};