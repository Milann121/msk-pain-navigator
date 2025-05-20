
import { useAuth } from '@/contexts/AuthContext';
import UserForm from '@/components/UserForm';
import { UserInfo } from '@/utils/types';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';

const UserInfoHandler = () => {
  const { setUserInfo, setStage } = useAssessment();

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStage(AssessmentStage.GeneralQuestionnaire);
  };

  return <UserForm onSubmit={handleUserInfoSubmit} />;
};

export default UserInfoHandler;
