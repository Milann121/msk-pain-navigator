import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, Play, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ExtendedUserAssessment } from '@/utils/database-helpers';
import { useNavigate } from 'react-router-dom';
import { FollowUpDialog } from './assessment/FollowUpDialog';
import { formatPainArea, formatMechanism, formatDifferential } from './FormatHelpers';

interface AssessmentTableProps {
  assessments: ExtendedUserAssessment[];
  loading: boolean;
  onDeleteAssessment: (id: string) => Promise<void>;
}

export const AssessmentTable = ({ assessments, loading, onDeleteAssessment }: AssessmentTableProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [completionCounts, setCompletionCounts] = useState<Record<string, number>>({});

  // Load completion counts for all assessments
  useEffect(() => {
    const loadCompletionCounts = async () => {
      if (!user || assessments.length === 0) return;

      try {
        const assessmentIds = assessments.map(a => a.id);
        const { data, error } = await supabase
          .from('completed_exercises')
          .select('assessment_id')
          .eq('user_id', user.id)
          .in('assessment_id', assessmentIds);

        if (error) {
          console.error('Error loading completion counts:', error);
          return;
        }

        // Count exercises per assessment
        const counts: Record<string, number> = {};
        data?.forEach(record => {
          counts[record.assessment_id] = (counts[record.assessment_id] || 0) + 1;
        });

        setCompletionCounts(counts);
      } catch (error) {
        console.error('Error loading completion counts:', error);
      }
    };

    loadCompletionCounts();

    // Listen for exercise completion events to update counts
    const handleExerciseCompleted = (event: CustomEvent) => {
      const { assessmentId, newCount } = event.detail;
      setCompletionCounts(prev => ({
        ...prev,
        [assessmentId]: newCount
      }));
    };

    window.addEventListener('exercise-completed', handleExerciseCompleted as EventListener);

    return () => {
      window.removeEventListener('exercise-completed', handleExerciseCompleted as EventListener);
    };
  }, [user, assessments]);

  const handleExercisePlan = (assessment: ExtendedUserAssessment) => {
    navigate('/exercise-plan', {
      state: {
        mechanism: assessment.primary_mechanism,
        differential: assessment.primary_differential,
        painArea: assessment.pain_area,
        assessmentId: assessment.id
      }
    });
  };

  const handleFollowUp = (assessmentId: string) => {
    setSelectedAssessmentId(assessmentId);
    setFollowUpDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div>Načítava sa...</div>;
  }

  if (assessments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Zatiaľ nemáte žiadne hodnotenia. Vytvorte si nové hodnotenie pre získanie personalizovaných cvičebných odporúčaní.
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dátum</TableHead>
            <TableHead>Oblasť bolesti</TableHead>
            <TableHead>Mechanizmus</TableHead>
            <TableHead>Diferenciálna diagnóza</TableHead>
            <TableHead>Odcvičené</TableHead>
            <TableHead>Akcie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments.map((assessment) => (
            <TableRow key={assessment.id}>
              <TableCell className="font-medium">
                {formatDate(assessment.timestamp)}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {formatPainArea(assessment.pain_area)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {formatMechanism(assessment.primary_mechanism)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {formatDifferential(assessment.primary_differential)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {completionCounts[assessment.id] || 0}x
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleExercisePlan(assessment)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Cviky
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFollowUp(assessment.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Follow-up
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Potvrdiť vymazanie</AlertDialogTitle>
                        <AlertDialogDescription>
                          Naozaj chcete vymazať toto hodnotenie? Táto akcia sa nedá vrátiť späť.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Zrušiť</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDeleteAssessment(assessment.id)}>
                          Vymazať
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FollowUpDialog
        isOpen={followUpDialogOpen}
        onClose={() => setFollowUpDialogOpen(false)}
        assessmentId={selectedAssessmentId}
      />
    </>
  );
};
