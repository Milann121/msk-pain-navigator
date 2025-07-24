-- Fix Critical Security Issues

-- 1. Add RLS policies for B2B_partners table
CREATE POLICY "HR managers can view their own partner info" 
ON public."B2B_partners" 
FOR SELECT 
USING (is_hr_manager(auth.uid()) AND id = get_user_b2b_partner_id(auth.uid()));

CREATE POLICY "Authenticated users can view partner names for verification" 
ON public."B2B_partners" 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 2. Secure all database functions with search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_orebro_reminder()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Set reminder to 3 months after the updated_at timestamp
  NEW.reminder_at := NEW.updated_at + INTERVAL '3 months';
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_latest_pain_level(assessment_id_param uuid, user_id_param uuid)
 RETURNS TABLE(pain_level integer, created_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT fr.pain_level, fr.created_at
  FROM public.follow_up_responses fr
  WHERE fr.assessment_id = assessment_id_param
  AND fr.user_id = user_id_param
  ORDER BY fr.created_at DESC
  LIMIT 1;
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_psfs_reminder()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.is_orebro_reminder_due(user_id_param uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.sync_program_tracking_on_followup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Update user_program_tracking with latest follow-up data
  UPDATE public.user_program_tracking 
  SET 
    pain_level_followup = NEW.pain_level,
    updated_at = NEW.updated_at
  WHERE assessment_id = NEW.assessment_id
    AND user_id = NEW.user_id;
    
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.sync_program_tracking()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_user_program_stats(target_user_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(user_id uuid, b2b_employee_id uuid, active_programs bigint, ended_programs bigint, deleted_programs bigint, total_programs bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.is_psfs_reminder_due(user_id_param uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.insert_into_b2b_employees()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  partner_name text;
BEGIN
  -- Only sync if b2b_partner_id is set
  IF NEW.b2b_partner_id IS NOT NULL THEN
    -- Get the partner name from B2B_partners table
    SELECT name INTO partner_name 
    FROM public."B2B_partners" 
    WHERE id = NEW.b2b_partner_id;
    
    -- Insert or update in b2b_employees table
    INSERT INTO public.b2b_employees (
      created_at, 
      updated_at, 
      state, 
      b2b_partner_id, 
      b2b_partner_name,
      employee_id, 
      email, 
      first_name, 
      last_name
    )
    VALUES (
      NOW(), 
      NOW(), 
      'active', 
      NEW.b2b_partner_id, 
      partner_name,
      NEW.employee_id, 
      NEW.email, 
      NEW.first_name, 
      NEW.last_name
    )
    ON CONFLICT (employee_id, b2b_partner_name) 
    DO UPDATE SET
      updated_at = NOW(),
      email = EXCLUDED.email,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      state = 'active';
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.sync_pain_areas_to_profiles()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Update user_profiles with aggregated pain areas from all assessments for this user
  INSERT INTO public.user_profiles (user_id, pain_area, updated_at)
  SELECT 
    NEW.user_id,
    string_agg(DISTINCT pain_area, ', ' ORDER BY pain_area),
    NOW()
  FROM public.user_assessments 
  WHERE user_id = NEW.user_id
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    pain_area = (
      SELECT string_agg(DISTINCT pain_area, ', ' ORDER BY pain_area)
      FROM public.user_assessments 
      WHERE user_id = NEW.user_id
    ),
    updated_at = NOW();
    
  RETURN NEW;
END;
$function$;