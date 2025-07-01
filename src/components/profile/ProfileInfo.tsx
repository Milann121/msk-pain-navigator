
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfileData } from './hooks/useProfileData';
import { useProfileEditing } from './hooks/useProfileEditing';
import { B2BEmployeeSection } from './B2BEmployeeSection';
import { PersonalInfoSection } from './PersonalInfoSection';

export const ProfileInfo = () => {
  const { t } = useTranslation();
  const { userData, b2bData, isLoading, updateUserData, user } = useProfileData();
  
  const {
    editingField,
    tempValue,
    tempJobSubtype,
    handleEdit,
    handleSave,
    handleCancel,
    setTempValue,
    setTempJobSubtype
  } = useProfileEditing(user, updateUserData);

  // Enhanced handleEdit to set job subtype for job field
  const enhancedHandleEdit = (field: string, currentValue: string | number) => {
    handleEdit(field, currentValue);
    if (field === 'job') {
      setTempJobSubtype(userData.jobSubtype);
    }
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
          <B2BEmployeeSection b2bData={b2bData} />
          
          <PersonalInfoSection
            userData={userData}
            editingField={editingField}
            tempValue={tempValue}
            tempJobSubtype={tempJobSubtype}
            onEdit={enhancedHandleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onTempValueChange={setTempValue}
            onTempJobSubtypeChange={setTempJobSubtype}
          />
        </div>
      </CardContent>
    </Card>
  );
};
