import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { differenceInMonths } from 'date-fns';

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
      // For now, we'll simulate PSFS completion check
      // This would typically check a psfs_responses table
      // Since we don't have this table yet, we'll always show the expanded view
      setShowReminder(true);
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