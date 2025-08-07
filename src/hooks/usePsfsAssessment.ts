import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoriteActivity } from '@/hooks/useFavoriteActivities';
import { BodyAreaAnalysis, analyzeBodyAreas, createPsfsUserInfo } from '@/utils/psfs-helpers';

interface PsfsAssessmentState {
  favoriteActivities: FavoriteActivity[];
  bodyAreaAnalysis: BodyAreaAnalysis | null;
  isAnalyzing: boolean;
}

export function usePsfsAssessment() {
  const navigate = useNavigate();
  const [state, setState] = useState<PsfsAssessmentState>({
    favoriteActivities: [],
    bodyAreaAnalysis: null,
    isAnalyzing: false
  });

  const startPsfsAssessment = useCallback(async (favoriteActivities: FavoriteActivity[]) => {
    setState(prev => ({ ...prev, isAnalyzing: true }));
    
    try {
      // Analyze body areas
      const analysis = analyzeBodyAreas(favoriteActivities);
      
      setState(prev => ({
        ...prev,
        favoriteActivities,
        bodyAreaAnalysis: analysis,
        isAnalyzing: false
      }));

      // Store PSFS context in session storage for assessment page
      const psfsContext = {
        favoriteActivities,
        bodyAreaAnalysis: analysis,
        userInfo: createPsfsUserInfo(analysis),
        isPsfsAssessment: true
      };
      
      sessionStorage.setItem('psfsAssessmentContext', JSON.stringify(psfsContext));
      
      // Navigate to assessment page
      navigate('/assessment');
    } catch (error) {
      console.error('Error starting PSFS assessment:', error);
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  }, [navigate]);

  const clearPsfsAssessment = useCallback(() => {
    setState({
      favoriteActivities: [],
      bodyAreaAnalysis: null,
      isAnalyzing: false
    });
    sessionStorage.removeItem('psfsAssessmentContext');
  }, []);

  return {
    ...state,
    startPsfsAssessment,
    clearPsfsAssessment
  };
}