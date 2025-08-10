
import { Differential } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import { formatDifferential } from '@/utils/formatHelpers';

interface DifferentialSectionProps {
  primaryDifferential: Differential;
}

const DifferentialSection = ({ primaryDifferential }: DifferentialSectionProps) => {
  const { t } = useTranslation();
  
  const label = formatDifferential(primaryDifferential, t);
  const descKey = `results.differential.descriptions.${primaryDifferential}`;
  const desc = t(descKey);
  const hasDesc = desc !== descKey;
  const showNoneHint = primaryDifferential === 'none' && !hasDesc;
  
  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <h4 className="font-semibold text-purple-800">{t('results.differential.title')}</h4>
      <p className="text-purple-700 font-medium">{label}</p>
      {hasDesc && (
        <p className="text-purple-600 mt-2 text-sm">{desc}</p>
      )}
      {showNoneHint && (
        <p className="text-purple-600 mt-2 text-sm">{t('results.differential.descriptions.none', { defaultValue: 'No specific differential identified yet.' })}</p>
      )}
    </div>
  );
};

export default DifferentialSection;
