import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProfileFormPersonalInfo } from './ProfileFormPersonalInfo';
import { ProfileFormJobSection } from './ProfileFormJobSection';
import { ProfileFormGoals } from './ProfileFormGoals';
import { ProfileFormButtons } from './ProfileFormButtons';
import { LanguageSelector } from './LanguageSelector';
import therapyImage from '@/assets/receptionImage.png';

interface ProfileFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSaved?: () => void;
  initialGoals?: {
    weeklyExerciseGoal: number | null;
    weeklyBlogGoal: number | null;
  };
  onGoalsChange?: (goals: {
    weeklyExerciseGoal: number | null;
    weeklyBlogGoal: number | null;
  }) => void;
}
interface ProfileData {
  firstName: string;
  lastName: string;
  gender: 'Muž' | 'Žena' | '';
  yearOfBirth: string | null;
  departmentId: string;
  jobType: string;
  jobProperties: string[];
  defaultLanguage: string;
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
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    gender: '',
    yearOfBirth: null,
    departmentId: '',
    jobType: '',
    jobProperties: [],
    defaultLanguage: 'sk'
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
  const [departments, setDepartments] = useState<Array<{
    id: string;
    department_name: string;
  }>>([]);

  // Load B2B employee data if user email matches
  useEffect(() => {
    const loadB2BEmployeeData = async () => {
      if (!user?.email) return;
      try {
        console.log('Loading B2B employee data for email:', user.email);

        // Load departments first
        const {
          data: deptData
        } = await supabase.from('company_departments').select('id, department_name').order('department_name');
        setDepartments(deptData || []);
        const {
          data,
          error
        } = await supabase.from('b2b_employees').select('b2b_partner_name, employee_id, b2b_partner_id').eq('email', user.email).single();
        let record = data ? {
          entry: data,
          table: 'b2b_employees'
        } : null;
        if ((!data || error?.code === 'PGRST116') && !error) {
          const {
            data: testData,
            error: testError
          } = await supabase.from('test_2_employees').select('b2b_partner_name, employee_id, b2b_partner_id').eq('email', user.email).single();
          if (!testError && testData) {
            record = {
              entry: testData as any,
              table: 'test_2_employees'
            };
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

  // Reset form when dialog opens and load existing profile data
  useEffect(() => {
    if (isOpen && user) {
      loadExistingProfileData();
      setGoalsData({
        weeklyExerciseGoal: initialGoals?.weeklyExerciseGoal || null,
        weeklyBlogGoal: initialGoals?.weeklyBlogGoal || null
      });
    }
  }, [isOpen, user, initialGoals]);
  const loadExistingProfileData = async () => {
    if (!user) return;
    try {
      const {
        data,
        error
      } = await supabase.from('user_profiles').select('*').eq('user_id', user.id).single();
      if (data) {
        console.log('Loading existing profile data:', data);
        setProfileData({
          firstName: data.first_name || user.user_metadata?.first_name || '',
          lastName: data.last_name || '',
          gender: data.gender as 'Muž' | 'Žena' || 'Muž',
          yearOfBirth: data.year_birth ? String(data.year_birth) : null,
          departmentId: data.department_id || '',
          jobType: data.job_type || '',
          jobProperties: Array.isArray(data.job_properties) ? data.job_properties : data.job_properties ? data.job_properties.split(',').map(p => p.trim()) : [],
          defaultLanguage: data.default_language || 'sk'
        });
      } else {
        // No existing profile, use defaults
        setProfileData({
          firstName: user.user_metadata?.first_name || '',
          lastName: '',
          gender: 'Muž',
          yearOfBirth: null,
          departmentId: '',
          jobType: '',
          jobProperties: [],
          defaultLanguage: 'sk'
        });
      }
    } catch (error) {
      console.error('Error loading existing profile data:', error);
      // Fallback to defaults
      setProfileData({
        firstName: user.user_metadata?.first_name || '',
        lastName: '',
        gender: 'Muž',
        yearOfBirth: null,
        departmentId: '',
        jobType: '',
        jobProperties: [],
        defaultLanguage: 'sk'
      });
    }
  };

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
  const handleJobSectionChange = (field: keyof Pick<ProfileData, 'departmentId' | 'jobType' | 'jobProperties'>, value: string | string[]) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
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
      console.log('Saving goal to database:', {
        goalType,
        value,
        userId: user.id
      });

      // First, check if a goal of this type already exists for the user
      const {
        data: existingGoal,
        error: selectError
      } = await supabase.from('user_goals').select('id').eq('user_id', user.id).eq('goal_type', goalType).maybeSingle();
      if (selectError) {
        console.error('Error checking existing goal:', selectError);
        throw selectError;
      }
      if (existingGoal) {
        // Update existing goal
        const {
          error: updateError
        } = await supabase.from('user_goals').update({
          goal_value: value,
          updated_at: new Date().toISOString()
        }).eq('id', existingGoal.id);
        if (updateError) {
          console.error('Error updating goal:', updateError);
          throw updateError;
        }
        console.log('Goal updated successfully');
      } else {
        // Insert new goal
        const {
          error: insertError
        } = await supabase.from('user_goals').insert({
          user_id: user.id,
          goal_type: goalType,
          weekly_exercises_goal: value
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
      const {
        data: assessments,
        error: assessmentsError
      } = await supabase.from('user_assessments').select('id, pain_area, program_ended_at').eq('user_id', user.id).is('program_ended_at', null); // Only active programs

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
      const {
        error: updateError
      } = await supabase.from('user_profiles').update({
        pain_area: painAreas.join(', ') || null
      }).eq('user_id', user.id);
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
    console.log('🚀 [ProfileFormPopup] Starting profile save process');
    console.log('📊 [ProfileFormPopup] Form data:', {
      profileData,
      goalsData,
      b2bEmployeeData,
      yearOfBirthValue: profileData.yearOfBirth,
      yearOfBirthType: typeof profileData.yearOfBirth
    });

    // Validate required personal fields before saving
    if (!profileData.firstName.trim()) {
      console.error('❌ [ProfileFormPopup] First name is required');
      toast({
        title: t('profile.goals.errorTitle'),
        description: 'First name is required',
        variant: 'destructive'
      });
      return;
    }
    if (!profileData.lastName.trim()) {
      console.error('❌ [ProfileFormPopup] Last name is required');
      toast({
        title: t('profile.goals.errorTitle'),
        description: 'Last name is required',
        variant: 'destructive'
      });
      return;
    }
    if (!profileData.gender) {
      console.error('❌ [ProfileFormPopup] Gender is required');
      toast({
        title: t('profile.goals.errorTitle'),
        description: 'Gender is required',
        variant: 'destructive'
      });
      return;
    }
    if (!profileData.yearOfBirth || profileData.yearOfBirth === '') {
      console.error('❌ [ProfileFormPopup] Year of birth is required');
      toast({
        title: t('profile.goals.errorTitle'),
        description: 'Year of birth is required',
        variant: 'destructive'
      });
      return;
    }
    if (!profileData.departmentId) {
      console.error('❌ [ProfileFormPopup] Department is required');
      toast({
        title: t('profile.goals.errorTitle'),
        description: 'Department is required',
        variant: 'destructive'
      });
      return;
    }
    if (!profileData.defaultLanguage) {
      console.error('❌ [ProfileFormPopup] Default language is required');
      toast({
        title: t('profile.goals.errorTitle'),
        description: 'Default language is required',
        variant: 'destructive'
      });
      return;
    }
    if (isNaN(Number(profileData.yearOfBirth)) || Number(profileData.yearOfBirth) < 1900 || Number(profileData.yearOfBirth) > new Date().getFullYear()) {
      toast({
        title: t('profile.goals.errorTitle'),
        description: `Please enter a valid year between 1900 and ${new Date().getFullYear()}`,
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      // Prepare profile data with proper year_birth conversion
      const yearBirthValue = !profileData.yearOfBirth || profileData.yearOfBirth === '' ? null : Number(profileData.yearOfBirth);
      const profileUpdateData = {
        user_id: user.id,
        first_name: profileData.firstName.trim(),
        last_name: profileData.lastName.trim(),
        email: user.email,
        gender: profileData.gender,
        year_birth: yearBirthValue,
        department_id: profileData.departmentId || null,
        job_type: profileData.jobType || null,
        job_properties: profileData.jobProperties.length > 0 ? profileData.jobProperties.join(',') : null,
        default_language: profileData.defaultLanguage,
        b2b_partner_name: b2bEmployeeData?.employerName || null,
        b2b_partner_id: b2bEmployeeData?.b2bPartnerId || null,
        employee_id: b2bEmployeeData?.employeeId || null
      };
      const {
        data: savedData,
        error: profileError
      } = await supabase.from('user_profiles').upsert(profileUpdateData, {
        onConflict: 'user_id'
      }).select();
      if (profileError) {
        console.error('❌ [ProfileFormPopup] Database error saving profile:', profileError);
        throw profileError;
      }

      // Verify the year_birth was saved correctly
      const {
        data: verifyData
      } = await supabase.from('user_profiles').select('year_birth').eq('user_id', user.id).single();
      if (verifyData && yearBirthValue !== null && verifyData.year_birth !== yearBirthValue) {
        throw new Error('Year of birth was not saved correctly');
      }

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
        if (b2bEmployeeData.sourceTable === 'test_2_employees') {
          const { error: b2bUpdateError } = await supabase.rpc('update_test2_employee_contact', {
            _b2b_partner_name: b2bEmployeeData.employerName,
            _employee_id: b2bEmployeeData.employeeId,
            _email: user.email,
            _user_id: user.id,
          });
          if (b2bUpdateError) {
            console.error('Error updating B2B employee state:', b2bUpdateError);
            // Don't throw error here as the main profile save was successful
          } else {
            console.log('B2B employee state updated to active');
          }
        } else {
          const { error: b2bUpdateError } = await supabase.rpc('update_b2b_employee_contact', {
            _b2b_partner_name: b2bEmployeeData.employerName,
            _employee_id: b2bEmployeeData.employeeId,
            _email: user.email,
            _user_id: user.id,
          });
          if (b2bUpdateError) {
            console.error('Error updating B2B employee state:', b2bUpdateError);
            // Don't throw error here as the main profile save was successful
          } else {
            console.log('B2B employee state updated to active');
          }
        }
      }
      toast({
        title: t('profile.goals.successTitle'),
        description: t('profile.profileForm.success')
      });
      console.log('🎉 [ProfileFormPopup] Profile save process completed successfully');
      onProfileSaved?.();
      onClose();
      navigate('/profile');
    } catch (error) {
      console.error('❌ [ProfileFormPopup] Error in profile save process:', error);
      toast({
        title: t('profile.goals.errorTitle'),
        description: t('profile.profileForm.error'),
        variant: 'destructive'
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
        email: user.email,
        // Always ensure email is saved
        gender: profileData.gender,
        // Ensure gender is saved
        year_birth: !profileData.yearOfBirth || profileData.yearOfBirth === '' ? null : Number(profileData.yearOfBirth),
        department_id: profileData.departmentId || null,
        // Save department ID
        job_type: profileData.jobType || null,
        job_properties: profileData.jobProperties.length > 0 ? profileData.jobProperties.join(',') : null,
        default_language: profileData.defaultLanguage,
        // Save default language
        b2b_partner_name: b2bEmployeeData?.employerName || null,
        b2b_partner_id: b2bEmployeeData?.b2bPartnerId || null,
        employee_id: b2bEmployeeData?.employeeId || null
      };
      console.log('Saving profile data (skip goals):', profileUpdateData);
      const {
        error: profileError
      } = await supabase.from('user_profiles').upsert(profileUpdateData, {
        onConflict: 'user_id'
      });
      if (profileError) {
        console.error('Error saving profile:', profileError);
        throw profileError;
      }

      // Update pain areas from current active assessments
      await updatePainAreasFromAssessments();

      // If this is a B2B employee, update their state to active
      if (b2bEmployeeData && user.email) {
        console.log('Updating B2B employee state to active (skip goals)');
        if (b2bEmployeeData.sourceTable === 'test_2_employees') {
          const { error: b2bUpdateError } = await supabase.rpc('update_test2_employee_contact', {
            _b2b_partner_name: b2bEmployeeData.employerName,
            _employee_id: b2bEmployeeData.employeeId,
            _email: user.email,
            _user_id: user.id,
          });
          if (b2bUpdateError) {
            console.error('Error updating B2B employee state:', b2bUpdateError);
            // Don't throw error here as the main profile save was successful
          } else {
            console.log('B2B employee state updated to active (skip goals)');
          }
        } else {
          const { error: b2bUpdateError } = await supabase.rpc('update_b2b_employee_contact', {
            _b2b_partner_name: b2bEmployeeData.employerName,
            _employee_id: b2bEmployeeData.employeeId,
            _email: user.email,
            _user_id: user.id,
          });
          if (b2bUpdateError) {
            console.error('Error updating B2B employee state:', b2bUpdateError);
            // Don't throw error here as the main profile save was successful
          } else {
            console.log('B2B employee state updated to active (skip goals)');
          }
        }
      }
      toast({
        title: t('profile.goals.successTitle'),
        description: t('profile.profileForm.success')
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
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if all required personal fields are filled (for post-signup)
  const isProfileValid = profileData.firstName.trim() !== '' && profileData.lastName.trim() !== '' && profileData.gender !== '' && profileData.yearOfBirth && profileData.yearOfBirth !== '' && Number(profileData.yearOfBirth) > 0 && profileData.departmentId !== '' && profileData.defaultLanguage !== '';
  console.log('Profile validation state:', {
    firstName: profileData.firstName.trim() !== '',
    lastName: profileData.lastName.trim() !== '',
    gender: profileData.gender !== '',
    yearOfBirth: profileData.yearOfBirth && profileData.yearOfBirth !== '' && Number(profileData.yearOfBirth) > 0,
    departmentId: profileData.departmentId !== '',
    defaultLanguage: profileData.defaultLanguage !== '',
    isValid: isProfileValid
  });
  return <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold">{t('profile.profileForm.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Therapy Illustration Image - Full Width Banner */}
          <div className="w-full mb-6 -mx-6 -mt-4">
            <img src={therapyImage} alt="Therapy illustration" className="w-full h-48 object-cover" />
          </div>

          {/* Show B2B Employee Info if applicable */}
          {b2bEmployeeData && <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="text-sm text-blue-800 mb-2 font-semibold">
                Informácie o zamestnávateľovi
              </h3>
              <p className="text-sm text-blue-700">
                <strong>{t('profile.employerName')}:</strong> {b2bEmployeeData.employerName}
              </p>
              <p className="text-sm text-blue-700">
                <strong>{t('profile.employeeId')}:</strong> {b2bEmployeeData.employeeId}
              </p>
            </div>}

          {/* Language Selection - moved above Personal Information */}
          <LanguageSelector selectedLanguage={profileData.defaultLanguage} onLanguageChange={language => handleInputChange('defaultLanguage', language)} showAsRequired={true} label={t('profile.defaultLanguage')} />

          {/* Personal Information Section */}
          <ProfileFormPersonalInfo data={{
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          gender: profileData.gender,
          yearOfBirth: profileData.yearOfBirth
        }} onChange={handleInputChange} />

          {/* Job Section */}
          <ProfileFormJobSection data={{
          departmentId: profileData.departmentId,
          jobType: profileData.jobType,
          jobProperties: profileData.jobProperties
        }} onChange={handleJobSectionChange} />

          {/* Goals Section */}
          <ProfileFormGoals data={goalsData} onChange={handleGoalChange} />

          {/* Form Buttons */}
          <ProfileFormButtons isLoading={isLoading} isProfileValid={isProfileValid} onSkip={handleSkipGoals} onSave={handleSave} />
        </div>
      </DialogContent>
    </Dialog>;
};