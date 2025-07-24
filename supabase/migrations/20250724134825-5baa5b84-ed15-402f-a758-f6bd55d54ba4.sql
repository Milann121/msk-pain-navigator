-- Create speech_recordings table
CREATE TABLE public.speech_recordings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  audio_url TEXT NOT NULL,
  duration_seconds INTEGER,
  file_size_bytes BIGINT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.speech_recordings ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own speech recordings" 
ON public.speech_recordings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own speech recordings" 
ON public.speech_recordings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own speech recordings" 
ON public.speech_recordings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own speech recordings" 
ON public.speech_recordings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_speech_recordings_updated_at
BEFORE UPDATE ON public.speech_recordings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for speech recordings
INSERT INTO storage.buckets (id, name, public) VALUES ('speech-recordings', 'speech-recordings', false);

-- Create storage policies for speech recordings
CREATE POLICY "Users can upload their own speech recordings" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'speech-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own speech recordings" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'speech-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own speech recordings" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'speech-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own speech recordings" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'speech-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);