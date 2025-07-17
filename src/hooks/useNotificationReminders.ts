import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useNotificationReminders = () => {
  const { user } = useAuth();
  const [isOrebroReminderDue, setIsOrebroReminderDue] = useState(false);
  const [isPsfsReminderDue, setIsPsfsReminderDue] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    checkReminders();

    // Set up real-time listeners for when questionnaires are completed
    const orebroChannel = supabase
      .channel('orebro-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orebro_responses',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          // Recheck reminders when OREBRO responses change
          checkReminders();
        }
      )
      .subscribe();

    const psfsChannel = supabase
      .channel('psfs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'psfs_assessment',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          // Recheck reminders when PSFS assessments change
          checkReminders();
        }
      )
      .subscribe();

    const programChannel = supabase
      .channel('program-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_program_tracking',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          // Recheck reminders when program status changes
          checkReminders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orebroChannel);
      supabase.removeChannel(psfsChannel);
      supabase.removeChannel(programChannel);
    };
  }, [user]);

  return {
    isOrebroReminderDue,
    isPsfsReminderDue,
    loading
  };
};
