import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Clock, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SpeechReview } from './SpeechReview';
import { uploadRecording } from '@/services/speechService';

const MAX_SECONDS = 30;

export const SpeechRecorder = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MAX_SECONDS);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

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

  const startRecording = async () => {
    setError('');
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
      
      recorder.onstop = () => {
        const recordingBlob = new Blob(chunksRef.current, { 
          type: 'audio/webm;codecs=opus' 
        });
        setBlob(recordingBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
      setRecording(true);
      setTimeLeft(MAX_SECONDS);
      startTimeRef.current = Date.now();
      
      // Start countdown timer
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const remaining = MAX_SECONDS - elapsed;
        
        if (remaining <= 0) {
          stopRecording();
        } else {
          setTimeLeft(remaining);
        }
      }, 100);
      
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSave = async () => {
    if (!blob) return;
    
    setUploading(true);
    try {
      const duration = MAX_SECONDS - timeLeft;
      await uploadRecording(blob, duration);
      
      toast({
        title: t('speech.uploadSuccess', 'Recording saved successfully'),
        description: t('speech.uploadSuccessDesc', 'Your recording has been saved to your history.'),
      });
      
      // Reset state
      setBlob(null);
      setTimeLeft(MAX_SECONDS);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to save recording. Please try again.');
      toast({
        title: t('speech.uploadError', 'Upload failed'),
        description: t('speech.uploadErrorDesc', 'Could not save your recording. Please try again.'),
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDiscard = () => {
    setBlob(null);
    setTimeLeft(MAX_SECONDS);
    setError('');
  };

  const formatTime = (seconds: number) => {
    return `00:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">
              {t('speech.title', 'Record your symptoms')}
            </h3>
          </div>
          
          <Button
            onClick={() => navigate('/speech-history')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            {t('speech.history.button', 'History')}
          </Button>
        </div>
        
        <p className="text-muted-foreground">
          {t('speech.description', 'Record a voice note describing how you\'re feeling today (max 30 seconds).')}
        </p>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {!blob ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={recording ? stopRecording : startRecording}
                variant={recording ? "destructive" : "default"}
                size="lg"
                className="flex items-center gap-2"
                disabled={uploading}
              >
                {recording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    {t('speech.stopRecording', 'Stop Recording')}
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    {t('speech.startRecording', 'Start Recording')}
                  </>
                )}
              </Button>
              
              {recording && (
                <div className="flex items-center gap-2 text-lg font-mono">
                  <Clock className="w-4 h-4" />
                  <span className={timeLeft <= 5 ? 'text-destructive' : 'text-foreground'}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>
            
            {recording && (
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-100"
                  style={{ width: `${((MAX_SECONDS - timeLeft) / MAX_SECONDS) * 100}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <SpeechReview
            blob={blob}
            onSave={handleSave}
            onDiscard={handleDiscard}
            uploading={uploading}
          />
        )}
      </div>
    </Card>
  );
};