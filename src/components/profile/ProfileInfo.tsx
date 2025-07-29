
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfileData } from './hooks/useProfileData';
import { useProfileEditing } from './hooks/useProfileEditing';
import { B2BEmployeeSection } from './B2BEmployeeSection';
import { PersonalInfoSection } from './PersonalInfoSection';

export const ProfileInfo = () => {
  const { t } = useTranslation();
  const { userData, b2bData, isLoading, updateUserData, refreshUserData, user } = useProfileData();
  
  const {
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
  } = useProfileEditing(user, updateUserData, refreshUserData);

  // Enhanced handleEdit to set job data for job section
  const enhancedHandleEdit = (field: string, currentValue: string | number) => {
    handleEdit(field, currentValue);
    if (field === 'jobSection') {
      setTempDepartmentId(userData.departmentId);
      setTempJobType(userData.jobType);
      setTempJobProperties(userData.jobProperties);
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
            tempDepartmentId={tempDepartmentId}
            tempJobType={tempJobType}
            tempJobProperties={tempJobProperties}
            onEdit={enhancedHandleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onTempValueChange={setTempValue}
            onTempDepartmentChange={setTempDepartmentId}
            onTempJobTypeChange={setTempJobType}
            onTempJobPropertiesChange={setTempJobProperties}
            onDelete={handleDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
};
