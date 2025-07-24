import { supabase } from '@/integrations/supabase/client';

export interface SpeechRecording {
  id: string;
  user_id: string;
  audio_url: string;
  duration_seconds: number | null;
  file_size_bytes: number | null;
  created_at: string;
  updated_at: string;
  signed_audio_url?: string;
}

export async function uploadRecording(blob: Blob, durationSeconds?: number): Promise<SpeechRecording> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    throw new Error('User not authenticated');
  }

  const formData = new FormData();
  formData.append('audio', blob, 'recording.webm');
  if (durationSeconds) {
    formData.append('duration', durationSeconds.toString());
  }

  const { data, error } = await supabase.functions.invoke('speech-upload', {
    body: formData,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload recording');
  }

  if (!data.success) {
    throw new Error(data.error || 'Upload failed');
  }

  return data.recording;
}

export async function fetchHistory(): Promise<SpeechRecording[]> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.functions.invoke('speech-history', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error('History fetch error:', error);
    throw new Error('Failed to fetch recording history');
  }

  return data.recordings || [];
}

export async function deleteRecording(recordingId: string): Promise<void> {
  const { error } = await supabase
    .from('speech_recordings')
    .delete()
    .eq('id', recordingId);

  if (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete recording');
  }
}