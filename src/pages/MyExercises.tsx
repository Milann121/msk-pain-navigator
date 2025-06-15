import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { useAssessments } from '@/hooks/useAssessments';
import { AssessmentAccordionItem } from '@/components/exercise-dashboard/assessment/AssessmentAccordionItem';
import { EmptyState } from '@/components/exercise-dashboard/assessment/EmptyState';
import { LoadingState } from '@/components/exercise-dashboard/assessment/LoadingState';
import { FollowUpDialog } from '@/components/exercise-dashboard/assessment/FollowUpDialog';
import { ExerciseCalendar } from '@/components/exercise-dashboard/ExerciseCalendar';
import { GeneralProgram } from '@/components/profile/GeneralProgram';
import { UserAssessment } from '@/components/follow-up/types';

const MyExercises = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { assessments, loading, handleDeleteAssessment, refreshAssessments } = useAssessments();
  const [selectedAssessment, setSelectedAssessment] = React.useState<UserAssessment | null>(null);

  // Add an effect to refresh data when the page loads
  React.useEffect(() => {
    if (user) {
      refreshAssessments();
    }
  }, [user, refreshAssessments]);

  const handleOpenFollowUp = (assessment: UserAssessment) => {
    setSelectedAssessment(assessment);
  };

  const handleCloseFollowUp = () => {
    setSelectedAssessment(null);
    refreshAssessments();
  };

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
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Moje cviky</h1>
          
          <ExerciseCalendar assessmentId={latestAssessmentId} />
          
          {/* General Program Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <GeneralProgram />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aktívne programy</CardTitle>
              <CardDescription>
                Nižšie nájdete všetky vaše aktívne cvičebné programy z dokončených hodnotení.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingState />
              ) : assessments.length === 0 ? (
                <EmptyState />
              ) : (
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {assessments.map((assessment) => (
                    <AssessmentAccordionItem
                      key={assessment.id}
                      assessment={assessment}
                      onOpenFollowUp={handleOpenFollowUp}
                      onDeleteAssessment={handleDeleteAssessment}
                    />
                  ))}
                </Accordion>
              )}
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

          <FollowUpDialog
            isOpen={selectedAssessment !== null}
            onOpenChange={(open) => {
              if (!open) {
                handleCloseFollowUp();
              }
            }}
            selectedAssessment={selectedAssessment}
            onComplete={handleCloseFollowUp}
          />
        </div>
      </div>
    </div>
  );
};

export default MyExercises;
