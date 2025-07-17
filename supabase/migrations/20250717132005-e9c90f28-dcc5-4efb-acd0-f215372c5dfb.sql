-- Create psfs_assessment table for storing PSFS questionnaire responses
CREATE TABLE public.psfs_assessment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  responses JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reminder_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.psfs_assessment ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own PSFS assessments" 
ON public.psfs_assessment 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own PSFS assessments" 
ON public.psfs_assessment 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own PSFS assessments" 
ON public.psfs_assessment 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_psfs_assessment_updated_at
BEFORE UPDATE ON public.psfs_assessment
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();