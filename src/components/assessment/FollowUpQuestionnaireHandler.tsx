
import { useAuth } from '@/contexts/AuthContext';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { questionnaires } from '@/data/questionnaires';
import { shoulderQuestionnaires } from '@/data/UpperLimb/Shoulder-joint/questionnaires';
import Questionnaire from '@/components/Questionnaire';
import { processFollowUpQuestionnaire, createAssessmentResults } from '@/utils/assessmentAnalyzer';
import { supabase } from '@/integrations/supabase/client';
import { upperLimbQuestionnaires } from '@/data/UpperLimb/questionnaires';

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
    
    // For upper limb cases, we need to determine the correct pain area for exercise programs
    let finalPainArea = userInfo.painArea;
    let finalDifferential = newDifferential;
    
    // If it's upper limb and neuropathic (neck-related), set pain area to neck
    if (userInfo.painArea === 'upper limb' && primaryMechanism === 'neuropathic') {
      finalPainArea = 'neck';
      console.log('Upper limb neuropathic case - setting pain area to neck for exercise program');
    }
    
    const assessmentResults = createAssessmentResults(
      userInfo,
      primaryMechanism,
      sinGroup,
      finalDifferential,
      updatedScores
    );

    // Update the assessment record with the primary differential and correct pain area
    try {
      const { error } = await supabase
        .from('user_assessments')
        .update({
          primary_differential: finalDifferential,
          pain_area: finalPainArea // Update pain area for correct exercise program mapping
        })
        .eq('id', assessmentId);
        
      if (error) throw error;
      
      console.log('Assessment updated successfully:', {
        assessmentId,
        differential: finalDifferential,
        painArea: finalPainArea
      });
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
    console.log('=== FOLLOW-UP QUESTIONNAIRE SELECTION DEBUG ===');
    console.log('User info:', userInfo);
    console.log('Pain area:', userInfo?.painArea);
    console.log('Pain sub area:', userInfo?.painSubArea);
    console.log('Primary mechanism:', primaryMechanism);
    
    // For upper limb cases, check mechanism to determine pathway
    if (userInfo?.painArea === 'upper limb') {
      console.log('Upper limb detected, checking mechanism:', primaryMechanism);
      
      if (primaryMechanism === 'neuropathic') {
        // Neuropathic pathway -> neck questions
        console.log('✅ Neuropathic mechanism - using neck questionnaire');
        return upperLimbQuestionnaires['upper-limb-neck-questions'];
      } else if (primaryMechanism === 'nociceptive') {
        // Nociceptive pathway -> shoulder questions (if shoulder-related)
        const painSubArea = userInfo.painSubArea;
        console.log('Nociceptive mechanism, checking pain sub area:', painSubArea);
        
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
          console.log('✅ Shoulder detected - using shoulder nociceptive questionnaire');
          // Use shoulder questionnaire directly
          const shoulderQuestionnaire = shoulderQuestionnaires.nociceptive;
          
          if (shoulderQuestionnaire) {
            console.log('✅ Found shoulder questionnaire:', shoulderQuestionnaire.id, shoulderQuestionnaire.title);
            return shoulderQuestionnaire;
          } else {
            console.log('❌ No shoulder questionnaire found for nociceptive mechanism');
          }
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
  
  console.log('=== FINAL SELECTION ===');
  console.log('Selected questionnaire:', selectedQuestionnaire?.id, selectedQuestionnaire?.title);

  if (!selectedQuestionnaire) {
    console.error('❌ No questionnaire found for mechanism:', primaryMechanism);
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
