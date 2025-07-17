import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface PsfsReminderBannerProps {
  lastCompletionDate: Date | null;
  showReminder: boolean;
}

export const PsfsReminderBanner = ({ lastCompletionDate, showReminder }: PsfsReminderBannerProps) => {
  const { t } = useTranslation();

  if (!showReminder) return null;

  return (
    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-center gap-2 text-amber-700">
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">
          {t('home.psfs.reminderMessage')}
        </span>
      </div>
      {lastCompletionDate && (
        <p className="text-xs text-amber-600 mt-1">
          {t('home.psfs.reminderText', {
            date: format(lastCompletionDate, 'dd.MM.yyyy')
          })}
        </p>
      )}
    </div>
  );
};