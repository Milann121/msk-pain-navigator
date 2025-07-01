
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EditableField } from './EditableField';
import { ReadOnlyField } from './ReadOnlyField';
import { GenderField } from './GenderField';
import { JobField } from './JobField';
import { UserProfileData } from './UserProfileData';

interface PersonalInfoSectionProps {
  userData: UserProfileData;
  editingField: string | null;
  tempValue: string | number;
  tempJobSubtype: string;
  onEdit: (field: string, currentValue: string | number) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  onTempValueChange: (value: string | number) => void;
  onTempJobSubtypeChange: (value: string) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  userData,
  editingField,
  tempValue,
  tempJobSubtype,
  onEdit,
  onSave,
  onCancel,
  onTempValueChange,
  onTempJobSubtypeChange
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
          label={t('profile.age')}
          field="age"
          value={userData.age}
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
        <JobField
          value={userData.job}
          jobSubtype={userData.jobSubtype}
          editingField={editingField}
          tempValue={tempValue}
          tempJobSubtype={tempJobSubtype}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onTempValueChange={onTempValueChange}
          onTempJobSubtypeChange={onTempJobSubtypeChange}
        />
      </div>
    </>
  );
};
