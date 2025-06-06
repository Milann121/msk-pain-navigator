
import React, { useEffect, useState } from 'react';
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
import { ExercisePeriodSection } from '@/components/exercise-plan/ExercisePeriodSection';
import { ImportantNotice } from '@/components/exercise-plan/ImportantNotice';

const ExercisePlan = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { mechanism = 'nociceptive', differential = 'none', painArea = 'lower back', assessmentId, showGeneral = false } = location.state || {};
  const [userAssessments, setUserAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      } catch (error) {
        console.error('Error fetching user assessments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAssessments();
  }, [user]);

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
        title: 'Všeobecný program nie je k dispozícii',
        description: 'Nemáte dostatok hodnotení na vytvorenie všeobecného programu alebo nie sú k dispozícii cvičenia s definovanou dôležitosťou.',
        videos: []
      }];
    }
  } else {
    // Show specific program
    const specificKey = `${mechanism}-${differential}-${painArea}`;
    const defaultKey = `${mechanism}-default-${painArea}`;
    
    exercises = exercisesByDifferential[specificKey] || 
                exercisesByDifferential[defaultKey] || 
                [{
                  title: 'Odporúčané cvičenia neboli nájdené',
                  description: 'Pre vašu kombináciu diagnózy a oblasti bolesti nemáme špecifické cvičenia. Prosím, konzultujte s fyzioterapeutom.',
                  videos: []
                }];
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Načítava sa...</div>
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
          Späť na moje cvičenia
        </Link>
        
        <Card>
          <ExercisePlanHeader
            showGeneral={showGeneral}
            differential={differential}
            painArea={painArea}
            mechanism={mechanism}
          />
          <CardContent className="space-y-8">
            {exercises.map((exercise, index) => (
              <ExercisePeriodSection
                key={index}
                exercise={exercise}
                index={index}
                showGeneral={showGeneral}
                assessmentId={assessmentId}
              />
            ))}
            
            <ImportantNotice />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ExercisePlan;
