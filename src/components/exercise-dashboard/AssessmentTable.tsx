
import { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { UserAssessment } from '@/components/follow-up/types';
import { AssessmentAccordionItem } from './assessment/AssessmentAccordionItem';
import { LoadingState } from './assessment/LoadingState';
import { EmptyState } from './assessment/EmptyState';
import { FollowUpDialog } from './assessment/FollowUpDialog';

interface AssessmentTableProps {
  assessments: UserAssessment[];
  loading: boolean;
  onDeleteAssessment: (id: string) => void;
}

export const AssessmentTable = ({ assessments, loading, onDeleteAssessment }: AssessmentTableProps) => {
  const [selectedAssessment, setSelectedAssessment] = useState<UserAssessment | null>(null);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  
  const handleOpenFollowUp = (assessment: UserAssessment) => {
    setSelectedAssessment(assessment);
    setFollowUpOpen(true);
  };
  
  const handleFollowUpComplete = () => {
    setFollowUpOpen(false);
    setSelectedAssessment(null);
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (assessments.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <div className="space-y-2">
      <Accordion type="single" collapsible className="w-full">
        {assessments.map((assessment) => (
          <AssessmentAccordionItem
            key={assessment.id}
            assessment={assessment}
            onOpenFollowUp={handleOpenFollowUp}
            onDeleteAssessment={onDeleteAssessment}
          />
        ))}
      </Accordion>

      <FollowUpDialog
        isOpen={followUpOpen}
        onOpenChange={setFollowUpOpen}
        selectedAssessment={selectedAssessment}
        onComplete={handleFollowUpComplete}
      />
    </div>
  );
};
