
import { UserInfo } from '@/utils/types';

interface UserInfoSectionProps {
  userInfo: UserInfo;
}

const UserInfoSection = ({ userInfo }: UserInfoSectionProps) => {
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-medium">Dobrý deň, {userInfo.firstName}</h3>
      <p className="text-gray-500">Analyzovali sme vaše odpovede ohľadom bolesti {userInfo.painArea}.</p>
    </div>
  );
};

export default UserInfoSection;
