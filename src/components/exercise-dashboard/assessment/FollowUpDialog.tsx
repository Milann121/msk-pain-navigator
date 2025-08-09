
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
      title: t('questionnaire.followUp.progressRecorded'),
      description: t('questionnaire.followUp.responsesSaved'),
    });
    onComplete();
    
    // Emit a custom event to refresh exercise counts
    const event = new CustomEvent('exercise-completed');
    window.dispatchEvent(event);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] sm:w-full sm:max-w-3xl p-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle>{t('questionnaire.followUp.title')}</DialogTitle>
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
