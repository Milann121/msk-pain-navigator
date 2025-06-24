
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface ExerciseCompletionInfoProps {
  assessmentId: string;
}

export const ExerciseCompletionInfo = ({ assessmentId }: ExerciseCompletionInfoProps) => {
  const { t } = useTranslation();
  
  const { data: completionData } = useQuery({
    queryKey: ['exercise-completion', assessmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exercise_completions')
        .select('*')
        .eq('assessment_id', assessmentId);
      
      if (error) throw error;
      return data || [];
    }
  });

  const totalCompletions = completionData?.length || 0;
  const lastCompletionDate = completionData?.[completionData.length - 1]?.completed_at;

  return (
    <div className="space-y-1 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">
          {t('assessmentAccordion.delivered')}
        </span>
        <span className="text-blue-800 font-medium">
          {totalCompletions}x
        </span>
      </div>
      {lastCompletionDate && (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">
            {t('assessmentAccordion.lastExercise')}
          </span>
          <span className="text-gray-700">
            {new Date(lastCompletionDate).toLocaleDateString('sk-SK')}
          </span>
        </div>
      )}
    </div>
  );
};
