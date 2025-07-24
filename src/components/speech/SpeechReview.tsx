import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpeechReviewProps {
  blob: Blob;
  onSave: () => Promise<void>;
  onDiscard: () => void;
  uploading: boolean;
}

export const SpeechReview = ({ blob, onSave, onDiscard, uploading }: SpeechReviewProps) => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioUrl = React.useMemo(() => {
    return URL.createObjectURL(blob);
  }, [blob]);

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-3">
          {t('speech.review.title', 'Review your recording')}
        </h4>
        
        <audio
          ref={audioRef}
          src={audioUrl}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="hidden"
        />

        <div className="space-y-3">
          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <Button
              onClick={togglePlayback}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {playing ? (
                <>
                  <Pause className="w-4 h-4" />
                  {t('speech.review.pause', 'Pause')}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {t('speech.review.play', 'Play')}
                </>
              )}
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-150"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={onSave}
          disabled={uploading}
          className="flex items-center gap-2 flex-1"
        >
          <Save className="w-4 h-4" />
          {uploading 
            ? t('speech.review.saving', 'Saving...') 
            : t('speech.review.save', 'Save Recording')
          }
        </Button>
        
        <Button
          onClick={onDiscard}
          variant="outline"
          disabled={uploading}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          {t('speech.review.discard', 'Discard')}
        </Button>
      </div>
    </div>
  );
};