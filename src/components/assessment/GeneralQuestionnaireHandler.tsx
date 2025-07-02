
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { questionnaires } from '@/data/questionnaires';
import { upperLimbQuestionnaires } from '@/data/UpperLimb/questionnaires';
import { shoulderQuestionnaires } from '@/data/UpperLimb/Shoulder-joint/questionnaires';
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
    scores,
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

  const syncPainAreasToProfile = async () => {
    if (!user) return;

    try {
      // Get all active assessments for the user
      const { data: assessments, error: assessmentsError } = await supabase
        .from('user_assessments')
        .select('id, pain_area, program_ended_at')
        .eq('user_id', user.id)
        .is('program_ended_at', null); // Only active programs

      if (assessmentsError) {
        console.error('Error fetching assessments for sync:', assessmentsError);
        return;
      }

      // Extract unique pain areas from active assessments
      let painAreas: string[] = [];
      if (assessments && assessments.length > 0) {
        painAreas = [...new Set(assessments.map(a => a.pain_area))];
      }

      // Update user profile with current pain areas
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          email: user.email,
          pain_area: painAreas.join(', ') || null
        }, { onConflict: 'user_id' });

      if (updateError) {
        console.error('Error syncing pain areas to profile:', updateError);
      } else {
        console.log('Pain areas synced to profile:', painAreas);
      }

    } catch (error) {
      console.error('Error syncing pain areas:', error);
    }
  };

  const handleRedirection = (questionnaireId: string, answers: Record<string, any>) => {
    console.log('🔄 GeneralQuestionnaireHandler: Handling redirection to:', questionnaireId);
    console.log('📝 GeneralQuestionnaireHandler: Current answers:', answers);
    
    // Store current answers
    setGeneralAnswers(answers);
    
    // Load the new questionnaire based on redirect
    if (questionnaireId === 'upper-limb-neck-questions') {
      console.log('🧠 GeneralQuestionnaireHandler: Redirecting to neck questions');
      setCurrentQuestionnaire(upperLimbQuestionnaires['upper-limb-neck-questions']);
    } else if (questionnaireId === 'shoulder-nociceptive') {
      console.log('💪 GeneralQuestionnaireHandler: Redirecting to shoulder nociceptive questionnaire');
      
      // Set mechanism to nociceptive and proceed to shoulder questionnaire
      setPrimaryMechanism('nociceptive');
      setSINGroup('mid SIN');
      
      // Create mock scores for shoulder nociceptive case
      const mockScores = {
        nociceptive: 3,
        neuropathic: 0,
        central: 0,
        lowSIN: 0,
        midSIN: 2,
        highSIN: 0,
        differentials: {
          'frozen-shoulder': 2,
          'rotator-cuff-tendinopathy': 2,
          'subacromional-impingement-syndrome': 2,
          'shoulder-bursa': 1,
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
          'cervical-radiculopathy': 0,
          'radicular-pain': 0,
          'radiculopathy': 0,
          'slap-tear': 0,
          'stiff-shoulder': 0,
          'labral-leason': 0,
          'rotator-cuff-tear': 0,
          'biceps-tendinopathy': 0,
          'biceps-tear-long-head': 0,
          'shoulder-dislocation': 0,
          'unstable-shoulder': 0
        }
      };
      
      setScores(mockScores);
      
      // Set shoulder questionnaire and go directly to follow-up stage
      setCurrentQuestionnaire(shoulderQuestionnaires.nociceptive);
      setStage(AssessmentStage.FollowUpQuestionnaire);
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

              // Sync pain areas to profile after creating assessment
              await syncPainAreasToProfile();
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
    
    // If this is the shoulder nociceptive questionnaire, handle completion and go to results
    if (currentQuestionnaire.id === 'shoulder-nociceptive') {
      console.log('💪 GeneralQuestionnaireHandler: Completing shoulder nociceptive questionnaire');
      
      // Determine primary differential based on answers
      let primaryDifferential: Differential = 'rotator-cuff-tendinopathy';
      
      // Simple differential logic based on common shoulder questionnaire patterns
      if (answers['night-pain-shoulder'] === 'yes') {
        primaryDifferential = 'frozen-shoulder';
      } else if (answers['overhead-activities'] === 'painful') {
        primaryDifferential = 'subacromional-impingement-syndrome';
      }
      
      setPrimaryDifferential(primaryDifferential);
      
      // Create assessment results for shoulder
      if (userInfo && scores) {
        const shoulderUserInfo = {
          ...userInfo,
          painArea: 'upper limb' as const,
          painSubArea: ['shoulder'] // Ensure shoulder is in sub area
        };
        
        const assessmentResults = createAssessmentResults(
          shoulderUserInfo,
          'nociceptive',
          'mid SIN',
          primaryDifferential,
          scores
        );
        
        console.log('✅ GeneralQuestionnaireHandler: Created shoulder nociceptive results:', assessmentResults);
        setResults(assessmentResults);
        
        // Store assessment
        if (user) {
          try {
            const painIntensity = answers['pain-intensity-shoulder'] || 5;
            
            if (!assessmentId) {
              const { data: assessmentData, error: assessmentError } = await supabase
                .from('user_assessments')
                .insert({
                  user_id: user.id,
                  pain_area: 'upper limb',
                  primary_mechanism: 'nociceptive',
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

                // Sync pain areas to profile after creating assessment
                await syncPainAreasToProfile();
              }
            }
          } catch (error) {
            console.error('Error storing shoulder questionnaire results:', error);
            toast({
              title: 'Chyba',
              description: 'Nepodarilo sa uložiť vaše odpovede.',
              variant: 'destructive'
            });
          }
        }
        
        setStage(AssessmentStage.Results);
        return;
      }
    }
    
    // Handle regular general questionnaire completion
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

            // Sync pain areas to profile after creating assessment
            await syncPainAreasToProfile();
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
