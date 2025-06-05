
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BlogReadingStats } from './BlogReadingStats';

interface MoodEntry {
  date: Date;
  mood: 'happy' | 'neutral' | 'sad';
}

export const MoodCalendar = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [firstName, setFirstName] = useState<string>('');
  
  // Load user's first name from profile
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('first_name')
          .eq('user_id', user.id)
          .single();

        if (data && data.first_name) {
          setFirstName(data.first_name);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();
  }, [user]);
  
  const handleMoodSelection = (mood: 'happy' | 'neutral' | 'sad') => {
    // Use the selected date from the calendar instead of today
    const selectedDate = date;
    const dateKey = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    // Check if we already have an entry for the selected date
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
  };
  
  // Function to get mood for a specific date
  const getMoodForDate = (date: Date) => {
    const entry = moodEntries.find(
      entry => format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return entry?.mood || null;
  };
  
  // Get mood for the selected date (not just today)
  const selectedDateMood = getMoodForDate(date);
  
  // Generate dynamic header based on first name
  const headerTitle = firstName ? `${firstName}, ako sa dnes cítiš?` : 'Ako sa dnes cítiš?';
  
  // Get current day and date
  const today = new Date();
  const currentDayAndDate = format(today, 'EEEE, dd.MM.yyyy', { locale: sk });
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{headerTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {currentDayAndDate}
                </h3>
                <div className="flex justify-around items-center mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => handleMoodSelection('happy')}
                    className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'happy' ? 'bg-green-100 border-green-500' : ''}`}
                  >
                    <span className="text-4xl mb-2">😊</span>
                    <span>Dobre</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleMoodSelection('neutral')}
                    className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'neutral' ? 'bg-yellow-100 border-yellow-500' : ''}`}
                  >
                    <span className="text-4xl mb-2">😐</span>
                    <span>Neutrálne</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleMoodSelection('sad')}
                    className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'sad' ? 'bg-red-100 border-red-500' : ''}`}
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
                    happy: "bg-green-500 text-white hover:bg-green-600",
                    neutral: "bg-yellow-500 text-white hover:bg-yellow-600",
                    sad: "bg-red-500 text-white hover:bg-red-600",
                  }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <BlogReadingStats />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
