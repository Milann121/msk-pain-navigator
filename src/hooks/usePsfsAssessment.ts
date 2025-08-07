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

  const analyzeActivities = useCallback((favoriteActivities: FavoriteActivity[]) => {
    if (favoriteActivities.length === 3) {
      const analysis = analyzeBodyAreas(favoriteActivities);
      setState(prev => ({
        ...prev,
        favoriteActivities,
        bodyAreaAnalysis: analysis
      }));
    }
  }, []);

  const startPsfsAssessment = useCallback(async (favoriteActivities: FavoriteActivity[]) => {
    setState(prev => ({ ...prev, isAnalyzing: true }));
    
    try {
      // Analyze body areas if not done yet
      let analysis = state.bodyAreaAnalysis;
      if (!analysis) {
        analysis = analyzeBodyAreas(favoriteActivities);
      }
      
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
      
      // Navigate directly to questionnaire based on body area analysis
      if (analysis.selectedBodyArea === 'upper limb') {
        navigate('/questionnaire/upper-limb');
      } else {
        navigate('/questionnaire/general');
      }
    } catch (error) {
      console.error('Error starting PSFS assessment:', error);
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  }, [navigate, state.bodyAreaAnalysis]);

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
    analyzeActivities,
    startPsfsAssessment,
    clearPsfsAssessment
  };
}