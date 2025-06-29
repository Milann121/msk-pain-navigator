
import { SINGroup } from '@/utils/types';
import { useTranslation } from 'react-i18next';

interface SINSectionProps {
  sinGroup: SINGroup;
}

const SINSection = ({ sinGroup }: SINSectionProps) => {
  const { t } = useTranslation();
  
  const getSINKey = (sin: SINGroup): string => {
    switch (sin) {
      case 'low SIN':
        return 'low';
      case 'mid SIN':
        return 'mid';
      case 'high SIN':
        return 'high';
      default:
        return 'low';
    }
  };
  
  const sinKey = getSINKey(sinGroup);
  
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="font-semibold text-green-800">{t('results.sinGroup.title')}</h4>
      <p className="text-green-700 font-medium">{t(`results.sinGroup.${sinKey}`)}</p>
      <p className="text-green-600 mt-2 text-sm">{t(`results.sinGroup.descriptions.${sinKey}`)}</p>
    </div>
  );
};

export default SINSection;
