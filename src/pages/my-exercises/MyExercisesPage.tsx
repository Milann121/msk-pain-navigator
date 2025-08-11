
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { FollowUpDialog } from "@/components/exercise-dashboard/assessment/FollowUpDialog";
import { GeneralProgram } from "@/components/profile/GeneralProgram";
import { ExerciseCalendar } from "@/components/exercise-dashboard/ExerciseCalendar";
import { useAssessments } from "@/hooks/useAssessments";
import { UserAssessment } from "@/components/follow-up/types";
import { MyExercisesHeader } from "./MyExercisesHeader";
import { FavoriteActivitiesSection } from "./FavoriteActivitiesSection";
import { ActiveProgramsSection } from "./ActiveProgramsSection";
import { EndedProgramsSection } from "./EndedProgramsSection";
import { OrebroEntry } from "@/components/profile/OrebroEntry";
import { SectionCards } from "@/components/SectionCards";

export const MyExercisesPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { assessments, loading, handleDeleteAssessment, refreshAssessments } = useAssessments();
  const [selectedAssessment, setSelectedAssessment] = React.useState<UserAssessment | null>(null);

  // State for which active assessment accordion item is open
  const [openedActiveAccordionId, setOpenedActiveAccordionId] = React.useState<string | undefined>(undefined);

  // State for OREBRO questionnaire expand/collapse
  const [isOrebroExpanded, setIsOrebroExpanded] = React.useState(false);
  const [isOrebroWrapped, setIsOrebroWrapped] = React.useState(false);

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

  // Also refresh when a program is ended elsewhere in the app
  React.useEffect(() => {
    const handleProgramEnded = () => {
      refreshAssessments();
    };
    window.addEventListener('program-ended', handleProgramEnded as unknown as EventListener);
    return () => {
      window.removeEventListener('program-ended', handleProgramEnded as unknown as EventListener);
    };
  }, [refreshAssessments]);

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
          <div className="text-blue-600">{t('loading')}</div>
        </div>
        <Footer />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <MyExercisesHeader />
          {/* Calendar */}
          <ExerciseCalendar />
          
          {/* Section Cards */}
          <SectionCards />
          
          {/* OREBRO & General Program side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 items-start">
            <OrebroEntry 
              isExpanded={isOrebroExpanded}
              isWrapped={isOrebroWrapped}
              onExpand={() => setIsOrebroExpanded(true)}
              onCollapse={() => setIsOrebroWrapped(true)}
              onWrap={() => setIsOrebroWrapped(true)}
              onUnwrap={() => setIsOrebroWrapped(false)}
            />
            <GeneralProgram />
          </div>
          
          {/* Favorite Activities Section */}
          <FavoriteActivitiesSection />
          
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
      <Footer />
    </div>
  );
};
