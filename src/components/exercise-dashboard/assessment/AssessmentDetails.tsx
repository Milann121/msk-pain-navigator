
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeStyles } from "./BadgeStyles";
import { formatPainArea, formatMechanism, formatDifferential } from "../FormatHelpers";
import { UserAssessment } from "@/components/follow-up/types";
import { ArrowUp, ArrowDown } from "lucide-react";

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
  return (
    <div className="space-y-2">
      <div>
        <span className="font-medium text-gray-500">Mechanizmus bolesti:</span>
        <div className="mt-1">
          <Badge className={BadgeStyles.getMechanismBadgeStyle(assessment.primary_mechanism)}>
            {formatMechanism(assessment.primary_mechanism)}
          </Badge>
        </div>
      </div>
      <div>
        <span className="font-medium text-gray-500">Diagnóza:</span>
        <div className="mt-1">
          <Badge className={BadgeStyles.getDifferentialBadgeStyle(assessment.primary_differential)}>
            {formatDifferential(assessment.primary_differential)}
          </Badge>
        </div>
      </div>
      <div className="mt-3">
        <span className="font-medium text-gray-500">Vaša bolesť na začiatku:</span>
        <div className="mt-1 font-medium text-blue-700">
          {assessment.initial_pain_level !== undefined ? `${assessment.initial_pain_level}/10` : "–"}
        </div>
      </div>
      <div>
        <span className="font-medium text-gray-500">Vaša posledná zaznamenaná bolesť:</span>
        <div className="mt-1">
          <p className="text-sm text-gray-600 mb-3">
            Vaša posledná zaznamenaná bolesť:{" "}
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

