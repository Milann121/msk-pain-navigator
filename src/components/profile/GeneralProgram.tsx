
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAssessments } from '@/hooks/useAssessments';
import { generateGeneralProgram } from '@/utils/generalProgramGenerator';
import { useTranslation } from 'react-i18next';

export const GeneralProgram = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { assessments } = useAssessments();

  // Generate general program based on user's assessments
  const generalProgram = generateGeneralProgram('general', 'general', assessments);
  const hasGeneralProgram = generalProgram.length > 0;

  const handleShowGeneral = () => {
    navigate('/exercise-plan', { 
      state: { 
        showGeneral: true,
        assessments: assessments
      } 
    });
  };

  if (!hasGeneralProgram) {
    return null;
  }

  const exerciseCount = generalProgram[0]?.videos?.length || 0;

  return (
    <div className="px-6 pb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        <h3 className="text-lg font-medium text-gray-900">
          {t('exercisePlanPage.generalTitle')}
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        {t('exercisePlanPage.generalDescription')}
      </p>
      
      <p className="text-sm text-blue-600 mb-4">
        {exerciseCount} {t('home.generalProgram.exerciseCount', { count: exerciseCount }).replace(`${exerciseCount} `, '')}
      </p>
      
      <Button 
        onClick={handleShowGeneral}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        <PlayCircle className="h-4 w-4 mr-2" />
        {t('home.generalProgram.view')}
      </Button>
    </div>
  );
};
