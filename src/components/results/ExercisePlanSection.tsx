
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ExercisePlanSectionProps {
  mechanismType: string;
  differentialType: string;
  painArea: string;
  assessmentId?: string | null;
}

const ExercisePlanSection = ({ 
  mechanismType, 
  differentialType, 
  painArea,
  assessmentId 
}: ExercisePlanSectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleExerciseClick = () => {
    navigate('/exercise-plan', { 
      state: { 
        mechanism: mechanismType,
        differential: differentialType,
        painArea: painArea,
        assessmentId
      } 
    });
  };

  return (
    <div className="mt-8 p-4 border border-blue-200 rounded-lg">
      <h3 className="font-semibold text-blue-700 mb-2">{t('results.exercisePlan.title')}</h3>
      <p className="mb-4">
        {t('results.exercisePlan.description')}
      </p>
      
      <Button 
        onClick={handleExerciseClick}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {t('results.exercisePlan.openProgram')}
      </Button>
    </div>
  );
};

export default ExercisePlanSection;
