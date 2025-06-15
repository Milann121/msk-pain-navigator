
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle className="text-lg">Prečo nie je cvik dobrý?</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Q1: Pain? */}
          <div>
            <p className="font-medium mb-2">1. Spôsobuje Vám cvik bolesť?</p>
            <div className="flex gap-3 items-center">
              <Button type="button" variant={pain === "yes" ? "secondary" : "outline"} onClick={() => setPain("yes")}>
                Áno
              </Button>
              <Button type="button" variant={pain === "no" ? "secondary" : "outline"} onClick={() => setPain("no")}>
                Nie
              </Button>
            </div>
          </div>
          {/* Q1a: Acceptable pain? */}
          {pain === "yes" && (
            <div>
              <p className="font-medium mb-2 ml-2">1a. Je bolesť prijateľná?</p>
              <div className="flex gap-3 items-center ml-2">
                <Button type="button" variant={painAcceptable === "yes" ? "secondary" : "outline"} onClick={() => setPainAcceptable("yes")}>
                  Áno, je prijateľná
                </Button>
                <Button type="button" variant={painAcceptable === "no" ? "secondary" : "outline"} onClick={() => setPainAcceptable("no")}>
                  Nie, nie je
                </Button>
              </div>
            </div>
          )}
          {/* Q2: Change exercise? (always show after previous answers) */}
          {(pain !== null && (pain === "no" || (pain === "yes" && painAcceptable !== null))) && (
            <div>
              <p className="font-medium mb-2">2. Chcete zmeniť tento cvik?</p>
              <div className="flex gap-3 items-center">
                <Button type="button" variant={wantChange === "yes" ? "secondary" : "outline"} onClick={() => setWantChange("yes")}>
                  Áno
                </Button>
                <Button type="button" variant={wantChange === "no" ? "secondary" : "outline"} onClick={() => setWantChange("no")}>
                  Nie
                </Button>
              </div>
            </div>
          )}

          {showRedButton && (
            <div className="pt-4">
              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() => {
                  onOpenChange(false);
                  onChangeRequest && onChangeRequest();
                }}
              >
                Zmeniť cvik
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
