
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserProfileData, B2BEmployeeData } from '../UserProfileData';

export const useProfileData = () => {
  const { user } = useAuth();
  
  const [userData, setUserData] = useState<UserProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'Muž',
    age: 30,
    job: '',
    jobSubtype: '',
    painArea: ''
  });

  const [b2bData, setB2bData] = useState<B2BEmployeeData>({
    employerName: '',
    employeeId: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load user profile data from database
  useEffect(() => {
    if (user) {
      loadUserProfile();
      loadB2BEmployeeData();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      // Load active assessments to get all pain areas
      await updatePainAreasFromActiveAssessments();

      if (data) {
        setUserData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || user.email || '',
          gender: data.gender || 'Muž',
          age: data.age || 30,
          job: data.job || '',
          jobSubtype: data.job_subtype || '',
          painArea: data.pain_area || ''
        });
      } else {
        // No profile found, use defaults with user metadata
        setUserData(prev => ({
          ...prev,
          firstName: user.user_metadata?.first_name || 'Používateľ',
          email: user.email || ''
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const updatePainAreasFromActiveAssessments = async () => {
    if (!user) return;

    try {
      // Get all active assessments (not ended)
      const { data: activeAssessments, error } = await supabase
        .from('user_assessments')
        .select('pain_area')
        .eq('user_id', user.id)
        .is('program_ended_at', null);

      if (error) {
        console.error('Error loading active assessments:', error);
        return;
      }

      if (activeAssessments && activeAssessments.length > 1) {
        // If user has multiple active programs, collect all unique pain areas
        const uniquePainAreas = [...new Set(activeAssessments.map(assessment => assessment.pain_area))];
        const combinedPainAreas = uniquePainAreas.join(', ');

        // Update the user profile with combined pain areas
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ pain_area: combinedPainAreas })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating pain areas:', updateError);
        }
      } else if (activeAssessments && activeAssessments.length === 1) {
        // If user has only one active program, use that pain area
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ pain_area: activeAssessments[0].pain_area })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating pain area:', updateError);
        }
      }
    } catch (error) {
      console.error('Error updating pain areas from active assessments:', error);
    }
  };

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
        setB2bData({
          employerName: data.b2b_partner_name || '',
          employeeId: data.employee_id || ''
        });
      }
    } catch (error) {
      console.error('Error loading B2B employee data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = (updatedData: Partial<UserProfileData>) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
  };

  return {
    userData,
    b2bData,
    isLoading,
    updateUserData,
    user
  };
};
