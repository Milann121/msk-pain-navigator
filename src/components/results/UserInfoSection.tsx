
import { UserInfo } from '@/utils/types';
import { useTranslation } from 'react-i18next';

interface UserInfoSectionProps {
  userInfo: UserInfo;
}

const UserInfoSection = ({ userInfo }: UserInfoSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-medium">{t('results.userInfo.greeting')}</h3>
      <p className="text-gray-500">{t('results.userInfo.analysisText', { painArea: t(`common.bodyParts.${userInfo.painArea}`) })}</p>
    </div>
  );
};

export default UserInfoSection;
