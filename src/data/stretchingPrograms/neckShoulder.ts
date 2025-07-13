import { StretchingProgram } from "@/types/stretchingProgram";

export const neckShoulderProgram: StretchingProgram = {
  id: "neck-shoulder",
  title: "stretchingPrograms.neckShoulder.title",
  description: "stretchingPrograms.neckShoulder.description", 
  listDescription: [
    "stretchingPrograms.neckShoulder.listDescription.1",
    "stretchingPrograms.neckShoulder.listDescription.2",
    "stretchingPrograms.neckShoulder.listDescription.3",
    "stretchingPrograms.neckShoulder.listDescription.4"
  ],
  time: "5 min",
  image: "/lovable-uploads/stretchingCard_images/11.png",
  focus_bodyPart: ["neck", "shoulders", "upper-back"],
  avoid_differentials: ["disc herniation"],
  exercises: [
    {
      title: "stretchingPrograms.neckShoulder.exercises.neckRotation.title",
      description: "stretchingPrograms.neckShoulder.exercises.neckRotation.description",
      video: {
        videoId: "JJq8u5IGDb8",
        title: "stretchingPrograms.neckShoulder.exercises.neckRotation.video.title",
        description: "stretchingPrograms.neckShoulder.exercises.neckRotation.video.description"
      },
      focus_bodyPart: ["neck"],
      avoid_differentials: ["disc herniation", "vertebral artery insufficiency"],
      repetitions: "10-12x"
    },
    {
      title: "stretchingPrograms.neckShoulder.exercises.shoulderRelease.title",
      description: "stretchingPrograms.neckShoulder.exercises.shoulderRelease.description",
      video: {
        videoId: "844ILxo5xsA",
        title: "stretchingPrograms.neckShoulder.exercises.shoulderRelease.video.title",
        description: "stretchingPrograms.neckShoulder.exercises.shoulderRelease.video.description"
      },
      focus_bodyPart: ["neck", "shoulders", "upper-back"],
      avoid_differentials: [],
      repetitions: "10-12x"
    },
    {
      title: "stretchingPrograms.neckShoulder.exercises.upperCervicalRelease.title",
      description: "stretchingPrograms.neckShoulder.exercises.upperCervicalRelease.description",
      video: {
        videoId: "L94T55NiI34",
        title: "stretchingPrograms.neckShoulder.exercises.upperCervicalRelease.video.title",
        description: "stretchingPrograms.neckShoulder.exercises.upperCervicalRelease.video.description"
      },
      focus_bodyPart: ["neck", "head"],
      avoid_differentials: ["vertebral artery insufficiency"],
      repetitions: "10-12x"
    }
  ]
};