
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ProgramControlsProps {
  isEnded: boolean;
  loadingEnd: boolean;
  loadingRenew: boolean;
  onEnd: () => void;
  onRenew: () => void;
}

export function AssessmentProgramControls({
  isEnded,
  loadingEnd,
  loadingRenew,
  onEnd,
  onRenew,
}: ProgramControlsProps) {
  const { t } = useTranslation();
  
  // If ended, show only green "Ukončené" and "Obnoviť program"
  if (isEnded) {
    return (
      <div className="flex flex-row flex-wrap gap-2 mt-2">
        <Button size="sm" disabled variant="outline" className="text-green-700 border-green-500 bg-green-50">
          {t('assessmentAccordion.ended')}
        </Button>
        <Button
          size="sm"
          variant="default"
          onClick={onRenew}
          disabled={loadingRenew}
          className="border-blue-500"
        >
          {loadingRenew ? t('assessmentAccordion.renewing') : t('assessmentAccordion.renewProgram')}
        </Button>
      </div>
    );
  }
  // If not ended, show only red "Ukončiť program"
  return (
    <div className="flex flex-row flex-wrap gap-2 mt-2">
      <Button
        size="sm"
        variant="destructive"
        onClick={onEnd}
        disabled={loadingEnd}
      >
        {loadingEnd ? t('assessmentAccordion.ending') : t('assessmentAccordion.endProgram')}
      </Button>
    </div>
  );
}
