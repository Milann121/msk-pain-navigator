
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface MoodEntry {
  date: Date;
  mood: 'happy' | 'neutral' | 'sad';
}

export const useMoodData = () => {
  const { user } = useAuth();
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

  const handleMoodSelection = async (mood: 'happy' | 'neutral' | 'sad', selectedDate: Date) => {
    if (!user || loading) return;

    setLoading(true);
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

  return {
    moodEntries,
    firstName,
    loading,
    handleMoodSelection,
    getMoodForDate
  };
};
