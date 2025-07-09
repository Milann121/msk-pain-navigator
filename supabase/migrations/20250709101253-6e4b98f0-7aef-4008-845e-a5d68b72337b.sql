-- Create OREBRO responses table
CREATE TABLE public.orebro_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  responses JSONB NOT NULL,
  total_score INTEGER,
  risk_level TEXT,
  anonymous_id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orebro_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for user access (users can only access their own responses)
CREATE POLICY "Users can view their own OREBRO responses" 
ON public.orebro_responses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own OREBRO responses" 
ON public.orebro_responses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own OREBRO responses" 
ON public.orebro_responses 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orebro_responses_updated_at
  BEFORE UPDATE ON public.orebro_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();