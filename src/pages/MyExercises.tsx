
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAssessments } from '@/hooks/useAssessments';
import { AssessmentTable } from '@/components/exercise-dashboard/AssessmentTable';
import { ExerciseCalendar } from '@/components/exercise-dashboard/ExerciseCalendar';

const MyExercises = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { assessments, loading, handleDeleteAssessment, refreshAssessments } = useAssessments();

  // Add an effect to refresh data when the page loads
  React.useEffect(() => {
    if (user) {
      refreshAssessments();
    }
  }, [user, refreshAssessments]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">Načítava sa...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Get the latest assessment ID for the calendar
  const latestAssessmentId = assessments.length > 0 ? assessments[0].id : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Moje cviky</h1>
          
          <ExerciseCalendar assessmentId={latestAssessmentId} />
          
          <Card>
            <CardHeader>
              <CardTitle>História hodnotení bolesti</CardTitle>
              <CardDescription>
                Nižšie nájdete všetky vaše dokončené hodnotenia a ich cvičebné programy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssessmentTable
                assessments={assessments}
                loading={loading}
                onDeleteAssessment={handleDeleteAssessment}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/')}>
                Späť na úvod
              </Button>
              <Button onClick={() => navigate('/assessment')}>
                Nové hodnotenie
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyExercises;
