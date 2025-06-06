
import React, { useState } from 'react';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          <UserGreeting firstName={firstName} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <MoodSelector
              selectedDateMood={selectedDateMood}
              onMoodSelection={(mood) => handleMoodSelection(mood, date)}
              loading={loading}
              currentDayAndDate={currentDayAndDate}
            />
            
            <MoneySavings />
          </div>
          
          <MoodCalendarView
            date={date}
            onDateSelect={(date) => date && setDate(date)}
            getMoodForDate={getMoodForDate}
          />
        </div>
      </CardContent>
    </Card>
  );
};
