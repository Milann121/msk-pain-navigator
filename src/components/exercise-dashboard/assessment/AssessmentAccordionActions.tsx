
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, ClipboardCheck } from 'lucide-react';
import { UserAssessment } from '@/components/follow-up/types';
import { useTranslation } from 'react-i18next';

interface AssessmentAccordionActionsProps {
  assessment: UserAssessment;
  programEndedAt: Date | null;
  loadingEnd: boolean;
  loadingRenew: boolean;
  onOpenFollowUp: (assessment: UserAssessment) => void;
  onDeleteAssessment: (id: string) => void;
  handleEndProgram: () => Promise<void>;
  handleRenewProgram: () => Promise<void>;
  handleViewExercises: () => void;
}

export function AssessmentAccordionActions({
  assessment,
  programEndedAt,
  loadingEnd,
  loadingRenew,
  onOpenFollowUp,
  onDeleteAssessment,
  handleEndProgram,
  handleRenewProgram,
  handleViewExercises
}: AssessmentAccordionActionsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-wrap justify-start md:justify-end gap-2 mt-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onOpenFollowUp(assessment)}
        className="flex items-center gap-1"
      >
        <ClipboardCheck className="h-4 w-4" />
        {t('assessmentAccordion.recordProgress')}
      </Button>
      
      <Button 
        onClick={handleViewExercises}
        size="sm"
        className="flex items-center gap-1"
      >
        <ExternalLink className="h-4 w-4" />
        {t('assessmentAccordion.viewExercises')}
      </Button>
      
      <Button 
        variant="destructive" 
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteAssessment(assessment.id);
        }}
        title={t('assessmentAccordion.deleteAssessment')}
        className="flex items-center gap-1"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
