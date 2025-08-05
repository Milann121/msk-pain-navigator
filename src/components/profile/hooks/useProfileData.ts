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
    yearOfBirth: null,
    departmentId: '',
    jobType: '',
    jobProperties: [],
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
          yearOfBirth: data.year_birth || null,
          departmentId: data.department_id || '',
          jobType: data.job_type || '',
          jobProperties: Array.isArray(data.job_properties) 
            ? [...new Set(data.job_properties.map(prop => 
                // Clean up escaped quotes and special characters
                prop ? prop.replace(/['"\\]/g, '').trim() : ''
              ).filter(prop => prop && prop !== ''))] 
            : (data.job_properties 
              ? [...new Set(data.job_properties.split(',').map(p => 
                  // Clean up escaped quotes and special characters
                  p ? p.replace(/['"\\]/g, '').trim() : ''
                ).filter(p => p !== ''))] 
              : []),
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
        // No profile found, try to populate from B2B employee data
        await populateFromB2BData();
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const populateFromB2BData = async () => {
    if (!user?.email) return;

    try {
      // Check b2b_employees table first
      let { data: b2bEmployee } = await supabase
        .from('b2b_employees')
        .select('first_name, last_name, b2b_partner_name')
        .eq('email', user.email)
        .single();

      // If not found in b2b_employees, check test_2_employees
      if (!b2bEmployee) {
        const { data: testEmployee } = await supabase
          .from('test_2_employees')
          .select('first_name, last_name, b2b_partner_name')
          .eq('email', user.email)
          .single();
        
        b2bEmployee = testEmployee;
      }

      if (b2bEmployee) {
        const profileData = {
          firstName: b2bEmployee.first_name || user.user_metadata?.first_name || 'Používateľ',
          lastName: b2bEmployee.last_name || '',
          email: user.email || '',
          employerName: b2bEmployee.b2b_partner_name || ''
        };

        // Update local state
        setUserData(prev => ({
          ...prev,
          ...profileData
        }));

        // Save B2B data to user_profiles table for consistency
        try {
          const { error: saveError } = await supabase
            .from('user_profiles')
            .upsert({
              user_id: user.id,
              first_name: profileData.firstName,
              last_name: profileData.lastName,
              email: profileData.email,
              b2b_partner_name: profileData.employerName
            }, { onConflict: 'user_id' });

          if (saveError) {
            console.error('Error saving B2B data to user_profiles:', saveError);
          } else {
            console.log('Successfully saved B2B data to user_profiles');
          }
        } catch (saveError) {
          console.error('Error during B2B data save:', saveError);
        }
      } else {
        // No B2B data found, use defaults
        const defaultData = {
          firstName: user.user_metadata?.first_name || 'Používateľ',
          email: user.email || ''
        };

        setUserData(prev => ({
          ...prev,
          ...defaultData
        }));

        // Save default data to user_profiles
        try {
          const { error: saveError } = await supabase
            .from('user_profiles')
            .upsert({
              user_id: user.id,
              first_name: defaultData.firstName,
              email: defaultData.email
            }, { onConflict: 'user_id' });

          if (saveError) {
            console.error('Error saving default data to user_profiles:', saveError);
          }
        } catch (saveError) {
          console.error('Error during default data save:', saveError);
        }
      }
    } catch (error) {
      console.error('Error populating from B2B data:', error);
      // Fallback to defaults
      const fallbackData = {
        firstName: user.user_metadata?.first_name || 'Používateľ',
        email: user.email || ''
      };

      setUserData(prev => ({
        ...prev,
        ...fallbackData
      }));
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
          .from('test_2_employees')
          .select('b2b_partner_name, employee_id, state')
          .eq('email', user.email)
          .single();

        if (!testError && testData) {
          record = { entry: testData as any, table: 'test_2_employees' };
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
          employerName: (record.entry as any).b2b_partner_name || '',
          employeeId: (record.entry as any).employee_id || '',
          state: (record.entry as any).state || 'inactive',
          sourceTable: record.table
        });

        if ((record.entry as any).state === 'inactive') {
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
        if (targetTable === 'test_2_employees') {
          const { error: updateError } = await supabase
            .from('test_2_employees')
            .update({ state: 'active' })
            .eq('email', user.email);
          if (updateError) {
            console.error('Error updating B2B employee state:', updateError);
          }
        } else {
          const { error: updateError } = await supabase
            .from('b2b_employees')
            .update({ state: 'active' })
            .eq('email', user.email);
          if (updateError) {
            console.error('Error updating B2B employee state:', updateError);
          }
        }

        
        console.log('B2B employee state updated to active');
        // Update local state
        setB2bData(prev => ({ ...prev, state: 'active' }));
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
