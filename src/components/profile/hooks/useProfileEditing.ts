
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfileData } from '../UserProfileData';

export const useProfileEditing = (
  user: any,
  updateUserData: (updatedData: Partial<UserProfileData>) => void,
  refreshUserData?: () => void
) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string | number>('');
  const [tempDepartmentId, setTempDepartmentId] = useState<string>('');
  const [tempJobType, setTempJobType] = useState<string>('');
  const [tempJobProperties, setTempJobProperties] = useState<string[]>([]);

  const handleEdit = (field: string, currentValue: string | number) => {
    setEditingField(field);
    setTempValue(currentValue);
    if (field === 'jobSection') {
      // Job section editing will be handled by parent component
      setTempDepartmentId('');
      setTempJobType('');
      setTempJobProperties([]);
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

  const handleSave = async (field: string) => {
    if (!user) return;

    try {
      let updateData: any = {};
      
      if (field === 'jobSection') {
        updateData = {
          department_id: tempDepartmentId || null,
          job_type: tempJobType || null,
          job_properties: tempJobProperties.length > 0 ? tempJobProperties : null
        };
      } else {
        const dbField = field === 'firstName' ? 'first_name' : 
                       field === 'lastName' ? 'last_name' : 
                       field === 'painArea' ? 'pain_area' : field;
        updateData[dbField] = field === 'age' ? Number(tempValue) : String(tempValue);
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          email: user.email, // Ensure email is always included
          ...updateData
        }, { onConflict: 'user_id' });

      if (error) throw error;

      // After any profile update, sync pain areas from active assessments
      await updatePainAreasFromAssessments();

      // Update local state
      if (field === 'jobSection') {
        updateUserData({
          departmentId: tempDepartmentId,
          jobType: tempJobType,
          jobProperties: tempJobProperties
        });
      } else {
        updateUserData({
          [field]: field === 'age' ? Number(tempValue) : String(tempValue)
        });
      }

      // Refresh data from database to ensure consistency
      if (refreshUserData) {
        refreshUserData();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }

    setEditingField(null);
    setTempValue('');
    setTempDepartmentId('');
    setTempJobType('');
    setTempJobProperties([]);
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
