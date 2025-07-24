import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { cs, sk, enUS } from 'date-fns/locale';
import { History, Play, Pause, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { fetchHistory, deleteRecording, type SpeechRecording } from '@/services/speechService';

export const SpeechHistory = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [recordings, setRecordings] = useState<SpeechRecording[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioRefs] = useState<Map<string, HTMLAudioElement>>(new Map());

  const getLocale = () => {
    switch (i18n.language) {
      case 'cs': return cs;
      case 'sk': return sk;
      default: return enUS;
    }
  };

  const loadRecordings = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setRecordings(data);
    } catch (error) {
      console.error('Failed to load recordings:', error);
      toast({
        title: t('speech.history.loadError', 'Failed to load recordings'),
        description: t('speech.history.loadErrorDesc', 'Could not fetch your recording history.'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecordings();
  }, []);

  useEffect(() => {
    // Cleanup audio refs on unmount
    return () => {
      audioRefs.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.clear();
    };
  }, [audioRefs]);

  const togglePlayback = (recording: SpeechRecording) => {
    if (!recording.signed_audio_url) return;

    let audio = audioRefs.get(recording.id);
    
    if (!audio) {
      audio = new Audio(recording.signed_audio_url);
      audioRefs.set(recording.id, audio);
      
      audio.addEventListener('ended', () => {
        setPlayingId(null);
      });
      
      audio.addEventListener('error', () => {
        toast({
          title: t('speech.history.playError', 'Playback error'),
          description: t('speech.history.playErrorDesc', 'Could not play this recording.'),
          variant: 'destructive',
        });
        setPlayingId(null);
      });
    }

    if (playingId === recording.id) {
      audio.pause();
      setPlayingId(null);
    } else {
      // Pause any other playing audio
      audioRefs.forEach(otherAudio => otherAudio.pause());
      setPlayingId(recording.id);
      audio.play();
    }
  };

  const handleDelete = async (recordingId: string) => {
    if (!confirm(t('speech.history.deleteConfirm', 'Are you sure you want to delete this recording?'))) {
      return;
    }

    try {
      await deleteRecording(recordingId);
      setRecordings(prev => prev.filter(r => r.id !== recordingId));
      
      // Stop and cleanup audio if it was playing
      const audio = audioRefs.get(recordingId);
      if (audio) {
        audio.pause();
        audio.src = '';
        audioRefs.delete(recordingId);
      }
      
      if (playingId === recordingId) {
        setPlayingId(null);
      }
      
      toast({
        title: t('speech.history.deleteSuccess', 'Recording deleted'),
        description: t('speech.history.deleteSuccessDesc', 'The recording has been removed.'),
      });
    } catch (error) {
      console.error('Failed to delete recording:', error);
      toast({
        title: t('speech.history.deleteError', 'Delete failed'),
        description: t('speech.history.deleteErrorDesc', 'Could not delete the recording.'),
        variant: 'destructive',
      });
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '--';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">
            {t('speech.history.loading', 'Loading recordings...')}
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">
              {t('speech.history.title', 'Recording History')}
            </h3>
          </div>
          <Button
            onClick={loadRecordings}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t('speech.history.refresh', 'Refresh')}
          </Button>
        </div>

        {recordings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{t('speech.history.empty', 'No recordings yet. Start by making your first recording!')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-medium">
                        {format(new Date(recording.created_at), 'PPp', { locale: getLocale() })}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDuration(recording.duration_seconds)} • {formatFileSize(recording.file_size_bytes)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => togglePlayback(recording)}
                      variant="outline"
                      size="sm"
                      disabled={!recording.signed_audio_url}
                      className="flex items-center gap-2"
                    >
                      {playingId === recording.id ? (
                        <>
                          <Pause className="w-4 h-4" />
                          {t('speech.history.pause', 'Pause')}
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          {t('speech.history.play', 'Play')}
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => handleDelete(recording.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};