-- Ensure msk_profiles table has proper constraints and indexes
-- Add unique constraint on b2b_employee_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'msk_profiles_b2b_employee_id_key'
  ) THEN
    ALTER TABLE public.msk_profiles 
    ADD CONSTRAINT msk_profiles_b2b_employee_id_key 
    UNIQUE (b2b_employee_id);
  END IF;
END $$;

-- Create index on b2b_employee_id for faster lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_msk_profiles_b2b_employee_id 
ON public.msk_profiles (b2b_employee_id);

-- Create function to automatically sync MSK profiles when user_assessments or follow_up_responses change
CREATE OR REPLACE FUNCTION public.sync_msk_profile_on_assessment_change()
RETURNS TRIGGER AS $$
DECLARE
  user_email text;
  employee_record record;
  assessments_data record[];
  active_areas text[];
  resolved_areas text[];
  avg_initial_pain numeric;
  pain_improvement numeric;
  initial_total numeric := 0;
  initial_count integer := 0;
  improvement_total numeric := 0;
  improvement_count integer := 0;
BEGIN
  -- Get user email from user_profiles
  SELECT email INTO user_email 
  FROM public.user_profiles 
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);
  
  IF user_email IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  
  -- Get employee ID from b2b_employees or test_2_employees
  SELECT id INTO employee_record
  FROM public.b2b_employees 
  WHERE email = user_email;
  
  IF employee_record IS NULL THEN
    SELECT id INTO employee_record
    FROM public.test_2_employees 
    WHERE email = user_email;
  END IF;
  
  IF employee_record IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  
  -- Get all assessments for this user
  SELECT array_agg(ROW(ua.pain_area, ua.intial_pain_intensity, ua.program_ended_at, ua.id)::text) 
  INTO assessments_data
  FROM public.user_assessments ua
  WHERE ua.user_id = COALESCE(NEW.user_id, OLD.user_id);
  
  -- Extract active and resolved pain areas
  WITH parsed_assessments AS (
    SELECT 
      split_part(unnest(assessments_data), ',', 1) as pain_area,
      NULLIF(split_part(unnest(assessments_data), ',', 2), '')::numeric as initial_pain,
      NULLIF(split_part(unnest(assessments_data), ',', 3), '') as ended_at,
      split_part(unnest(assessments_data), ',', 4) as assessment_id
  )
  SELECT 
    array_agg(DISTINCT pain_area) FILTER (WHERE ended_at IS NULL) as active,
    array_agg(DISTINCT pain_area) FILTER (WHERE ended_at IS NOT NULL) as resolved
  FROM parsed_assessments
  INTO active_areas, resolved_areas;
  
  -- Calculate average initial pain
  SELECT AVG(intial_pain_intensity), COUNT(*)
  FROM public.user_assessments
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id) 
    AND intial_pain_intensity IS NOT NULL 
    AND intial_pain_intensity > 0
  INTO avg_initial_pain, initial_count;
  
  -- Calculate pain improvement percentage
  WITH latest_pain AS (
    SELECT DISTINCT ON (fr.assessment_id) 
      fr.assessment_id, 
      fr.pain_level,
      ua.intial_pain_intensity
    FROM public.follow_up_responses fr
    JOIN public.user_assessments ua ON ua.id = fr.assessment_id
    WHERE fr.user_id = COALESCE(NEW.user_id, OLD.user_id)
      AND ua.intial_pain_intensity IS NOT NULL 
      AND ua.intial_pain_intensity > 0
    ORDER BY fr.assessment_id, fr.created_at DESC
  )
  SELECT AVG(((intial_pain_intensity - pain_level) / intial_pain_intensity::numeric) * 100)
  FROM latest_pain
  INTO pain_improvement;
  
  -- Upsert MSK profile
  INSERT INTO public.msk_profiles (
    b2b_employee_id,
    pain_areas,
    pain_level_initial,
    pain_level_improvement,
    resolved_bodyarea
  ) VALUES (
    employee_record.id,
    COALESCE(active_areas, ARRAY[]::text[]),
    COALESCE(ROUND(avg_initial_pain), 0),
    COALESCE(ROUND(pain_improvement), 0),
    COALESCE(resolved_areas, ARRAY[]::text[])
  )
  ON CONFLICT (b2b_employee_id) 
  DO UPDATE SET
    pain_areas = EXCLUDED.pain_areas,
    pain_level_initial = EXCLUDED.pain_level_initial,
    pain_level_improvement = EXCLUDED.pain_level_improvement,
    resolved_bodyarea = EXCLUDED.resolved_bodyarea;
    
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for automatic MSK profile sync
DROP TRIGGER IF EXISTS sync_msk_on_assessment_change ON public.user_assessments;
CREATE TRIGGER sync_msk_on_assessment_change
  AFTER INSERT OR UPDATE OR DELETE ON public.user_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_msk_profile_on_assessment_change();

DROP TRIGGER IF EXISTS sync_msk_on_followup_change ON public.follow_up_responses;
CREATE TRIGGER sync_msk_on_followup_change
  AFTER INSERT OR UPDATE OR DELETE ON public.follow_up_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_msk_profile_on_assessment_change();