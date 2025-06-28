
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { questionnaires } from '@/data/questionnaires';
import { upperLimbQuestionnaires } from '@/data/UpperLimb/questionnaires';
import Questionnaire from '@/components/Questionnaire';
import { processGeneralQuestionnaire } from '@/utils/assessmentAnalyzer';
import { supabase } from '@/integrations/supabase/client';
import { safeDatabase } from '@/utils/database-helpers';
import { useState } from 'react';

const GeneralQuestionnaireHandler = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    userInfo,
    setGeneralAnswers,
    setScores,
    setPrimaryMechanism,
    setSINGroup,
    setStage,
    handleRestart,
    assessmentId,
    setAssessmentId,
    setAssessmentSaved
  } = useAssessment();
  
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(() => {
    return userInfo?.painArea === 'upper limb' 
      ? upperLimbQuestionnaires.general 
      : questionnaires.general;
  });

  const handleRedirection = (questionnaireId: string, answers: Record<string, any>) => {
    // Store current answers
    setGeneralAnswers(answers);
    
    // Load the new questionnaire
    if (questionnaireId === 'upper-limb-neck-questions') {
      setCurrentQuestionnaire(upperLimbQuestionnaires['upper-limb-neck-questions']);
    }
  };

  const handleGeneralQuestionnaireComplete = async (answers: Record<string, any>) => {
    console.log('🚀 GeneralQuestionnaireHandler: Starting completion with answers:', answers);
    setGeneralAnswers(answers);
    
    // If this is the neck questionnaire, set mechanism to neuropathic and redirect to neck program
    if (currentQuestionnaire.id === 'upper-limb-neck-questions') {
      setPrimaryMechanism('neuropathic');
      setSINGroup('mid SIN');
      
      // Store assessment with neck neuropathic program
      if (user && answers['abnormal-sensations'] !== undefined) {
        try {
          const painIntensity = 5; // Default for neck neuropathic cases
          
          if (!assessmentId) {
            const { data: assessmentData, error: assessmentError } = await supabase
              .from('user_assessments')
              .insert({
                user_id: user.id,
                pain_area: 'neck', // Set to neck for neuropathic program
                primary_mechanism: 'neuropathic',
                sin_group: 'mid SIN',
                primary_differential: 'cervical-radiculopathy',
                intial_pain_intensity: painIntensity
              })
              .select('id')
              .single();

            if (assessmentError) throw assessmentError;
            
            if (assessmentData?.id) {
              setAssessmentId(assessmentData.id);
              setAssessmentSaved(true);
              
              const { error: questionnaireError } = await safeDatabase.generalQuestionnaire.insert({
                user_id: user.id,
                assessment_id: assessmentData.id,
                answers: answers
              });
                
              if (questionnaireError) throw questionnaireError;
            }
          }
        } catch (error) {
          console.error('Error storing neck questionnaire results:', error);
          toast({
            title: 'Chyba',
            description: 'Nepodarilo sa uložiť vaše odpovede.',
            variant: 'destructive'
          });
        }
      }
      
      // Skip follow-up questionnaire and go directly to results
      setStage(AssessmentStage.Results);
      return;
    }
    
    const { scores: newScores, primaryMechanism: newMechanism, sinGroup: newSinGroup } =
      processGeneralQuestionnaire(answers, currentQuestionnaire);
    
    console.log('🔍 GeneralQuestionnaireHandler: Processing results:', {
      newScores,
      newMechanism,
      newSinGroup,
      painArea: userInfo?.painArea
    });
    
    setScores(newScores);
    setPrimaryMechanism(newMechanism);
    setSINGroup(newSinGroup);
    
    // Store the general questionnaire results for later retrieval
    if (user) {
      try {
        // Get pain intensity value from answers - check both possible field names
        const painIntensity = answers['pain-intensity'] || answers['pain-intensity-upper-limb'] || 5;
        
        console.log('💾 GeneralQuestionnaireHandler: Creating assessment with pain intensity:', painIntensity);
        
        // Only create the assessment if it hasn't been created already
        if (!assessmentId) {
          // Create assessment record first with pain intensity value
          const { data: assessmentData, error: assessmentError } = await supabase
            .from('user_assessments')
            .insert({
              user_id: user.id,
              pain_area: userInfo?.painArea || '',
              primary_mechanism: newMechanism,
              sin_group: newSinGroup,
              primary_differential: 'none', // Will be updated later
              intial_pain_intensity: painIntensity // Save pain intensity to the new column
            })
            .select('id')
            .single();

          if (assessmentError) {
            console.error('❌ GeneralQuestionnaireHandler: Assessment creation error:', assessmentError);
            throw assessmentError;
          }
          
          if (assessmentData?.id) {
            console.log('✅ GeneralQuestionnaireHandler: Assessment created with ID:', assessmentData.id);
            setAssessmentId(assessmentData.id);
            setAssessmentSaved(true);
            
            // Store the general questionnaire results
            const { error: questionnaireError } = await safeDatabase.generalQuestionnaire.insert({
              user_id: user.id,
              assessment_id: assessmentData.id,
              answers: answers
            });
              
            if (questionnaireError) {
              console.error('❌ GeneralQuestionnaireHandler: Questionnaire save error:', questionnaireError);
              throw questionnaireError;
            }
            
            console.log('✅ GeneralQuestionnaireHandler: Successfully stored general questionnaire answers');
          }
        }
      } catch (error) {
        console.error('❌ GeneralQuestionnaireHandler: Error storing general questionnaire results:', error);
        toast({
          title: 'Chyba',
          description: 'Nepodarilo sa uložiť vaše odpovede.',
          variant: 'destructive'
        });
      }
    }
    
    console.log('➡️ GeneralQuestionnaireHandler: Moving to FollowUpQuestionnaire stage');
    setStage(AssessmentStage.FollowUpQuestionnaire);
  };

  return (
    <Questionnaire
      questionnaire={currentQuestionnaire}
      onComplete={handleGeneralQuestionnaireComplete}
      onBack={handleRestart}
      onRedirect={handleRedirection}
    />
  );
};

export default GeneralQuestionnaireHandler;
