
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, CornerDownRight, HeartHandshake, RotateCw } from "lucide-react";

interface ExerciseFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeRequest?: () => void;
}

export const ExerciseFeedbackDialog = ({
  open,
  onOpenChange,
  onChangeRequest,
}: ExerciseFeedbackDialogProps) => {
  // Branching questionnaire state
  const [pain, setPain] = useState<null | "yes" | "no">(null);
  const [painAcceptable, setPainAcceptable] = useState<null | "yes" | "no">(null);
  const [wantChange, setWantChange] = useState<null | "yes" | "no">(null);

  // Reset state when closed
  React.useEffect(() => {
    if (!open) {
      setPain(null);
      setPainAcceptable(null);
      setWantChange(null);
    }
  }, [open]);

  // Show red button if pain not acceptable or wants to change exercise
  const showRedButton =
    (pain === "yes" && painAcceptable === "no") ||
    (wantChange === "yes");

  // Show "Odoslať spätnú väzbu" when answers are at certain combinations:
  // - (pain === "no" && wantChange === "no") OR
  // - (pain === "yes" && painAcceptable === "yes" && wantChange === "no")
  //  - basically: feedback is completed, but not a negative/urgent scenario.
  const showFeedbackSubmit =
    (pain === "no" && wantChange === "no") ||
    (pain === "yes" && painAcceptable === "yes" && wantChange === "no");

  // Animation and dialog card styles (fade-in and background)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md space-y-4 rounded-2xl animate-fade-in bg-white shadow-xl border border-gray-200"
        style={{ minWidth: 320 }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="text-yellow-500 mr-1" size={22} strokeWidth={2.2} />
            Prečo nie je cvik dobrý?
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Q1: Pain? */}
          <div className="rounded-lg px-3 pb-3 pt-2 bg-gray-50 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <HeartHandshake className="text-green-600" size={20} />
              <span>1. Spôsobuje Vám cvik bolesť?</span>
            </div>
            <div className="flex flex-row gap-2 mt-2">
              <Button
                type="button"
                variant={pain === "yes" ? "secondary" : "outline"}
                className="flex-1"
                onClick={() => setPain("yes")}
                tabIndex={0}
              >
                Áno
              </Button>
              <Button
                type="button"
                variant={pain === "no" ? "secondary" : "outline"}
                className="flex-1"
                onClick={() => setPain("no")}
                tabIndex={0}
              >
                Nie
              </Button>
            </div>
          </div>
          {/* Q1a: Acceptable pain? */}
          {pain === "yes" && (
            <div className="rounded-lg px-3 pb-3 pt-2 bg-gray-50 flex flex-col gap-2 ml-4 border-l-4 border-yellow-100">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <CornerDownRight className="text-yellow-500" size={18} />
                <span>1a. Je bolesť prijateľná?</span>
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <Button
                  type="button"
                  variant={painAcceptable === "yes" ? "secondary" : "outline"}
                  className="flex-1"
                  onClick={() => setPainAcceptable("yes")}
                >
                  Áno, je prijateľná
                </Button>
                <Button
                  type="button"
                  variant={painAcceptable === "no" ? "secondary" : "outline"}
                  className="flex-1"
                  onClick={() => setPainAcceptable("no")}
                >
                  Nie, nie je
                </Button>
              </div>
            </div>
          )}
          {/* Q2: Change exercise? (always show after previous answers) */}
          {(pain !== null &&
            (pain === "no" ||
              (pain === "yes" && painAcceptable !== null))) && (
            <div className="rounded-lg px-3 pb-3 pt-2 bg-gray-50 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <RotateCw className="text-blue-500" size={20} />
                <span>2. Chcete zmeniť tento cvik?</span>
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <Button
                  type="button"
                  variant={wantChange === "yes" ? "secondary" : "outline"}
                  className="flex-1"
                  onClick={() => setWantChange("yes")}
                >
                  Áno
                </Button>
                <Button
                  type="button"
                  variant={wantChange === "no" ? "secondary" : "outline"}
                  className="flex-1"
                  onClick={() => setWantChange("no")}
                >
                  Nie
                </Button>
              </div>
            </div>
          )}

          {/* Odoslať spätnú väzbu - submit feedback button, POSITIVE/NEUTRAL routes */}
          {showFeedbackSubmit && (
            <div className="pt-2">
              <Button
                type="button"
                variant="default"
                className="w-full flex items-center gap-2 text-base bg-blue-500 hover:bg-blue-600"
                onClick={() => onOpenChange(false)}
              >
                Odoslať spätnú väzbu
              </Button>
            </div>
          )}

          {/* NEGATIVE/ESCALATION route */}
          {showRedButton && (
            <div className="pt-2">
              <Button
                type="button"
                variant="destructive"
                className="w-full flex items-center gap-2 text-base"
                onClick={() => {
                  onOpenChange(false);
                  onChangeRequest && onChangeRequest();
                }}
              >
                <CheckCircle className="text-white" size={20} strokeWidth={2.4} />
                Zmeniť cvik
              </Button>
              <div className="text-xs text-center text-muted-foreground mt-2">
                Po odoslaní tejto žiadosti Vás budeme kontaktovať ohľadom vhodnej náhrady cviku.
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
