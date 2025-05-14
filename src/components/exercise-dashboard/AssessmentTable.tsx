
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatPainArea, formatMechanism, formatDifferential } from './FormatHelpers';
import { Button } from '@/components/ui/button';
import { ChevronDown, Trash2, ExternalLink, ClipboardCheck } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FollowUpQuestionnaire from '@/components/FollowUpQuestionnaire';

interface UserAssessment {
  id: string;
  primary_mechanism: string;
  sin_group: string;
  primary_differential: string;
  pain_area: string;
  timestamp: string;
  completed_exercises_count: number;
  last_completed_at?: string;
  initial_pain_level?: number;
  latest_pain_level?: number;
}

interface AssessmentTableProps {
  assessments: UserAssessment[];
  loading: boolean;
  onDeleteAssessment: (id: string) => void;
}

export const AssessmentTable = ({ assessments, loading, onDeleteAssessment }: AssessmentTableProps) => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<UserAssessment | null>(null);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  
  const handleViewExercises = (assessment: UserAssessment) => {
    navigate('/exercise-plan', { 
      state: { 
        mechanism: assessment.primary_mechanism,
        differential: assessment.primary_differential,
        painArea: assessment.pain_area,
        assessmentId: assessment.id
      } 
    });
  };

  const handleOpenFollowUp = (assessment: UserAssessment) => {
    setSelectedAssessment(assessment);
    setFollowUpOpen(true);
  };
  
  if (loading) {
    return <div className="text-center py-8">Načítavanie hodnotení...</div>;
  }
  
  if (assessments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Zatiaľ nemáte žiadne uložené hodnotenia.</p>
        <Button onClick={() => navigate('/assessment')}>
          Vytvoriť nové hodnotenie
        </Button>
      </div>
    );
  }
  
  // Helper functions for mechanism and differential badge styling
  const getMechanismBadgeStyle = (mechanism: string) => {
    const styles = {
      'nociceptive': 'bg-blue-100 text-blue-800',
      'neuropathic': 'bg-blue-100 text-blue-800',
      'central': 'bg-blue-100 text-blue-800',
      'none': 'bg-blue-100 text-blue-800'
    };
    
    return styles[mechanism as keyof typeof styles] || 'bg-blue-100 text-blue-800';
  };
  
  const getDifferentialBadgeStyle = (differential: string) => {
    return 'bg-purple-100 text-purple-800';
  };
  
  return (
    <div className="space-y-2">
      <Accordion type="single" collapsible className="w-full">
        {assessments.map((assessment, index) => (
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
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-500">Mechanizmus bolesti:</span>
                    <div className="mt-1">
                      <Badge className={getMechanismBadgeStyle(assessment.primary_mechanism)}>
                        {formatMechanism(assessment.primary_mechanism)}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Diagnóza:</span>
                    <div className="mt-1">
                      <Badge className={getDifferentialBadgeStyle(assessment.primary_differential)}>
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
                      {assessment.latest_pain_level !== undefined ? `${assessment.latest_pain_level}/10` : '–'}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-500">Odcvičené:</span>
                    <div className="mt-1 font-medium">
                      {assessment.completed_exercises_count > 0 ? `${assessment.completed_exercises_count}x` : '0x'}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Posledné cvičenie:</span>
                    <div className="mt-1">
                      {assessment.last_completed_at ? 
                        format(new Date(assessment.last_completed_at), 'dd.MM.yyyy') : 
                        '—'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleOpenFollowUp(assessment)}
                  className="flex items-center gap-1"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Zaznamenať pokrok
                </Button>
                
                <Button 
                  onClick={() => handleViewExercises(assessment)}
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
        ))}
      </Accordion>

      <Dialog open={followUpOpen} onOpenChange={setFollowUpOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Zaznamenať pokrok</DialogTitle>
          </DialogHeader>
          {selectedAssessment && (
            <FollowUpQuestionnaire
              assessment={selectedAssessment}
              onComplete={() => {
                setFollowUpOpen(false);
                setSelectedAssessment(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
