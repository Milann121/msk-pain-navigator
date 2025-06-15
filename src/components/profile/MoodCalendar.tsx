import React, { useState } from 'react';
import { format, isAfter, isBefore, subDays, isSameDay } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { Card, CardContent } from '@/components/ui/card';
import { UserGreeting } from './mood/UserGreeting';
import { MoodSelector } from './mood/MoodSelector';
import { MoodCalendarView } from './mood/MoodCalendarView';
import { MoneySavings } from './MoneySavings';
import { GeneralProgram } from './GeneralProgram';
import { useMoodData } from './mood/useMoodData';

// Map mood string to value
const moodValueMap = {
  happy: 3, // "Dobre"
  neutral: 2, // "Neutrálne"
  sad: 1 // "Zle"
};

export const MoodCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { firstName, loading, handleMoodSelection, getMoodForDate, moodEntries } = useMoodData();
  
  // Get mood for the selected date
  const selectedDateMood = getMoodForDate(date);
  
  // Get current day and date
  const today = new Date();
  const currentDayAndDate = format(today, 'EEEE, dd.MM.yyyy', { locale: sk });

  // Utility: filter and map moods for a period
  const getMoodScoresForPeriod = (startDate: Date, endDate: Date) => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(subDays(endDate, i));
    }
    // Keep most recent first
    days.reverse();
    const scores = days.map(day => {
      const mood = getMoodForDate(day);
      return mood ? moodValueMap[mood] : null;
    });
    // Only include days with value
    return scores.filter((val): val is number => val != null);
  };

  // Calculate mood scores
  const last7DaysScores = getMoodScoresForPeriod(subDays(today, 6), today);
  const prev7DaysScores = getMoodScoresForPeriod(subDays(today, 13), subDays(today, 7));

  const average = (arr: number[]) =>
    arr.length > 0 ? arr.reduce((sum, n) => sum + n, 0) / arr.length : null;

  const moodScore = average(last7DaysScores);
  const prevMoodScore = average(prev7DaysScores);

  // Determine trend
  let trendColor = 'text-gray-500';
  let trendIcon = '—'; // Flat dash by default
  let description = 'Žiadna zmena';
  if (moodScore !== null && prevMoodScore !== null) {
    if (moodScore > prevMoodScore) {
      trendColor = 'text-green-600';
      trendIcon = '▲';
      description = 'Lepší trend za posledných 7 dní';
    } else if (moodScore < prevMoodScore) {
      trendColor = 'text-yellow-600';
      trendIcon = '▼';
      description = 'Zhoršený trend za posledných 7 dní';
    }
  }

  // Format score to 2 decimals or "-"
  const formatScore = (score: number | null) =>
    score != null ? score.toFixed(2) : '-';

  return (
    <div className="mb-6">
      {/* Header above containers */}
      <div className="mb-4">
        <UserGreeting firstName={firstName} />
        <h3 className="text-lg font-medium">
          {currentDayAndDate}
        </h3>
      </div>

      {/* Two containers side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Container - Mood Calendar */}
        <Card>
          <CardContent className="pt-6">
            <MoodSelector
              selectedDateMood={selectedDateMood}
              onMoodSelection={(mood) => handleMoodSelection(mood, date)}
              loading={loading}
              currentDayAndDate={currentDayAndDate}
            />
            
            <MoodCalendarView
              date={date}
              onDateSelect={(date) => date && setDate(date)}
              getMoodForDate={getMoodForDate}
            />
            {/* Mood Score/Status */}
            <div className="mt-6 w-full flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1">Priemerné skóre za 7 dní</div>
              <div className="flex items-center text-2xl font-bold space-x-2">
                <span>{formatScore(moodScore)}</span>
                <span className={`${trendColor}`}>{trendIcon}</span>
              </div>
              {moodScore !== null && prevMoodScore !== null && (
                <span className={`text-xs mt-1 ${trendColor}`}>{description}</span>
              )}
              {moodScore === null && (
                <span className="text-xs text-gray-400">(Nemáte záznamy pre posledných 7 dní)</span>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Right Column - Two stacked containers */}
        <div className="flex flex-col gap-6 h-full">
          {/* Top Container - General Program (1/3 height) */}
          <Card className="flex-[1]">
            <CardContent className="pt-6 h-full">
              <GeneralProgram />
            </CardContent>
          </Card>
          
          {/* Bottom Container - Money Savings (2/3 height) */}
          <Card className="flex-[2]">
            <CardContent className="pt-6 h-full flex items-center justify-center">
              <MoneySavings />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
