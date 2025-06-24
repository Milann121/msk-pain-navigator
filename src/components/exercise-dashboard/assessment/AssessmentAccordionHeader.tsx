
import { UserAssessment } from '@/components/follow-up/types';
import { formatPainArea } from '@/utils/formatHelpers';
import { useTranslation } from 'react-i18next';

interface AssessmentAccordionHeaderProps {
  assessment: UserAssessment & { pain_area_display?: string };
}

export const AssessmentAccordionHeader = ({ assessment }: AssessmentAccordionHeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center w-full text-left">
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {new Date(assessment.timestamp).toLocaleDateString('sk-SK')} — {' '}
          {assessment.pain_area_display || formatPainArea(assessment.pain_area, t)}
        </div>
      </div>
    </div>
  );
};
