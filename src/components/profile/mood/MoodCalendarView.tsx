
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { sk } from 'date-fns/locale/sk';

interface MoodEntry {
  date: Date;
  mood: 'happy' | 'neutral' | 'sad';
}

interface MoodCalendarViewProps {
  date: Date;
  onDateSelect: (date: Date | undefined) => void;
  getMoodForDate: (date: Date) => 'happy' | 'neutral' | 'sad' | null;
}

export const MoodCalendarView = ({ date, onDateSelect, getMoodForDate }: MoodCalendarViewProps) => {
  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateSelect}
        locale={sk}
        className="w-full border rounded-md p-3"
        modifiers={{
          happy: (date) => getMoodForDate(date) === 'happy',
          neutral: (date) => getMoodForDate(date) === 'neutral',
          sad: (date) => getMoodForDate(date) === 'sad',
        }}
        modifiersClassNames={{
          happy: "bg-green-500 text-white hover:bg-green-600",
          neutral: "bg-yellow-500 text-white hover:bg-yellow-600",
          sad: "bg-red-500 text-white hover:bg-red-600",
        }}
      />
    </div>
  );
};
