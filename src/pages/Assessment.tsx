
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';
import { AssessmentProvider, useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import LoadingView from '@/components/assessment/LoadingView';
import UserInfoHandler from '@/components/assessment/UserInfoHandler';
import GeneralQuestionnaireHandler from '@/components/assessment/GeneralQuestionnaireHandler';
import FollowUpQuestionnaireHandler from '@/components/assessment/FollowUpQuestionnaireHandler';
import ResultsHandler from '@/components/assessment/ResultsHandler';
import SubmittingOverlay from '@/components/assessment/SubmittingOverlay';
import { FileUploadSection } from '@/components/assessment/FileUploadSection';
import { AskPebeeChat } from '@/components/assessment/AskPebeeChat';
// import { BodyModelSection } from '@/components/assessment/BodyModelSection';

const AssessmentContent = () => {
  const { user, isLoading } = useAuth();
  const { stage, isSubmitting } = useAssessment();
  const { t } = useTranslation();
  
  console.log('🔍 AssessmentContent rendered with stage:', stage, 'isSubmitting:', isSubmitting);
  
  if (isLoading) {
    console.log('⏳ AssessmentContent: Still loading user...');
    return <LoadingView />;
  }

  if (!user) {
    console.log('❌ AssessmentContent: No user found, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  console.log('✅ AssessmentContent: User authenticated, rendering stage:', AssessmentStage[stage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              {t('assessment.title')}
            </h1>
            <p className="text-lg text-blue-600">
              {t('assessment.subtitle')}
            </p>
          </header>
          
          {/* Body Model Section - hidden for now, keeping code for later use */}
          {/* <BodyModelSection /> */}
          
          {stage === AssessmentStage.UserInfo && (
            <>
              {console.log('🎯 Rendering UserInfoHandler')}
              <UserInfoHandler />
            </>
          )}
          
          {stage === AssessmentStage.GeneralQuestionnaire && (
            <>
              {console.log('🎯 Rendering GeneralQuestionnaireHandler')}
              <GeneralQuestionnaireHandler />
            </>
          )}
          
          {stage === AssessmentStage.FollowUpQuestionnaire && (
            <>
              {console.log('🎯 Rendering FollowUpQuestionnaireHandler')}
              <FollowUpQuestionnaireHandler />
            </>
          )}
          
          {stage === AssessmentStage.Results && (
            <>
              {console.log('🎯 Rendering ResultsHandler')}
              <ResultsHandler />
            </>
          )}
          
          {/* Ask Pebee Section - Available for all stages */}
          <div className="mt-12 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                Pýtajte sa Pebee
              </h2>
              <p className="text-blue-600">
                Nahrajte dokumenty a chatujte s vaším osobným terapeutickým asistentom
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FileUploadSection />
              <AskPebeeChat />
            </div>
          </div>
          
          {isSubmitting && (
            <>
              {console.log('⏳ Rendering SubmittingOverlay')}
              <SubmittingOverlay />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Assessment = () => {
  console.log('🚀 Assessment component mounted');
  
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  );
};

export default Assessment;
