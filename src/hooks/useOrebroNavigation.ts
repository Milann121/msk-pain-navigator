import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useOrebroNavigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTakeQuestionnaire = () => {
    navigate('/orebro-questionnaire');
  };

  const handleViewResults = async () => {
    if (!user) return;
    
    try {
      // Get the latest OREBRO response
      const { data, error } = await supabase
        .from('orebro_responses')
        .select('risk_level, responses')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching OREBRO result:', error);
        return;
      }

      if (data) {
        // Extract pain locations from responses
        const responses = data.responses as any;
        const painLocations = responses?.painLocation || [];
        
        navigate('/orebro-result', { 
          state: { 
            riskLevel: data.risk_level, 
            painLocations 
          } 
        });
      }
    } catch (error) {
      console.error('Error navigating to OREBRO result:', error);
    }
  };

  return {
    handleTakeQuestionnaire,
    handleViewResults
  };
};