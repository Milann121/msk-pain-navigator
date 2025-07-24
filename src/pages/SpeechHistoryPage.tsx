import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { SpeechHistory } from '@/components/speech/SpeechHistory';

const SpeechHistoryPage = () => {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-background to-secondary/20 py-10 px-4 flex items-center justify-center">
          <div className="text-muted-foreground">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-background to-secondary/20 py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <SpeechHistory />
        </div>
      </div>
    </div>
  );
};

export default SpeechHistoryPage;