
import React from "react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex flex-row flex-wrap gap-2 mt-2">
      {!isEnded ? (
        <Button
          size="sm"
          variant="destructive"
          onClick={onEnd}
          disabled={loadingEnd}
        >
          {loadingEnd ? "Ukladanie..." : "Ukončiť program"}
        </Button>
      ) : (
        <>
          <Button size="sm" disabled variant="outline" className="text-green-700 border-green-500 bg-green-50">
            Ukončené
          </Button>
          <Button
            size="sm"
            variant="default"
            onClick={onRenew}
            disabled={loadingRenew}
            className="border-blue-500"
          >
            {loadingRenew ? "Obnovujem..." : "Obnoviť program"}
          </Button>
        </>
      )}
    </div>
  );
}
