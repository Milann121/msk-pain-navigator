
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfileData } from '../UserProfileData';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export const useProfileEditing = (
  user: any,
  updateUserData: (updatedData: Partial<UserProfileData>) => void,
  refreshUserData?: () => void
) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string | number>('');
  const [tempDepartmentId, setTempDepartmentId] = useState<string>('');
  const [tempJobType, setTempJobType] = useState<string>('');
  const [tempJobProperties, setTempJobProperties] = useState<string[]>([]);
  const [departments, setDepartments] = useState<Array<{id: string, department_name: string}>>([]);

  // Load departments when hook initializes
  useEffect(() => {
    const loadDepartments = async () => {
      if (!user) return;
      
      try {
        const { data: deptData } = await supabase
          .from('company_departments')
          .select('id, department_name')
          .order('department_name');
        
        setDepartments(deptData || []);
      } catch (error) {
        console.error('Error loading departments:', error);
      }
    };

    loadDepartments();
  }, [user]);

  const handleEdit = (field: string, currentValue: string | number) => {
    console.log('🔧 [useProfileEditing] Starting edit for field:', field, 'with value:', currentValue);
    
    setEditingField(field);
    setTempValue(currentValue);
    
    // Note: Job section temp values should be set by parent component via the setter functions
    // Don't reset them here as they need to be populated with current values
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

  const handleSave = async (field: string) => {
    if (!user) return;

    console.log('🔄 [useProfileEditing] Starting save for field:', field);

    // CRITICAL: Ensure user_profiles record exists before allowing edits
    try {
      const { data: existingProfile, error: checkError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (checkError && checkError.code === 'PGRST116') {
        console.log('⚠️ [useProfileEditing] No user_profiles record found, creating one first');
        
        // Create basic profile record first
        const { error: createError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            email: user.email,
            first_name: user.user_metadata?.first_name || 'User',
            updated_at: new Date().toISOString()
          });

        if (createError) {
          console.error('❌ [useProfileEditing] Failed to create profile record:', createError);
          toast({
            title: 'Error',
            description: 'Failed to create profile. Please try again.',
            variant: 'destructive',
          });
          return;
        }
        
        console.log('✅ [useProfileEditing] Created profile record successfully');
      }
    } catch (error) {
      console.error('❌ [useProfileEditing] Error checking profile existence:', error);
      return;
    }
    console.log('🔄 [useProfileEditing] Current temp values:', {
      tempDepartmentId,
      tempJobType,
      tempJobProperties,
      tempValue,
      tempValueType: typeof tempValue
    });
    
    // Add validation for job section
    if (field === 'jobSection') {
      console.log('🔄 [useProfileEditing] Validating job section data');
      if (!tempJobType) {
        console.error('❌ [useProfileEditing] Missing job type');
        toast({
          title: t('profile.error'),
          description: 'Job type is required',
          variant: 'destructive',
        });
        return;
      }
    }
    
    // Add validation for year of birth
    if (field === 'yearOfBirth') {
      const yearValue = Number(tempValue);
      const currentYear = new Date().getFullYear();
      
      if (tempValue && tempValue !== '' && (isNaN(yearValue) || yearValue < 1900 || yearValue > currentYear)) {
        toast({
          title: t('profile.error'),
          description: `Please enter a valid year between 1900 and ${currentYear}`,
          variant: 'destructive',
        });
        return;
      }
    }

    // Add validation for required fields
    if ((field === 'firstName' || field === 'lastName') && (!tempValue || String(tempValue).trim() === '')) {
      toast({
        title: t('profile.error'),
        description: `${field === 'firstName' ? 'First name' : 'Last name'} is required`,
        variant: 'destructive',
      });
      return;
    }

    try {
      let updateData: any = {};
      
      if (field === 'jobSection') {
        // More aggressive cleanup to prevent duplicates and normalize property names
        const cleanedJobProperties = tempJobProperties
          .filter(prop => prop && typeof prop === 'string') // Only keep non-empty strings
          .map(prop => prop.replace(/['"\\[\]]/g, '').trim()) // Remove quotes, brackets, backslashes
          .filter(prop => prop !== '') // Remove empty strings after cleanup
          .map(prop => prop.toLowerCase()) // Normalize case for comparison
          .filter((prop, index, array) => array.indexOf(prop) === index) // Remove duplicates by lowercased comparison
          .map(prop => {
            // Restore original casing - this is important for translations
            const originalCase = tempJobProperties.find(original => 
              original.replace(/['"\\[\]]/g, '').trim().toLowerCase() === prop
            );
            return originalCase ? originalCase.replace(/['"\\[\]]/g, '').trim() : prop;
          });
        
        updateData = {
          department_id: tempDepartmentId || null, // Save department ID
          job_type: tempJobType || null,
          job_properties: cleanedJobProperties.length > 0 ? cleanedJobProperties : null
        };
        console.log('💾 [useProfileEditing] Job section update data:', updateData);
      } else {
        const dbField = field === 'firstName' ? 'first_name' :
                       field === 'lastName' ? 'last_name' :
                       field === 'painArea' ? 'pain_area' :
                       field === 'yearOfBirth' ? 'year_birth' : field;
        
        // Handle year of birth conversion
        if (field === 'yearOfBirth') {
          updateData[dbField] = !tempValue || tempValue === '' ? null : Number(tempValue);
        } else {
          updateData[dbField] = String(tempValue);
        }
        console.log('💾 [useProfileEditing] Other field update data:', updateData);
      }

      const finalData = {
        user_id: user.id,
        email: user.email, // Ensure email is always included
        ...updateData
      };
      
      console.log('💾 [useProfileEditing] Final data to save:', finalData);

      // First, get existing profile data to preserve it
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Merge existing data with new data to prevent overwriting
      const mergedData = {
        ...existingProfile,
        ...finalData,
        updated_at: new Date().toISOString()
      };

      console.log('💾 [useProfileEditing] Merged data for save:', mergedData);

      const { data: savedData, error } = await supabase
        .from('user_profiles')
        .upsert(mergedData, { onConflict: 'user_id' })
        .select();

      if (error) {
        console.error('❌ [useProfileEditing] Database save error:', error);
        throw error;
      }

      console.log('✅ [useProfileEditing] Successfully saved to database, returned data:', savedData);
      
      // CRITICAL: Verify all saves in database to ensure data persistence
      const { data: verifyData, error: verifyError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (verifyError) {
        console.error('❌ [useProfileEditing] Failed to verify data save:', verifyError);
        throw new Error('Failed to verify data was saved');
      }

      console.log('✅ [useProfileEditing] Data verification successful:', verifyData);

      // Specific verification for critical fields
      if (field === 'yearOfBirth') {
        const expectedValue = !tempValue || tempValue === '' ? null : Number(tempValue);
        if (verifyData.year_birth !== expectedValue) {
          throw new Error(`Year of birth verification failed. Expected: ${expectedValue}, Got: ${verifyData.year_birth}`);
        }
      }

      if (field === 'firstName' && verifyData.first_name !== String(tempValue)) {
        throw new Error(`First name verification failed. Expected: ${tempValue}, Got: ${verifyData.first_name}`);
      }

      if (field === 'lastName' && verifyData.last_name !== String(tempValue)) {
        throw new Error(`Last name verification failed. Expected: ${tempValue}, Got: ${verifyData.last_name}`);
      }
      
      // Verify the save by querying the database
      if (field === 'jobSection') {
        const { data: verifyData, error: verifyError } = await supabase
          .from('user_profiles')
          .select('job_type, job_properties, department_id')
          .eq('user_id', user.id)
          .single();
          
        console.log('🔍 [useProfileEditing] Database verification query:', {
          verifyData,
          verifyError
        });
      }

      // Show success toast
      if (field === 'jobSection') {
        toast({
          title: t('profile.success'),
          description: t('profile.jobSection.updateSuccess'),
        });
      } else if (field === 'yearOfBirth') {
        toast({
          title: t('profile.success'),
          description: 'Year of birth updated successfully',
        });
      }

      // After any profile update, sync pain areas from active assessments
      await updatePainAreasFromAssessments();

      // Store temp values before clearing them
      const savedDepartmentId = tempDepartmentId;
      const savedJobType = tempJobType;
      const savedJobProperties = [...tempJobProperties];
      const savedTempValue = tempValue;

      // Clear editing state and temp values
      setEditingField(null);
      setTempValue('');
      setTempDepartmentId('');
      setTempJobType('');
      setTempJobProperties([]);

      // Update local state with saved values
      if (field === 'jobSection') {
        updateUserData({
          departmentId: savedDepartmentId,
          jobType: savedJobType,
          jobProperties: savedJobProperties
        });
      } else {
        updateUserData({
          [field]: field === 'yearOfBirth' ? Number(savedTempValue) : String(savedTempValue)
        });
      }

      // Refresh data from database to ensure consistency
      if (refreshUserData) {
        refreshUserData();
      }
    } catch (error) {
      console.error('❌ [useProfileEditing] Error saving profile:', error);
      
      // Show error toast
      toast({
        title: t('profile.error'),
        description: field === 'jobSection' 
          ? t('profile.jobSection.updateError')
          : t('profile.updateError'),
        variant: 'destructive',
      });
      
      // Clear editing state on error too
      setEditingField(null);
      setTempValue('');
      setTempDepartmentId('');
      setTempJobType('');
      setTempJobProperties([]);
    }
  };

  const handleDelete = async (field: string) => {
    if (!confirm(t('profile.confirmDelete', { field }))) {
      return;
    }

    try {
      let updateData: any = {};
      
      if (field === 'jobSection') {
        // Clear all job-related fields
        updateData = {
          department_id: null,
          job_type: null,
          job_properties: null
        };
      } else {
        // Map field names to database column names
        const fieldMapping: { [key: string]: string } = {
          firstName: 'first_name',
          lastName: 'last_name',
          gender: 'gender',
          yearOfBirth: 'year_birth'
        };
        
        const dbField = fieldMapping[field] || field;
        updateData[dbField] = null;
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert(
          { user_id: user.id, ...updateData },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error deleting field:', error);
        toast({
          title: t('profile.error'),
          description: t('profile.deleteError'),
          variant: 'destructive',
        });
        return;
      }

      // Update local data
      const updatedData: any = {};
      if (field === 'jobSection') {
        updatedData.departmentId = '';
        updatedData.jobType = '';
        updatedData.jobProperties = [];
      } else {
        updatedData[field] = '';
      }
      
      updateUserData(updatedData);
      
      toast({
        title: t('profile.success'),
        description: t('profile.deleteSuccess'),
      });

      // Reset editing state
      setEditingField(null);
      setTempValue('');
      setTempDepartmentId('');
      setTempJobType('');
      setTempJobProperties([]);
    } catch (error) {
      console.error('Error deleting field:', error);
      toast({
        title: t('profile.error'),
        description: t('profile.deleteError'),
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
    setTempDepartmentId('');
    setTempJobType('');
    setTempJobProperties([]);
  };

  return {
    editingField,
    tempValue,
    tempDepartmentId,
    tempJobType,
    tempJobProperties,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    setTempValue,
    setTempDepartmentId,
    setTempJobType,
    setTempJobProperties
  };
};
