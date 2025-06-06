
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { UserGreeting } from './mood/UserGreeting';
import { MoodSelector } from './mood/MoodSelector';
import { MoodCalendarView } from './mood/MoodCalendarView';
import { useMoodData } from './mood/useMoodData';
import { MoneySavings } from './MoneySavings';

export const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { moodEntries, firstName, loading, handleMoodSelection, getMoodForDate } = useMoodData();

  // Get mood for the selected date
  const selectedDateMood = getMoodForDate(selectedDate);

  // Format current day and date
  const currentDayAndDate = format(selectedDate, 'EEEE, d. MMMM yyyy', { locale: sk });

  const onMoodSelect = (mood: 'happy' | 'neutral' | 'sad') => {
    handleMoodSelection(mood, selectedDate);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Denník nálady
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UserGreeting firstName={firstName} />
        <MoodSelector 
          selectedDateMood={selectedDateMood} 
          onMoodSelection={onMoodSelect}
          loading={loading}
          currentDayAndDate={currentDayAndDate}
        />
        
        {/* Add the MoneySavings component here */}
        <MoneySavings />
        
        <MoodCalendarView 
          date={selectedDate}
          onDateSelect={setSelectedDate}
          getMoodForDate={getMoodForDate}
        />
      </CardContent>
    </Card>
  );
};
