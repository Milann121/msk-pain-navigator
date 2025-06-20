
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

  // Only render if we have a valid primary mechanism
  if (!primaryMechanism || primaryMechanism === 'none') {
    console.error('No primary mechanism found:', primaryMechanism);
    return null;
  }

  // Determine which questionnaire to use based on pain area and mechanism
  const getFollowUpQuestionnaire = () => {
    console.log('Getting follow-up questionnaire for:');
    console.log('- Pain area:', userInfo?.painArea);
    console.log('- Pain sub area:', userInfo?.painSubArea);
    console.log('- Primary mechanism:', primaryMechanism);
    
    // For upper limb cases, check if it's shoulder related
    if (userInfo?.painArea === 'upper limb') {
      const painSubArea = userInfo.painSubArea;
      console.log('Checking upper limb pain sub area:', painSubArea);
      
      // Check if painSubArea includes shoulder (can be array or string)
      const isShoulderRelated = Array.isArray(painSubArea) 
        ? painSubArea.some(area => 
            area && (
              area.toLowerCase().includes('shoulder') || 
              area.toLowerCase().includes('rameno')
            )
          )
        : typeof painSubArea === 'string' && painSubArea && (
            painSubArea.toLowerCase().includes('shoulder') || 
            painSubArea.toLowerCase().includes('rameno')
          );
      
      console.log('Is shoulder related:', isShoulderRelated);
      
      if (isShoulderRelated) {
        console.log('Looking for shoulder questionnaire for mechanism:', primaryMechanism);
        console.log('Available shoulder questionnaires:', Object.keys(shoulderQuestionnaires));
        
        // Get the shoulder questionnaire for the specific mechanism
        const shoulderQuestionnaire = shoulderQuestionnaires[primaryMechanism as keyof typeof shoulderQuestionnaires];
        
        if (shoulderQuestionnaire) {
          console.log('Found shoulder questionnaire:', shoulderQuestionnaire.id, shoulderQuestionnaire.title);
          return shoulderQuestionnaire;
        } else {
          console.log('No shoulder questionnaire found for mechanism:', primaryMechanism);
        }
      }
    }
    
    // Default to general questionnaires
    console.log('Using general questionnaire for mechanism:', primaryMechanism);
    const generalQuestionnaire = questionnaires[primaryMechanism as keyof typeof questionnaires];
    console.log('General questionnaire found:', generalQuestionnaire?.id, generalQuestionnaire?.title);
    return generalQuestionnaire;
  };

  const selectedQuestionnaire = getFollowUpQuestionnaire();
  
  console.log('Final selected questionnaire:', selectedQuestionnaire?.id, selectedQuestionnaire?.title);

  if (!selectedQuestionnaire) {
    console.error('No questionnaire found for mechanism:', primaryMechanism);
    return <div className="text-center p-4">
      <p className="text-red-600">Error: No questionnaire found for mechanism {primaryMechanism}</p>
      <p className="text-sm text-gray-600 mt-2">Pain area: {userInfo?.painArea}, Sub area: {JSON.stringify(userInfo?.painSubArea)}</p>
    </div>;
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
