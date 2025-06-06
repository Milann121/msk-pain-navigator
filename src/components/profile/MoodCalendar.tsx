
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface MoodEntry {
  date: Date;
  mood: 'happy' | 'neutral' | 'sad';
}

export const MoodCalendar = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [firstName, setFirstName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
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

  // Load mood entries from database
  useEffect(() => {
    const loadMoodEntries = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          const entries: MoodEntry[] = data.map(entry => ({
            date: new Date(entry.mood_date),
            mood: entry.mood_type as 'happy' | 'neutral' | 'sad'
          }));
          setMoodEntries(entries);
        }
      } catch (error) {
        console.error('Error loading mood entries:', error);
      }
    };

    loadMoodEntries();
  }, [user]);
  
  const handleMoodSelection = async (mood: 'happy' | 'neutral' | 'sad') => {
    if (!user || loading) return;

    setLoading(true);
    const selectedDate = date;
    const dateKey = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const formattedDate = format(dateKey, 'yyyy-MM-dd');
    
    try {
      // Check if we already have an entry for the selected date
      const existingEntryIndex = moodEntries.findIndex(
        entry => format(entry.date, 'yyyy-MM-dd') === formattedDate
      );
      
      if (existingEntryIndex >= 0) {
        // Update existing entry in database
        const { error } = await supabase
          .from('mood_entries')
          .update({ mood_type: mood })
          .eq('user_id', user.id)
          .eq('mood_date', formattedDate);

        if (error) throw error;

        // Update local state
        const updatedEntries = [...moodEntries];
        updatedEntries[existingEntryIndex] = { date: dateKey, mood };
        setMoodEntries(updatedEntries);
      } else {
        // Insert new entry in database
        const { error } = await supabase
          .from('mood_entries')
          .insert({
            user_id: user.id,
            mood_date: formattedDate,
            mood_type: mood
          });

        if (error) throw error;

        // Add to local state
        setMoodEntries([...moodEntries, { date: dateKey, mood }]);
      }
    } catch (error) {
      console.error('Error saving mood entry:', error);
    } finally {
      setLoading(false);
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
  
  // Get current day and date
  const today = new Date();
  const currentDayAndDate = format(today, 'EEEE, dd.MM.yyyy', { locale: sk });
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              Ahoj {firstName ? `${firstName},` : ''}
            </div>
            <div className="text-xl font-medium mb-4">
              ako sa dnes cítiš?
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4 mt-2">
              {currentDayAndDate}
            </h3>
            <div className="flex justify-around items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => handleMoodSelection('happy')}
                disabled={loading}
                className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'happy' ? 'bg-green-100 border-green-500' : ''}`}
              >
                <span className="text-4xl mb-2">😊</span>
                <span>Dobre</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleMoodSelection('neutral')}
                disabled={loading}
                className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'neutral' ? 'bg-yellow-100 border-yellow-500' : ''}`}
              >
                <span className="text-4xl mb-2">😐</span>
                <span>Neutrálne</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleMoodSelection('sad')}
                disabled={loading}
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
      </CardContent>
    </Card>
  );
};
