import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Brain, Activity, MessageSquare, MessageCircle, Video } from 'lucide-react';
import { useWeeklyGoalStatus } from '@/hooks/useWeeklyGoalStatus';
import { useNotificationReminders } from '@/hooks/useNotificationReminders';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
export const NotificationArea = () => {
  const navigate = useNavigate();
  const [isWhatsAppExpanded, setIsWhatsAppExpanded] = useState(false);
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const whatsAppButtonRef = useRef<HTMLDivElement>(null);
  
  const {
    isGoalMet,
    hasActivePrograms
  } = useWeeklyGoalStatus();
  const {
    isOrebroReminderDue,
    isPsfsReminderDue,
    loading
  } = useNotificationReminders();

  // Auto-scroll to center expanded icon on mobile
  useEffect(() => {
    if (isMobile && isWhatsAppExpanded && whatsAppButtonRef.current && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const buttonRect = whatsAppButtonRef.current.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const scrollLeft = buttonRect.left - containerRect.left - (containerRect.width / 2) + (buttonRect.width / 2);
        scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [isWhatsAppExpanded, isMobile]);

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

  const handleWhatsAppClick = () => {
    setIsWhatsAppExpanded(!isWhatsAppExpanded);
  };

  const handleWhatsAppChat = () => {
    // Add WhatsApp chat logic here
    window.open('https://wa.me/your-number', '_blank');
  };

  const handleWhatsAppVideo = () => {
    // Add WhatsApp video call logic here
    window.open('https://wa.me/your-number?text=Video%20call%20request', '_blank');
  };

  // Don't show progress icon if no active programs
  const showProgressIcon = hasActivePrograms;
  const iconContainer = (
    <div className="flex items-center justify-center gap-6 min-w-max px-2">
      {/* Weekly Progress Icon */}
      {showProgressIcon && (
        <button 
          onClick={handleProgressClick} 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${!isGoalMet ? 'breathing-icon' : ''}`} 
          aria-label="Weekly Progress"
        >
          <TrendingUp className="w-5 h-5 text-black" />
        </button>
      )}

      {/* OREBRO Brain Icon */}
      <button 
        onClick={handleOrebroClick} 
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${isOrebroReminderDue ? 'breathing-icon' : ''}`} 
        aria-label="OREBRO Questionnaire"
      >
        <Brain className="w-5 h-5 text-blue-600" />
      </button>

      {/* PSFS Heartbeat Icon */}
      <button 
        onClick={handlePsfsClick} 
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${isPsfsReminderDue ? 'breathing-icon' : ''}`} 
        aria-label="PSFS Assessment"
      >
        <Activity className="w-5 h-5 text-green-600" />
      </button>

      {/* WhatsApp Contact Icon */}
      <div className="relative flex items-center" ref={whatsAppButtonRef}>
        <button 
          onClick={handleWhatsAppClick} 
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100" 
          aria-label="WhatsApp Contact"
        >
          <MessageSquare className="w-5 h-5 text-green-500" />
        </button>

        {/* Expandable Contact Options */}
        <div className={`absolute left-full ml-2 flex items-center gap-2 transition-all duration-300 ease-out ${
          isWhatsAppExpanded 
            ? 'translate-x-0 opacity-100 pointer-events-auto' 
            : 'translate-x-[-20px] opacity-0 pointer-events-none'
        }`}>
          <button 
            onClick={handleWhatsAppChat}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
            aria-label="WhatsApp Chat"
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={handleWhatsAppVideo}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
            aria-label="WhatsApp Video Call"
          >
            <Video className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-6 py-px px-px rounded-none bg-slate-50">
      <div className="rounded-lg border border-gray-200 p-3 shadow-sm bg-blue-100 py-0 px-[12px] my-px">
        {isMobile ? (
          <ScrollArea className="w-full" ref={scrollAreaRef}>
            {iconContainer}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          iconContainer
        )}
      </div>
    </div>
  );
};