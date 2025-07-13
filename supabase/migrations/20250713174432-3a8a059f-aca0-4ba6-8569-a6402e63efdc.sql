-- Create exercise_swaps table for user-specific exercise replacements
CREATE TABLE public.exercise_swaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  assessment_id UUID,
  original_video_id TEXT NOT NULL,
  replacement_video_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.exercise_swaps ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own exercise swaps" 
ON public.exercise_swaps 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own exercise swaps" 
ON public.exercise_swaps 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exercise swaps" 
ON public.exercise_swaps 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exercise swaps" 
ON public.exercise_swaps 
FOR DELETE 
USING (auth.uid() = user_id);

-- HR managers can view their company's exercise swaps
CREATE POLICY "HR managers can view their company's exercise swaps" 
ON public.exercise_swaps 
FOR SELECT 
USING (
  is_hr_manager(auth.uid()) AND 
  user_id IN (
    SELECT be.user_id
    FROM b2b_employees be
    WHERE be.b2b_partner_id = get_user_b2b_partner_id(auth.uid())
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_exercise_swaps_updated_at
BEFORE UPDATE ON public.exercise_swaps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();