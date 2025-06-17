
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { FollowUpDialog } from "@/components/exercise-dashboard/assessment/FollowUpDialog";
import { GeneralProgram } from "@/components/profile/GeneralProgram";
import { ExerciseCalendar } from "@/components/exercise-dashboard/ExerciseCalendar";
import { useAssessments } from "@/hooks/useAssessments";
import { UserAssessment } from "@/components/follow-up/types";
import { MyExercisesHeader } from "./MyExercisesHeader";
import { ActiveProgramsSection } from "./ActiveProgramsSection";
import { EndedProgramsSection } from "./EndedProgramsSection";

export const MyExercisesPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { assessments, loading, handleDeleteAssessment, refreshAssessments } = useAssessments();
  const [selectedAssessment, setSelectedAssessment] = React.useState<UserAssessment | null>(null);

  // State for which active assessment accordion item is open
  const [openedActiveAccordionId, setOpenedActiveAccordionId] = React.useState<string | undefined>(undefined);

  // Split assessments into active and ended programs
  const [activeAssessments, setActiveAssessments] = React.useState<UserAssessment[]>([]);
  const [endedAssessments, setEndedAssessments] = React.useState<UserAssessment[]>([]);

  // When assessments load/update, split them by ended/active
  React.useEffect(() => {
    const active = assessments.filter(a => !a.program_ended_at);
    const ended = assessments.filter(a => !!a.program_ended_at);
    setActiveAssessments(active);
    setEndedAssessments(ended);
  }, [assessments]);

  // Re-fetch assessments on login or explicit refresh
  React.useEffect(() => {
    if (user) {
      refreshAssessments();
    }
  }, [user, refreshAssessments]);

  const handleOpenFollowUp = (assessment: UserAssessment) => {
    setSelectedAssessment(assessment);
  };

  const handleCloseFollowUp = () => {
    setSelectedAssessment(null);
    refreshAssessments();
  };

  // Handler passed to AccordionItem: on renew, move to active and expand
  const handleRenewAssessmentUI = (renewedId: string) => {
    const renewed = endedAssessments.find(a => a.id === renewedId);
    if (!renewed) return;
    setEndedAssessments(endedAssessments.filter(a => a.id !== renewedId));
    setActiveAssessments([renewed, ...activeAssessments]);
    setOpenedActiveAccordionId(renewedId);
  };

  // Handler passed to AccordionItem: on end, move to ended instantly
  const handleEndAssessmentUI = (endedId: string) => {
    const ended = activeAssessments.find(a => a.id === endedId);
    if (!ended) return;
    setActiveAssessments(activeAssessments.filter(a => a.id !== endedId));
    setEndedAssessments([ended, ...endedAssessments]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">Načítava sa...</div>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-1 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-1 md:px-0">
          <MyExercisesHeader />
          {/* Calendar & General Program */}
          <ExerciseCalendar />
          <Card className="mb-6">
            <div className="pt-6">
              <GeneralProgram />
            </div>
          </Card>
          {/* Sections */}
          <ActiveProgramsSection
            loading={loading}
            activeAssessments={activeAssessments}
            openedActiveAccordionId={openedActiveAccordionId}
            setOpenedActiveAccordionId={setOpenedActiveAccordionId}
            handleOpenFollowUp={handleOpenFollowUp}
            handleDeleteAssessment={handleDeleteAssessment}
            handleEndAssessmentUI={handleEndAssessmentUI}
            navigate={navigate}
          />
          <EndedProgramsSection
            loading={loading}
            endedAssessments={endedAssessments}
            handleOpenFollowUp={handleOpenFollowUp}
            handleDeleteAssessment={handleDeleteAssessment}
            handleRenewAssessmentUI={handleRenewAssessmentUI}
            navigate={navigate}
          />
          <FollowUpDialog
            isOpen={selectedAssessment !== null}
            onOpenChange={(open) => {
              if (!open) {
                handleCloseFollowUp();
              }
            }}
            selectedAssessment={selectedAssessment}
            onComplete={handleCloseFollowUp}
          />
        </div>
      </div>
    </div>
  );
};
