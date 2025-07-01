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
  const [b2bEmployeeData, setB2bEmployeeData] = useState<{
    employerName: string;
    employeeId: string;
  } | null>(null);

  // Load B2B employee data if user email matches
  useEffect(() => {
    const loadB2BEmployeeData = async () => {
      if (!user?.email) return;

      try {
        const { data, error } = await supabase
          .from('b2b_employees')
          .select('b2b_partner_name, employee_id')
          .eq('email', user.email)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading B2B employee data:', error);
          return;
        }

        if (data) {
          setB2bEmployeeData({
            employerName: data.b2b_partner_name || '',
            employeeId: data.employee_id || ''
          });
        }
      } catch (error) {
        console.error('Error loading B2B employee data:', error);
      }
    };

    if (isOpen && user) {
      loadB2BEmployeeData();
    }
  }, [isOpen, user]);

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

  const updateB2BEmployeeState = async () => {
    if (!user?.email) return;

    try {
      // Update B2B employee state to active when they complete their profile
      const { error } = await supabase
        .from('b2b_employees')
        .update({ state: 'active' })
        .eq('email', user.email);

      if (error) {
        console.error('Error updating B2B employee state:', error);
      } else {
        console.log('B2B employee state updated to active');
      }
    } catch (error) {
      console.error('Error updating B2B employee state:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Save profile data with employer name if B2B employee
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          gender: profileData.gender,
          age: profileData.age === '' ? null : Number(profileData.age),
          job: profileData.job,
          job_subtype: profileData.jobSubtype,
          employer_name: b2bEmployeeData?.employerName || null
        });

      if (profileError) throw profileError;

      // Save goals if they were set
      if (goalsData.weeklyExerciseGoal !== null) {
        await saveGoalToDatabase('weekly_exercise', goalsData.weeklyExerciseGoal);
      }
      
      if (goalsData.weeklyBlogGoal !== null) {
        await saveGoalToDatabase('weekly_blog', goalsData.weeklyBlogGoal);
      }

      // Update B2B employee state to active if applicable
      await updateB2BEmployeeState();

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
          job_subtype: profileData.jobSubtype,
          employer_name: b2bEmployeeData?.employerName || null
        });

      if (profileError) throw profileError;

      // Update B2B employee state to active if applicable
      await updateB2BEmployeeState();

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
          {/* Show B2B Employee Info if applicable */}
          {b2bEmployeeData && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                {t('profile.employerInfo')}
              </h3>
              <p className="text-sm text-blue-700">
                <strong>{t('profile.employerName')}:</strong> {b2bEmployeeData.employerName}
              </p>
              <p className="text-sm text-blue-700">
                <strong>{t('profile.employeeId')}:</strong> {b2bEmployeeData.employeeId}
              </p>
            </div>
          )}

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
