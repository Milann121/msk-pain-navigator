
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FollowUpQuestionnaire } from '@/components/follow-up/FollowUpQuestionnaire';
import { UserAssessment } from '@/components/follow-up/types';

interface FollowUpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAssessment: UserAssessment | null;
  onComplete: () => void;
}

export const FollowUpDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedAssessment, 
  onComplete 
}: FollowUpDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Zaznamenať pokrok</DialogTitle>
        </DialogHeader>
        {selectedAssessment && (
          <FollowUpQuestionnaire
            assessmentId={selectedAssessment.id}
            onComplete={onComplete}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
