
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { AssessmentProvider, useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import LoadingView from '@/components/assessment/LoadingView';
import UserInfoHandler from '@/components/assessment/UserInfoHandler';
import GeneralQuestionnaireHandler from '@/components/assessment/GeneralQuestionnaireHandler';
import FollowUpQuestionnaireHandler from '@/components/assessment/FollowUpQuestionnaireHandler';
import ResultsHandler from '@/components/assessment/ResultsHandler';
import SubmittingOverlay from '@/components/assessment/SubmittingOverlay';
// import { BodyModelSection } from '@/components/assessment/BodyModelSection';

const AssessmentContent = () => {
  const { user, isLoading } = useAuth();
  const { stage, isSubmitting } = useAssessment();
  
  if (isLoading) {
    return <LoadingView />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Hodnotenie bolesti pohybového aparátu
            </h1>
            <p className="text-lg text-blue-600">
              Vyplňte dotazník pre získanie personalizovaných cvičebných odporúčaní
            </p>
          </header>
          
          {/* Body Model Section - hidden for now, keeping code for later use */}
          {/* <BodyModelSection /> */}
          
          {stage === AssessmentStage.UserInfo && <UserInfoHandler />}
          
          {stage === AssessmentStage.GeneralQuestionnaire && <GeneralQuestionnaireHandler />}
          
          {stage === AssessmentStage.FollowUpQuestionnaire && <FollowUpQuestionnaireHandler />}
          
          {stage === AssessmentStage.Results && <ResultsHandler />}
          
          {isSubmitting && <SubmittingOverlay />}
        </div>
      </div>
    </div>
  );
};

const Assessment = () => {
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  );
};

export default Assessment;
