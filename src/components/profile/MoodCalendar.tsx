import React, { useState } from 'react';
import { format, isAfter, isBefore, subDays, isSameDay } from 'date-fns';
import { sk } from 'date-fns/locale/sk';
import { Card, CardContent } from '@/components/ui/card';
import { UserGreeting } from './mood/UserGreeting';
import { MoodSelector } from './mood/MoodSelector';
import { MoodCalendarView } from './mood/MoodCalendarView';
import { MoneySavings } from './MoneySavings';
import { GeneralProgram } from './GeneralProgram';
import { WeeklyNotificationBanner } from './WeeklyNotificationBanner';
import { useMoodData } from './mood/useMoodData';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Map mood string to value
const moodValueMap = {
  happy: 3, // "Dobre"
  neutral: 2, // "Neutrálne"
  sad: 1 // "Zle"
};

export const MoodCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [timePeriod, setTimePeriod] = useState<'week' | 'month'>('week');
  const [infoPopoverOpen, setInfoPopoverOpen] = useState(false);
  const { firstName, loading, handleMoodSelection, getMoodForDate, moodEntries } = useMoodData();
  
  // Get mood for the selected date
  const selectedDateMood = getMoodForDate(date);
  
  // Get current day and date
  const today = new Date();
  const currentDayAndDate = format(today, 'EEEE, dd.MM.yyyy', { locale: sk });

  // Utility: filter and map moods for a period
  const getMoodScoresForPeriod = (startDate: Date, endDate: Date) => {
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const days: Date[] = [];
    for (let i = 0; i < daysDiff; i++) {
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

  // Calculate mood scores based on selected time period
  const currentPeriodDays = timePeriod === 'week' ? 7 : 30;
  const currentPeriodScores = getMoodScoresForPeriod(subDays(today, currentPeriodDays - 1), today);
  const prevPeriodScores = getMoodScoresForPeriod(subDays(today, (currentPeriodDays * 2) - 1), subDays(today, currentPeriodDays));

  const average = (arr: number[]) =>
    arr.length > 0 ? arr.reduce((sum, n) => sum + n, 0) / arr.length : null;

  const moodScore = average(currentPeriodScores);
  const prevMoodScore = average(prevPeriodScores);

  // Determine trend
  let trendColor = 'text-gray-500';
  let trendIcon = '—'; // Flat dash by default
  let description = 'Žiadna zmena';
  if (moodScore !== null && prevMoodScore !== null) {
    if (moodScore > prevMoodScore) {
      trendColor = 'text-green-600';
      trendIcon = '▲';
      description = `Lepší trend za posledných ${currentPeriodDays} ${timePeriod === 'week' ? 'dní' : 'dní'}`;
    } else if (moodScore < prevMoodScore) {
      trendColor = 'text-yellow-600';
      trendIcon = '▼';
      description = `Zhoršený trend za posledných ${currentPeriodDays} ${timePeriod === 'week' ? 'dní' : 'dní'}`;
    }
  }

  // Format score to 2 decimals or "-"
  const formatScore = (score: number | null) =>
    score != null ? score.toFixed(2) : '-';

  const periodLabel = timePeriod === 'week' ? '7 dní' : '30 dní';
  const emptyStateText = timePeriod === 'week' ? 'posledných 7 dní' : 'posledných 30 dní';

  return (
    <div className="mb-6">
      {/* Header above containers */}
      <div className="mb-4">
        {/* Mobile layout - notification banner above greeting */}
        <div className="block md:hidden mb-4">
          <WeeklyNotificationBanner />
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <UserGreeting firstName={firstName} />
            <h3 className="text-lg font-medium">
              {currentDayAndDate}
            </h3>
          </div>
          
          {/* Desktop notification banner - expanded width */}
          <div className="hidden md:block flex-[2]">
            <WeeklyNotificationBanner />
          </div>
        </div>
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
            
            {/* Time Period Toggle */}
            <div className="mt-6 w-full flex justify-center">
              <ToggleGroup type="single" value={timePeriod} onValueChange={(value) => value && setTimePeriod(value as 'week' | 'month')}>
                <ToggleGroupItem value="week" aria-label="Týždeň">
                  týždeň
                </ToggleGroupItem>
                <ToggleGroupItem value="month" aria-label="Mesiac">
                  mesiac
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {/* Mood Score/Status */}
            <div className="mt-4 w-full flex flex-col items-center">
              <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                Priemerné skóre za {periodLabel}
                <Popover open={infoPopoverOpen} onOpenChange={setInfoPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto w-auto min-w-[24px] min-h-[24px] text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full touch-manipulation"
                      onClick={() => setInfoPopoverOpen(!infoPopoverOpen)}
                    >
                      <Info size={16} />
                      <span className="sr-only">Informácie o skóre</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    side="top" 
                    className="max-w-xs bg-white border border-gray-200 shadow-lg z-50"
                    align="center"
                    sideOffset={8}
                  >
                    <div className="p-3">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {t(Priemerné skóre z posledných {currentPeriodDays} dní vychádza z vašich denných zápisov toho, ako sa cítite. Čím je vaše skóre bližšie k číslu 3, tým sa máte lepšie.)}<br />
                        <span className="font-medium">Dobre = 3, Neutrálne = 2, Zle = 1.</span><br />
                        Sledujte, ako sa vaše celkové skóre mení v čase.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center text-2xl font-bold space-x-2">
                <span>{formatScore(moodScore)}</span>
                <span className={`${trendColor}`}>{trendIcon}</span>
              </div>
              {moodScore !== null && prevMoodScore !== null && (
                <span className={`text-xs mt-1 ${trendColor}`}>{description}</span>
              )}
              {moodScore === null && (
                <span className="text-xs text-gray-400">(Nemáte záznamy pre {emptyStateText})</span>
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
