
import { useAssessment } from '@/contexts/AssessmentContext';
import ResultsPage from '@/components/results/ResultsPage';

const ResultsHandler = () => {
  const { results, handleRestart, assessmentId, assessmentSaved } = useAssessment();

  console.log('🎯 ResultsHandler rendered with:', {
    hasResults: !!results,
    assessmentId,
    assessmentSaved
  });

  if (!results) {
    console.log('❌ ResultsHandler: No results found, returning null');
    return null;
  }

  console.log('✅ ResultsHandler: Rendering ResultsPage with results:', results);

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
