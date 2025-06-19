
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useAssessment, AssessmentStage } from '@/contexts/AssessmentContext';
import { questionnaires } from '@/data/questionnaires';
import { upperLimbQuestionnaires } from '@/data/UpperLimb/questionnaires';
import Questionnaire from '@/components/Questionnaire';
import { processGeneralQuestionnaire } from '@/utils/assessmentAnalyzer';
import { supabase } from '@/integrations/supabase/client';
import { safeDatabase } from '@/utils/database-helpers';

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

  const getQuestionnaire = () => {
    if (userInfo?.painArea === 'upper limb') {
      return upperLimbQuestionnaires.general;
    }
    return questionnaires.general;
  };

  const handleGeneralQuestionnaireComplete = async (answers: Record<string, any>) => {
    setGeneralAnswers(answers);
    
    const { scores: newScores, primaryMechanism: newMechanism, sinGroup: newSinGroup } = 
      processGeneralQuestionnaire(answers);
    
    setScores(newScores);
    setPrimaryMechanism(newMechanism);
    setSINGroup(newSinGroup);
    
    // Store the general questionnaire results for later retrieval
    if (user && answers['pain-intensity'] !== undefined) {
      try {
        // Get pain intensity value from answers
        const painIntensity = answers['pain-intensity'] || answers['pain-intensity-upper-limb'];
        
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

          if (assessmentError) throw assessmentError;
          
          if (assessmentData?.id) {
            setAssessmentId(assessmentData.id);
            setAssessmentSaved(true);
            
            // Store the general questionnaire results
            const { error: questionnaireError } = await safeDatabase.generalQuestionnaire.insert({
              user_id: user.id,
              assessment_id: assessmentData.id,
              answers: answers
            });
              
            if (questionnaireError) throw questionnaireError;
            
            console.log('Successfully stored general questionnaire answers with pain intensity:', painIntensity);
          }
        }
      } catch (error) {
        console.error('Error storing general questionnaire results:', error);
        toast({
          title: 'Chyba',
          description: 'Nepodarilo sa uložiť vaše odpovede.',
          variant: 'destructive'
        });
      }
    }
    
    setStage(AssessmentStage.FollowUpQuestionnaire);
  };

  return (
    <Questionnaire
      questionnaire={getQuestionnaire()}
      onComplete={handleGeneralQuestionnaireComplete}
      onBack={handleRestart}
    />
  );
};

export default GeneralQuestionnaireHandler;
