
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { questionnaires } from '@/data/questionnaires';
import { upperLimbQuestionnaires } from '@/data/UpperLimb/questionnaires';
import Questionnaire from '@/components/Questionnaire';
import { processGeneralQuestionnaire, createAssessmentResults } from '@/utils/assessmentAnalyzer';
import { supabase } from '@/integrations/supabase/client';
import { safeDatabase } from '@/utils/database-helpers';
import { useState } from 'react';
import { Differential } from '@/utils/types';

const GeneralQuestionnaireHandler = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    userInfo,
    setGeneralAnswers,
    setScores,
    setPrimaryMechanism,
    setSINGroup,
    setPrimaryDifferential,
    setResults,
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
      
      // Determine differential based on answers
      let primaryDifferential: Differential = 'cervical-radiculopathy';
      if (answers['abnormal-sensations'] === 'yes-sensations') {
        primaryDifferential = 'radicular-pain';
      } else if (answers['abnormal-sensations'] === 'no-sensations') {
        primaryDifferential = 'radiculopathy';  
      }
      
      setPrimaryDifferential(primaryDifferential);
      
      // Create proper assessment results for neck neuropathic case
      if (userInfo) {
        const neckUserInfo = {
          ...userInfo,
          painArea: 'neck' as const // Set to neck for exercise program mapping
        };
        
        const mockScores = {
          nociceptive: 0,
          neuropathic: 3,
          central: 0,
          lowSIN: 0,
          midSIN: 2,
          highSIN: 0,
          differentials: {
            [primaryDifferential]: 3,
            'cervical-radiculopathy': 2,
            'radicular-pain': answers['abnormal-sensations'] === 'yes-sensations' ? 3 : 1,
            'radiculopathy': answers['abnormal-sensations'] === 'no-sensations' ? 3 : 1,
            'disc herniation': 0,
            'facet joint syndrome': 0,
            'SIJ syndrome': 0,
            'muscle pain': 0,
            'red flag': 0,
            'ventral spondylolisthesis': 0,
            'dorsal spondylolisthesis': 0,
            'costovertebral joint syndrome': 0,
            'Radicular Pain': 0,
            'Radiculopathy': 0,
            'Central Sensitisation': 0,
            'Central Sensitisation - Allodynia': 0,
            'Central Sensitisation - Sensory Hypersensitivity': 0,
            'Central Sensitisation - Cognitive Symptoms': 0,
            'spinal stenosis': 0,
            'spondylolisthesis': 0,
            'nerve compression': 0,
            'peripheral neuropathy': 0,
            'central sensitization': 0,
            'fibromyalgia': 0,
            'frozen-shoulder': 0,
            'slap-tear': 0,
            'subacromional-impingement-syndrome': 0,
            'stiff-shoulder': 0,
            'labral-leason': 0,
            'shoulder-bursa': 0,
            'rotator-cuff-tear': 0,
            'rotator-cuff-tendinopathy': 0,
            'biceps-tendinopathy': 0,
            'biceps-tear-long-head': 0,
            'shoulder-dislocation': 0,
            'unstable-shoulder': 0
          }
        };
        
        setScores(mockScores);
        
        // Create assessment results
        const assessmentResults = createAssessmentResults(
          neckUserInfo,
          'neuropathic',
          'mid SIN',
          primaryDifferential,
          mockScores
        );
        
        console.log('✅ GeneralQuestionnaireHandler: Created neck neuropathic results:', assessmentResults);
        setResults(assessmentResults);
      }
      
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
                primary_differential: primaryDifferential,
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
      
      // Go directly to results with properly created results
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
