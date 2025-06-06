
import React from 'react';
import { Button } from '@/components/ui/button';

interface MoodSelectorProps {
  selectedDateMood: 'happy' | 'neutral' | 'sad' | null;
  onMoodSelection: (mood: 'happy' | 'neutral' | 'sad') => void;
  loading: boolean;
  currentDayAndDate: string;
}

export const MoodSelector = ({ 
  selectedDateMood, 
  onMoodSelection, 
  loading 
}: MoodSelectorProps) => {
  return (
    <div className="flex justify-around items-center mb-6">
      <Button 
        variant="outline" 
        onClick={() => onMoodSelection('happy')}
        disabled={loading}
        className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'happy' ? 'bg-green-100 border-green-500' : ''}`}
      >
        <span className="text-4xl mb-2">😊</span>
        <span>Dobre</span>
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => onMoodSelection('neutral')}
        disabled={loading}
        className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'neutral' ? 'bg-yellow-100 border-yellow-500' : ''}`}
      >
        <span className="text-4xl mb-2">😐</span>
        <span>Neutrálne</span>
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => onMoodSelection('sad')}
        disabled={loading}
        className={`flex flex-col items-center p-4 h-auto ${selectedDateMood === 'sad' ? 'bg-red-100 border-red-500' : ''}`}
      >
        <span className="text-4xl mb-2">😔</span>
        <span>Zle</span>
      </Button>
    </div>
  );
};
