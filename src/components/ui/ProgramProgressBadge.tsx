import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { stretchingPrograms } from "@/data/stretchingPrograms";
import { strengthPrograms } from "@/data/strengthPrograms";
import { yogaPrograms } from "@/data/yogaPrograms";

interface ProgramProgressBadgeProps {
  programId: string;
  programType: "stretching" | "strength" | "yoga";
}

interface ProgressData {
  exerciseCount: number;
  lastCompletion: number;
}

// Mapping between card IDs and database program_type values
const PROGRAM_TYPE_MAPPING = {
  stretching: {
    "neck-shoulder": "stretchingPrograms.neckShoulder.title",
    "morning-routine": "stretchingPrograms.morningRoutine.title",
    "evening-relaxation": "stretchingPrograms.eveningRelaxation.title",
    "post-workout": "stretchingPrograms.postWorkout.title"
  },
  strength: {
    "push-ups": "strengthPrograms.pushUps.title",
    "squats": "strengthPrograms.squats.title",
    "bodyweight-circuit": "strengthPrograms.bodyweightCircuit.title",
    "pull-ups": "strengthPrograms.pullUps.title",
    "deadlifts": "strengthPrograms.deadlifts.title",
    "outdoor-calisthenics": "strengthPrograms.outdoorCalisthenics.title"
  },
  yoga: {
    "morning-flow": "yogaPrograms.morningFlow.title",
    "power-flow": "yogaPrograms.powerFlow.title",
    "leg-focus": "yogaPrograms.legFocus.title",
    "arm-balance": "yogaPrograms.armBalance.title"
  }
};

export const ProgramProgressBadge: React.FC<ProgramProgressBadgeProps> = ({
  programId,
  programType,
}) => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get the specific program type from mapping
        const specificProgramType = PROGRAM_TYPE_MAPPING[programType]?.[programId];
        
        if (!specificProgramType) {
          // No mapping found for this program, don't show badge
          return;
        }

        // Get exercise count for this specific program
        const { data: exercises, error: exerciseError } = await supabase
          .from('secondary_programs')
          .select('*')
          .eq('user_id', user.id)
          .eq('secondary_program', programType)
          .eq('program_type', specificProgramType);

        if (exerciseError) {
          console.error('Error fetching exercise data:', exerciseError);
          return;
        }

        if (!exercises || exercises.length === 0) {
          // No exercises found for this specific program, don't show the badge
          return;
        }

        const completedExercises = exercises.length;

        // Get total number of exercises in the program
        let totalExercises = 0;
        if (programType === 'stretching' && stretchingPrograms[programId]) {
          totalExercises = stretchingPrograms[programId].exercises.length;
        } else if (programType === 'strength' && strengthPrograms[programId]) {
          totalExercises = strengthPrograms[programId].exercises.length;
        } else if (programType === 'yoga' && yogaPrograms[programId]) {
          totalExercises = yogaPrograms[programId].exercises.length;
        }

        // Count 100% completions: how many times the full program was completed
        const fullCompletions = totalExercises > 0 
          ? Math.floor(completedExercises / totalExercises)
          : 0;

        // Calculate current completion percentage for partial progress
        const remainingExercises = totalExercises > 0 ? (completedExercises % totalExercises) : 0;
        const currentCompletion = totalExercises > 0 
          ? Math.round((remainingExercises / totalExercises) * 100)
          : 0;

        setProgressData({
          exerciseCount: fullCompletions,
          lastCompletion: currentCompletion,
        });
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, [programId, programType]);

  if (!progressData) {
    return null;
  }

  return (
    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm">
      {progressData.exerciseCount}x | {progressData.lastCompletion}%
    </div>
  );
};