
import { useState } from 'react';
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
import { saveResultsToSheet, mockSaveResults, getExerciseLink } from '@/utils/googleSheets';
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

const Index = () => {
  const [stage, setStage] = useState<AssessmentStage>(AssessmentStage.UserInfo);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [generalAnswers, setGeneralAnswers] = useState<Record<string, any>>({});
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, any>>({});
  const [primaryMechanism, setPrimaryMechanism] = useState<PainMechanism>('none');
  const [sinGroup, setSINGroup] = useState<SINGroup>('none');
  const [scores, setScores] = useState<ScoreTracker | null>(null);
  const [primaryDifferential, setPrimaryDifferential] = useState<Differential>('none');
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [exerciseLink, setExerciseLink] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStage(AssessmentStage.GeneralQuestionnaire);
  };

  const handleGeneralQuestionnaireComplete = (answers: Record<string, any>) => {
    setGeneralAnswers(answers);
    
    // Process general questionnaire to determine primary mechanism and SIN group
    const { scores: newScores, primaryMechanism: newMechanism, sinGroup: newSinGroup } = 
      processGeneralQuestionnaire(answers);
    
    setScores(newScores);
    setPrimaryMechanism(newMechanism);
    setSINGroup(newSinGroup);
    
    // Move to follow-up questionnaire based on primary mechanism
    setStage(AssessmentStage.FollowUpQuestionnaire);
  };

  const handleFollowUpQuestionnaireComplete = async (answers: Record<string, any>) => {
    setIsSubmitting(true);
    setFollowUpAnswers(answers);
    
    if (!userInfo || !scores) {
      setIsSubmitting(false);
      return;
    }
    
    // Process follow-up questionnaire to determine primary differential
    const { scores: updatedScores, primaryDifferential: newDifferential } = 
      processFollowUpQuestionnaire(
        primaryMechanism as 'nociceptive' | 'neuropathic' | 'central',
        answers,
        scores
      );
    
    setScores(updatedScores);
    setPrimaryDifferential(newDifferential);
    
    // Create final assessment results
    const assessmentResults = createAssessmentResults(
      userInfo,
      primaryMechanism,
      sinGroup,
      newDifferential,
      updatedScores
    );
    
    setResults(assessmentResults);
    
    // Get exercise link based on results
    const link = getExerciseLink(
      primaryMechanism,
      sinGroup,
      newDifferential,
      userInfo.painArea
    );
    setExerciseLink(link);
    
    // Save results to Google Sheets (using mock for now)
    try {
      // In production, switch to saveResultsToSheet
      await mockSaveResults(assessmentResults);
      setStage(AssessmentStage.Results);
    } catch (error) {
      console.error('Error saving results:', error);
      // Still show results even if saving fails
      setStage(AssessmentStage.Results);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    // Reset state and go back to the beginning
    setStage(AssessmentStage.UserInfo);
    setUserInfo(null);
    setGeneralAnswers({});
    setFollowUpAnswers({});
    setPrimaryMechanism('none');
    setSINGroup('none');
    setScores(null);
    setPrimaryDifferential('none');
    setResults(null);
    setExerciseLink('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">MSK Pain Assessment</h1>
            <p className="text-lg text-blue-600">
              Complete the assessment to get personalized exercise recommendations
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
              exerciseLink={exerciseLink}
              onRestart={handleRestart}
            />
          )}
          
          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-medium">Processing your results...</p>
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>MSK Pain Navigator © {new Date().getFullYear()}</p>
          <p className="mt-1">
            This application is for educational purposes only and is not a substitute for professional medical advice.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
