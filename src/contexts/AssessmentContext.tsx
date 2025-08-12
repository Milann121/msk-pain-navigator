
import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  UserInfo, 
  PainMechanism, 
  SINGroup, 
  Differential, 
  ScoreTracker, 
  AssessmentResults 
} from '@/utils/types';

export enum AssessmentStage {
  UserInfo,
  GeneralQuestionnaire,
  FollowUpQuestionnaire,
  Results
}

interface AssessmentContextType {
  stage: AssessmentStage;
  setStage: (stage: AssessmentStage) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
  generalAnswers: Record<string, any>;
  setGeneralAnswers: (answers: Record<string, any>) => void;
  followUpAnswers: Record<string, any>;
  setFollowUpAnswers: (answers: Record<string, any>) => void;
  primaryMechanism: PainMechanism;
  setPrimaryMechanism: (mechanism: PainMechanism) => void;
  sinGroup: SINGroup;
  setSINGroup: (group: SINGroup) => void;
  scores: ScoreTracker | null;
  setScores: (scores: ScoreTracker | null) => void;
  primaryDifferential: Differential;
  setPrimaryDifferential: (differential: Differential) => void;
  results: AssessmentResults | null;
  setResults: (results: AssessmentResults | null) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  assessmentId: string | null;
  setAssessmentId: (id: string | null) => void;
  assessmentSaved: boolean;
  setAssessmentSaved: (saved: boolean) => void;
  handleRestart: () => void;
}

export const AssessmentContext = createContext<AssessmentContextType | null>(null);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider = ({ children, shouldInitFromPsfs = false }: { children: ReactNode; shouldInitFromPsfs?: boolean }) => {
  // Check for PSFS context on initialization, gated by URL flag
  const initializePsfsAssessment = () => {
    const psfsContextStr = sessionStorage.getItem('psfsAssessmentContext');
    if (shouldInitFromPsfs && psfsContextStr) {
      try {
        const psfsContext = JSON.parse(psfsContextStr);
        if (psfsContext.isPsfsAssessment && psfsContext.userInfo) {
          return {
            stage: AssessmentStage.GeneralQuestionnaire,
            userInfo: psfsContext.userInfo
          };
        }
      } catch (error) {
        console.error('Error parsing PSFS context:', error);
      }
    } else if (psfsContextStr && !shouldInitFromPsfs) {
      // Clear stale PSFS context if user navigated here without the flag
      sessionStorage.removeItem('psfsAssessmentContext');
    }
    return {
      stage: AssessmentStage.UserInfo,
      userInfo: null
    };
  };

  const { stage: initialStage, userInfo: initialUserInfo } = initializePsfsAssessment();
  
  const [stage, setStage] = useState<AssessmentStage>(initialStage);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(initialUserInfo);
  const [generalAnswers, setGeneralAnswers] = useState<Record<string, any>>({});
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, any>>({});
  const [primaryMechanism, setPrimaryMechanism] = useState<PainMechanism>('none');
  const [sinGroup, setSINGroup] = useState<SINGroup>('none');
  const [scores, setScores] = useState<ScoreTracker | null>(null);
  const [primaryDifferential, setPrimaryDifferential] = useState<Differential>('none');
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [assessmentSaved, setAssessmentSaved] = useState<boolean>(false);

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
    setAssessmentId(null);
    setAssessmentSaved(false);
    // Clear any PSFS context on restart to avoid unintended auto-skip
    sessionStorage.removeItem('psfsAssessmentContext');
  };

  return (
    <AssessmentContext.Provider
      value={{
        stage,
        setStage,
        userInfo,
        setUserInfo,
        generalAnswers,
        setGeneralAnswers,
        followUpAnswers,
        setFollowUpAnswers,
        primaryMechanism,
        setPrimaryMechanism,
        sinGroup,
        setSINGroup,
        scores,
        setScores,
        primaryDifferential,
        setPrimaryDifferential,
        results,
        setResults,
        isSubmitting,
        setIsSubmitting,
        assessmentId,
        setAssessmentId,
        assessmentSaved,
        setAssessmentSaved,
        handleRestart
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};
