
import { UserInfo } from '@/utils/types';

interface UserInfoSectionProps {
  userInfo: UserInfo;
}

const formatPainAreaSlovak = (area: string): string => {
  const translations: Record<string, string> = {
    'neck': 'krku',
    'middle back': 'hrudnej chrbtice',
    'lower back': 'drieku'
  };
  
  return translations[area] || area;
};

const UserInfoSection = ({ userInfo }: UserInfoSectionProps) => {
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-medium">Dobrý deň</h3>
      <p className="text-gray-500">Analyzovali sme vaše odpovede ohľadom bolesti {formatPainAreaSlovak(userInfo.painArea)}.</p>
    </div>
  );
};

export default UserInfoSection;
