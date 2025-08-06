-- Create table for favorite activities
CREATE TABLE public.favorite_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity TEXT NOT NULL,
  pain_area TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.favorite_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own favorite activities" 
ON public.favorite_activities 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorite activities" 
ON public.favorite_activities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorite activities" 
ON public.favorite_activities 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_favorite_activities_updated_at
BEFORE UPDATE ON public.favorite_activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();