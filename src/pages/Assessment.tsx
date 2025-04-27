import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserForm from '@/components/UserForm';
import Questionnaire from '@/components/Questionnaire';
import ResultsPage from '@/components/ResultsPage';
import Header from '@/components/Header';
import { 
  questionnaires,
} from '@/data/questionnaires';
import { 
  processGeneralQuestionnaire, 
  processFollowUpQuestionnaire, 
  createAssessmentResults 
} from '@/utils/assessmentAnalyzer';
import { 
  UserInfo, 
  PainMechanism, 
  SINGroup, 
  Differential, 
  ScoreTracker, 
  AssessmentResults 
} from '@/utils/types';

enum AssessmentStage {
  UserInfo,
  GeneralQuestionnaire,
  FollowUpQuestionnaire,
  Results
}

const Assessment = () => {
  const { user, isLoading } = useAuth();

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

  const [stage, setStage] = useState<AssessmentStage>(AssessmentStage.UserInfo);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [generalAnswers, setGeneralAnswers] = useState<Record<string, any>>({});
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, any>>({});
  const [primaryMechanism, setPrimaryMechanism] = useState<PainMechanism>('none');
  const [sinGroup, setSINGroup] = useState<SINGroup>('none');
  const [scores, setScores] = useState<ScoreTracker | null>(null);
  const [primaryDifferential, setPrimaryDifferential] = useState<Differential>('none');
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStage(AssessmentStage.GeneralQuestionnaire);
  };

  const handleGeneralQuestionnaireComplete = (answers: Record<string, any>) => {
    setGeneralAnswers(answers);
    
    const { scores: newScores, primaryMechanism: newMechanism, sinGroup: newSinGroup } = 
      processGeneralQuestionnaire(answers);
    
    setScores(newScores);
    setPrimaryMechanism(newMechanism);
    setSINGroup(newSinGroup);
    
    setStage(AssessmentStage.FollowUpQuestionnaire);
  };

  const handleFollowUpQuestionnaireComplete = async (answers: Record<string, any>) => {
    setIsSubmitting(true);
    setFollowUpAnswers(answers);
    
    if (!userInfo || !scores) {
      setIsSubmitting(false);
      return;
    }
    
    const { scores: updatedScores, primaryDifferential: newDifferential } = 
      processFollowUpQuestionnaire(
        primaryMechanism as 'nociceptive' | 'neuropathic' | 'central',
        answers,
        scores
      );
    
    setScores(updatedScores);
    setPrimaryDifferential(newDifferential);
    
    const assessmentResults = createAssessmentResults(
      userInfo,
      primaryMechanism,
      sinGroup,
      newDifferential,
      updatedScores
    );
    
    setResults(assessmentResults);
    
    setStage(AssessmentStage.Results);
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    setStage(AssessmentStage.UserInfo);
    setUserInfo(null);
    setGeneralAnswers({});
    setFollowUpAnswers({});
    setPrimaryMechanism('none');
    setSINGroup('none');
    setScores(null);
    setPrimaryDifferential('none');
    setResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Hodnotenie bolesti pohybového aparátu
            </h1>
            <p className="text-lg text-blue-600">
              Vyplňte dotazník pre získanie personalizovaných cvičebných odporúčaní
            </p>
          </header>
          
          {stage === AssessmentStage.UserInfo && (
            <UserForm onSubmit={handleUserInfoSubmit} />
          )}
          
          {stage === AssessmentStage.GeneralQuestionnaire && (
            <Questionnaire
              questionnaire={questionnaires.general}
              onComplete={handleGeneralQuestionnaireComplete}
              onBack={handleRestart}
            />
          )}
          
          {stage === AssessmentStage.FollowUpQuestionnaire && primaryMechanism !== 'none' && (
            <Questionnaire
              questionnaire={questionnaires[primaryMechanism as 'nociceptive' | 'neuropathic' | 'central']}
              onComplete={handleFollowUpQuestionnaireComplete}
              onBack={() => setStage(AssessmentStage.GeneralQuestionnaire)}
            />
          )}
          
          {stage === AssessmentStage.Results && results && (
            <ResultsPage
              results={results}
              onRestart={handleRestart}
            />
          )}
          
          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-medium">Spracovávame vaše výsledky...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
