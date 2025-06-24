
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

// Helper function to get sub-area for upper limb assessments
const getUpperLimbSubArea = (differential: string): string | null => {
  const shoulderDifferentials = [
    'frozen-shoulder',
    'slap-tear', 
    'subacromional-impingement-syndrome',
    'stiff-shoulder',
    'shoulder-bursa',
    'rotator-cuff-tear',
    'rotator-cuff-tendinopathy',
    'biceps-tendinopathy',
    'biceps-tear-long-head',
    'shoulder-dislocation',
    'unstable-shoulder',
    'labral-leason'
  ];
  
  if (shoulderDifferentials.includes(differential)) {
    return 'Rameno';
  }
  
  return null;
};

// Helper function to format pain area with sub-area
const formatPainAreaWithSubArea = (painArea: string, differential: string): string => {
  if (painArea === 'upper limb') {
    const subArea = getUpperLimbSubArea(differential);
    if (subArea) {
      return `Horná končatina / ${subArea}`;
    }
    return 'Horná končatina';
  }
  
  // For other pain areas, use existing translations
  const translations: Record<string, string> = {
    'neck': 'Krčná chrbtica',
    'middle back': 'Hrudná chrbtica',
    'lower back': 'Driekova chrbtica'
  };
  
  return translations[painArea] || painArea;
};

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
  const { t } = useTranslation();
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="relative flex items-center">
            <span
              className="breathing-green inline-block w-3 h-3 rounded-full bg-green-500 shadow-md mr-2"
              aria-label={t("myExercises.activeProgramsTitle")}
            ></span>
            <CardTitle>{t("myExercises.activeProgramsTitle")}</CardTitle>
          </span>
        </div>
        <CardDescription>
          {t("myExercises.activeProgramsDescription")}
        </CardDescription>
      </CardHeader>
    <CardContent>
      {loading ? (
        <LoadingState />
      ) : activeAssessments.length === 0 ? (
        <EmptyState />
      ) : (
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2"
          value={openedActiveAccordionId}
          onValueChange={setOpenedActiveAccordionId}
        >
          {activeAssessments.map((assessment) => (
            <AssessmentAccordionItem
              key={assessment.id}
              assessment={{
                ...assessment,
                pain_area_display: formatPainAreaWithSubArea(assessment.pain_area, assessment.primary_differential)
              } as UserAssessment & { pain_area_display: string }}
              onOpenFollowUp={handleOpenFollowUp}
              onDeleteAssessment={handleDeleteAssessment}
              onEndProgram={() => handleEndAssessmentUI(assessment.id)}
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
