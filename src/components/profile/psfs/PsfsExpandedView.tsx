import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
interface PsfsExpandedViewProps {
  hasCompletedRecently: boolean;
  lastCompletionDate: Date | null;
  showReminder: boolean;
  onCollapse?: () => void;
  onWrap: () => void;
  onTakeQuestionnaire: () => void;
  onViewResults: () => void;
  otherExpanded: boolean;
}
export const PsfsExpandedView = ({
  hasCompletedRecently,
  lastCompletionDate,
  showReminder,
  onCollapse,
  onWrap,
  onTakeQuestionnaire,
  onViewResults,
  otherExpanded
}: PsfsExpandedViewProps) => {
  const {
    t
  } = useTranslation();
  return <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 h-full">
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Activity className="h-8 w-8 text-green-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-xl">
                {t('home.psfs.title')}
              </h3>
              {hasCompletedRecently && <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </>}
              <div className="ml-auto flex items-center gap-2">
                <button onClick={onWrap} className="text-gray-500 hover:text-gray-700">
                  <ChevronRight className="h-5 w-5" />
                </button>
                {hasCompletedRecently && onCollapse && <button onClick={onCollapse} className="text-gray-500 hover:text-gray-700">
                    <ChevronDown className="h-5 w-5" />
                  </button>}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {hasCompletedRecently ? t('home.psfs.completedMessage', {
              date: lastCompletionDate ? format(lastCompletionDate, 'dd.MM.yyyy') : ''
            }) : t('home.psfs.description')}
            </p>

            <div className="flex items-center gap-3 mb-4">
              {!hasCompletedRecently && <Button onClick={onTakeQuestionnaire} className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  {t('home.psfs.takeTest')}
                </Button>}
              
              {hasCompletedRecently && <Button onClick={onViewResults} className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                  {t('home.psfs.viewResults')}
                </Button>}
            </div>

            <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{t('home.psfs.functionalAssessment')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};