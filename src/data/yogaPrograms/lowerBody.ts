import { YogaProgram } from "@/types/yogaProgram";

export const lowerBodyProgram: YogaProgram = {
  id: "lower-body",
  title: "Lower-body Yoga Program",
  description: "Targeted yoga sequence to strengthen and stretch the lower body, hips, and legs",
  listDescription: [
    "yogaPrograms.lowerBody.listDescription.1",
    "yogaPrograms.lowerBody.listDescription.2",
    "yogaPrograms.lowerBody.listDescription.3",
    "yogaPrograms.lowerBody.listDescription.4",
    "yogaPrograms.lowerBody.listDescription.5"
  ],
  time: "25 min",
  image: "/lovable-uploads/yogaCard_images/5.png",
  exercises: [
    {
      title: "Half-Kneeling Hip-Flexor Stretch",
      description: "In a lunge, slide the back knee further back, squeeze the glute and tilt pelvis forward. Stretches iliopsoas, relieving anterior hip tightness linked to prolonged sitting.",
      video: {
        videoId: "tsGPYSQbZx4",
        title: "Half-Kneeling Hip-Flexor Stretch",
        description: "Hip flexor stretch and mobility"
      },
      focus_bodyPart: ["hip-flexors", "hips", "glutes"],
      avoid_differentials: ["groin strain", "hip injury", "labral leason"]
    },
    {
      title: "Warrior II",
      description: "Start with feet wide; turn the right toes forward, bend the right knee and extend arms to sides. Strengthens legs and opens hips, great for building knee and hip stability.",
      video: {
        videoId: "Mn6RSIRCV3w",
        title: "Warrior II Pose",
        description: "Standing strength and hip opening"
      },
      focus_bodyPart: ["legs", "hips", "quadriceps", "glutes"],
      avoid_differentials: ["knee pain", "hip injury", "ankle instability"]
    },
    {
      title: "Triangle Pose",
      description: "From Warrior II, straighten the front leg; hinge at the hip to lower the front hand to shin/ankle and reach the other arm upward. Stretches hamstrings and groin, good for detecting hamstring-dominant low-back pain.",
      video: {
        videoId: "29sXptul5CI",
        title: "Triangle Pose",
        description: "Side body stretch and hamstring opening"
      },
      focus_bodyPart: ["hamstrings", "hips", "lower back"],
      avoid_differentials: ["groin strain", "hamstring strain", "lower back injury"]
    },
    {
      title: "Standing Hamstring Stretch",
      description: "Step one foot forward, hinge at hips and reach toward the toes. A gentle stretch indicates tight musculature; radiating pain or numbness suggests nerve involvement.",
      video: {
        videoId: "W5ZRsgwi9ec",
        title: "Standing Hamstring Stretch",
        description: "Hamstring flexibility and stretch"
      },
      focus_bodyPart: ["hamstrings", "calves", "lower back"],
      avoid_differentials: ["nerve compression", "hamstring strain", "lower back pain"]
    },
    {
      title: "Pigeon/Figure-Four Stretch",
      description: "From all fours, bring one knee toward the front and extend the other leg back (pigeon) or lie supine and cross ankle over opposite thigh, pulling leg toward chest. Stretches deep gluteal muscles and piriformis.",
      video: {
        videoId: "-g0nuyTHMrI",
        title: "Pigeon/Figure-Four Stretch",
        description: "Deep hip and glute stretch"
      },
      focus_bodyPart: ["glutes", "hips", "hip-flexors"],
      avoid_differentials: ["SIJ syndrome", "hip injury", "nerve compression"]
    },
    {
      title: "Downward-Facing Dog",
      description: "From plank, lift hips to form an inverted 'V,' pressing heels toward the floor. Comprehensive posterior-chain stretch, useful for calf tightness and plantar fascia symptoms.",
      video: {
        videoId: "ayQoxw8sRTk",
        title: "Downward-Facing Dog",
        description: "Posterior chain stretch"
      },
      focus_bodyPart: ["hamstrings", "calves", "shoulders", "full-body"],
      avoid_differentials: ["wrist injury", "shoulder impingement", "high blood pressure", "neck injury"]
    }
  ],
  focus_bodyPart: ["lower-body", "hips", "legs", "hamstrings"],
  avoid_differentials: ["acute inflammation", "recent surgery", "severe osteoporosis", "recent injury"]
};