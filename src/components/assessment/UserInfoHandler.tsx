
import { useAuth } from '@/contexts/AuthContext';
import UserForm from '@/components/UserForm';
import { UserInfo } from '@/utils/types';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const UserInfoHandler = () => {
  const { setUserInfo, setStage, setSelectedBodyArea } = useAssessment();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const bodyArea = urlParams.get('area');
    if (bodyArea) {
      setSelectedBodyArea(bodyArea);
    }
  }, [location.search, setSelectedBodyArea]);

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStage(AssessmentStage.GeneralQuestionnaire);
  };

  return <UserForm onSubmit={handleUserInfoSubmit} />;
};

export default UserInfoHandler;
