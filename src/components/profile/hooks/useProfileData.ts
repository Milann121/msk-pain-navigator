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
    employerName: '',
    employeeId: ''
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
    }
  }, [user]);

  // Load B2B data after user profile is loaded
  useEffect(() => {
    if (user && userData.firstName) {
      loadB2BEmployeeData();
    }
  }, [user, userData.firstName]);

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
          employerName: data.b2b_partner_name || '',
          employeeId: data.employee_id || ''
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
      // First, check if B2B data is already in user_profiles (which should be the case after our enhanced verification)
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('b2b_partner_name, employee_id, b2b_partner_id')
        .eq('user_id', user.id)
        .single();

      if (!profileError && profileData && profileData.b2b_partner_name && profileData.employee_id) {
        console.log('✅ B2B data found in user_profiles:', profileData);
        setB2bData({
          employerName: profileData.b2b_partner_name || '',
          employeeId: profileData.employee_id || '',
          state: 'active', // If it's in user_profiles, it should be active
          sourceTable: 'user_profile'
        });
        setIsLoading(false);
        return;
      }

      console.log('🔍 B2B data not found in user_profiles, attempting to find and link employee record...');

      // If no B2B data in user_profiles, try to find by user's name and link the employee
      // Get user's name from existing profile or auth metadata
      const firstName = userData.firstName || user.user_metadata?.first_name || '';
      const lastName = userData.lastName || user.user_metadata?.last_name || '';

      if (firstName && lastName) {
        console.log('🔍 Attempting to find B2B employee by name:', { firstName, lastName });

        // Use the enhanced verification function to find employee by name
        const { data: verificationResult, error: verificationError } = await supabase.rpc('verify_employee_by_name_and_id', {
          _first_name: firstName,
          _last_name: lastName,
          _employee_id: '', // Search without specific employee ID
          _b2b_partner_name: '' // Search without specific company name
        });

        if (!verificationError && verificationResult && verificationResult.length > 0) {
          const employeeRecord = verificationResult[0];
          console.log('🏢 B2B employee found by name:', employeeRecord);
          
          // Link the employee to the user
          const { data: linkResult, error: linkError } = await supabase.rpc('link_verified_employee_to_user', {
            _employee_record_id: employeeRecord.employee_record_id,
            _source_table: employeeRecord.source_table,
            _user_id: user.id,
            _user_email: user.email
          });

          if (!linkError && linkResult) {
            console.log('🔗 Employee successfully linked to user');
            
            setB2bData({
              employerName: employeeRecord.b2b_partner_name || '',
              employeeId: employeeRecord.employee_id || '',
              state: 'active',
              sourceTable: employeeRecord.source_table
            });

            // Update user_profiles with B2B data
            await supabase
              .from('user_profiles')
              .upsert({
                user_id: user.id,
                email: user.email,
                first_name: firstName,
                last_name: lastName,
                b2b_partner_id: employeeRecord.b2b_partner_id,
                b2b_partner_name: employeeRecord.b2b_partner_name,
                employee_id: employeeRecord.employee_id,
                updated_at: new Date().toISOString()
              });
            
            console.log('✅ User profile updated with B2B data');
          } else {
            console.log('❌ Failed to link employee to user');
            setB2bData({
              employerName: '',
              employeeId: '',
              state: 'inactive',
              sourceTable: undefined
            });
          }
        } else {
          console.log('❌ No B2B employee found by name');
          setB2bData({
            employerName: '',
            employeeId: '',
            state: 'inactive',
            sourceTable: undefined
          });
        }
      } else {
        console.log('❌ Missing user name data for B2B employee lookup');
        setB2bData({
          employerName: '',
          employeeId: '',
          state: 'inactive',
          sourceTable: undefined
        });
      }
    } catch (error) {
      console.error('Error loading B2B employee data:', error);
      setB2bData({
        employerName: '',
        employeeId: '',
        state: 'inactive',
        sourceTable: undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  const syncB2BDataToUserProfiles = async (b2bData: any, sourceTable: string) => {
    if (!user?.email) return;

    try {
      console.log('🔄 Syncing B2B data to user_profiles:', b2bData);
      
      // Prepare user profile data from B2B data
      const profileData = {
        user_id: user.id,
        email: user.email,
        first_name: b2bData.first_name || '',
        last_name: b2bData.last_name || '',
        b2b_partner_name: b2bData.b2b_partner_name || '',
        employee_id: b2bData.employee_id || '',
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { onConflict: 'user_id' })
        .select()
        .single();

      if (error) {
        console.error('❌ Error syncing B2B data to user_profiles:', error);
        return;
      }

      console.log('✅ Successfully synced B2B data to user_profiles:', data);
      
      // Update local userData state with the synced data
      setUserData(prev => ({
        ...prev,
        firstName: data.first_name || prev.firstName,
        lastName: data.last_name || prev.lastName,
        email: data.email || prev.email,
        employerName: data.b2b_partner_name || prev.employerName,
        employeeId: data.employee_id
      }));

    } catch (error) {
      console.error('❌ Error in syncB2BDataToUserProfiles:', error);
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
          const { error: updateError } = await (supabase as any)
            .rpc('update_test2_employee_contact', {
              _b2b_partner_name: b2bData.employerName,
              _employee_id: b2bData.employeeId,
            });
          if (updateError) {
            console.error('Error updating B2B employee state:', updateError);
          }
        } else {
          const { error: updateError } = await (supabase as any)
            .rpc('update_b2b_employee_contact', {
              _b2b_partner_name: b2bData.employerName,
              _employee_id: b2bData.employeeId,
            });
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
