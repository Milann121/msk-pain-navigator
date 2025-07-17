import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface PsfsWrappedViewProps {
  onUnwrap: () => void;
}

export const PsfsWrappedView = ({ onUnwrap }: PsfsWrappedViewProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onUnwrap}>
          <div className="flex-shrink-0">
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-xl">
              {t('home.psfs.title')}
            </h3>
          </div>
          
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </div>
      </CardContent>
    </Card>
  );
};