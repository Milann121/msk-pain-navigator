
import React from "react";
import { format } from "date-fns";
import { formatPainArea } from "../FormatHelpers";
import { UserAssessment } from "@/components/follow-up/types";

interface AssessmentAccordionHeaderProps {
  assessment: UserAssessment;
}

export function AssessmentAccordionHeader({ assessment }: AssessmentAccordionHeaderProps) {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {format(new Date(assessment.timestamp), 'dd.MM.yyyy')}
        </span>
        <span className="text-gray-600 hidden sm:inline">–</span>
        <span className="text-gray-600 hidden sm:inline">
          {formatPainArea(assessment.pain_area)}
        </span>
      </div>
      <div className="sm:hidden text-sm text-gray-500">
        {formatPainArea(assessment.pain_area)}
      </div>
    </div>
  );
}
