
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThreeBodyViewer from '@/components/ThreeBodyViewer';
import { useTranslation } from 'react-i18next';

export const BodyModel = () => {
  const { t } = useTranslation();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('profile.modelTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="h-64 w-48 relative">
          <ThreeBodyViewer />
        </div>
      </CardContent>
    </Card>
  );
};
