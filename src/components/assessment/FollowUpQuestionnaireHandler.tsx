
import { useAuth } from '@/contexts/AuthContext';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { questionnaires } from '@/data/questionnaires';
import { shoulderQuestionnaires } from '@/data/UpperLimb/Shoulder-joint/questionnaires';
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

  // Determine which questionnaire to use based on pain area and mechanism
  const getFollowUpQuestionnaire = () => {
    // For upper limb cases, check if it's shoulder related
    if (userInfo?.painArea === 'upper limb') {
      // Check if painSubArea includes shoulder or if it's shoulder-related
      const painSubArea = userInfo.painSubArea;
      console.log('Checking painSubArea:', painSubArea);
      console.log('Primary mechanism:', primaryMechanism);
      
      const isShoulderRelated = Array.isArray(painSubArea) 
        ? painSubArea.some(area => area.toLowerCase().includes('shoulder') || area.toLowerCase().includes('rameno'))
        : typeof painSubArea === 'string' && (painSubArea.toLowerCase().includes('shoulder') || painSubArea.toLowerCase().includes('rameno'));
      
      console.log('Is shoulder related:', isShoulderRelated);
      console.log('Available shoulder questionnaires:', Object.keys(shoulderQuestionnaires));
      
      if (isShoulderRelated && shoulderQuestionnaires[primaryMechanism as 'nociceptive' | 'neuropathic' | 'central']) {
        console.log('Loading shoulder questionnaire for mechanism:', primaryMechanism);
        const questionnaire = shoulderQuestionnaires[primaryMechanism as 'nociceptive' | 'neuropathic' | 'central'];
        console.log('Selected shoulder questionnaire:', questionnaire?.id, questionnaire?.title);
        return questionnaire;
      } else {
        console.log('Shoulder questionnaire not found for mechanism:', primaryMechanism);
        console.log('Available mechanisms in shoulderQuestionnaires:', Object.keys(shoulderQuestionnaires));
      }
    }
    
    // Default to general questionnaires
    console.log('Falling back to general questionnaire for mechanism:', primaryMechanism);
    return questionnaires[primaryMechanism as 'nociceptive' | 'neuropathic' | 'central'];
  };

  const selectedQuestionnaire = getFollowUpQuestionnaire();
  
  console.log('FollowUpQuestionnaireHandler - Pain area:', userInfo?.painArea);
  console.log('FollowUpQuestionnaireHandler - Pain sub area:', userInfo?.painSubArea);
  console.log('FollowUpQuestionnaireHandler - Primary mechanism:', primaryMechanism);
  console.log('FollowUpQuestionnaireHandler - Selected questionnaire:', selectedQuestionnaire?.id, selectedQuestionnaire?.title);

  if (!selectedQuestionnaire) {
    console.error('No questionnaire found for mechanism:', primaryMechanism);
    return <div>Error: No questionnaire found for mechanism {primaryMechanism}</div>;
  }

  return (
    <Questionnaire
      questionnaire={selectedQuestionnaire}
      onComplete={handleFollowUpQuestionnaireComplete}
      onBack={handleBack}
    />
  );
};

export default FollowUpQuestionnaireHandler;
