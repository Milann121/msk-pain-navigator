
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserGreetingProps {
  firstName: string;
}

export const UserGreeting = ({ firstName }: UserGreetingProps) => {
  const { t } = useTranslation();
  
  // Construct the name part - if firstName exists, add comma, otherwise empty string
  const nameWithComma = firstName ? `${firstName},` : '';
  
  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold">
        {t('home.greeting.hello', { name: nameWithComma })}
      </div>
      <div className="text-xl font-medium mb-4">
        {t('home.greeting.question')}
      </div>
    </div>
  );
};
