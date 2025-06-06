
import React, { useState } from 'react';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { Card, CardContent } from '@/components/ui/card';
import { UserGreeting } from './mood/UserGreeting';
import { MoodSelector } from './mood/MoodSelector';
import { MoodCalendarView } from './mood/MoodCalendarView';
import { MoneySavings } from './MoneySavings';
import { useMoodData } from './mood/useMoodData';

export const MoodCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { firstName, loading, handleMoodSelection, getMoodForDate } = useMoodData();
  
  // Get mood for the selected date
  const selectedDateMood = getMoodForDate(date);
  
  // Get current day and date
  const today = new Date();
  const currentDayAndDate = format(today, 'EEEE, dd.MM.yyyy', { locale: sk });
  
  return (
    <div className="mb-6">
      {/* Header above containers */}
      <div className="mb-4">
        <UserGreeting firstName={firstName} />
        <h3 className="text-lg font-medium">
          {currentDayAndDate}
        </h3>
      </div>

      {/* Two containers side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Container - Mood Calendar */}
        <Card>
          <CardContent className="pt-6">
            <MoodSelector
              selectedDateMood={selectedDateMood}
              onMoodSelection={(mood) => handleMoodSelection(mood, date)}
              loading={loading}
              currentDayAndDate={currentDayAndDate}
            />
            
            <MoodCalendarView
              date={date}
              onDateSelect={(date) => date && setDate(date)}
              getMoodForDate={getMoodForDate}
            />
          </CardContent>
        </Card>
        
        {/* Right Container - Money Savings */}
        <Card>
          <CardContent className="pt-6">
            <MoneySavings />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
