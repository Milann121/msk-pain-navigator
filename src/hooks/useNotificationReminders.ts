import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useNotificationReminders = () => {
  const { user } = useAuth();
  const [isOrebroReminderDue, setIsOrebroReminderDue] = useState(false);
  const [isPsfsReminderDue, setIsPsfsReminderDue] = useState(false);
  const [hasCompletedOrebro, setHasCompletedOrebro] = useState(false);
  const [hasCompletedPsfs, setHasCompletedPsfs] = useState(false);
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

      // Check completion status (any record exists)
      const { data: orebroCompletedRows, error: orebroCompletedErr } = await supabase
        .from('orebro_responses')
        .select('id', { count: 'exact', head: false })
        .eq('user_id', user.id)
        .limit(1);
      if (!orebroCompletedErr) {
        setHasCompletedOrebro((orebroCompletedRows?.length ?? 0) > 0);
      }

      const { data: psfsCompletedRows, error: psfsCompletedErr } = await supabase
        .from('psfs_assessment')
        .select('id', { count: 'exact', head: false })
        .eq('user_id', user.id)
        .limit(1);
      if (!psfsCompletedErr) {
        setHasCompletedPsfs((psfsCompletedRows?.length ?? 0) > 0);
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
    hasCompletedOrebro,
    hasCompletedPsfs,
    loading
  };
};
