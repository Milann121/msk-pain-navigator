
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReadOnlyField } from './ReadOnlyField';
import { B2BEmployeeData } from './UserProfileData';

interface B2BEmployeeSectionProps {
  b2bData: B2BEmployeeData;
}

export const B2BEmployeeSection: React.FC<B2BEmployeeSectionProps> = ({ b2bData }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* B2B Employee fields - Always displayed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReadOnlyField
          label={t('profile.employerName')}
          value={b2bData.employerName || ''}
        />
        <ReadOnlyField
          label={t('profile.employeeId')}
          value={b2bData.employeeId || ''}
        />
      </div>
    </>
  );
};
