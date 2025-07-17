import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { differenceInMonths, addMonths } from 'date-fns';

export const usePsfsCompletion = () => {
  const { user } = useAuth();
  const [hasCompletedRecently, setHasCompletedRecently] = useState(false);
  const [lastCompletionDate, setLastCompletionDate] = useState<Date | null>(null);
  const [showReminder, setShowReminder] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkPsfsCompletion();
    }
  }, [user]);

  const checkPsfsCompletion = async () => {
    if (!user) return;

    try {
      // Get the most recent PSFS assessment
      const { data: psfsData, error } = await supabase
        .from('psfs_assessment')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching PSFS data:', error);
        setLoading(false);
        return;
      }

      if (psfsData && psfsData.length > 0) {
        const mostRecent = psfsData[0];
        const completionDate = new Date(mostRecent.updated_at);
        const now = new Date();
        
        // Set completion date
        setLastCompletionDate(completionDate);
        
        // Check if completed recently (within 2 months)
        const monthsSinceCompletion = differenceInMonths(now, completionDate);
        setHasCompletedRecently(monthsSinceCompletion < 2);
        
        // Calculate reminder date (2 months after last completion)
        const reminderDate = addMonths(completionDate, 2);
        
        // Show reminder only if we're past the reminder date and haven't completed recently
        setShowReminder(now >= reminderDate && monthsSinceCompletion >= 2);
      } else {
        // No PSFS assessment found - show reminder for first-time completion
        setHasCompletedRecently(false);
        setLastCompletionDate(null);
        setShowReminder(true);
      }
    } catch (error) {
      console.error('Error checking PSFS completion:', error);
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