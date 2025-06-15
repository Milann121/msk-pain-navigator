
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserAssessment } from "@/components/follow-up/types";

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

  useEffect(() => {
    if (assessment.program_ended_at || programEndedAt) {
      setJustEnded(false);
    }
  }, [assessment.program_ended_at, programEndedAt]);

  const handleEndProgram = async () => {
    setLoadingEnd(true);
    setJustEnded(true); // instant feedback!
    const now = new Date();
    const { error } = await supabase
      .from('user_assessments')
      .update({ program_ended_at: now.toISOString() })
      .eq('id', assessment.id);
    if (!error) {
      setProgramEndedAt(now);
      if (onEndProgram) onEndProgram();
    }
    setLoadingEnd(false);
  };

  const handleRenewProgram = async () => {
    setLoadingRenew(true);
    setProgramEndedAt(null);
    setJustEnded(false); // instant feedback!
    const { error } = await supabase
      .from('user_assessments')
      .update({ program_ended_at: null })
      .eq('id', assessment.id);
    if (!error) {
      if (onRenew) onRenew();
    }
    setLoadingRenew(false);
  };

  // "Ended" state in UI: local or remote
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
