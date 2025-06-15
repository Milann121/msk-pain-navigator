import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { formatPainArea, formatMechanism, formatDifferential } from '../FormatHelpers';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, ClipboardCheck } from 'lucide-react';
import { 
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { UserAssessment } from '@/components/follow-up/types';
import { BadgeStyles } from './BadgeStyles';
import { AssessmentExerciseStats } from '../AssessmentExerciseStats';
import { ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AssessmentDetails } from "./AssessmentDetails";
import { ExerciseCompletionInfo } from "./ExerciseCompletionInfo";

interface AssessmentAccordionItemProps {
  assessment: UserAssessment;
  onOpenFollowUp: (assessment: UserAssessment) => void;
  onDeleteAssessment: (id: string) => void;
}

export const AssessmentAccordionItem = ({
  assessment,
  onOpenFollowUp,
  onDeleteAssessment
}: AssessmentAccordionItemProps) => {
  const navigate = useNavigate();

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

  // Store fetched last and initial pain level
  const [latestPainLevel, setLatestPainLevel] = useState<number | null>(null);
  const [lastPainDate, setLastPainDate] = useState<string | null>(null);
  // Use the correct property name (initial_pain_level)
  const [initialPainLevel, setInitialPainLevel] = useState<number | null>(
    assessment.initial_pain_level ?? null
  );

  useEffect(() => {
    async function fetchLatestPainLevel() {
      try {
        // Remove user_id, just use assessment.id (since we don't have user_id)
        const { data, error } = await supabase
          .rpc('get_latest_pain_level', {
            assessment_id_param: assessment.id,
            user_id_param: null // Pass null since not available, function will ignore if needed
          });

        if (!error && data && Array.isArray(data) && data.length > 0) {
          setLatestPainLevel(data[0].pain_level ?? null);
          setLastPainDate(data[0].created_at ?? null);
        } else {
          // fallback: get latest by descending created_at
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

  // Compare last and initial pain level for arrow coloring
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

  // Track state of end/start program change for immediate UI feedback
  const [programEndedAt, setProgramEndedAt] = useState<Date | null>(
    assessment.program_ended_at ? new Date(assessment.program_ended_at) : null
  );
  const [loadingEnd, setLoadingEnd] = useState(false);
  const [loadingRenew, setLoadingRenew] = useState(false);

  // Track start date, fallback to assessment timestamp
  const programStartDate: Date =
    assessment.program_start_date
      ? new Date(assessment.program_start_date)
      : new Date(assessment.timestamp);

  // Actions to end or renew program in DB
  const handleEndProgram = async () => {
    setLoadingEnd(true);
    const now = new Date();
    const { error } = await supabase
      .from('user_assessments')
      .update({ program_ended_at: now.toISOString() })
      .eq('id', assessment.id);

    if (!error) {
      setProgramEndedAt(now);
    }
    setLoadingEnd(false);
  };

  const handleRenewProgram = async () => {
    setLoadingRenew(true);
    const { error } = await supabase
      .from('user_assessments')
      .update({ program_ended_at: null })
      .eq('id', assessment.id);

    if (!error) {
      setProgramEndedAt(null);
    }
    setLoadingRenew(false);
  };

  return (
    <AccordionItem key={assessment.id} value={assessment.id}>
      <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 rounded-lg">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {format(new Date(assessment.timestamp), 'dd.MM.yyyy')}
            </span>
            <span className="text-gray-600 hidden sm:inline">–</span>
            <span className="text-gray-600 hidden sm:inline">
              {formatPainArea(assessment.pain_area)}
            </span>
          </div>
          <div className="sm:hidden text-sm text-gray-500">
            {formatPainArea(assessment.pain_area)}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* LEFT: Assessment details */}
          <AssessmentDetails
            assessment={assessment}
            latestPainLevel={latestPainLevel}
            diffIcon={diffIcon}
          />
          {/* RIGHT: Completion info + start/end/renew just below last completed */}
          <div className="flex flex-col h-full justify-start">
            {/* Completion info (incl. Posledné cvičenie etc) */}
            <ExerciseCompletionInfo assessmentId={assessment.id} />
            {/* --- Start date and buttons, RIGHT below completion info, right-aligned --- */}
            <div className="flex flex-col items-end gap-0 mt-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  Začiatok programu:
                </span>
                <span className="text-blue-800 font-medium">
                  {format(programStartDate, "dd.MM.yyyy")}
                </span>
              </div>
              {/* Actions under start date */}
              <div className="flex flex-row flex-wrap gap-2 mt-2">
                {!programEndedAt ? (
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

        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onOpenFollowUp(assessment)}
            className="flex items-center gap-1"
          >
            <ClipboardCheck className="h-4 w-4" />
            Zaznamenať pokrok
          </Button>
          
          <Button 
            onClick={handleViewExercises}
            size="sm"
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            Zobraziť cviky
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteAssessment(assessment.id);
            }}
            title="Odstrániť hodnotenie"
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
