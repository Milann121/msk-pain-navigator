
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
  const [tempJobSubtype, setTempJobSubtype] = useState<string>('');

  const handleEdit = (field: string, currentValue: string | number) => {
    setEditingField(field);
    setTempValue(currentValue);
    if (field === 'job') {
      // Get the current job subtype from userData
      setTempJobSubtype(''); // This will need to be passed from parent component
    }
  };

  const handleSave = async (field: string) => {
    if (!user) return;

    try {
      let updateData: any = {};
      
      if (field === 'job') {
        updateData = {
          job: String(tempValue),
          job_subtype: tempJobSubtype
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

      // Update local state
      if (field === 'job') {
        updateUserData({
          job: String(tempValue),
          jobSubtype: tempJobSubtype
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
    setTempJobSubtype('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
    setTempJobSubtype('');
  };

  const setTempJobSubtypeFromParent = (jobSubtype: string) => {
    setTempJobSubtype(jobSubtype);
  };

  return {
    editingField,
    tempValue,
    tempJobSubtype,
    handleEdit,
    handleSave,
    handleCancel,
    setTempValue,
    setTempJobSubtype: setTempJobSubtypeFromParent
  };
};
