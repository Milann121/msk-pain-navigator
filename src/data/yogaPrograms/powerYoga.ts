import { YogaProgram } from "@/types/yogaProgram";

export const powerYogaProgram: YogaProgram = {
  id: "power-yoga",
  title: "Power Yoga Program",
  description: "Challenging power yoga sequence to build strength, endurance, and flexibility.",
  listDescription: [
    "Builds shoulder endurance and posterior chain strength",
    "Strengthens back extensors and core muscles",
    "Develops lower-body strength through sustained holds",
    "Enhances hip flexibility and glute activation",
    "Balances muscle groups for optimal performance",
    "Prevents common injury patterns in active individuals"
  ],
  time: "25-30 minutes",
  image: "/images/yoga/power-yoga.jpg",
  focus_bodyPart: ["Full Body", "Core", "Shoulders", "Hips", "Legs"],
  avoid_differentials: ["Acute back injury", "Shoulder impingement", "Recent surgery", "Severe joint pain"],
  exercises: [
    {
      title: "Downward-Facing Dog",
      description: "From plank, lift hips to form an inverted 'V,' pressing heels toward the floor. Builds shoulder endurance and lengthens posterior chain. Hold for sustained strength building.",
      video: {
        videoId: "ayQoxw8sRTk",
        title: "Downward-Facing Dog Power Hold",
        description: "Shoulder endurance and posterior chain strength"
      },
      focus_bodyPart: ["Shoulders", "Hamstrings", "Calves", "Core"],
      avoid_differentials: ["Shoulder impingement", "Wrist pain", "High blood pressure"],
      repetitions: "Hold for 60-90 seconds"
    },
    {
      title: "Cobra Pose",
      description: "Lie prone, place hands under shoulders and, keeping elbows hugged in, lift your chest. Strengthens back extensors and prepares for deeper backbends. Focus on active lifting.",
      video: {
        videoId: "QxQWFSJ7MwI",
        title: "Power Cobra Pose",
        description: "Back extensor strength and chest opening"
      },
      focus_bodyPart: ["Back extensors", "Chest", "Shoulders"],
      avoid_differentials: ["Lower back injury", "Neck problems", "Recent abdominal surgery"],
      repetitions: "Hold for 30-45 seconds"
    },
    {
      title: "Warrior II",
      description: "Start with feet wide; turn the right toes forward, bend the right knee and extend arms to sides. Sustained isometric hold develops lower-body strength. Keep strong engagement throughout.",
      video: {
        videoId: "Mn6RSIRCV3w",
        title: "Warrior II Power Hold",
        description: "Lower-body strength and endurance"
      },
      focus_bodyPart: ["Quadriceps", "Glutes", "Core", "Shoulders"],
      avoid_differentials: ["Knee injury", "Hip problems", "Ankle instability"],
      repetitions: "Hold for 60 seconds each side"
    },
    {
      title: "Triangle Pose",
      description: "From Warrior II, straighten the front leg; hinge at the hip to lower the front hand to shin/ankle and reach the other arm upward. Maintains engagement through legs and core while stretching side body.",
      video: {
        videoId: "29sXptul5CI",
        title: "Power Triangle Pose",
        description: "Active side body stretch with core engagement"
      },
      focus_bodyPart: ["Side body", "Hamstrings", "Core", "Legs"],
      avoid_differentials: ["Lower back injury", "Neck problems", "Hip dysfunction"],
      repetitions: "Hold for 45 seconds each side"
    },
    {
      title: "Hip-Flexor Lunge",
      description: "In a lunge, slide the back knee further back, squeeze the glute and tilt pelvis forward. Enhances hip-flexor flexibility and glute activation; useful for runners and those with anterior hip pain.",
      video: {
        videoId: "tsGPYSQbZx4",
        title: "Power Hip-Flexor Lunge",
        description: "Dynamic hip flexor stretch and glute activation"
      },
      focus_bodyPart: ["Hip flexors", "Glutes", "Core"],
      avoid_differentials: ["Knee injury", "Hip impingement", "Groin strain"],
      repetitions: "Hold for 45 seconds each side"
    },
    {
      title: "Standing Hamstring Stretch",
      description: "Step one foot forward, hinge at hips and reach toward the toes. Engages hamstrings and calves; important for balancing quadriceps-dominant routines. Keep active engagement.",
      video: {
        videoId: "W5ZRsgwi9ec",
        title: "Active Standing Hamstring Stretch",
        description: "Hamstring engagement and calf activation"
      },
      focus_bodyPart: ["Hamstrings", "Calves", "Lower back"],
      avoid_differentials: ["Hamstring injury", "Lower back pain", "Severe tightness"],
      repetitions: "Hold for 30 seconds each leg"
    },
    {
      title: "Figure-Four Glute Stretch",
      description: "Cross ankle over opposite knee and sit back into a chair position or lie on back. Provides deep external-rotation stretch to prevent piriformis and SI-joint issues.",
      video: {
        videoId: "–g0nuyTHMrI",
        title: "Power Figure-Four Stretch",
        description: "Deep glute and piriformis stretch"
      },
      focus_bodyPart: ["Glutes", "Piriformis", "Hip rotators"],
      avoid_differentials: ["Hip injury", "Knee problems", "SI joint dysfunction"],
      repetitions: "Hold for 45 seconds each side"
    }
  ]
};