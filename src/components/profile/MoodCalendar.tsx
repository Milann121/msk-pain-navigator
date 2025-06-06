
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Heart } from 'lucide-react';
import { UserGreeting } from './mood/UserGreeting';
import { MoodSelector } from './mood/MoodSelector';
import { MoodCalendarView } from './mood/MoodCalendarView';
import { useMoodData } from './mood/useMoodData';
import { MoneySavings } from './MoneySavings';

export const MoodCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { moodDays, selectedMood, updateMood, loading } = useMoodData();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Denník nálady
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UserGreeting />
        <MoodSelector 
          selectedMood={selectedMood} 
          onMoodChange={updateMood}
          loading={loading}
        />
        
        {/* Add the MoneySavings component here */}
        <MoneySavings />
        
        <MoodCalendarView 
          moodDays={moodDays}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </CardContent>
    </Card>
  );
};
