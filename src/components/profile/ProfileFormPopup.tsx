
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { ProfileFormPersonalInfo } from './ProfileFormPersonalInfo';
import { ProfileFormJobSelection } from './ProfileFormJobSelection';
import { ProfileFormGoals } from './ProfileFormGoals';
import { ProfileFormButtons } from './ProfileFormButtons';

interface ProfileFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSaved?: () => void;
  initialGoals?: {
    weeklyExerciseGoal: number | null;
    weeklyBlogGoal: number | null;
  };
  onGoalsChange?: (goals: { weeklyExerciseGoal: number | null; weeklyBlogGoal: number | null }) => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  gender: string;
  age: number | '';
  job: string;
  jobSubtype: string;
}

interface GoalsData {
  weeklyExerciseGoal: number | null;
  weeklyBlogGoal: number | null;
}

export const ProfileFormPopup: React.FC<ProfileFormPopupProps> = ({
  isOpen,
  onClose,
  onProfileSaved,
  initialGoals,
  onGoalsChange
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    gender: 'Muž',
    age: '',
    job: '',
    jobSubtype: ''
  });
  
  const [goalsData, setGoalsData] = useState<GoalsData>({
    weeklyExerciseGoal: null,
    weeklyBlogGoal: null
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen && user) {
      setProfileData({
        firstName: user.user_metadata?.first_name || '',
        lastName: '',
        gender: 'Muž',
        age: '',
        job: '',
        jobSubtype: ''
      });
      setGoalsData({
        weeklyExerciseGoal: initialGoals?.weeklyExerciseGoal || null,
        weeklyBlogGoal: initialGoals?.weeklyBlogGoal || null
      });
    }
  }, [isOpen, user, initialGoals]);

  // Notify parent component when goals change
  useEffect(() => {
    if (onGoalsChange) {
      onGoalsChange(goalsData);
    }
  }, [goalsData, onGoalsChange]);

  const handleInputChange = (field: keyof ProfileData, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJobChange = (value: string) => {
    setProfileData(prev => ({
      ...prev,
      job: value,
      jobSubtype: '' // Reset subtype when job changes
    }));
  };

  const handleGoalChange = (field: keyof GoalsData, value: number | null) => {
    setGoalsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveGoalToDatabase = async (goalType: 'weekly_exercise' | 'weekly_blog', value: number) => {
    if (!user) return;

    try {
      // First, check if a goal of this type already exists for the user
      const { data: existingGoal, error: selectError } = await supabase
        .from('user_goals')
        .select('id')
        .eq('user_id', user.id)
        .eq('goal_type', goalType)
        .maybeSingle();

      if (selectError) throw selectError;

      if (existingGoal) {
        // Update existing goal
        const { error: updateError } = await supabase
          .from('user_goals')
          .update({
            goal_value: value,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingGoal.id);

        if (updateError) throw updateError;
      } else {
        // Insert new goal
        const { error: insertError } = await supabase
          .from('user_goals')
          .insert({
            user_id: user.id,
            goal_type: goalType,
            goal_value: value
          });

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Save profile data
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          gender: profileData.gender,
          age: profileData.age === '' ? null : Number(profileData.age),
          job: profileData.job,
          job_subtype: profileData.jobSubtype
        });

      if (profileError) throw profileError;

      // Save goals if they were set
      if (goalsData.weeklyExerciseGoal !== null) {
        await saveGoalToDatabase('weekly_exercise', goalsData.weeklyExerciseGoal);
      }
      
      if (goalsData.weeklyBlogGoal !== null) {
        await saveGoalToDatabase('weekly_blog', goalsData.weeklyBlogGoal);
      }

      toast({
        title: t('profile.goals.successTitle'),
        description: t('profile.profileForm.success'),
      });

      onProfileSaved?.();
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: t('profile.goals.errorTitle'),
        description: t('profile.profileForm.error'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipGoals = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Save only profile data without goals
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          gender: profileData.gender,
          age: profileData.age === '' ? null : Number(profileData.age),
          job: profileData.job,
          job_subtype: profileData.jobSubtype
        });

      if (profileError) throw profileError;

      toast({
        title: t('profile.goals.successTitle'),
        description: t('profile.profileForm.success'),
      });

      onProfileSaved?.();
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: t('profile.goals.errorTitle'),
        description: t('profile.profileForm.error'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if all required profile fields are filled
  const isProfileValid = profileData.firstName.trim() !== '' && 
                        profileData.lastName.trim() !== '' && 
                        profileData.age !== '' && 
                        profileData.job.trim() !== '';

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('profile.profileForm.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Personal Information Section */}
          <ProfileFormPersonalInfo
            data={{
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              gender: profileData.gender,
              age: profileData.age
            }}
            onChange={handleInputChange}
          />

          {/* Job Selection Section */}
          <ProfileFormJobSelection
            data={{
              job: profileData.job,
              jobSubtype: profileData.jobSubtype
            }}
            onJobChange={handleJobChange}
            onSubtypeChange={handleInputChange}
          />

          {/* Goals Section */}
          <ProfileFormGoals
            data={goalsData}
            onChange={handleGoalChange}
          />

          {/* Form Buttons */}
          <ProfileFormButtons
            isLoading={isLoading}
            isProfileValid={isProfileValid}
            onSkip={handleSkipGoals}
            onSave={handleSave}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
