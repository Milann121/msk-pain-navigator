import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, CheckCircle, ChevronRight } from 'lucide-react';
import { OrebroReminderBanner } from './OrebroReminderBanner';
interface OrebroCollapsedViewProps {
  onExpand: () => void;
  lastCompletionDate: Date | null;
  showReminder: boolean;
}
export const OrebroCollapsedView = ({
  onExpand,
  lastCompletionDate,
  showReminder
}: OrebroCollapsedViewProps) => {
  const {
    t
  } = useTranslation();
  return <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 h-full">
      <CardContent className="pt-4 pb-4">
        <OrebroReminderBanner lastCompletionDate={lastCompletionDate} showReminder={showReminder} />
        <div className="flex items-center gap-4 cursor-pointer" onClick={onExpand}>
          <div className="flex-shrink-0">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 my-[10px] text-xl">
              {t('home.orebro.title')}
              <CheckCircle className="h-4 w-4 text-green-600" />
            </h3>
          </div>
          
          <ChevronRight className="h-5 w-5 text-gray-500 my-[10px]" />
        </div>
      </CardContent>
    </Card>;
};