
import { Differential } from '@/utils/types';
import { useTranslation } from 'react-i18next';

interface DifferentialSectionProps {
  primaryDifferential: Differential;
}

const DifferentialSection = ({ primaryDifferential }: DifferentialSectionProps) => {
  const { t } = useTranslation();
  
  const getDifferentialKey = (differential: Differential): string => {
    // Map differential values to translation keys
    switch (differential) {
      case 'muscle pain':
        return 'svalovalBolesť';
      case 'cervical-radiculopathy':
        return 'cervicalRadiculopathy';
      default:
        return 'muscleStrain';
    }
  };
  
  const diffKey = getDifferentialKey(primaryDifferential);
  
  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <h4 className="font-semibold text-purple-800">{t('results.differential.title')}</h4>
      <p className="text-purple-700 font-medium">{t(`results.differential.${diffKey}`)}</p>
      <p className="text-purple-600 mt-2 text-sm">{t(`results.differential.descriptions.${diffKey}`)}</p>
    </div>
  );
};

export default DifferentialSection;
