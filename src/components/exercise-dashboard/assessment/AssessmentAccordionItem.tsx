
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UserAssessment } from '@/components/follow-up/types';
import { AssessmentAccordionHeader } from './AssessmentAccordionHeader';
import { AssessmentAccordionActions } from './AssessmentAccordionActions';
import { AssessmentDetails } from "./AssessmentDetails";
import { ExerciseCompletionInfo } from "./ExerciseCompletionInfo";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useLatestPainLevel } from "./useLatestPainLevel";
import { useProgramEndRenew } from "./useProgramEndRenew";
import { AssessmentProgramControls } from "./AssessmentProgramControls";
import { ProgramEndingDialog } from "@/components/follow-up/ProgramEndingDialog";
import { useTranslation } from "react-i18next";

interface AssessmentAccordionItemProps {
  assessment: UserAssessment;
  onOpenFollowUp: (assessment: UserAssessment) => void;
  onDeleteAssessment: (id: string) => void;
  onRenew?: () => void; 
  onEndProgram?: () => void;
}

export const AssessmentAccordionItem = ({
  assessment,
  onOpenFollowUp,
  onDeleteAssessment,
  onRenew,
  onEndProgram
}: AssessmentAccordionItemProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Pain level hook
  const { latestPainLevel, diffIcon } = useLatestPainLevel(
    assessment.id,
    assessment.initial_pain_level ?? null
  );

  // End/renew logic hook - always pass the UI end handler
  const {
    programEndedAt,
    isEnded,
    loadingEnd,
    loadingRenew,
    showEndingQuestionnaire,
    handleEndProgram,
    handleRenewProgram,
    handleEndingQuestionnaireComplete,
    handleCloseEndingQuestionnaire
  } = useProgramEndRenew(assessment, 
      // This handler will run when program is ended; ensure UI moves item immediately
      () => {
        if (onEndProgram) onEndProgram();
      },
      onRenew
  );

  const programStartDate: Date =
    assessment.program_start_date
      ? new Date(assessment.program_start_date)
      : new Date(assessment.timestamp);

  const handleViewExercises = () => {
    navigate('/exercise-plan', { 
      state: { 
        mechanism: assessment.primary_mechanism,
        differential: assessment.primary_differential,
        painArea: assessment.pain_area,
        assessmentId: assessment.id
      } 
    });
  };

  return (
    <AccordionItem key={assessment.id} value={assessment.id}>
      <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 rounded-lg">
        <AssessmentAccordionHeader assessment={assessment} />
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Assessment details */}
          <AssessmentDetails
            assessment={assessment}
            latestPainLevel={latestPainLevel}
            diffIcon={diffIcon}
          />
          <div className="flex flex-col h-full justify-start">
            <ExerciseCompletionInfo assessmentId={assessment.id} />
            <div className="flex flex-col gap-0 mt-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  {t('assessmentAccordion.programStart')}
                </span>
                <span className="text-blue-800 font-medium">
                  {programStartDate ? programStartDate.toLocaleDateString("sk-SK") : ""}
                </span>
              </div>
              <AssessmentProgramControls
                isEnded={isEnded}
                loadingEnd={loadingEnd}
                loadingRenew={loadingRenew}
                onEnd={handleEndProgram}
                onRenew={handleRenewProgram}
              />
            </div>
          </div>
        </div>
        <AssessmentAccordionActions
          assessment={assessment}
          programEndedAt={isEnded ? (programEndedAt ?? new Date()) : null}
          loadingEnd={loadingEnd}
          loadingRenew={loadingRenew}
          onOpenFollowUp={onOpenFollowUp}
          onDeleteAssessment={onDeleteAssessment}
          handleEndProgram={handleEndProgram}
          handleRenewProgram={handleRenewProgram}
          handleViewExercises={handleViewExercises}
        />
      </AccordionContent>
      
      {/* Program Ending Questionnaire Dialog */}
      <ProgramEndingDialog
        isOpen={showEndingQuestionnaire}
        onOpenChange={handleCloseEndingQuestionnaire}
        selectedAssessment={assessment}
        onComplete={handleEndingQuestionnaireComplete}
      />
    </AccordionItem>
  );
};
