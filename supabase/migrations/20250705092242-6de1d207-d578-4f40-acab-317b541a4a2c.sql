-- Create enum for program status
CREATE TYPE public.program_status AS ENUM ('active', 'ended', 'deleted');

-- Create user_program_tracking table
CREATE TABLE public.user_program_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  b2b_employee_id UUID,
  assessment_id UUID NOT NULL,
  program_status public.program_status NOT NULL DEFAULT 'active',
  pain_area TEXT NOT NULL,
  primary_differential TEXT NOT NULL,
  primary_mechanism TEXT NOT NULL,
  sin_group TEXT NOT NULL,
  initial_pain_level NUMERIC,
  program_started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  program_ended_at TIMESTAMP WITH TIME ZONE,
  program_deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one tracking record per assessment
  UNIQUE(assessment_id)
);

-- Enable RLS
ALTER TABLE public.user_program_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own program tracking" 
ON public.user_program_tracking 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own program tracking" 
ON public.user_program_tracking 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own program tracking" 
ON public.user_program_tracking 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "HR managers can view their company's program tracking" 
ON public.user_program_tracking 
FOR SELECT 
USING (
  is_hr_manager(auth.uid()) AND 
  b2b_employee_id IN (
    SELECT be.id 
    FROM b2b_employees be 
    WHERE be.b2b_partner_id = get_user_b2b_partner_id(auth.uid())
  )
);

-- Function to sync program tracking from user_assessments
CREATE OR REPLACE FUNCTION public.sync_program_tracking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  b2b_emp_id UUID;
BEGIN
  -- Get b2b_employee_id if user has one
  SELECT be.id INTO b2b_emp_id
  FROM b2b_employees be
  WHERE be.email = (
    SELECT email FROM auth.users WHERE id = COALESCE(NEW.user_id, OLD.user_id)
  );

  IF TG_OP = 'INSERT' THEN
    -- Create new tracking record for new assessment
    INSERT INTO public.user_program_tracking (
      user_id,
      b2b_employee_id,
      assessment_id,
      program_status,
      pain_area,
      primary_differential,
      primary_mechanism,
      sin_group,
      initial_pain_level,
      program_started_at
    ) VALUES (
      NEW.user_id,
      b2b_emp_id,
      NEW.id,
      'active',
      NEW.pain_area,
      NEW.primary_differential,
      NEW.primary_mechanism,
      NEW.sin_group,
      NEW.intial_pain_intensity,
      COALESCE(NEW.program_start_date::timestamp with time zone, NEW.timestamp)
    );
    
  ELSIF TG_OP = 'UPDATE' THEN
    -- Update tracking based on program_ended_at changes
    IF OLD.program_ended_at IS NULL AND NEW.program_ended_at IS NOT NULL THEN
      -- Program was ended
      UPDATE public.user_program_tracking 
      SET 
        program_status = 'ended',
        program_ended_at = NEW.program_ended_at,
        updated_at = now()
      WHERE assessment_id = NEW.id;
      
    ELSIF OLD.program_ended_at IS NOT NULL AND NEW.program_ended_at IS NULL THEN
      -- Program was renewed
      UPDATE public.user_program_tracking 
      SET 
        program_status = 'active',
        program_ended_at = NULL,
        updated_at = now()
      WHERE assessment_id = NEW.id;
    END IF;
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Mark program as deleted instead of actually deleting
    UPDATE public.user_program_tracking 
    SET 
      program_status = 'deleted',
      program_deleted_at = now(),
      updated_at = now()
    WHERE assessment_id = OLD.id;
    
    RETURN OLD;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create triggers on user_assessments
CREATE TRIGGER sync_program_tracking_insert
  AFTER INSERT ON public.user_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_program_tracking();

CREATE TRIGGER sync_program_tracking_update
  AFTER UPDATE ON public.user_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_program_tracking();

CREATE TRIGGER sync_program_tracking_delete
  BEFORE DELETE ON public.user_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_program_tracking();

-- Function to get program statistics for dashboard
CREATE OR REPLACE FUNCTION public.get_user_program_stats(target_user_id UUID DEFAULT NULL)
RETURNS TABLE(
  user_id UUID,
  b2b_employee_id UUID,
  active_programs BIGINT,
  ended_programs BIGINT,
  deleted_programs BIGINT,
  total_programs BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    upt.user_id,
    upt.b2b_employee_id,
    COUNT(*) FILTER (WHERE upt.program_status = 'active') as active_programs,
    COUNT(*) FILTER (WHERE upt.program_status = 'ended') as ended_programs,
    COUNT(*) FILTER (WHERE upt.program_status = 'deleted') as deleted_programs,
    COUNT(*) as total_programs
  FROM public.user_program_tracking upt
  WHERE (target_user_id IS NULL OR upt.user_id = target_user_id)
  GROUP BY upt.user_id, upt.b2b_employee_id;
$$;

-- Add updated_at trigger
CREATE TRIGGER update_user_program_tracking_updated_at
  BEFORE UPDATE ON public.user_program_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();