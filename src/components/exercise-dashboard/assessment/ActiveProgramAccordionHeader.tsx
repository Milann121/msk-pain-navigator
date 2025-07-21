import { UserAssessment } from '@/components/follow-up/types';
import { formatPainAreaWithSubArea } from '@/utils/formatHelpers';
import { useTranslation } from 'react-i18next';

// Import body area images
import neckImage from '@/assets/body-areas/neck.png';
import lowerBackImage from '@/assets/body-areas/lower-back.png';
import middleBackImage from '@/assets/body-areas/middle-back.png';
import upperLimbImage from '@/assets/body-areas/upper-limb.png';

interface ActiveProgramAccordionHeaderProps {
  assessment: UserAssessment & { pain_area_display?: string };
}

const getBodyAreaImage = (painArea: string): string => {
  const normalizedArea = painArea.toLowerCase().replace(/[_\s-]/g, '');
  
  switch (normalizedArea) {
    case 'neck':
    case 'krčnachrbtica':
    case 'krcnichrbtica':
      return neckImage;
    case 'lowerback':
    case 'dolnáčasťchrbta':
    case 'dolníčasťzad':
      return lowerBackImage;
    case 'middleback':
    case 'strednáčasťchrbta':
    case 'středníčasťzad':
      return middleBackImage;
    case 'upperlimb':
    case 'hornákončatina':
    case 'horníkončetina':
      return upperLimbImage;
    default:
      return neckImage; // fallback
  }
};

export const ActiveProgramAccordionHeader = ({ assessment }: ActiveProgramAccordionHeaderProps) => {
  const { t } = useTranslation();
  
  const painAreaText = assessment.pain_area_display || formatPainAreaWithSubArea(
    assessment.pain_area, 
    assessment.primary_differential || '', 
    t
  );
  
  const bodyImage = getBodyAreaImage(assessment.pain_area);
  
  return (
    <div className="flex items-center gap-4 w-full text-left">
      <div className="flex-shrink-0">
        <img 
          src={bodyImage} 
          alt={painAreaText}
          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {painAreaText}
        </div>
      </div>
    </div>
  );
};