import { StrengthProgram } from "@/types/strengthProgram";

export const bodyweightCircuitProgram: StrengthProgram = {
  id: "bodyweight-circuit",
  title: "strengthPrograms.bodyweightCircuit.title",
  description: "strengthPrograms.bodyweightCircuit.description",
  listDescription: [
    "strengthPrograms.bodyweightCircuit.listDescription.1",
    "strengthPrograms.bodyweightCircuit.listDescription.2",
    "strengthPrograms.bodyweightCircuit.listDescription.3",
    "strengthPrograms.bodyweightCircuit.listDescription.4",
    "strengthPrograms.bodyweightCircuit.listDescription.5"
  ],
  time: "25 min",
  image: "/lovable-uploads/stretchingCard_images/8.png",
  focus_bodyPart: ["full-body", "core", "cardiovascular"],
  avoid_differentials: ["recent injury"],
  exercises: [
    {
      title: "strengthPrograms.bodyweightCircuit.exercises.burpees.title",
      description: "strengthPrograms.bodyweightCircuit.exercises.burpees.description",
      video: {
        videoId: "TU8QYVW0gDU",
        title: "strengthPrograms.bodyweightCircuit.exercises.burpees.video.title",
        description: "strengthPrograms.bodyweightCircuit.exercises.burpees.video.description"
      },
      focus_bodyPart: ["full-body", "cardiovascular"],
      avoid_differentials: ["knee pain", "shoulder impingement"]
    },
    {
      title: "strengthPrograms.bodyweightCircuit.exercises.mountainClimbers.title",
      description: "strengthPrograms.bodyweightCircuit.exercises.mountainClimbers.description",
      video: {
        videoId: "kLh-uczlPLg",
        title: "strengthPrograms.bodyweightCircuit.exercises.mountainClimbers.video.title",
        description: "strengthPrograms.bodyweightCircuit.exercises.mountainClimbers.video.description"
      },
      focus_bodyPart: ["core", "shoulders", "cardiovascular"],
      avoid_differentials: ["wrist pain", "lower back pain"]
    },
    {
      title: "strengthPrograms.bodyweightCircuit.exercises.plankJacks.title",
      description: "strengthPrograms.bodyweightCircuit.exercises.plankJacks.description",
      video: {
        videoId: "maJyR9q7XUQ",
        title: "strengthPrograms.bodyweightCircuit.exercises.plankJacks.video.title",
        description: "strengthPrograms.bodyweightCircuit.exercises.plankJacks.video.description"
      },
      focus_bodyPart: ["core", "shoulders"],
      avoid_differentials: ["wrist pain", "shoulder impingement"]
    }
  ]
};