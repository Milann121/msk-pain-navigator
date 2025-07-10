import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ExerciseSwapDialogProps {
  showSwapButton: boolean;
  showSwapDialog: boolean;
  onSwapClick: () => void;
  onConfirmSwap: () => void;
  onCancelSwap: () => void;
}

export const ExerciseSwapDialog = ({
  showSwapButton,
  showSwapDialog,
  onSwapClick,
  onConfirmSwap,
  onCancelSwap
}: ExerciseSwapDialogProps) => (
  <>
    {showSwapButton && (
      <div className="animate-slide-in-right">
        <Button
          variant="outline"
          size="sm"
          onClick={onSwapClick}
          className="mt-2 border-orange-400 text-orange-600 hover:bg-orange-50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Swap Exercise
        </Button>
      </div>
    )}

    <Dialog open={showSwapDialog} onOpenChange={onCancelSwap}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Swap Exercise</DialogTitle>
          <DialogDescription>
            Are you sure you want to swap this exercise for an alternative one?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancelSwap}>
            No
          </Button>
          <Button onClick={onConfirmSwap}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
);