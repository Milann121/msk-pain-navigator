import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useNotificationReminders = () => {
  const { user } = useAuth();
  const [isOrebroReminderDue, setIsOrebroReminderDue] = useState(false);
  const [isPsfsReminderDue, setIsPsfsReminderDue] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkReminders = async () => {
      if (!user) return;

      try {
        // Check OREBRO reminder
        const { data: orebroReminder, error: orebroError } = await supabase
          .rpc('is_orebro_reminder_due', { user_id_param: user.id });

        if (!orebroError) {
          setIsOrebroReminderDue(orebroReminder || false);
        }

        // Check PSFS reminder
        const { data: psfsReminder, error: psfsError } = await supabase
          .rpc('is_psfs_reminder_due', { user_id_param: user.id });

        if (!psfsError) {
          setIsPsfsReminderDue(psfsReminder || false);
        }
      } catch (error) {
        console.error('Error checking reminders:', error);
      } finally {
        setLoading(false);
      }
    };

    checkReminders();
  }, [user]);

  return {
    isOrebroReminderDue,
    isPsfsReminderDue,
    loading
  };
};