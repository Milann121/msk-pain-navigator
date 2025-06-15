
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useLatestPainLevel(assessmentId: string, initialPainLevel: number | null) {
  const [latestPainLevel, setLatestPainLevel] = useState<number | null>(null);
  const [lastPainDate, setLastPainDate] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestPainLevel() {
      try {
        const { data, error } = await supabase
          .rpc('get_latest_pain_level', {
            assessment_id_param: assessmentId,
            user_id_param: null,
          });

        if (!error && data && Array.isArray(data) && data.length > 0) {
          setLatestPainLevel(data[0].pain_level ?? null);
          setLastPainDate(data[0].created_at ?? null);
        } else {
          const { data: responses, error: respErr } = await supabase
            .from('follow_up_responses')
            .select('pain_level, created_at')
            .eq('assessment_id', assessmentId)
            .order('created_at', { ascending: false })
            .limit(1);

          if (!respErr && responses && responses.length > 0) {
            setLatestPainLevel(responses[0].pain_level ?? null);
            setLastPainDate(responses[0].created_at ?? null);
          } else {
            setLatestPainLevel(null);
            setLastPainDate(null);
          }
        }
      } catch {
        setLatestPainLevel(null);
        setLastPainDate(null);
      }
    }

    fetchLatestPainLevel();
  }, [assessmentId]);

  let diffIcon = null;
  if (
    typeof latestPainLevel === 'number' &&
    typeof initialPainLevel === 'number' &&
    latestPainLevel !== initialPainLevel
  ) {
    const { ArrowUp, ArrowDown } = require("lucide-react");
    if (latestPainLevel > initialPainLevel) {
      diffIcon = <ArrowUp className="h-3 w-3 inline ml-1 text-red-500" />;
    } else if (latestPainLevel < initialPainLevel) {
      diffIcon = <ArrowDown className="h-3 w-3 inline ml-1 text-green-600" />;
    }
  }

  return { latestPainLevel, lastPainDate, diffIcon };
}