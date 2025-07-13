import React from 'react';
import { useTranslation } from 'react-i18next';

interface RepetitionsDisplayProps {
  repetitions: string;
}

export const RepetitionsDisplay: React.FC<RepetitionsDisplayProps> = ({ repetitions }) => {
  const { t } = useTranslation();
  
  return (
    <div className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20">
      {t('repetitions')}: {repetitions}
    </div>
  );
};