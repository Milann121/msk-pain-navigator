
import { isSameDay } from 'date-fns';
import { CompletionDay } from '@/hooks/useCompletionData';

export const getCompletionForDate = (date: Date, completionDays: CompletionDay[]): CompletionDay | undefined => {
  return completionDays.find(day => isSameDay(day.date, date));
};
