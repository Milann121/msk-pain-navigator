
import React, { useState } from 'react';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';

interface MoodEntry {
  date: Date;
  mood: 'happy' | 'neutral' | 'sad';
}

export const MoodCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  
  const handleMoodSelection = (mood: 'happy' | 'neutral' | 'sad') => {
    // Create a new date with just the year, month, and day to avoid time issues
    const today = new Date();
    const dateKey = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Check if we already have an entry for today
    const existingEntryIndex = moodEntries.findIndex(
      entry => format(entry.date, 'yyyy-MM-dd') === format(dateKey, 'yyyy-MM-dd')
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = { date: dateKey, mood };
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      setMoodEntries([...moodEntries, { date: dateKey, mood }]);
    }
    
    setCurrentMood(mood);
  };
  
  // Function to get mood for a specific date
  const getMoodForDate = (date: Date) => {
    const entry = moodEntries.find(
      entry => format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return entry?.mood || null;
  };
  
  // Get today's mood
  const todaysMood = getMoodForDate(new Date());
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Môj denník nálady</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Ako sa dnes cítite?</h3>
            <div className="flex justify-around items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => handleMoodSelection('happy')}
                className={`flex flex-col items-center p-4 h-auto ${todaysMood === 'happy' ? 'bg-green-100 border-green-500' : ''}`}
              >
                <span className="text-4xl mb-2">😊</span>
                <span>Dobre</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleMoodSelection('neutral')}
                className={`flex flex-col items-center p-4 h-auto ${todaysMood === 'neutral' ? 'bg-yellow-100 border-yellow-500' : ''}`}
              >
                <span className="text-4xl mb-2">😐</span>
                <span>Neutrálne</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleMoodSelection('sad')}
                className={`flex flex-col items-center p-4 h-auto ${todaysMood === 'sad' ? 'bg-red-100 border-red-500' : ''}`}
              >
                <span className="text-4xl mb-2">😔</span>
                <span>Zle</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Kalendár nálad</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              locale={sk}
              className="border rounded-md p-3"
              modifiers={{
                happy: (date) => getMoodForDate(date) === 'happy',
                neutral: (date) => getMoodForDate(date) === 'neutral',
                sad: (date) => getMoodForDate(date) === 'sad',
              }}
              modifiersClassNames={{
                happy: "bg-green-100 text-green-800",
                neutral: "bg-yellow-100 text-yellow-800",
                sad: "bg-red-100 text-red-800",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
