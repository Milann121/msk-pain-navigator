
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
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
    b2bPartnerId: number | null;
    sourceTable: string;
  } | null>(null);

  // Load B2B employee data if user email matches
  useEffect(() => {
    const loadB2BEmployeeData = async () => {
      if (!user?.email) return;

      try {
        console.log('Loading B2B employee data for email:', user.email);
        const { data, error } = await supabase
          .from('b2b_employees')
          .select('b2b_partner_name, employee_id, b2b_partner_id')
          .eq('email', user.email)
          .single();

        let record = data ? { entry: data, table: 'b2b_employees' } : null;

        if ((!data || error?.code === 'PGRST116') && !error) {
          const { data: testData, error: testError } = await supabase
            .from('test_2_employees' as any)
            .select('b2b_partner_name, employee_id, b2b_partner_id')
            .eq('email', user.email)
            .single();

          if (!testError && testData) {
            record = { entry: testData, table: 'test_2_employees' };
          } else if (testError && testError.code !== 'PGRST116') {
            console.error('Error loading B2B employee data:', testError);
            return;
          }
        } else if (error && error.code !== 'PGRST116') {
          console.error('Error loading B2B employee data:', error);
          return;
        }

        if (record) {
          console.log('B2B employee data found:', record.entry);
          setB2bEmployeeData({
            employerName: record.entry.b2b_partner_name || '',
            employeeId: record.entry.employee_id || '',
            b2bPartnerId: record.entry.b2b_partner_id || null,
            sourceTable: record.table
          });
        } else {
          console.log('No B2B employee data found for user');
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
      console.log('Saving goal to database:', { goalType, value, userId: user.id });
      
      // First, check if a goal of this type already exists for the user
      const { data: existingGoal, error: selectError } = await supabase
        .from('user_goals')
        .select('id')
        .eq('user_id', user.id)
        .eq('goal_type', goalType)
        .maybeSingle();

      if (selectError) {
        console.error('Error checking existing goal:', selectError);
        throw selectError;
      }

      if (existingGoal) {
        // Update existing goal
        const { error: updateError } = await supabase
          .from('user_goals')
          .update({
            goal_value: value,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingGoal.id);

        if (updateError) {
          console.error('Error updating goal:', updateError);
          throw updateError;
        }
        console.log('Goal updated successfully');
      } else {
        // Insert new goal
        const { error: insertError } = await supabase
          .from('user_goals')
          .insert({
            user_id: user.id,
            goal_type: goalType,
            goal_value: value
          });

        if (insertError) {
          console.error('Error inserting goal:', insertError);
          throw insertError;
        }
        console.log('Goal inserted successfully');
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  };

  const updatePainAreasFromAssessments = async () => {
    if (!user) return;

    try {
      // Get all active assessments for the user
      const { data: assessments, error: assessmentsError } = await supabase
        .from('user_assessments')
        .select('id, pain_area, program_ended_at')
        .eq('user_id', user.id)
        .is('program_ended_at', null); // Only active programs

      if (assessmentsError) {
        console.error('Error fetching assessments:', assessmentsError);
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
        .update({
          pain_area: painAreas.join(', ') || null
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating pain areas in profile:', updateError);
      } else {
        console.log('Pain areas updated in profile:', painAreas);
      }

    } catch (error) {
      console.error('Error updating pain areas:', error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      console.error('No user found');
      return;
    }

    console.log('Starting profile save process', { profileData, goalsData, b2bEmployeeData });
    setIsLoading(true);
    // Immediately close the banner so the user returns to the profile page
    onClose();
    try {
      // Prepare profile data with B2B information if available AND ensure email is always saved
      const profileUpdateData = {
        user_id: user.id,
        first_name: profileData.firstName.trim(),
        last_name: profileData.lastName.trim(),
        email: user.email, // Always ensure email is saved
        gender: profileData.gender, // Ensure gender is saved
        age: profileData.age === '' ? null : Number(profileData.age),
        job: profileData.job,
        job_subtype: profileData.jobSubtype,
        b2b_partner_name: b2bEmployeeData?.employerName || null,
        b2b_partner_id: b2bEmployeeData?.b2bPartnerId || null,
        employee_id: b2bEmployeeData?.employeeId || null
      };

      console.log('Saving profile data:', profileUpdateData);

      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert(profileUpdateData, { onConflict: 'user_id' });

      if (profileError) {
        console.error('Error saving profile:', profileError);
        throw profileError;
      }

      console.log('Profile saved successfully');

      // Update pain areas from current active assessments
      await updatePainAreasFromAssessments();

      // Save goals if they were set
      const goalPromises = [];
      
      if (goalsData.weeklyExerciseGoal !== null && goalsData.weeklyExerciseGoal > 0) {
        goalPromises.push(saveGoalToDatabase('weekly_exercise', goalsData.weeklyExerciseGoal));
      }
      
      if (goalsData.weeklyBlogGoal !== null && goalsData.weeklyBlogGoal > 0) {
        goalPromises.push(saveGoalToDatabase('weekly_blog', goalsData.weeklyBlogGoal));
      }

      // Wait for all goals to be saved
      if (goalPromises.length > 0) {
        await Promise.all(goalPromises);
        console.log('All goals saved successfully');
      }

      // If this is a B2B employee, update their state to active
      if (b2bEmployeeData && user.email) {
        console.log('Updating B2B employee state to active');
        const { error: b2bUpdateError } = await supabase
          .from(b2bEmployeeData.sourceTable as any)
          .update({
            state: 'active',
            email: user.email // Ensure email is set
          })
          .eq('employee_id', b2bEmployeeData.employeeId)
          .eq('b2b_partner_name', b2bEmployeeData.employerName);

        if (b2bUpdateError) {
          console.error('Error updating B2B employee state:', b2bUpdateError);
          // Don't throw error here as the main profile save was successful
        } else {
          console.log('B2B employee state updated to active');
        }
      }

      toast({
        title: t('profile.goals.successTitle'),
        description: t('profile.profileForm.success'),
      });

      console.log('Profile save process completed successfully');
      onProfileSaved?.();
      onClose();
      navigate('/profile');
    } catch (error) {
      console.error('Error in profile save process:', error);
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

    console.log('Skipping goals, saving profile only');
    setIsLoading(true);
    // Close banner immediately when skipping
    onClose();
    try {
      // Save only profile data without goals AND ensure email is always saved
      const profileUpdateData = {
        user_id: user.id,
        first_name: profileData.firstName.trim(),
        last_name: profileData.lastName.trim(),
        email: user.email, // Always ensure email is saved
        gender: profileData.gender, // Ensure gender is saved
        age: profileData.age === '' ? null : Number(profileData.age),
        job: profileData.job,
        job_subtype: profileData.jobSubtype,
        b2b_partner_name: b2bEmployeeData?.employerName || null,
        b2b_partner_id: b2bEmployeeData?.b2bPartnerId || null,
        employee_id: b2bEmployeeData?.employeeId || null
      };

      console.log('Saving profile data (skip goals):', profileUpdateData);

      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert(profileUpdateData, { onConflict: 'user_id' });

      if (profileError) {
        console.error('Error saving profile:', profileError);
        throw profileError;
      }

      // Update pain areas from current active assessments
      await updatePainAreasFromAssessments();

      // If this is a B2B employee, update their state to active
      if (b2bEmployeeData && user.email) {
        console.log('Updating B2B employee state to active (skip goals)');
        const { error: b2bUpdateError } = await supabase
          .from(b2bEmployeeData.sourceTable as any)
          .update({
            state: 'active',
            email: user.email // Ensure email is set
          })
          .eq('employee_id', b2bEmployeeData.employeeId)
          .eq('b2b_partner_name', b2bEmployeeData.employerName);

        if (b2bUpdateError) {
          console.error('Error updating B2B employee state:', b2bUpdateError);
          // Don't throw error here as the main profile save was successful
        } else {
          console.log('B2B employee state updated to active (skip goals)');
        }
      }

      toast({
        title: t('profile.goals.successTitle'),
        description: t('profile.profileForm.success'),
      });

      console.log('Profile save process completed successfully (skip goals)');
      onProfileSaved?.();
      onClose();
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile (skip goals):', error);
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
                        Number(profileData.age) > 0 &&
                        profileData.job.trim() !== '';

  console.log('Profile validation state:', {
    firstName: profileData.firstName.trim() !== '',
    lastName: profileData.lastName.trim() !== '',
    age: profileData.age !== '' && Number(profileData.age) > 0,
    job: profileData.job.trim() !== '',
    isValid: isProfileValid
  });

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
                Informácie o zamestnávateľovi
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
