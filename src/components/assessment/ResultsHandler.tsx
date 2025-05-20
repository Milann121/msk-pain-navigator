
import { useAssessment } from '@/contexts/AssessmentContext';
import ResultsPage from '@/components/ResultsPage';

const ResultsHandler = () => {
  const { results, handleRestart, assessmentId, assessmentSaved } = useAssessment();

  if (!results) {
    return null;
  }

  return (
    <ResultsPage
      results={results}
      onRestart={handleRestart}
      assessmentId={assessmentId}
      assessmentSaved={assessmentSaved}
    />
  );
};

export default ResultsHandler;
