
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AssessmentResults } from '@/utils/types';

interface SaveResultsManagerProps {
  results: AssessmentResults;
  assessmentId?: string | null;
  assessmentSaved: boolean;
  setAssessmentSaved: (saved: boolean) => void;
}

const SaveResultsManager = ({ 
  results, 
  assessmentId, 
  assessmentSaved,
  setAssessmentSaved
}: SaveResultsManagerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const { userInfo, primaryMechanism, sinGroup, primaryDifferential } = results;

  const saveResultsToDatabase = async () => {
    // Skip saving if we already have an assessment ID or if it's already saved
    if (!user || assessmentSaved || assessmentId) return;
    
    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('user_assessments')
        .insert([
          { 
            user_id: user.id,
            primary_mechanism: primaryMechanism,
            sin_group: sinGroup,
            primary_differential: primaryDifferential,
            pain_area: userInfo.painArea
          }
        ]);
        
      if (error) throw error;
      
      setAssessmentSaved(true);
      toast({
        title: t('results.savedTitle'),
        description: t('results.savedDescription'),
      });
    } catch (error) {
      console.error('Error saving results:', error);
      toast({
        title: t('results.saveErrorTitle'),
        description: t('results.saveErrorDescription'),
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Only save results if no assessment ID was provided and not already saved
  useEffect(() => {
    if (user && !assessmentSaved && !isSaving && !assessmentId) {
      saveResultsToDatabase();
    } else if (assessmentId) {
      // If we already have an assessment ID, mark as saved
      setAssessmentSaved(true);
    }
  }, [user, assessmentId]);

  if (!user) {
    return null;
  }

  return (
    <p className="mt-2">
      {assessmentSaved ?
        t('results.autoSaved') :
        isSaving ?
          t('results.saving') :
          t('results.autoSaveFailed')}
    </p>
  );
};

export default SaveResultsManager;
