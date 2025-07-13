import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProgramProgressBadgeProps {
  programId: string;
  programType: "stretching" | "strength" | "yoga";
}

interface ProgressData {
  exerciseCount: number;
  lastCompletion: number;
}

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

        // Get exercise count for this program
        // The secondary_program field contains the program type (stretching/strength/yoga)
        // The program_type field contains the specific program details
        const { data: exercises, error: exerciseError } = await supabase
          .from('secondary_programs')
          .select('*')
          .eq('user_id', user.id)
          .eq('secondary_program', programType);

        if (exerciseError) {
          console.error('Error fetching exercise data:', exerciseError);
          return;
        }

        if (!exercises || exercises.length === 0) {
          // No exercises found, don't show the badge
          return;
        }

        const exerciseCount = exercises.length;

        // Calculate last completion percentage (simplified - using exercise count as a proxy)
        // In a real app, you'd calculate this based on actual completion data
        const lastCompletion = Math.min(Math.round((exerciseCount / 10) * 100), 100);

        setProgressData({
          exerciseCount,
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