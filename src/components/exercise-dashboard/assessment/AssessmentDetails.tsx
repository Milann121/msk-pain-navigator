
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeStyles } from "./BadgeStyles";
import { getMechanismLabel, formatDifferential } from "@/utils/formatHelpers";
import { UserAssessment } from "@/components/follow-up/types";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PainMechanism } from "@/utils/types";

interface DetailsSectionProps {
  assessment: UserAssessment;
  latestPainLevel: number | null;
  diffIcon: React.ReactNode;
}

export const AssessmentDetails = ({
  assessment,
  latestPainLevel,
  diffIcon,
}: DetailsSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <div>
        <span className="font-medium text-gray-500">{t('assessmentAccordion.painMechanismLabel')}</span>
        <div className="mt-1">
          <Badge className={BadgeStyles.getMechanismBadgeStyle(assessment.primary_mechanism)}>
            {getMechanismLabel(assessment.primary_mechanism as PainMechanism, t)}
          </Badge>
        </div>
      </div>
      <div>
        <span className="font-medium text-gray-500">{t('assessmentAccordion.suspicionLabel')}</span>
        <div className="mt-1">
          <Badge className={BadgeStyles.getDifferentialBadgeStyle(assessment.primary_differential)}>
            {formatDifferential(assessment.primary_differential, t)}
          </Badge>
        </div>
      </div>
      <div className="mt-3">
        <span className="font-medium text-gray-500">{t('assessmentAccordion.yourPainInitial')}</span>
        <div className="mt-1 font-medium text-blue-700">
          {assessment.initial_pain_level !== undefined ? `${assessment.initial_pain_level}/10` : "–"}
        </div>
      </div>
      <div>
        <div className="mt-1">
          <p className="text-sm text-gray-600 mb-3">
            {t('assessmentAccordion.yourPainLatest')}{" "}
            {typeof latestPainLevel === "number" ? (
              <>
                <span className="font-semibold text-blue-700">{latestPainLevel}/10</span>
                {diffIcon}
              </>
            ) : (
              <span className="text-gray-400">N/A</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
