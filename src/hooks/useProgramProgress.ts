import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { stretchingPrograms } from '@/data/stretchingPrograms';
import { strengthPrograms } from '@/data/strengthPrograms';
import { yogaPrograms } from '@/data/yogaPrograms';

interface UseProgramProgressProps {
  programId: string;
  programType: 'stretching' | 'strength' | 'yoga';
}

interface ProgramProgress {
  completedExercises: number;
  totalExercises: number;
  completionPercentage: number;
  hasProgress: boolean;
  completedExerciseNames: string[];
  fullCompletions: number;
}

export const useProgramProgress = ({ programId, programType }: UseProgramProgressProps) => {
  const [progress, setProgress] = useState<ProgramProgress>({
    completedExercises: 0,
    totalExercises: 0,
    completionPercentage: 0,
    hasProgress: false,
    completedExerciseNames: [],
    fullCompletions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Get program title mapping
  const getProgramTitle = () => {
    if (programType === 'stretching' && stretchingPrograms[programId]) {
      return stretchingPrograms[programId].title;
    } else if (programType === 'strength' && strengthPrograms[programId]) {
      return strengthPrograms[programId].title;
    } else if (programType === 'yoga' && yogaPrograms[programId]) {
      return yogaPrograms[programId].title;
    }
    return '';
  };

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const programTitle = getProgramTitle();
        if (!programTitle) {
          setIsLoading(false);
          return;
        }

        // Get completed exercises for this program
        const { data: completedExercises, error } = await supabase
          .from('secondary_programs')
          .select('secondary_exercise_name, created_at')
          .eq('user_id', user.id)
          .eq('secondary_program', programType)
          .eq('program_type', programTitle)
          .order('created_at', { ascending: true });

        if (error) throw error;

        let totalExercises = 0;
        if (programType === 'stretching' && stretchingPrograms[programId]) {
          totalExercises = stretchingPrograms[programId].exercises.length;
        } else if (programType === 'strength' && strengthPrograms[programId]) {
          totalExercises = strengthPrograms[programId].exercises.length;
        } else if (programType === 'yoga' && yogaPrograms[programId]) {
          totalExercises = yogaPrograms[programId].exercises.length;
        }

        const completedCount = completedExercises?.length || 0;
        const completedNames = completedExercises?.map(ex => ex.secondary_exercise_name) || [];
        
        // Calculate full completions and current percentage
        const fullCompletions = totalExercises > 0 ? Math.floor(completedCount / totalExercises) : 0;
        const currentCompletion = totalExercises > 0 ? (completedCount % totalExercises) : 0;
        const completionPercentage = totalExercises > 0 ? Math.round((currentCompletion / totalExercises) * 100) : 0;

        setProgress({
          completedExercises: completedCount,
          totalExercises,
          completionPercentage,
          hasProgress: completedCount > 0,
          completedExerciseNames: completedNames,
          fullCompletions,
        });
      } catch (error) {
        console.error('Error fetching program progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [user, programId, programType]);

  return { progress, isLoading, refetch: () => {
    setIsLoading(true);
    // Re-trigger useEffect
  }};
};