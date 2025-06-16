
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export const WeeklyNotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if it's Monday (0 = Sunday, 1 = Monday)
    const today = new Date();
    const isMonday = today.getDay() === 1;
    
    // Check if notification was already dismissed this week
    const currentWeek = getWeekNumber(today);
    const dismissedWeek = localStorage.getItem('weeklyNotificationDismissed');
    const wasDismissedThisWeek = dismissedWeek === currentWeek.toString();
    
    if (isMonday && !wasDismissedThisWeek && !isDismissed) {
      setIsVisible(true);
    }
  }, [isDismissed]);

  // Helper function to get week number
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const handleDismiss = () => {
    const currentWeek = getWeekNumber(new Date());
    localStorage.setItem('weeklyNotificationDismissed', currentWeek.toString());
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardContent className="pt-4 pb-4 pr-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-base font-large text-blue-800 mb-3 leading-relaxed">
              Je to tu! Nový týždeň, nová výzva. Neodkladaj svoje cviky a začni už dnes 🤩
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/my-exercises">
                Otvoriť program
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
