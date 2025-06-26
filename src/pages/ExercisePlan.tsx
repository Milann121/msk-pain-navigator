
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import exercisesByDifferential from '@/data/exercises';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { generateGeneralProgram } from '@/utils/generalProgramGenerator';
import { supabase } from '@/integrations/supabase/client';
import { ExercisePlanHeader } from '@/components/exercise-plan/ExercisePlanHeader';
import { ExercisePeriodAccordion } from '@/components/exercise-plan/ExercisePeriodAccordion';
import { ImportantNotice } from '@/components/exercise-plan/ImportantNotice';
import { Advice } from '@/components/advice/Advice';
import { getAdvicesForExerciseProgram } from '@/utils/adviceMatching';

interface Exercise {
  title: string;
  description: string;
  videos: Array<{
    videoId: string;
    title?: string;
    description?: string;
  }>;
}

const ExercisePlan = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { mechanism = 'nociceptive', differential = 'none', painArea = 'lower back', assessmentId, showGeneral = false } = location.state || {};
  const [userAssessments, setUserAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [effectiveAssessmentId, setEffectiveAssessmentId] = useState<string | undefined>(assessmentId);
  const [programAdvices, setProgramAdvices] = useState<number[]>([]);
  const { t } = useTranslation();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Fetch user assessments for general program
  useEffect(() => {
    const fetchUserAssessments = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_assessments')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false });
          
        if (error) {
          console.error('Error fetching user assessments:', error);
          return;
        }
        
        setUserAssessments(data || []);
        
        // For general program, use the latest assessment ID for completion tracking
        if (showGeneral && data && data.length > 0) {
          setEffectiveAssessmentId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching user assessments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAssessments();
  }, [user, showGeneral]);

  // Get program-specific advices
  useEffect(() => {
    if (!showGeneral) {
      const matchingAdvices = getAdvicesForExerciseProgram(mechanism, differential, painArea);
      setProgramAdvices(matchingAdvices);
    }
  }, [mechanism, differential, painArea, showGeneral]);

  // Log state props on mount to help with debugging
  useEffect(() => {
    console.log("ExercisePlan props:", { mechanism, differential, painArea, assessmentId, showGeneral });
  }, [mechanism, differential, painArea, assessmentId, showGeneral]);
  
  // Determine which exercises to show
  let exercises = [];
  
  if (showGeneral && !loading) {
    // Show general program
    exercises = generateGeneralProgram(mechanism, painArea, userAssessments);
    if (exercises.length === 0) {
      exercises = [{
        title: t('exercisePlanPage.generalNotAvailable'),
        description: t('exercisePlanPage.generalNotAvailableDescription'),
        videos: []
      }];
    }
  } else {
    // Show specific program
    const specificKey = `${mechanism}-${differential}-${painArea}`;
    const defaultKey = `${mechanism}-default-${painArea}`;
    
    console.log('Looking for exercises with keys:', { specificKey, defaultKey });
    console.log('Available exercise keys:', Object.keys(exercisesByDifferential));
    
    exercises = exercisesByDifferential[specificKey] || 
                exercisesByDifferential[defaultKey] || 
                [{
                  title: t('exercisePlanPage.notFoundTitle'),
                  description: t('exercisePlanPage.notFoundDescription', { 
                    diagnosis: differential, 
                    painArea: painArea 
                  }),
                  videos: []
                }];
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">{t('loading')}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <Link to="/my-exercises" className="inline-flex items-center gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          {t('exercisePlanPage.backToExercises')}
        </Link>
        
        <Card>
          <ExercisePlanHeader
            showGeneral={showGeneral}
            differential={differential}
            painArea={painArea}
            mechanism={mechanism}
          />
          <CardContent className="space-y-8">
            {/* Program-specific advices */}
            {programAdvices.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Dôležité rady pre váš program</h2>
                <div className="space-y-4">
                  {programAdvices.map((adviceId) => (
                    <div key={adviceId} className="bg-blue-50 border border-blue-200 rounded-lg p-1">
                      <Advice adviceId={adviceId} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <ExercisePeriodAccordion
              exercises={exercises}
              showGeneral={showGeneral}
              assessmentId={effectiveAssessmentId}
            />
            
            <ImportantNotice />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ExercisePlan;
