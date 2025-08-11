import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { AssessmentAccordionItem } from "@/components/exercise-dashboard/assessment/AssessmentAccordionItem";
import { EmptyState } from "@/components/exercise-dashboard/assessment/EmptyState";
import { LoadingState } from "@/components/exercise-dashboard/assessment/LoadingState";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { UserAssessment } from "@/components/follow-up/types";
import { NavigateFunction } from "react-router-dom";
import { formatPainAreaWithSubArea } from "@/utils/formatHelpers";
interface ActiveProgramsSectionProps {
  loading: boolean;
  activeAssessments: UserAssessment[];
  openedActiveAccordionId: string | undefined;
  setOpenedActiveAccordionId: (id: string | undefined) => void;
  handleOpenFollowUp: (assessment: UserAssessment) => void;
  handleDeleteAssessment: (id: string) => void;
  handleEndAssessmentUI: (id: string) => void;
  navigate: NavigateFunction;
}
export const ActiveProgramsSection: React.FC<ActiveProgramsSectionProps> = ({
  loading,
  activeAssessments,
  openedActiveAccordionId,
  setOpenedActiveAccordionId,
  handleOpenFollowUp,
  handleDeleteAssessment,
  handleEndAssessmentUI,
  navigate
}) => {
  const {
    t
  } = useTranslation();
  return <Card id="active-programs" className="mb-6 px-0">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="relative flex items-center">
            <span className="breathing-green inline-block w-3 h-3 rounded-full bg-green-500 shadow-md mr-2" aria-label={t("myExercises.activeProgramsTitle")}></span>
            <CardTitle>{t("myExercises.activeProgramsTitle")}</CardTitle>
          </span>
        </div>
        <CardDescription>
          {t("myExercises.activeProgramsDescription")}
        </CardDescription>
      </CardHeader>
    <CardContent>
      {loading ? <LoadingState /> : activeAssessments.length === 0 ? <EmptyState /> : <Accordion type="single" collapsible className="w-full space-y-2" value={openedActiveAccordionId} onValueChange={setOpenedActiveAccordionId}>
          {activeAssessments.map(assessment => <AssessmentAccordionItem key={assessment.id} assessment={{
          ...assessment,
          pain_area_display: formatPainAreaWithSubArea(assessment.pain_area, assessment.primary_differential, t)
        } as UserAssessment & {
          pain_area_display: string;
        }} onOpenFollowUp={handleOpenFollowUp} onDeleteAssessment={handleDeleteAssessment} onEndProgram={() => handleEndAssessmentUI(assessment.id)} isActiveProgram={true} />)}
        </Accordion>}
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={() => navigate("/")}>
        {t("myExercises.backHome")}
      </Button>
      <Button onClick={() => navigate("/assessment")}>
        {t("myExercises.newAssessment")}
      </Button>
    </CardFooter>
  </Card>;
};