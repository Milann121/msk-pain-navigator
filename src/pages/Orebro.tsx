import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Questionnaire from '@/components/Questionnaire';
import orebroQuestionnaire from '@/data/orebro';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

const Orebro = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleComplete = async (answers: Record<string, any>) => {
    if (!user) return;

    const totalScore = Object.values(answers).reduce((sum, val) => {
      if (typeof val === 'number') return sum + val;
      return sum;
    }, 0);

    try {
      await supabase.from('orebro_responses').insert({
        user_id: user.id,
        responses: answers,
        total_score: totalScore
      });
    } catch (error) {
      console.error('Error saving OREBRO responses:', error);
    }

    navigate('/domov');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-2xl px-2 md:px-0">
          <Questionnaire questionnaire={orebroQuestionnaire} onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
};

export default Orebro;
