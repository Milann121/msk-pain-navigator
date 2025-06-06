
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
        className={`flex flex-col items-center p-3 h-auto bg-green-100 border-green-300 ${selectedDateMood === 'happy' ? 'border-green-500 ring-2 ring-green-200' : 'hover:border-green-400'}`}
      >
        <span className="text-3xl mb-1">😊</span>
        <span className="text-sm">Dobre</span>
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => onMoodSelection('neutral')}
        disabled={loading}
        className={`flex flex-col items-center p-3 h-auto bg-yellow-100 border-yellow-300 ${selectedDateMood === 'neutral' ? 'border-yellow-500 ring-2 ring-yellow-200' : 'hover:border-yellow-400'}`}
      >
        <span className="text-3xl mb-1">😐</span>
        <span className="text-sm">Neutrálne</span>
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => onMoodSelection('sad')}
        disabled={loading}
        className={`flex flex-col items-center p-3 h-auto bg-red-100 border-red-300 ${selectedDateMood === 'sad' ? 'border-red-500 ring-2 ring-red-200' : 'hover:border-red-400'}`}
      >
        <span className="text-3xl mb-1">😔</span>
        <span className="text-sm">Zle</span>
      </Button>
    </div>
  );
};
