
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReadOnlyField } from './ReadOnlyField';
import { B2BEmployeeData } from './UserProfileData';
import { Badge } from '@/components/ui/badge';

interface B2BEmployeeSectionProps {
  b2bData: B2BEmployeeData;
}

export const B2BEmployeeSection: React.FC<B2BEmployeeSectionProps> = ({ b2bData }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* B2B Employee fields - Read only */}
      <div className="grid grid-cols-2 gap-4">
        <ReadOnlyField
          label={t('profile.employerName')}
          value={b2bData.employerName}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t('profile.accountStatus')}
          </label>
          <div>
            <Badge 
              variant={b2bData.state === 'active' ? 'default' : 'secondary'}
              className={b2bData.state === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
            >
              {b2bData.state === 'active' ? t('profile.active') : t('profile.inactive')}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <ReadOnlyField
          label={t('profile.employeeId')}
          value={b2bData.employeeId}
        />
      </div>
    </>
  );
};
