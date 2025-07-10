import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertTriangle } from 'lucide-react';
import { format, differenceInMonths } from 'date-fns';

interface OrebroReminderBannerProps {
  lastCompletionDate: Date | null;
  showReminder: boolean;
}

export const OrebroReminderBanner = ({ 
  lastCompletionDate, 
  showReminder 
}: OrebroReminderBannerProps) => {
  const { t } = useTranslation();

  if (!showReminder) {
    return null;
  }

  const monthsSince = lastCompletionDate 
    ? differenceInMonths(new Date(), lastCompletionDate)
    : null;

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50 text-amber-800">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>
          {lastCompletionDate && monthsSince
            ? t('orebro.reminderWithDate', { 
                months: monthsSince,
                date: format(lastCompletionDate, 'dd.MM.yyyy')
              })
            : t('orebro.reminderFirstTime')
          }
        </span>
      </AlertDescription>
    </Alert>
  );
};