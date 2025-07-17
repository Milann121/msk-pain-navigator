import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, ChevronRight } from 'lucide-react';

interface OrebroWrappedViewProps {
  onUnwrap: () => void;
}

export const OrebroWrappedView = ({ onUnwrap }: OrebroWrappedViewProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onUnwrap}>
          <div className="flex-shrink-0">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-xl">
              {t('home.orebro.title')}
            </h3>
          </div>
          
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </div>
      </CardContent>
    </Card>
  );
};