
import { PainMechanism } from '@/utils/types';
import { useTranslation } from 'react-i18next';

interface MechanismSectionProps {
  primaryMechanism: PainMechanism;
}

const MechanismSection = ({ primaryMechanism }: MechanismSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-semibold text-blue-800">{t('results.mechanism.title')}</h4>
      <p className="text-blue-700 font-medium">{t(`results.mechanism.${primaryMechanism}`)}</p>
      <p className="text-blue-600 mt-2 text-sm">{t(`results.mechanism.descriptions.${primaryMechanism}`)}</p>
    </div>
  );
};

export default MechanismSection;
