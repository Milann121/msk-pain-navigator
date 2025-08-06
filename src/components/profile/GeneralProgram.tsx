import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { useAssessments } from '@/hooks/useAssessments';
import { generateGeneralProgram } from '@/utils/generalProgramGenerator';
import { GeneralProgramCollapsedView } from './general-program/GeneralProgramCollapsedView';
import { GeneralProgramExpandedView } from './general-program/GeneralProgramExpandedView';
import generalProgramPlaceholder from '@/assets/general-program-placeholder.png';

export const GeneralProgram = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { assessments } = useAssessments();
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate general program based on user's assessments
  const generalProgram = generateGeneralProgram('general', 'general', assessments);
  const hasGeneralProgram = generalProgram.length > 0;
  const exerciseCount = generalProgram[0]?.videos?.length || 0;

  // Only apply expandable behavior on /my-exercises page
  const isMyExercisesPage = location.pathname === '/my-exercises';

  const handleShowGeneral = () => {
    navigate('/exercise-plan', {
      state: {
        showGeneral: true,
        assessments: assessments
      }
    });
  };

  // If not on /my-exercises page, render the original expanded version
  if (!isMyExercisesPage) {
    if (!hasGeneralProgram) {
      return (
        <div className="w-full h-full">
          <img 
            src={generalProgramPlaceholder} 
            alt="General Program Placeholder"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      );
    }

    return (
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <h3 className="text-gray-900 font-medium text-xl">
            {t('exercises.generalProgram.title')}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-4 text-base">
          {t('exercises.generalProgram.description')}
        </p>
        
        <p className="text-sm text-blue-600 mb-4">
          {exerciseCount} {t('home.generalProgram.exerciseCount')}
        </p>
        
        <Button onClick={handleShowGeneral} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <PlayCircle className="h-4 w-4 mr-2" />
          {t('home.generalProgram.view')}
        </Button>
      </div>
    );
  }

  // On /my-exercises page, use expandable behavior
  if (!isExpanded) {
    return (
      <GeneralProgramCollapsedView 
        onExpand={() => setIsExpanded(true)}
      />
    );
  }

  return (
    <GeneralProgramExpandedView
      hasGeneralProgram={hasGeneralProgram}
      exerciseCount={exerciseCount}
      assessments={assessments}
      onCollapse={() => setIsExpanded(false)}
    />
  );
};