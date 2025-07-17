import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Brain, Activity } from 'lucide-react';
import { useWeeklyGoalStatus } from '@/hooks/useWeeklyGoalStatus';
import { useNotificationReminders } from '@/hooks/useNotificationReminders';

export const NotificationArea = () => {
  const navigate = useNavigate();
  const { isGoalMet, hasActivePrograms } = useWeeklyGoalStatus();
  const { 
    isOrebroReminderDue, 
    isPsfsReminderDue, 
    loading 
  } = useNotificationReminders();

  if (loading) return null;

  const handleProgressClick = () => {
    navigate('/my-exercises');
  };

  const handleOrebroClick = () => {
    navigate('/orebro-questionnaire');
  };

  const handlePsfsClick = () => {
    navigate('/psfs-questionnaire');
  };

  // Don't show progress icon if no active programs
  const showProgressIcon = hasActivePrograms;
  
  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
        <div className="flex items-center justify-center gap-6">
          {/* Weekly Progress Icon */}
          {showProgressIcon && (
            <button
              onClick={handleProgressClick}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${
                !isGoalMet ? 'animate-pulse' : ''
              }`}
              aria-label="Weekly Progress"
            >
              <TrendingUp 
                className={`w-5 h-5 ${
                  !isGoalMet 
                    ? 'text-orange-500' 
                    : 'text-green-500'
                }`} 
              />
            </button>
          )}

          {/* OREBRO Brain Icon */}
          <button
            onClick={handleOrebroClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${
              isOrebroReminderDue ? 'animate-pulse' : ''
            }`}
            aria-label="OREBRO Questionnaire"
          >
            <Brain 
              className={`w-5 h-5 ${
                isOrebroReminderDue 
                  ? 'text-blue-600' 
                  : 'text-gray-400'
              }`} 
            />
          </button>

          {/* PSFS Heartbeat Icon */}
          <button
            onClick={handlePsfsClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${
              isPsfsReminderDue ? 'animate-pulse' : ''
            }`}
            aria-label="PSFS Assessment"
          >
            <Activity 
              className={`w-5 h-5 ${
                isPsfsReminderDue 
                  ? 'text-green-600' 
                  : 'text-gray-400'
              }`} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};