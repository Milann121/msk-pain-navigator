
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditableField } from './EditableField';
import { ReadOnlyField } from './ReadOnlyField';
import { GenderField } from './GenderField';
import { JobField } from './JobField';
import { supabase } from '@/integrations/supabase/client';

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  job: string;
  jobSubtype: string;
  painArea: string;
}

interface B2BEmployeeData {
  employerName: string;
  employeeId: string;
}

export const ProfileInfo = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  
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

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string | number>('');
  const [tempJobSubtype, setTempJobSubtype] = useState<string>('');
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

  const handleEdit = (field: string, currentValue: string | number) => {
    setEditingField(field);
    setTempValue(currentValue);
    if (field === 'job') {
      setTempJobSubtype(userData.jobSubtype);
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
          ...updateData
        });

      if (error) throw error;

      // Update local state
      if (field === 'job') {
        setUserData(prev => ({
          ...prev,
          job: String(tempValue),
          jobSubtype: tempJobSubtype
        }));
      } else {
        setUserData(prev => ({
          ...prev,
          [field]: field === 'age' ? Number(tempValue) : String(tempValue)
        }));
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

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t('profile.personalData')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">{t('loading')}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('profile.personalData')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* B2B Employee fields - Read only */}
          <div className="grid grid-cols-2 gap-4">
            <ReadOnlyField
              label={t('profile.employerName')}
              value={b2bData.employerName}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <ReadOnlyField
              label={t('profile.employeeId')}
              value={b2bData.employeeId}
            />
          </div>

          {/* Personal information fields */}
          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label={t('profile.firstName')}
              field="firstName"
              value={userData.firstName}
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label={t('profile.lastName')}
              field="lastName"
              value={userData.lastName}
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ReadOnlyField
              label={t('profile.email')}
              value={userData.email}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label={t('profile.age')}
              field="age"
              value={userData.age}
              type="number"
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <GenderField
              value={userData.gender}
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <JobField
              value={userData.job}
              jobSubtype={userData.jobSubtype}
              editingField={editingField}
              tempValue={tempValue}
              tempJobSubtype={tempJobSubtype}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
              onTempJobSubtypeChange={setTempJobSubtype}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <EditableField
              label={t('profile.painArea')}
              field="painArea"
              value={userData.painArea}
              editingField={editingField}
              tempValue={tempValue}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onTempValueChange={setTempValue}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
