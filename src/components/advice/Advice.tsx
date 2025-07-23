
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
    const normalizedPriority = priority.toLowerCase();
    
    // High priority variants - RED
    if (normalizedPriority.includes('vysoká') || normalizedPriority.includes('vysoká') || normalizedPriority === 'high') {
      return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
    }
    
    // Medium priority variants - BLUE  
    if (normalizedPriority.includes('stredná') || normalizedPriority.includes('střední') || normalizedPriority === 'medium') {
      return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
    }
    
    // Low priority variants - YELLOW
    if (normalizedPriority.includes('nízka') || normalizedPriority.includes('nízká') || normalizedPriority === 'low') {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100';
    }
    
    return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
  };

  return (
    <Card data-advice-card className="h-full border-gray-200 hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-sm flex items-center justify-center">
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
          <Badge className={`${getPriorityColor(t(`advice.${advice.advicePriority}`))} font-medium text-xs`}>
            {t(`advice.${advice.advicePriority}`)}
          </Badge>
        </div>
        
        <div>
          <CardTitle className="text-base font-semibold text-gray-900 leading-tight">
            {t(`advice.${advice.adviceTitle}`)}
          </CardTitle>
          {advice.adviceSubtitle && advice.adviceSubtitle.trim() && (
            <p className="text-xs text-gray-600 mt-1">{t(`advice.${advice.adviceSubtitle}`)}</p>
          )}
          {advice.adviceRule && (
            <div className="mt-2">
              <span className="text-xs font-medium text-blue-900">{t('advice.rule')}: </span>
              <span className="text-xs text-blue-800">{t(`advice.${advice.adviceRule}`)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-gray-700 text-xs leading-relaxed">
            {t(`advice.${advice.adviceDescription}`)}
          </p>
        </div>
        
        {advice.adviceLink && advice.adviceLink.trim() && (
          <div className="pt-2 border-t border-gray-100 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs w-full"
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
