import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Brain, Activity, MessageSquare, MessageCircle, Video, Mic, X, Check, ListChecks } from 'lucide-react';
import { useWeeklyGoalStatus } from '@/hooks/useWeeklyGoalStatus';
import { useNotificationReminders } from '@/hooks/useNotificationReminders';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { uploadRecording } from '@/services/speechService';
import { SiriRecordingAnimation } from '@/components/speech/SiriRecordingAnimation';
import { useFavActivitiesContainerVisible } from '@/hooks/useFavActivitiesContainerVisible';
export const NotificationArea = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [isWhatsAppExpanded, setIsWhatsAppExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showRecordingActions, setShowRecordingActions] = useState(false);
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea>>(null);
  const whatsAppButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    hasCompletedOrebro,
    hasCompletedPsfs,
    loading
  } = useNotificationReminders();
  const isFavContainerVisible = useFavActivitiesContainerVisible();
  const shouldBreatheFavorite = !isFavContainerVisible;


  // Auto-scroll to center expanded icon
  useEffect(() => {
    if (isWhatsAppExpanded && whatsAppButtonRef.current && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (viewport) {
        const buttonRect = whatsAppButtonRef.current.getBoundingClientRect();
        const viewportRect = viewport.getBoundingClientRect();

        // Calculate the position to center the expanded icon with its children
        const buttonCenter = buttonRect.left - viewportRect.left + buttonRect.width / 2;
        const viewportCenter = viewportRect.width / 2;
        const scrollLeft = viewport.scrollLeft + buttonCenter - viewportCenter;
        
        viewport.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [isWhatsAppExpanded]);

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
  const handleFunctionalActivitiesClick = () => {
    navigate('/my-exercises#favorite-activities');
  };
  const handleWhatsAppClick = () => {
    setIsWhatsAppExpanded(!isWhatsAppExpanded);
  };
  const handleWhatsAppChat = () => {
    window.open('https://wa.me/421949606562', '_blank');
  };
  const handleWhatsAppVideo = () => {
    window.open('https://wa.me/421949606562?text=Video%20call%20request', '_blank');
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
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onstop = async () => {
        const recordingBlob = new Blob(chunksRef.current, {
          type: 'audio/webm;codecs=opus'
        });

        // Show action buttons instead of auto-saving
        setShowRecordingActions(true);

        // Store the blob for later use
        chunksRef.current = [recordingBlob];
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
        variant: 'destructive'
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
  const handleSaveRecording = async () => {
    if (chunksRef.current.length === 0) return;
    try {
      const recordingBlob = chunksRef.current[0] as Blob;
      await uploadRecording(recordingBlob, 30);
      toast({
        title: 'Recording saved successfully',
        description: 'Your recording has been saved to your history.'
      });
    } catch (err) {
      console.error('Upload error:', err);
      toast({
        title: 'Upload failed',
        description: 'Could not save your recording. Please try again.',
        variant: 'destructive'
      });
    }
    setShowRecordingActions(false);
    chunksRef.current = [];
  };
  const handleDiscardRecording = () => {
    setShowRecordingActions(false);
    chunksRef.current = [];
  };
  const handleSpeechRecordingClick = () => {
    if (showRecordingActions) return; // Disable button when actions are shown

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Don't show progress icon if no active programs
  const showProgressIcon = hasActivePrograms;
  const iconContainer = <div className="flex items-center justify-center gap-6 min-w-max px-2 touch-pan-x">
      {/* Weekly Progress Icon */}
      {showProgressIcon && <button onClick={handleProgressClick} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${!isGoalMet ? 'breathing-icon' : ''}`} aria-label="Weekly Progress">
          <TrendingUp className="w-5 h-5 text-black" />
        </button>}

      {/* Functional Activities Icon */}
      <button onClick={handleFunctionalActivitiesClick} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${shouldBreatheFavorite ? 'breathing-icon' : ''}`} aria-label="Functional Activities">
        <ListChecks className="w-5 h-5 text-blue-600" />
      </button>

      {/* OREBRO Brain Icon */}
      <button onClick={handleOrebroClick} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${!hasCompletedOrebro ? 'breathing-icon' : ''}`} aria-label="OREBRO Questionnaire">
        <Brain className="w-5 h-5 text-blue-600" />
      </button>

      {/* PSFS Heartbeat Icon */}
      <button onClick={handlePsfsClick} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${!hasCompletedPsfs ? 'breathing-icon' : ''}`} aria-label="PSFS Assessment">
        <Activity className="w-5 h-5 text-green-600" />
      </button>

      {/* Light vertical divider */}
      <div className="w-px h-6 bg-black" />

      {/* Speech Recording Icon */}
      <div className="relative flex flex-col items-center">
        <button onClick={handleSpeechRecordingClick} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100 ${isRecording ? 'bg-red-100 breathing-icon' : ''} ${showRecordingActions ? 'opacity-50 cursor-not-allowed' : ''}`} aria-label="Voice Recording" disabled={showRecordingActions}>
          <Mic className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-blue-500'}`} />
        </button>
        
        {/* Siri-like animation overlay */}
        {isRecording && <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SiriRecordingAnimation isRecording={isRecording} size="small" />
          </div>}
        
        {/* Recording action buttons */}
        {showRecordingActions && <div className="flex items-center gap-2 mt-1">
            <button onClick={handleDiscardRecording} className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200" aria-label="Cancel Recording">
              <X className="w-3 h-3 text-white" />
            </button>
            <button onClick={handleSaveRecording} className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200" aria-label="Save Recording">
              <Check className="w-3 h-3 text-white" />
            </button>
          </div>}
      </div>

      {/* WhatsApp Contact Icon */}
      <div className="relative flex items-center" ref={whatsAppButtonRef}>
        <button onClick={handleWhatsAppClick} className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-gray-100" aria-label="WhatsApp Contact">
          <MessageSquare className="w-5 h-5 text-green-500" />
        </button>

        {/* Expandable Contact Options */}
        <div className={`absolute left-full ml-2 flex items-center gap-2 transition-all duration-300 ease-out ${isWhatsAppExpanded ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-[-20px] opacity-0 pointer-events-none'}`}>
          <button onClick={handleWhatsAppChat} className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200" aria-label="WhatsApp Chat">
            <MessageCircle className="w-4 h-4 text-white" />
          </button>
          <button onClick={handleWhatsAppVideo} className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200" aria-label="WhatsApp Video Call">
            <Video className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>;
  return <div className="py-px px-px rounded-none bg-slate-50">
      <div className="rounded-lg border border-gray-200 p-2 shadow-sm bg-blue-100 py-0 px-[8px] my-px w-full md:w-[370px]" ref={containerRef}>
        <ScrollArea className="w-full [&>div[data-radix-scroll-area-viewport]]:!overflow-x-auto [&>div[data-radix-scroll-area-viewport]]:!overflow-y-hidden [&_[data-radix-scroll-area-scrollbar]]:hidden" ref={scrollAreaRef}>
          <div className="flex">
            {iconContainer}
          </div>
        </ScrollArea>
      </div>
    </div>;
};