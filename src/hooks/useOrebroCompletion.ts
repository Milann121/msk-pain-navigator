import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { differenceInMonths } from 'date-fns';

export const useOrebroCompletion = () => {
  const { user } = useAuth();
  const [hasCompletedRecently, setHasCompletedRecently] = useState(false);
  const [lastCompletionDate, setLastCompletionDate] = useState<Date | null>(null);
  const [showReminder, setShowReminder] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkOrebroCompletion();
    }
  }, [user]);

  const checkOrebroCompletion = async () => {
    if (!user) return;

    try {
      // Check for OREBRO completion in the last 3 months
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const { data, error } = await supabase
        .from('orebro_responses')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking OREBRO completion:', error);
        return;
      }

      if (data && data.length > 0) {
        const lastCompletion = new Date(data[0].created_at);
        setLastCompletionDate(lastCompletion);
        
        const monthsSinceCompletion = differenceInMonths(new Date(), lastCompletion);
        
        if (monthsSinceCompletion < 3) {
          setHasCompletedRecently(true);
        } else {
          setShowReminder(true);
        }
      } else {
        setShowReminder(true);
      }
    } catch (error) {
      console.error('Error checking OREBRO completion:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    hasCompletedRecently,
    lastCompletionDate,
    showReminder,
    loading
  };
};