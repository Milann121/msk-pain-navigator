
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
    painArea,
    assessmentId,
    isOrebroProgram = false,
    painLocations = []
  } = location.state || {};

  let exercises = [];
  
  if (isOrebroProgram) {
    // For OREBRO programs, use the same logic as OrebroResult page
    if (painLocations.length > 1) {
      // Multiple pain locations - create mock assessments for general program
      const mockAssessments = painLocations.map((location, index) => ({
        id: `mock-${index}`,
        primary_mechanism: 'nociceptive',
        primary_differential: 'default',
        pain_area: mapPainLocationToArea(location)
      }));
      exercises = generateGeneralProgram('nociceptive', 'general', mockAssessments);
    } else {
      // Single pain location - get specific exercises
      const programKey = `nociceptive-default-${painArea}`;
      exercises = exercisesByDifferential[programKey] || [];
    }
  } else if (showGeneral) {
    // Generate general program
    exercises = generateGeneralProgram('general', 'general', assessments);
  } else {
    // Generate specific program
    const specificKey = `${mechanism}-${differential}-${painArea}`;
    const defaultKey = `${mechanism}-default-${painArea}`;
    
    exercises = exercisesByDifferential[specificKey] || 
               exercisesByDifferential[defaultKey] || [];
  }

  // Helper function to map pain locations to areas (same as in OrebroResult)
  const mapPainLocationToArea = (location: string): string => {
    const locationMap: Record<string, string> = {
      'neck': 'neck',
      'shoulder': 'upper limb',
      'arm': 'upper limb',
      'upperBack': 'middle-back',
      'lowerBack': 'lower-back',
      'leg': 'lower limb',
      'other': 'general'
    };
    return locationMap[location] || 'general';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                assessmentId={assessmentId}
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
