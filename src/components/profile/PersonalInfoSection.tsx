
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EditableField } from './EditableField';
import { ReadOnlyField } from './ReadOnlyField';
import { GenderField } from './GenderField';
import { JobSectionField } from './JobSectionField';
import { UserProfileData } from './UserProfileData';

interface PersonalInfoSectionProps {
  userData: UserProfileData;
  editingField: string | null;
  tempValue: string | number;
  tempDepartmentId: string;
  tempJobType: string;
  tempJobProperties: string[];
  onEdit: (field: string, currentValue: string | number) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  onTempValueChange: (value: string | number) => void;
  onTempDepartmentChange: (value: string) => void;
  onTempJobTypeChange: (value: string) => void;
  onTempJobPropertiesChange: (value: string[]) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  userData,
  editingField,
  tempValue,
  tempDepartmentId,
  tempJobType,
  tempJobProperties,
  onEdit,
  onSave,
  onCancel,
  onTempValueChange,
  onTempDepartmentChange,
  onTempJobTypeChange,
  onTempJobPropertiesChange
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Personal information fields */}
      <div className="grid grid-cols-2 gap-4">
        <EditableField
          label={t('profile.firstName')}
          field="firstName"
          value={userData.firstName}
          editingField={editingField}
          tempValue={tempValue}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onTempValueChange={onTempValueChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <EditableField
          label={t('profile.lastName')}
          field="lastName"
          value={userData.lastName}
          editingField={editingField}
          tempValue={tempValue}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onTempValueChange={onTempValueChange}
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
          label={t('profile.yearOfBirth')}
          field="yearOfBirth"
          value={userData.yearOfBirth}
          type="number"
          editingField={editingField}
          tempValue={tempValue}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onTempValueChange={onTempValueChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <GenderField
          value={userData.gender}
          editingField={editingField}
          tempValue={tempValue}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onTempValueChange={onTempValueChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <JobSectionField
          departmentId={userData.departmentId}
          jobType={userData.jobType}
          jobProperties={userData.jobProperties}
          editingField={editingField}
          tempDepartmentId={tempDepartmentId}
          tempJobType={tempJobType}
          tempJobProperties={tempJobProperties}
          onEdit={() => onEdit('jobSection', '')}
          onSave={() => onSave('jobSection')}
          onCancel={onCancel}
          onTempDepartmentChange={onTempDepartmentChange}
          onTempJobTypeChange={onTempJobTypeChange}
          onTempJobPropertiesChange={onTempJobPropertiesChange}
        />
      </div>
    </>
  );
};
