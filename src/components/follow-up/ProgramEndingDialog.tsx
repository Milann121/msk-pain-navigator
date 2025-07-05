import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProgramEndingQuestionnaire from './ProgramEndingQuestionnaire';
import { UserAssessment } from './types';

interface ProgramEndingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAssessment: UserAssessment | null;
  onComplete: () => void;
}

export const ProgramEndingDialog = ({
  isOpen,
  onOpenChange,
  selectedAssessment,
  onComplete
}: ProgramEndingDialogProps) => {
  if (!selectedAssessment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Program Ending Assessment</DialogTitle>
        </DialogHeader>
        <ProgramEndingQuestionnaire
          assessment={selectedAssessment}
          onComplete={onComplete}
        />
      </DialogContent>
    </Dialog>
  );
};