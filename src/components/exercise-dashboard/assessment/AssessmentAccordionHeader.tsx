
import { UserAssessment } from '@/components/follow-up/types';
import { formatPainArea } from '@/utils/formatHelpers';
import { useTranslation } from 'react-i18next';

interface AssessmentAccordionHeaderProps {
  assessment: UserAssessment & { pain_area_display?: string };
  showEndDate?: boolean;
}

export const AssessmentAccordionHeader = ({ assessment, showEndDate }: AssessmentAccordionHeaderProps) => {
  const { t } = useTranslation();
  
  const displayDate = showEndDate && assessment.program_ended_at 
    ? new Date(assessment.program_ended_at).toLocaleDateString('sk-SK')
    : new Date(assessment.timestamp).toLocaleDateString('sk-SK');
  
  return (
    <div className="flex justify-between items-center w-full text-left">
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {displayDate} — {' '}
          {assessment.pain_area_display || formatPainArea(assessment.pain_area, t)}
        </div>
      </div>
    </div>
  );
};
