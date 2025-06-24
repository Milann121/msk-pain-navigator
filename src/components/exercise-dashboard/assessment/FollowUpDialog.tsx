
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserAssessment } from '@/components/follow-up/types';
import FollowUpQuestionnaire from '@/components/follow-up/FollowUpQuestionnaire';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
  const handleComplete = () => {
    toast({
      title: t('followUp.progressRecorded'),
      description: t('followUp.responsesSaved'),
    });
    onComplete();
    
    // Emit a custom event to refresh exercise counts
    const event = new CustomEvent('exercise-completed');
    window.dispatchEvent(event);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('followUp.title')}</DialogTitle>
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
