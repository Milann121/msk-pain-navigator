import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Brain, Activity, MessageSquare, MessageCircle, Video, Mic } from 'lucide-react';
import { useWeeklyGoalStatus } from '@/hooks/useWeeklyGoalStatus';
import { useNotificationReminders } from '@/hooks/useNotificationReminders';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { uploadRecording } from '@/services/speechService';
import { SiriRecordingAnimation } from '@/components/speech/SiriRecordingAnimation';
export const NotificationArea = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isWhatsAppExpanded, setIsWhatsAppExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const whatsAppButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);
  const [iconShift, setIconShift] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const {
    isGoalMet,
    hasActivePrograms
  } = useWeeklyGoalStatus();
  const {
    isOrebroReminderDue,
    isPsfsReminderDue,
    loading
  } = useNotificationReminders();

  // Auto-scroll to center expanded icon on mobile and handle overflow for desktop/tablet
  useEffect(() => {
    if (isMobile && isWhatsAppExpanded && whatsAppButtonRef.current && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      const buttonRect = whatsAppButtonRef.current.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      
      // Calculate the position to center the expanded icon with its children
      const buttonCenter = buttonRect.left - containerRect.left + (buttonRect.width / 2);
      const containerCenter = containerRect.width / 2;
      const scrollLeft = scrollContainer.scrollLeft + buttonCenter - containerCenter;
      
      scrollContainer.scrollTo({ 
        left: Math.max(0, scrollLeft), 
        behavior: 'smooth' 
      });
    }
    
    // For desktop/tablet, calculate safe shift or use scroll when content would overflow
    if (!isMobile && isWhatsAppExpanded && containerRef.current && iconsContainerRef.current) {
      const container = containerRef.current;
      const iconsContainer = iconsContainerRef.current;
      const containerWidth = container.offsetWidth - 16; // Account for padding
      const expandedWidth = 120; // Approximate width of expanded WhatsApp buttons
      
      // Calculate total content width when expanded
      const iconsWidth = iconsContainer.scrollWidth;
      const totalExpandedWidth = iconsWidth + expandedWidth;
      
      if (totalExpandedWidth > containerWidth) {
        // Content would overflow, so we limit shift to prevent icons going outside banner
        const maxShift = Math.min(0, containerWidth - totalExpandedWidth);
        const safeShift = Math.max(maxShift, -50); // Limit maximum shift to prevent icons disappearing completely
        setIconShift(safeShift);
      } else {
        setIconShift(0);
      }
    } else if (!isWhatsAppExpanded) {
      setIconShift(0);
    }
  }, [isWhatsAppExpanded, isMobile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recorderRef.current && recorderRef.current.state === 'recording') {
        recorderRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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

  const startRecording = async () => {
    chunksRef.current = [];
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        }
      });
      
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      recorderRef.current = recorder;
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      recorder.onstop = async () => {
        const recordingBlob = new Blob(chunksRef.current, { 
          type: 'audio/webm;codecs=opus' 
        });
        
        // Auto-save the recording
        try {
          await uploadRecording(recordingBlob, 30); // Assuming 30 seconds max
          toast({
            title: 'Recording saved successfully',
            description: 'Your recording has been saved to your history.',
          });
        } catch (err) {
          console.error('Upload error:', err);
          toast({
            title: 'Upload failed',
            description: 'Could not save your recording. Please try again.',
            variant: 'destructive',
          });
        }
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
      setIsRecording(true);
      
      // Auto-stop after 30 seconds
      timerRef.current = setTimeout(() => {
        stopRecording();
      }, 30000);
      
    } catch (err) {
      console.error('Error starting recording:', err);
      toast({
        title: 'Recording failed',
        description: 'Could not access microphone. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSpeechRecordingClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Don't show progress icon if no active programs
  const showProgressIcon = hasActivePrograms;
  const iconContainer = (
    <div 
      className="flex items-center justify-center gap-6 min-w-max px-2 touch-pan-x transition-transform duration-300 ease-out"
      ref={iconsContainerRef}
      style={{ transform: `translateX(${iconShift}px)` }}
    >
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

      {/* Speech Recording Icon */}
      <div className="relative">
        <button 
          onClick={handleSpeechRecordingClick} 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${isRecording ? 'bg-red-100 breathing-icon' : ''}`} 
          aria-label="Voice Recording"
        >
          <Mic className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-blue-500'}`} />
        </button>
        
        {/* Siri-like animation overlay */}
        {isRecording && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SiriRecordingAnimation isRecording={isRecording} size="small" />
          </div>
        )}
      </div>

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
    <div className="py-px px-px rounded-none bg-slate-50">
      <div className="rounded-lg border border-gray-200 p-2 shadow-sm bg-blue-100 py-0 px-[8px] my-px w-full md:w-[370px] overflow-hidden" ref={containerRef}>
        {isMobile ? (
          <div 
            className="overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x'
            }}
            ref={scrollAreaRef}
          >
            {iconContainer}
          </div>
        ) : (
          <div className="overflow-hidden">
            {iconContainer}
          </div>
        )}
      </div>
    </div>
  );
};
