
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ExercisePlanHeader } from '@/components/exercise-plan/ExercisePlanHeader';
import { ExercisePeriodSection } from '@/components/exercise-plan/ExercisePeriodSection';
import { ImportantNotice } from '@/components/exercise-plan/ImportantNotice';
import { generateGeneralProgram } from '@/utils/generalProgramGenerator';
import exercisesByDifferential from '@/data/exercises';
import Header from '@/components/Header';

const ExercisePlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { 
    showGeneral = false,
    assessments = [],
    mechanism,
    differential,
    painArea
  } = location.state || {};

  let exercises = [];
  
  if (showGeneral) {
    // Generate general program
    exercises = generateGeneralProgram('general', 'general', assessments);
  } else {
    // Generate specific program
    const specificKey = `${mechanism}-${differential}-${painArea}`;
    const defaultKey = `${mechanism}-default-${painArea}`;
    
    exercises = exercisesByDifferential[specificKey] || 
               exercisesByDifferential[defaultKey] || [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost" 
            onClick={() => navigate('/my-exercises')}
            className="mb-4 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('exercisePlanPage.backToExercises')}
          </Button>
        </div>

        <Card className="mb-6">
          <ExercisePlanHeader 
            showGeneral={showGeneral}
            differential={differential || ''}
            painArea={painArea || ''}
            mechanism={mechanism || 'nociceptive'}
          />
        </Card>

        <ImportantNotice />

        <div className="space-y-8">
          {exercises.map((exercise, index) => (
            <Card key={index} className="p-6">
              <ExercisePeriodSection 
                exercise={exercise} 
                showGeneral={showGeneral}
              />
            </Card>
          ))}
        </div>

        {exercises.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-600">
              {showGeneral 
                ? "No general program available. Complete more assessments to generate a personalized program."
                : "No exercises available for this condition."
              }
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExercisePlan;
