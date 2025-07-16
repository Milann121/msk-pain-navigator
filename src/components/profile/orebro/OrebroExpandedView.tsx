import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { OrebroReminderBanner } from './OrebroReminderBanner';
interface OrebroExpandedViewProps {
  hasCompletedRecently: boolean;
  lastCompletionDate: Date | null;
  showReminder: boolean;
  onCollapse?: () => void;
  onTakeQuestionnaire: () => void;
  onViewResults: () => void;
}
export const OrebroExpandedView = ({
  hasCompletedRecently,
  lastCompletionDate,
  showReminder,
  onCollapse,
  onTakeQuestionnaire,
  onViewResults
}: OrebroExpandedViewProps) => {
  const {
    t
  } = useTranslation();
  return <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 h-full min-h-[280px]">
      <CardContent className="pt-6 flex flex-col h-full">
        <OrebroReminderBanner lastCompletionDate={lastCompletionDate} showReminder={showReminder} />
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-2xl">
                {t('home.orebro.title')}
              </h3>
              {hasCompletedRecently && <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  {onCollapse && <button onClick={onCollapse} className="ml-auto text-gray-500 hover:text-gray-700">
                      <ChevronDown className="h-5 w-5" />
                    </button>}
                </>}
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {hasCompletedRecently ? t('home.orebro.completedMessage', {
              date: lastCompletionDate ? format(lastCompletionDate, 'dd.MM.yyyy') : ''
            }) : showReminder ? t('home.orebro.reminderMessage') : t('home.orebro.description')}
            </p>

            <div className="flex items-center gap-3 mb-4">
              {!hasCompletedRecently && <Button onClick={onTakeQuestionnaire} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                  <Brain className="h-4 w-4 mr-2" />
                  {t('home.orebro.takeTest')}
                </Button>}
              
              {hasCompletedRecently && <Button onClick={onViewResults} className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                  Otvoriť výsledok
                </Button>}
              
              {showReminder && <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span>{t('home.orebro.reminderText')}</span>
                </div>}
            </div>

            <div className="mt-auto pt-3 text-xs text-gray-500 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{t('home.orebro.anonymous')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};