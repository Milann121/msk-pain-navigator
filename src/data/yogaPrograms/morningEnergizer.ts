import { YogaProgram } from "@/types/yogaProgram";

export const morningEnergizerProgram: YogaProgram = {
  id: "morning-energizer",
  title: "Morning Yoga Energizer",
  description: "Energizing yoga sequence to awaken your body and mind for the day ahead",
  listDescription: [
    "Mobilizes the entire spine",
    "Stretches posterior chain muscles", 
    "Strengthens core and legs",
    "Opens chest and hips",
    "Improves morning stiffness"
  ],
  time: "18 min",
  image: "/lovable-uploads/yogaCard_images/1.png",
  exercises: [
    {
      title: "Cat-Cow",
      description: "From hands and knees, alternate rounding and arching the spine. The pose mobilizes the whole spine and stretches abdominals, shoulders, neck, glutes and hip-flexors, which can relieve morning stiffness associated with mechanical back pain.",
      video: {
        videoId: "LIVJZZyZ2qM",
        title: "Cat-Cow Pose",
        description: "Spinal mobility exercise"
      },
      focus_bodyPart: ["spine", "core", "shoulders", "neck"],
      avoid_differentials: ["facet joint syndrome", "disc herniation", "acute inflammation"]
    },
    {
      title: "Downward-Facing Dog",
      description: "From plank, lift hips to form an inverted 'V,' pressing heels toward the floor. This global posterior-chain stretch mobilizes calves, hamstrings, glutes and shoulders.",
      video: {
        videoId: "ayQoxw8sRTk",
        title: "Downward-Facing Dog",
        description: "Posterior chain stretch"
      },
      focus_bodyPart: ["hamstrings", "calves", "shoulders", "full-body"],
      avoid_differentials: ["wrist injury", "shoulder impingement", "high blood pressure", "neck injury"]
    },
    {
      title: "Cobra Pose",
      description: "Lie prone, place hands under shoulders and, keeping elbows hugged in, lift your chest. Cobra strengthens spinal extensors and opens the chest—helpful for addressing flexion-relieved back pain from prolonged sitting.",
      video: {
        videoId: "QxQWFSJ7MwI",
        title: "Cobra Pose",
        description: "Chest opening and back extension"
      },
      focus_bodyPart: ["chest", "spine", "core"],
      avoid_differentials: ["spinal stenosis", "spondylolisthesis", "recent spinal injury", "lower back pain"]
    },
    {
      title: "Warrior II",
      description: "Start with feet wide; turn the right toes forward, bend the right knee and extend arms to sides. Keep hips and shoulders square and sink into the lunge while lengthening the spine. This pose strengthens quads and glutes while opening hips and chest.",
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
      description: "From Warrior II, straighten the front leg; hinge at the hip to lower the front hand to shin/ankle and reach the other arm upward. Stretches hamstrings, groin and chest.",
      video: {
        videoId: "29sXptul5CI",
        title: "Triangle Pose",
        description: "Side body stretch and hamstring opening"
      },
      focus_bodyPart: ["hamstrings", "hips", "chest"],
      avoid_differentials: ["groin strain", "hamstring strain", "lower back injury"]
    },
    {
      title: "Standing Forward Fold",
      description: "Hinge at the hips to fold forward, letting the head drop and knees softly bend. Targets hamstrings, calves and lower back.",
      video: {
        videoId: "inLULJztZh0",
        title: "Standing Forward Fold",
        description: "Hamstring and calf stretch"
      },
      focus_bodyPart: ["hamstrings", "calves", "lower back"],
      avoid_differentials: ["disc herniation", "nerve compression", "high blood pressure", "lower back pain"]
    }
  ],
  focus_bodyPart: ["full-body", "spine", "hips", "legs"],
  avoid_differentials: ["acute inflammation", "recent surgery", "severe osteoporosis", "recent injury"]
};