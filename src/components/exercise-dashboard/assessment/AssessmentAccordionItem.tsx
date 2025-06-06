
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
          <AssessmentDetails assessment={assessment} />
          <ExerciseCompletionInfo assessmentId={assessment.id} />
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

interface DetailsSectionProps {
  assessment: UserAssessment;
}

const AssessmentDetails = ({ assessment }: DetailsSectionProps) => {
  return (
    <div className="space-y-2">
      <div>
        <span className="font-medium text-gray-500">Mechanizmus bolesti:</span>
        <div className="mt-1">
          <Badge className={BadgeStyles.getMechanismBadgeStyle(assessment.primary_mechanism)}>
            {formatMechanism(assessment.primary_mechanism)}
          </Badge>
        </div>
      </div>
      <div>
        <span className="font-medium text-gray-500">Diagnóza:</span>
        <div className="mt-1">
          <Badge className={BadgeStyles.getDifferentialBadgeStyle(assessment.primary_differential)}>
            {formatDifferential(assessment.primary_differential)}
          </Badge>
        </div>
      </div>
      <div className="mt-3">
        <span className="font-medium text-gray-500">Vaša bolesť na začiatku:</span>
        <div className="mt-1 font-medium text-blue-700">
          {assessment.initial_pain_level !== undefined ? `${assessment.initial_pain_level}/10` : '–'}
        </div>
      </div>
      <div>
        <span className="font-medium text-gray-500">Vaša posledná zaznamenaná bolesť:</span>
        <div className="mt-1 font-medium text-blue-700">
          {assessment.latest_pain_level !== undefined ? `${assessment.latest_pain_level}/10` : 'N/A'}
        </div>
      </div>
    </div>
  );
};

interface ExerciseCompletionInfoProps {
  assessmentId: string;
}

const ExerciseCompletionInfo = ({ assessmentId }: ExerciseCompletionInfoProps) => {
  return (
    <div className="space-y-2">
      <AssessmentExerciseStats assessmentId={assessmentId} />
    </div>
  );
};
