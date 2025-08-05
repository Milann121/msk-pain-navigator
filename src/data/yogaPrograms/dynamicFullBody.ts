import { YogaProgram } from "@/types/yogaProgram";

export const dynamicFullBodyProgram: YogaProgram = {
  id: "dynamic-full-body",
  title: "Dynamic Full-body Yoga Program",
  description: "Dynamic yoga sequence that mobilizes the entire body through flowing movements.",
  listDescription: [
    "Mobilizes spine and identifies stiffness patterns",
    "Stretches hamstrings and posterior chain",
    "Engages shoulders and core stability",
    "Strengthens legs and improves hip mobility",
    "Opens hips and side body",
    "Challenges balance and coordination"
  ],
  time: "25 min",
  image: "/images/yoga/dynamic-full-body.jpg",
  focus_bodyPart: ["Full body", "Spine", "Hips", "Shoulders", "Legs"],
  avoid_differentials: ["Acute back pain", "Recent spinal surgery", "Severe joint inflammation", "Pregnancy (without modification)"],
  exercises: [
    {
      title: "Cat-Cow",
      description: "From hands and knees, alternate rounding and arching the spine. Warm-up to mobilize the spine; identifies segmental stiffness vs. inflammatory pain.",
      video: {
        videoId: "LIVJZZyZ2qM",
        title: "Cat-Cow Flow",
        description: "Dynamic spinal mobility warm-up"
      },
      focus_bodyPart: ["Spine", "Core"],
      avoid_differentials: ["Acute back pain", "Neck injury"],
      repetitions: "8-10 cycles"
    },
    {
      title: "Standing Forward Fold",
      description: "Hinge at the hips to fold forward, letting the head drop and knees softly bend. Hinge at hips to stretch hamstrings and lower back.",
      video: {
        videoId: "inLULJztZh0",
        title: "Standing Forward Fold",
        description: "Dynamic hamstring and back stretch"
      },
      focus_bodyPart: ["Hamstrings", "Lower back", "Calves"],
      avoid_differentials: ["Disc herniation", "Severe sciatica"],
      repetitions: "Hold 30-60 seconds"
    },
    {
      title: "Downward-Facing Dog",
      description: "From plank, lift hips to form an inverted 'V,' pressing heels toward the floor. Transition pose linking movements; engages shoulders and posterior chain.",
      video: {
        videoId: "ayQoxw8sRTk",
        title: "Downward-Facing Dog",
        description: "Dynamic posterior chain engagement"
      },
      focus_bodyPart: ["Shoulders", "Hamstrings", "Calves", "Core"],
      avoid_differentials: ["Carpal tunnel syndrome", "High blood pressure"],
      repetitions: "Hold 30-45 seconds"
    },
    {
      title: "Cobra Pose",
      description: "Lie prone, place hands under shoulders and, keeping elbows hugged in, lift your chest. Dynamic backbend within a sun-salutation flow.",
      video: {
        videoId: "QxQWFSJ7MwI",
        title: "Cobra Pose",
        description: "Dynamic chest opening and back extension"
      },
      focus_bodyPart: ["Chest", "Spine extensors", "Shoulders"],
      avoid_differentials: ["Pregnancy", "Recent abdominal surgery"],
      repetitions: "Hold 15-30 seconds"
    },
    {
      title: "Warrior II",
      description: "Start with feet wide; turn the right toes forward, bend the right knee and extend arms to sides. Strengthens legs and improves hip mobility.",
      video: {
        videoId: "Mn6RSIRCV3w",
        title: "Warrior II Pose",
        description: "Dynamic leg strengthening and hip opening"
      },
      focus_bodyPart: ["Quadriceps", "Glutes", "Hips"],
      avoid_differentials: ["Knee injury", "Hip replacement"],
      repetitions: "Hold 45-60 seconds each side"
    },
    {
      title: "Triangle Pose",
      description: "From Warrior II, straighten the front leg; hinge at the hip to lower the front hand to shin/ankle and reach the other arm upward. Opens hips and side body.",
      video: {
        videoId: "29sXptul5CI",
        title: "Triangle Pose",
        description: "Dynamic side body stretch and hip opening"
      },
      focus_bodyPart: ["Side body", "Hamstrings", "Hips"],
      avoid_differentials: ["Lower back injury", "Neck problems"],
      repetitions: "Hold 30-45 seconds each side"
    },
    {
      title: "Hip-Flexor Lunge",
      description: "In a lunge, slide the back knee further back, squeeze the glute and tilt pelvis forward. Deepens front-hip extension; dynamic transitions challenge balance and identify hip-flexor tightness.",
      video: {
        videoId: "tsGPYSQbZx4",
        title: "Hip-Flexor Lunge",
        description: "Dynamic hip flexor stretch and balance"
      },
      focus_bodyPart: ["Hip flexors", "Glutes", "Core"],
      avoid_differentials: ["Knee injury", "Hip impingement"],
      repetitions: "Hold 30-45 seconds each side"
    }
  ]
};