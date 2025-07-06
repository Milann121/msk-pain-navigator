
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
    console.log('🔄 [useProfileEditing] Current temp values:', {
      tempDepartmentId,
      tempJobType,
      tempJobProperties,
      tempValue
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

    try {
      let updateData: any = {};
      
      if (field === 'jobSection') {
        updateData = {
          department_id: tempDepartmentId || null, // Save department ID
          job_type: tempJobType || null,
          job_properties: tempJobProperties.length > 0 ? tempJobProperties : null
        };
        console.log('💾 [useProfileEditing] Job section update data:', updateData);
      } else {
        const dbField = field === 'firstName' ? 'first_name' : 
                       field === 'lastName' ? 'last_name' : 
                       field === 'painArea' ? 'pain_area' : field;
        updateData[dbField] = field === 'age' ? Number(tempValue) : String(tempValue);
        console.log('💾 [useProfileEditing] Other field update data:', updateData);
      }

      const finalData = {
        user_id: user.id,
        email: user.email, // Ensure email is always included
        ...updateData
      };
      
      console.log('💾 [useProfileEditing] Final data to save:', finalData);

      const { error } = await supabase
        .from('user_profiles')
        .upsert(finalData, { onConflict: 'user_id' });

      if (error) {
        console.error('❌ [useProfileEditing] Database save error:', error);
        throw error;
      }

      console.log('✅ [useProfileEditing] Successfully saved to database');
      
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
          [field]: field === 'age' ? Number(savedTempValue) : String(savedTempValue)
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
    setTempValue,
    setTempDepartmentId,
    setTempJobType,
    setTempJobProperties
  };
};
