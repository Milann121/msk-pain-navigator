
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ImportantNotice = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg my-[22px]">
      <p className="text-amber-700">
        {t('exerciseDisclaimer')}
      </p>
    </div>
  );
};
