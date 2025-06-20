

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

  // Helper function to detect shoulder-related pain
  const isShoulderRelated = (painSubArea: any): boolean => {
    console.log('🔍 Checking if shoulder-related, painSubArea:', painSubArea, 'type:', typeof painSubArea);
    
    // List of all possible shoulder-related terms (Slovak and English)
    const shoulderTerms = [
      'shoulder', 'rameno', 'ramená', 'plece', 'plecia', 'pleco',
      'Shoulder', 'Rameno', 'Ramená', 'Plece', 'Plecia', 'Pleco',
      'SHOULDER', 'RAMENO', 'RAMENÁ', 'PLECE', 'PLECIA', 'PLECO'
    ];
    
    if (!painSubArea) {
      console.log('❌ No painSubArea provided');
      return false;
    }
    
    // Handle array case
    if (Array.isArray(painSubArea)) {
      console.log('📋 painSubArea is array:', painSubArea);
      const found = painSubArea.some(area => {
        if (!area || typeof area !== 'string') return false;
        const isMatch = shoulderTerms.some(term => area.toLowerCase().includes(term.toLowerCase()));
        console.log(`  - Checking "${area}": ${isMatch}`);
        return isMatch;
      });
      console.log('🎯 Array check result:', found);
      return found;
    }
    
    // Handle string case
    if (typeof painSubArea === 'string') {
      console.log('📝 painSubArea is string:', painSubArea);
      const found = shoulderTerms.some(term => painSubArea.toLowerCase().includes(term.toLowerCase()));
      console.log('🎯 String check result:', found);
      return found;
    }
    
    console.log('❌ painSubArea is neither array nor string');
    return false;
  };

  // Determine which questionnaire to use based on pain area and mechanism
  const getFollowUpQuestionnaire = () => {
    console.log('=== FOLLOW-UP QUESTIONNAIRE SELECTION DEBUG ===');
    console.log('User info:', JSON.stringify(userInfo, null, 2));
    console.log('Pain area:', userInfo?.painArea);
    console.log('Pain sub area:', userInfo?.painSubArea);
    console.log('Primary mechanism:', primaryMechanism);
    console.log('Available shoulder questionnaires:', Object.keys(shoulderQuestionnaires));
    console.log('Available general questionnaires:', Object.keys(questionnaires));
    
    // For upper limb cases, check mechanism to determine pathway
    if (userInfo?.painArea === 'upper limb') {
      console.log('🔥 Upper limb detected, checking mechanism:', primaryMechanism);
      
      if (primaryMechanism === 'nociceptive') {
        console.log('💪 Nociceptive mechanism for upper limb');
        
        // Check if it's shoulder-related
        const shoulderDetected = isShoulderRelated(userInfo.painSubArea);
        console.log('🎯 Shoulder detection result:', shoulderDetected);
        
        if (shoulderDetected) {
          console.log('✅ Shoulder detected - attempting to use shoulder nociceptive questionnaire');
          const shoulderQuestionnaire = shoulderQuestionnaires.nociceptive;
          
          if (shoulderQuestionnaire) {
            console.log('✅ SUCCESS! Found shoulder questionnaire:', {
              id: shoulderQuestionnaire.id,
              title: shoulderQuestionnaire.title,
              questionsCount: shoulderQuestionnaire.questions?.length || 0
            });
            console.log('✅ RETURNING SHOULDER QUESTIONNAIRE');
            return shoulderQuestionnaire;
          } else {
            console.log('❌ ERROR: No shoulder questionnaire found for nociceptive mechanism');
          }
        } else {
          console.log('⚠️ No shoulder detected in painSubArea, but this is upper limb + nociceptive');
          console.log('🔄 FALLBACK: Using shoulder questionnaire anyway for upper limb nociceptive');
          
          // Fallback: For upper limb + nociceptive, default to shoulder questionnaire
          const shoulderQuestionnaire = shoulderQuestionnaires.nociceptive;
          if (shoulderQuestionnaire) {
            console.log('✅ FALLBACK SUCCESS! Using shoulder questionnaire:', {
              id: shoulderQuestionnaire.id,
              title: shoulderQuestionnaire.title
            });
            return shoulderQuestionnaire;
          }
        }
      } else if (primaryMechanism === 'neuropathic') {
        // Neuropathic pathway -> neck questions
        console.log('🧠 Neuropathic mechanism - using neck questionnaire');
        return upperLimbQuestionnaires['upper-limb-neck-questions'];
      }
    }
    
    // Default to general questionnaires ONLY if not upper limb or conditions not met
    console.log('⚠️ Falling back to general questionnaire for mechanism:', primaryMechanism);
    const generalQuestionnaire = questionnaires[primaryMechanism as keyof typeof questionnaires];
    console.log('📋 General questionnaire found:', {
      id: generalQuestionnaire?.id,
      title: generalQuestionnaire?.title,
      questionsCount: generalQuestionnaire?.questions?.length || 0
    });
    return generalQuestionnaire;
  };

  const selectedQuestionnaire = getFollowUpQuestionnaire();
  
  console.log('=== FINAL SELECTION RESULT ===');
  console.log('Selected questionnaire:', {
    id: selectedQuestionnaire?.id,
    title: selectedQuestionnaire?.title,
    questionsCount: selectedQuestionnaire?.questions?.length || 0
  });

  if (!selectedQuestionnaire) {
    console.error('❌ CRITICAL ERROR: No questionnaire found for mechanism:', primaryMechanism);
    return <div className="text-center p-4">
      <p className="text-red-600">Error: No questionnaire found for mechanism {primaryMechanism}</p>
      <p className="text-sm text-gray-600 mt-2">Pain area: {userInfo?.painArea}, Sub area: {JSON.stringify(userInfo?.painSubArea)}</p>
      <p className="text-xs text-gray-500 mt-1">Debug info logged to console</p>
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

