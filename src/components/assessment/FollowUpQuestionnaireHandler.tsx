
import { useAuth } from '@/contexts/AuthContext';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { questionnaires } from '@/data/questionnaires';
import Questionnaire from '@/components/Questionnaire';
import { processFollowUpQuestionnaire, createAssessmentResults } from '@/utils/assessmentAnalyzer';
import { supabase } from '@/integrations/supabase/client';

const FollowUpQuestionnaireHandler = () => {
  const { 
    userInfo,
    primaryMechanism,
    sinGroup,
    scores,
    assessmentId,
    setFollowUpAnswers,
    setScores,
    setPrimaryDifferential,
    setResults,
    setStage,
    setIsSubmitting,
  } = useAssessment();

  const handleFollowUpQuestionnaireComplete = async (answers: Record<string, any>) => {
    setIsSubmitting(true);
    setFollowUpAnswers(answers);
    
    if (!userInfo || !scores || !assessmentId) {
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

    // Update the assessment record with the primary differential
    try {
      // Only update the differential, not create a new record
      const { error } = await supabase
        .from('user_assessments')
        .update({
          primary_differential: newDifferential
        })
        .eq('id', assessmentId);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error updating assessment with differential:', error);
    }
    
    setResults(assessmentResults);
    setStage(AssessmentStage.Results);
    setIsSubmitting(false);
  };

  const handleBack = () => {
    setStage(AssessmentStage.GeneralQuestionnaire);
  };

  // Only render if we have a primary mechanism
  if (primaryMechanism === 'none') {
    return null;
  }

  return (
    <Questionnaire
      questionnaire={questionnaires[primaryMechanism as 'nociceptive' | 'neuropathic' | 'central']}
      onComplete={handleFollowUpQuestionnaireComplete}
      onBack={handleBack}
    />
  );
};

export default FollowUpQuestionnaireHandler;
