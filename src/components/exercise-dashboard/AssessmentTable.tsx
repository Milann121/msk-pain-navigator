
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatPainArea, formatMechanism, formatDifferential } from './FormatHelpers';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

interface UserAssessment {
  id: string;
  primary_mechanism: string;
  sin_group: string;
  primary_differential: string;
  pain_area: string;
  timestamp: string;
  completed_exercises_count: number;
  last_completed_at?: string;
}

interface AssessmentTableProps {
  assessments: UserAssessment[];
  loading: boolean;
  onDeleteAssessment: (id: string) => void;
}

export const AssessmentTable = ({ assessments, loading, onDeleteAssessment }: AssessmentTableProps) => {
  const navigate = useNavigate();
  
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
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dátum</TableHead>
            <TableHead>Oblasť</TableHead>
            <TableHead>Mechanizmus</TableHead>
            <TableHead>Diagnóza</TableHead>
            <TableHead className="text-center">Odcvičené</TableHead>
            <TableHead>Posledné cvičenie</TableHead>
            <TableHead>Akcie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments.map((assessment) => (
            <TableRow key={assessment.id}>
              <TableCell className="font-medium">
                {format(new Date(assessment.timestamp), 'dd.MM.yyyy')}
              </TableCell>
              <TableCell>{formatPainArea(assessment.pain_area)}</TableCell>
              <TableCell>{formatMechanism(assessment.primary_mechanism)}</TableCell>
              <TableCell>{formatDifferential(assessment.primary_differential)}</TableCell>
              <TableCell className="text-center font-medium">
                {assessment.completed_exercises_count > 0 ? `${assessment.completed_exercises_count}x` : '0x'}
              </TableCell>
              <TableCell>
                {assessment.last_completed_at ? 
                  format(new Date(assessment.last_completed_at), 'dd.MM.yyyy') : 
                  '—'}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button 
                  onClick={() => handleViewExercises(assessment)}
                  size="sm"
                >
                  Zobraziť cviky
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDeleteAssessment(assessment.id)}
                  title="Odstrániť hodnotenie"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
