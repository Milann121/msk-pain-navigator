
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExerciseReplaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newExercise: {
    exerciseTitle: string;
    videoId: string;
    description?: string;
  } | null;
  onConfirm: (newExercise: { exerciseTitle: string; videoId: string }) => void;
}

export const ExerciseReplaceDialog: React.FC<ExerciseReplaceDialogProps> = ({
  open, onOpenChange, newExercise, onConfirm
}) => {
  if (!newExercise) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white rounded-xl border flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Navrhnutý nový cvik</DialogTitle>
        </DialogHeader>
        <div>
          <div className="font-medium text-gray-800 mb-2">{newExercise.exerciseTitle}</div>
          <div className="mb-3 text-gray-600 text-sm">{newExercise.description || ""}</div>
          <div className="aspect-video w-full mb-2 border rounded">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${newExercise.videoId}`}
              title={newExercise.exerciseTitle}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            className="flex-1"
            onClick={() => onConfirm(newExercise)}
          >
            Potvrdiť zmenu cviku
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Odmietnuť zmenu cviku
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
