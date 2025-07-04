
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserAssessment } from "@/components/follow-up/types";
import { useMskProfileManager } from "@/hooks/useMskProfileManager";

export function useProgramEndRenew(
  assessment: UserAssessment,
  onEndProgram?: () => void,
  onRenew?: () => void
) {
  const [programEndedAt, setProgramEndedAt] = useState<Date | null>(
    assessment.program_ended_at ? new Date(assessment.program_ended_at) : null
  );
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [loadingRenew, setLoadingRenew] = useState(false);
  const [justEnded, setJustEnded] = useState(false);
  const { syncMskProfile } = useMskProfileManager();

  // Listen for prop changes to program_ended_at and reset local justEnded if external state changes
  useEffect(() => {
    if (assessment.program_ended_at) {
      setProgramEndedAt(new Date(assessment.program_ended_at));
      setJustEnded(false); // Reset justEnded if the server state changes
    }
    if (!assessment.program_ended_at && programEndedAt) {
      // If remote ended_at becomes null (renewed elsewhere), update local
      setProgramEndedAt(null);
      setJustEnded(false);
    }
    // eslint-disable-next-line
  }, [assessment.program_ended_at]);

  const handleEndProgram = async () => {
    setLoadingEnd(true);
    setJustEnded(true); // Provide instant feedback to UI!
    const now = new Date();
    // Optimistically set programEndedAt for UI logic (so isEnded works instantly)
    setProgramEndedAt(now);
    const { error } = await supabase
      .from('user_assessments')
      .update({ program_ended_at: now.toISOString() })
      .eq('id', assessment.id);
    if (!error) {
      // Sync MSK profile after program end
      await syncMskProfile();
      if (onEndProgram) onEndProgram();
    }
    setLoadingEnd(false);
  };

  const handleRenewProgram = async () => {
    setLoadingRenew(true);
    setProgramEndedAt(null);
    setJustEnded(false); // Provide instant feedback to UI!
    const { error } = await supabase
      .from('user_assessments')
      .update({ program_ended_at: null })
      .eq('id', assessment.id);
    if (!error) {
      // Sync MSK profile after program renewal
      await syncMskProfile();
      if (onRenew) onRenew();
    }
    setLoadingRenew(false);
  };

  // The program should be considered "ended" if either endedAt or justEnded is truthy
  const isEnded = !!programEndedAt || justEnded;

  return {
    programEndedAt,
    isEnded,
    justEnded,
    loadingEnd,
    loadingRenew,
    handleEndProgram,
    handleRenewProgram,
  };
}
