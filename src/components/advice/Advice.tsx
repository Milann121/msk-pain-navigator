
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { advices, type Advice as AdviceType } from '@/data/Advices/advicesDatabase';

interface AdviceProps {
  adviceId: number;
}

export const Advice: React.FC<AdviceProps> = ({ adviceId }) => {
  const { t } = useTranslation();
  const advice = advices.find((a: AdviceType) => a.adviceId === adviceId);

  if (!advice) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="text-gray-500">
            <p className="font-medium">{t('advice.notFound')}</p>
            <p className="text-sm">{t('advice.notFoundDescription', { adviceId })}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'vysoká':
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      case 'stredná':
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100';
      case 'nízka':
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
    }
  };

  return (
    <Card className="border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {t(`advice.${advice.adviceTitle}`)}
            </CardTitle>
            {advice.adviceSubtitle && advice.adviceSubtitle.trim() && (
              <p className="text-sm text-gray-600 mt-1">{t(`advice.${advice.adviceSubtitle}`)}</p>
            )}
            {/* Rule inline on desktop */}
            {advice.adviceRule && (
              <div className="mt-2">
                <span className="text-sm font-medium text-blue-900">{t('advice.rule')}: </span>
                <span className="text-sm text-blue-800">{t(`advice.${advice.adviceRule}`)}</span>
              </div>
            )}
          </div>
          <Badge className={`${getPriorityColor(t(`advice.${advice.advicePriority}`))} font-medium`}>
            {t(`advice.${advice.advicePriority}`)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Mobile: Stack image and description vertically, Desktop: Keep horizontal layout */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm flex items-center justify-center">
              {advice.adviceImageUrl ? (
                <img
                  src={advice.adviceImageUrl}
                  alt={t(`advice.${advice.adviceTitle}`)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-medium">📋</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-gray-700 text-sm leading-relaxed">
              {t(`advice.${advice.adviceDescription}`)}
            </p>
          </div>
        </div>
        
        {advice.adviceLink && advice.adviceLink.trim() && (
          <div className="pt-2 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => window.open(advice.adviceLink, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {t('advice.moreInfo')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
