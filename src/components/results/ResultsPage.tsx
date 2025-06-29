
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentResults } from '@/utils/types';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import UserInfoSection from './UserInfoSection';
import MechanismSection from './MechanismSection';
import SINSection from './SINSection';
import DifferentialSection from './DifferentialSection';
import ExercisePlanSection from './ExercisePlanSection';
import ResultsFooter from './ResultsFooter';
import SaveResultsManager from './SaveResultsManager';

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
  assessmentId?: string | null;
  assessmentSaved?: boolean;
}

const ResultsPage = ({ results, onRestart, assessmentId, assessmentSaved = false }: ResultsPageProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isSaved, setIsSaved] = useState(assessmentSaved);
  const { userInfo, primaryMechanism, sinGroup, primaryDifferential } = results;
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center bg-blue-50">
        <CardTitle className="text-2xl font-bold text-blue-700">{t('results.title')}</CardTitle>
        <CardDescription>
          {t('results.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <UserInfoSection userInfo={userInfo} />
        
        <div className="space-y-4 mt-6">
          <MechanismSection primaryMechanism={primaryMechanism} />
          <SINSection sinGroup={sinGroup} />
          <DifferentialSection primaryDifferential={primaryDifferential} />
        </div>
        
        <ExercisePlanSection 
          mechanismType={primaryMechanism}
          differentialType={primaryDifferential}
          painArea={userInfo.painArea}
          assessmentId={assessmentId}
        />
        
        <div className="text-sm text-gray-500 mt-6">
          <p>{t('results.footer.disclaimer')}</p>
          {user && (
            <SaveResultsManager 
              results={results}
              assessmentId={assessmentId}
              assessmentSaved={isSaved}
              setAssessmentSaved={setIsSaved}
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <ResultsFooter onRestart={onRestart} userLoggedIn={!!user} />
      </CardFooter>
    </Card>
  );
};

export default ResultsPage;
