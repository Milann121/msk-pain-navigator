
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ImportantNotice = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <h3 className="font-semibold text-amber-800 mb-2">{t('importantNotice.title')}</h3>
      <p className="text-amber-700">
        {t('importantNotice.text')}
      </p>
    </div>
  );
};
