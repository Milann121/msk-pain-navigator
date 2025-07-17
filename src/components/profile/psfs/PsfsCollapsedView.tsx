import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, CheckCircle } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface PsfsCollapsedViewProps {
  onExpand: () => void;
  onWrap: () => void;
  lastCompletionDate: Date | null;
  showReminder: boolean;
  otherExpanded: boolean;
}

export const PsfsCollapsedView = ({
  onExpand,
  onWrap,
  lastCompletionDate,
  showReminder,
  otherExpanded
}: PsfsCollapsedViewProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className={`mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 ${otherExpanded ? 'min-h-[60px]' : 'h-full min-h-[60px]'}`}>
      <CardContent className="pt-4 pb-4 h-full flex items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onExpand}>
          <div className="flex-shrink-0">
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 my-[10px] text-xl">
              {t('home.psfs.title')}
              <CheckCircle className="h-4 w-4 text-green-600" />
            </h3>
          </div>
          
          <button onClick={(e) => { e.stopPropagation(); onWrap(); }} className="text-gray-500 hover:text-gray-700 mr-2">
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <ChevronRight className="h-5 w-5 text-gray-500 my-[10px]" />
        </div>
      </CardContent>
    </Card>
  );
};