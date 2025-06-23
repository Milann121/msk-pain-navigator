
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { AssessmentAccordionItem } from "@/components/exercise-dashboard/assessment/AssessmentAccordionItem";
import { LoadingState } from "@/components/exercise-dashboard/assessment/LoadingState";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { UserAssessment } from "@/components/follow-up/types";
import { NavigateFunction } from "react-router-dom";

interface EndedProgramsSectionProps {
  loading: boolean;
  endedAssessments: UserAssessment[];
  handleOpenFollowUp: (assessment: UserAssessment) => void;
  handleDeleteAssessment: (id: string) => void;
  handleRenewAssessmentUI: (id: string) => void;
  navigate: NavigateFunction;
}

export const EndedProgramsSection: React.FC<EndedProgramsSectionProps> = ({
  loading,
  endedAssessments,
  handleOpenFollowUp,
  handleDeleteAssessment,
  handleRenewAssessmentUI,
  navigate
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("myExercises.endedProgramsTitle")}</CardTitle>
        <CardDescription>
          {t("myExercises.endedProgramsDescription")}
        </CardDescription>
      </CardHeader>
    <CardContent>
      {loading ? (
        <LoadingState />
      ) : endedAssessments.length === 0 ? (
        <div className="text-center text-gray-400 py-6">{t("myExercises.noEndedPrograms")}</div>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {endedAssessments.map((assessment) => (
            <AssessmentAccordionItem
              key={assessment.id}
              assessment={assessment}
              onOpenFollowUp={handleOpenFollowUp}
              onDeleteAssessment={handleDeleteAssessment}
              onRenew={() => handleRenewAssessmentUI(assessment.id)}
            />
          ))}
        </Accordion>
      )}
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={() => navigate("/")}>
        {t("myExercises.backHome")}
      </Button>
      <Button onClick={() => navigate("/assessment")}>
        {t("myExercises.newAssessment")}
      </Button>
    </CardFooter>
  </Card>
  );
};
