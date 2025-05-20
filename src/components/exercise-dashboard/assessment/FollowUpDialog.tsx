
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserAssessment } from '@/components/follow-up/types';
import FollowUpQuestionnaire from '@/components/follow-up/FollowUpQuestionnaire';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const handleComplete = () => {
    toast({
      title: "Pokrok zaznamenaný",
      description: "Vaše odpovede boli úspešne uložené",
    });
    onComplete();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Zaznamenať pokrok</DialogTitle>
        </DialogHeader>
        {selectedAssessment && (
          <FollowUpQuestionnaire
            assessment={selectedAssessment}
            onComplete={handleComplete}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
