
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserGreetingProps {
  firstName: string;
}

export const UserGreeting = ({ firstName }: UserGreetingProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold">
        {t('home.greeting.hello', { name: firstName ? `${firstName},` : '' })}
      </div>
      <div className="text-xl font-medium mb-4">
        {t('home.greeting.question')}
      </div>
    </div>
  );
};
