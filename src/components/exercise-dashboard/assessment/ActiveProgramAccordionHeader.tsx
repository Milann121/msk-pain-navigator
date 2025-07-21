import { UserAssessment } from '@/components/follow-up/types';
import { formatPainAreaWithSubArea } from '@/utils/formatHelpers';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';

interface ActiveProgramAccordionHeaderProps {
  assessment: UserAssessment & { pain_area_display?: string };
}

const getBodyAreaImage = (painArea: string): string => {
  const normalizedArea = painArea.toLowerCase().replace(/[_\s-]/g, '');
  
  switch (normalizedArea) {
    case 'neck':
    case 'krčnachrbtica':
    case 'krcnichrbtica':
      return '/lovable-uploads/imageAssessment/neckAssessment.png';
    case 'lowerback':
    case 'dolnáčasťchrbta':
    case 'dolníčasťzad':
      return '/lovable-uploads/imageAssessment/lowerBackAssessment.png';
    case 'middleback':
    case 'strednáčasťchrbta':
    case 'středníčasťzad':
      return '/lovable-uploads/imageAssessment/middleBackAssessment.png';
    case 'upperlimb':
    case 'hornákončatina':
    case 'horníkončetina':
      return '/lovable-uploads/imageAssessment/shoulderAssessment.png';
    default:
      return '/lovable-uploads/imageAssessment/neckAssessment.png'; // fallback
  }
};

export const ActiveProgramAccordionHeader = ({ assessment }: ActiveProgramAccordionHeaderProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  const painAreaText = assessment.pain_area_display || formatPainAreaWithSubArea(
    assessment.pain_area, 
    assessment.primary_differential || '', 
    t
  );
  
  const bodyImage = getBodyAreaImage(assessment.pain_area);
  
  return (
    <div className={isMobile ? "w-full" : "w-1/2"}>
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 bg-white transition-all duration-200 hover:shadow-md">
        <div className={`flex items-center ${isMobile ? "h-12" : "h-16"}`}>
          <div className="w-1/2 h-full overflow-hidden rounded-l-lg">
            <img 
              src={bodyImage} 
              alt={painAreaText}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 flex items-center justify-center px-2">
            <div className={`text-gray-900 text-center ${isMobile ? "font-normal text-xs" : "font-medium text-sm"}`}>
              {painAreaText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};