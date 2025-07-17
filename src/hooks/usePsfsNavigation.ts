import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const usePsfsNavigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTakeQuestionnaire = () => {
    navigate('/psfs-questionnaire');
  };

  const handleViewResults = async () => {
    if (!user) return;
    
    try {
      // This would navigate to PSFS results page
      // For now, we'll navigate to the questionnaire
      navigate('/psfs-questionnaire');
    } catch (error) {
      console.error('Error navigating to PSFS result:', error);
    }
  };

  return {
    handleTakeQuestionnaire,
    handleViewResults
  };
};