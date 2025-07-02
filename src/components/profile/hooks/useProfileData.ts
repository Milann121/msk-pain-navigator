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
    painArea: '',
    employerName: ''
  });

  const [b2bData, setB2bData] = useState<B2BEmployeeData>({
    employerName: '',
    employeeId: '',
    state: 'inactive',
    sourceTable: undefined
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

      if (data) {
        setUserData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || user.email || '',
          gender: data.gender || 'Muž',
          age: data.age || 30,
          job: data.job || '',
          jobSubtype: data.job_subtype || '',
          painArea: data.pain_area || '',
          employerName: data.b2b_partner_name || ''
        });

        // If profile exists but email is missing, update it
        if (!data.email && user.email) {
          await supabase
            .from('user_profiles')
            .update({ email: user.email })
            .eq('user_id', user.id);
        }
      } else {
        // No profile found, use defaults with user metadata and ensure email is set
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

  const loadB2BEmployeeData = async () => {
    if (!user?.email) return;

    try {
      const { data, error } = await supabase
        .from('b2b_employees')
        .select('b2b_partner_name, employee_id, state')
        .eq('email', user.email)
        .single();

      let record = data ? { entry: data, table: 'b2b_employees' } : null;

      if ((!data || error?.code === 'PGRST116') && !error) {
        const { data: testData, error: testError } = await supabase
          .from('test_2_employees' as any)
          .select('b2b_partner_name, employee_id, state')
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
        setB2bData({
          employerName: record.entry.b2b_partner_name || '',
          employeeId: record.entry.employee_id || '',
          state: record.entry.state || 'inactive',
          sourceTable: record.table
        });

        if (record.entry.state === 'inactive') {
          await checkAndUpdateB2BEmployeeState(record.table);
        }
      }
    } catch (error) {
      console.error('Error loading B2B employee data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAndUpdateB2BEmployeeState = async (table?: string) => {
    if (!user?.email) return;

    try {
      // Check if user has a profile (meaning they've completed registration)
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      // If user has a profile, update B2B employee state to active
      if (profileData && !profileError) {
        const targetTable = table || b2bData.sourceTable || 'b2b_employees';
        const { error: updateError } = await supabase
          .from(targetTable as any)
          .update({ state: 'active' })
          .eq('email', user.email);

        if (updateError) {
          console.error('Error updating B2B employee state:', updateError);
        } else {
          console.log('B2B employee state updated to active');
          // Update local state
          setB2bData(prev => ({ ...prev, state: 'active' }));
        }
      }
    } catch (error) {
      console.error('Error checking and updating B2B employee state:', error);
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
    refreshUserData: loadUserProfile,
    user
  };
};
