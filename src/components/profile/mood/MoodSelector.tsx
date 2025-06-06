
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
        className={`flex flex-col items-center p-4 h-20 w-20 ${selectedDateMood === 'happy' ? 'bg-green-100 border-green-500 ring-2 ring-green-300' : 'hover:bg-green-50'}`}
      >
        <span className="text-3xl mb-1">😊</span>
        <span className="text-xs">Dobre</span>
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => onMoodSelection('neutral')}
        disabled={loading}
        className={`flex flex-col items-center p-4 h-20 w-20 ${selectedDateMood === 'neutral' ? 'bg-yellow-100 border-yellow-500 ring-2 ring-yellow-300' : 'hover:bg-yellow-50'}`}
      >
        <span className="text-3xl mb-1">😐</span>
        <span className="text-xs">Neutrálne</span>
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => onMoodSelection('sad')}
        disabled={loading}
        className={`flex flex-col items-center p-4 h-20 w-20 ${selectedDateMood === 'sad' ? 'bg-red-100 border-red-500 ring-2 ring-red-300' : 'hover:bg-red-50'}`}
      >
        <span className="text-3xl mb-1">😔</span>
        <span className="text-xs">Zle</span>
      </Button>
    </div>
  );
};
