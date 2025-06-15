
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UserAssessment } from '@/components/follow-up/types';
import { AssessmentAccordionHeader } from './AssessmentAccordionHeader';
import { AssessmentAccordionActions } from './AssessmentAccordionActions';
import { AssessmentDetails } from "./AssessmentDetails";
import { ExerciseCompletionInfo } from "./ExerciseCompletionInfo";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AssessmentAccordionItemProps {
  assessment: UserAssessment;
  onOpenFollowUp: (assessment: UserAssessment) => void;
  onDeleteAssessment: (id: string) => void;
  onRenew?: () => void; 
  onEndProgram?: () => void;
}

export const AssessmentAccordionItem = ({
  assessment,
  onOpenFollowUp,
  onDeleteAssessment,
  onRenew,
  onEndProgram
}: AssessmentAccordionItemProps) => {
  const navigate = useNavigate();

  // Fetched pain level
  const [latestPainLevel, setLatestPainLevel] = useState<number | null>(null);
  const [lastPainDate, setLastPainDate] = useState<string | null>(null);
  const [initialPainLevel, setInitialPainLevel] = useState<number | null>(
    assessment.initial_pain_level ?? null
  );

  useEffect(() => {
    async function fetchLatestPainLevel() {
      try {
        const { data, error } = await supabase
          .rpc('get_latest_pain_level', {
            assessment_id_param: assessment.id,
            user_id_param: null
          });

        if (!error && data && Array.isArray(data) && data.length > 0) {
          setLatestPainLevel(data[0].pain_level ?? null);
          setLastPainDate(data[0].created_at ?? null);
        } else {
          const { data: responses, error: respErr } = await supabase
            .from('follow_up_responses')
            .select('pain_level, created_at')
            .eq('assessment_id', assessment.id)
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
      } catch (e) {
        setLatestPainLevel(null);
        setLastPainDate(null);
      }
    }

    fetchLatestPainLevel();
  }, [assessment.id]);
  
  let diffIcon = null;
  if (
    typeof latestPainLevel === 'number' &&
    typeof initialPainLevel === 'number' &&
    latestPainLevel !== initialPainLevel
  ) {
    if (latestPainLevel > initialPainLevel) {
      diffIcon = <ArrowUp className="h-3 w-3 inline ml-1 text-red-500" />;
    } else if (latestPainLevel < initialPainLevel) {
      diffIcon = <ArrowDown className="h-3 w-3 inline ml-1 text-green-600" />;
    }
  }

  // --- 'Ended' state logic starts here ---
  // Ended/active state: computed from assessment.program_ended_at *or* local justEnded flag
  const [programEndedAt, setProgramEndedAt] = useState<Date | null>(
    assessment.program_ended_at ? new Date(assessment.program_ended_at) : null
  );
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [loadingRenew, setLoadingRenew] = useState(false);
  // NEW: local flag for "just ended" fast UI updates
  const [justEnded, setJustEnded] = useState(false);

  // If parent re-renders with the program ended (from DB), reset the justEnded flag
  useEffect(() => {
    if (assessment.program_ended_at || programEndedAt) {
      setJustEnded(false);
    }
  }, [assessment.program_ended_at, programEndedAt]);

  const programStartDate: Date =
    assessment.program_start_date
      ? new Date(assessment.program_start_date)
      : new Date(assessment.timestamp);

  // Handle ending the program instantly in UI
  const handleEndProgram = async () => {
    setLoadingEnd(true);
    setJustEnded(true);      // Show as ended in UI immediately!
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

  // Renew logic: after renew, go back to active state UI instantly
  const handleRenewProgram = async () => {
    setLoadingRenew(true);
    const { error } = await supabase
      .from('user_assessments')
      .update({ program_ended_at: null })
      .eq('id', assessment.id);

    if (!error) {
      setProgramEndedAt(null);
      setJustEnded(false);
      if (onRenew) onRenew();
    }
    setLoadingRenew(false);
  };

  const handleViewExercises = () => {
    navigate('/exercise-plan', { 
      state: { 
        mechanism: assessment.primary_mechanism,
        differential: assessment.primary_differential,
        painArea: assessment.pain_area,
        assessmentId: assessment.id
      } 
    });
  };

  // Should this program be shown as ended now?
  const isEnded = !!programEndedAt || justEnded;

  return (
    <AccordionItem key={assessment.id} value={assessment.id}>
      <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 rounded-lg">
        <AssessmentAccordionHeader assessment={assessment} />
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Assessment details */}
          <AssessmentDetails
            assessment={assessment}
            latestPainLevel={latestPainLevel}
            diffIcon={diffIcon}
          />
          <div className="flex flex-col h-full justify-start">
            <ExerciseCompletionInfo assessmentId={assessment.id} />
            <div className="flex flex-col gap-0 mt-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  Začiatok programu:
                </span>
                <span className="text-blue-800 font-medium">
                  {programStartDate ? programStartDate.toLocaleDateString("sk-SK") : ""}
                </span>
              </div>
              <div className="flex flex-row flex-wrap gap-2 mt-2">
                {!isEnded ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleEndProgram}
                    disabled={loadingEnd}
                  >
                    {loadingEnd ? "Ukladanie..." : "Ukončiť program"}
                  </Button>
                ) : (
                  <>
                    <Button size="sm" disabled variant="outline" className="text-green-700 border-green-500 bg-green-50">
                      Ukončené
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={handleRenewProgram}
                      disabled={loadingRenew}
                      className="border-blue-500"
                    >
                      {loadingRenew ? "Obnovujem..." : "Obnoviť program"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <AssessmentAccordionActions
          assessment={assessment}
          programEndedAt={isEnded ? (programEndedAt ?? new Date()) : null}
          loadingEnd={loadingEnd}
          loadingRenew={loadingRenew}
          onOpenFollowUp={onOpenFollowUp}
          onDeleteAssessment={onDeleteAssessment}
          handleEndProgram={handleEndProgram}
          handleRenewProgram={handleRenewProgram}
          handleViewExercises={handleViewExercises}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
