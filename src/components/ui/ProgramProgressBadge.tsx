import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { stretchingPrograms } from "@/data/stretchingPrograms";

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
    "morning-flow": "stretchingPrograms.morningFlow.title", 
    "evening-relaxation": "stretchingPrograms.eveningRelaxation.title",
    "post-workout": "stretchingPrograms.postWorkout.title"
  },
  strength: {
    // Add strength mappings when data is available
  },
  yoga: {
    // Add yoga mappings when data is available  
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
        }
        // TODO: Add support for strength and yoga programs when data is available

        // Calculate completion percentage: completed exercises / total exercises * 100
        const lastCompletion = totalExercises > 0 
          ? Math.round((completedExercises / totalExercises) * 100)
          : 0;

        setProgressData({
          exerciseCount: completedExercises,
          lastCompletion,
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