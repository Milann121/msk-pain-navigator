
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatDifferential, formatMechanism, formatPainArea } from './FormatHelpers';
import { AssessmentExerciseStats } from './AssessmentExerciseStats';

interface Assessment {
  id: string;
  primary_mechanism: string;
  primary_differential: string;
  pain_area: string;
  timestamp: string;
  intial_pain_intensity: number | null;
}

interface AssessmentTableProps {
  assessments: Assessment[];
  loading: boolean;
  onDeleteAssessment: (id: string) => void;
}

export const AssessmentTable = ({ assessments, loading, onDeleteAssessment }: AssessmentTableProps) => {
  const navigate = useNavigate();

  const handleExerciseClick = (assessment: Assessment) => {
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
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Zatiaľ nemáte žiadne hodnotenia. Začnite vytvorením nového hodnotenia.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <div 
          key={assessment.id} 
          className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {formatMechanism(assessment.primary_mechanism)}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {formatDifferential(assessment.primary_differential)}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {formatPainArea(assessment.pain_area)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Vytvorené: {formatDate(assessment.timestamp)}
              </p>
              {assessment.intial_pain_intensity && (
                <p className="text-sm text-gray-600 mb-3">
                  Počiatočná intenzita bolesti: {assessment.intial_pain_intensity}/10
                </p>
              )}
              
              {/* Exercise completion stats */}
              <AssessmentExerciseStats assessmentId={assessment.id} />
            </div>
            
            <div className="flex gap-2 ml-4">
              <Button
                onClick={() => handleExerciseClick(assessment)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                Cvičenia
              </Button>
              <Button
                onClick={() => onDeleteAssessment(assessment.id)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
