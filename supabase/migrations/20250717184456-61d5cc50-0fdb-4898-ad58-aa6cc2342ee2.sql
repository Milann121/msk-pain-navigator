-- Add reminder_at column to orebro_responses table
ALTER TABLE public.orebro_responses 
ADD COLUMN reminder_at TIMESTAMP WITH TIME ZONE;

-- Create function to calculate and set OREBRO reminder (3 months after update)
CREATE OR REPLACE FUNCTION public.set_orebro_reminder()
RETURNS TRIGGER AS $$
BEGIN
  -- Set reminder to 3 months after the updated_at timestamp
  NEW.reminder_at := NEW.updated_at + INTERVAL '3 months';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate and set PSFS reminder (2 months after update, only if user has active programs)
CREATE OR REPLACE FUNCTION public.set_psfs_reminder()
RETURNS TRIGGER AS $$
DECLARE
  has_active_programs BOOLEAN := FALSE;
BEGIN
  -- Check if user has any active programs
  SELECT EXISTS(
    SELECT 1 FROM public.user_program_tracking 
    WHERE user_id = NEW.user_id 
    AND program_status = 'active'
  ) INTO has_active_programs;
  
  -- Only set reminder if user has active programs
  IF has_active_programs THEN
    NEW.reminder_at := NEW.updated_at + INTERVAL '2 months';
  ELSE
    NEW.reminder_at := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to check if OREBRO reminder is due
CREATE OR REPLACE FUNCTION public.is_orebro_reminder_due(user_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
  reminder_date TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get the most recent OREBRO reminder date for this user
  SELECT reminder_at INTO reminder_date
  FROM public.orebro_responses
  WHERE user_id = user_id_param
  ORDER BY updated_at DESC
  LIMIT 1;
  
  -- Return true if reminder date exists and is in the past
  RETURN (reminder_date IS NOT NULL AND reminder_date <= NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if PSFS reminder is due
CREATE OR REPLACE FUNCTION public.is_psfs_reminder_due(user_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
  reminder_date TIMESTAMP WITH TIME ZONE;
  has_active_programs BOOLEAN := FALSE;
BEGIN
  -- Check if user has any active programs
  SELECT EXISTS(
    SELECT 1 FROM public.user_program_tracking 
    WHERE user_id = user_id_param 
    AND program_status = 'active'
  ) INTO has_active_programs;
  
  -- Only check reminder if user has active programs
  IF NOT has_active_programs THEN
    RETURN FALSE;
  END IF;
  
  -- Get the most recent PSFS reminder date for this user
  SELECT reminder_at INTO reminder_date
  FROM public.psfs_assessment
  WHERE user_id = user_id_param
  ORDER BY updated_at DESC
  LIMIT 1;
  
  -- Return true if reminder date exists and is in the past
  RETURN (reminder_date IS NOT NULL AND reminder_date <= NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for OREBRO responses to automatically set reminder
CREATE TRIGGER set_orebro_reminder_trigger
  BEFORE INSERT OR UPDATE ON public.orebro_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.set_orebro_reminder();

-- Create trigger for PSFS assessments to automatically set reminder
CREATE TRIGGER set_psfs_reminder_trigger
  BEFORE INSERT OR UPDATE ON public.psfs_assessment
  FOR EACH ROW
  EXECUTE FUNCTION public.set_psfs_reminder();