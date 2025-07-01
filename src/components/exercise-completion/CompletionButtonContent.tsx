
import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CompletionButtonContentProps {
  completionCount: number;
}

export const CompletionButtonContent = ({ completionCount }: CompletionButtonContentProps) => {
  const { t } = useTranslation();
  
  if (completionCount > 0) {
    return (
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4" />
        <span>{t('exercisePlan.completedToday', { count: completionCount })}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4" />
        <span>{t('exercisePlan.markCompleted')}</span>
      </div>
    );
  }
};
