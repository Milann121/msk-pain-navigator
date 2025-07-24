-- Fix search_path vulnerability in database functions
-- This prevents search path injection attacks by explicitly setting search_path

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
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
 SET search_path TO 'public'
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
 SET search_path TO 'public'
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
 SET search_path TO 'public'
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
 SET search_path TO 'public'
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
 SET search_path TO 'public'
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

CREATE OR REPLACE FUNCTION public.calculate_exercise_goal_completion(target_user_id uuid, target_month date)
 RETURNS numeric[]
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  weekly_goal INTEGER;
  goal_created_at TIMESTAMP WITH TIME ZONE;
  month_start DATE;
  month_end DATE;
  current_week_start DATE;
  week_percentages NUMERIC[] := '{}';
  week_completion_count INTEGER;
  week_percentage NUMERIC;
BEGIN
  -- Get the user's weekly exercise goal
  SELECT weekly_exercises_goal, created_at INTO weekly_goal, goal_created_at
  FROM public.user_goals 
  WHERE user_id = target_user_id 
    AND goal_type = 'weekly_exercise'
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If no goal set, return empty array
  IF weekly_goal IS NULL THEN
    RETURN week_percentages;
  END IF;
  
  -- Calculate month boundaries
  month_start := DATE_TRUNC('month', target_month)::DATE;
  month_end := (DATE_TRUNC('month', target_month) + INTERVAL '1 month - 1 day')::DATE;
  
  -- Find first Monday of the month or the Monday before if month doesn't start on Monday
  current_week_start := month_start - EXTRACT(DOW FROM month_start)::INTEGER + 1;
  IF current_week_start > month_start THEN
    current_week_start := current_week_start - 7;
  END IF;
  
  -- Loop through weeks that start in this month
  WHILE current_week_start <= month_end LOOP
    -- Only process weeks that start within the month or affect the month
    IF current_week_start <= month_end AND (current_week_start + 6) >= month_start THEN
      
      -- Skip weeks that started before the goal was created
      IF goal_created_at IS NULL OR current_week_start >= goal_created_at::DATE THEN
        
        -- Count completed exercises for this week
        SELECT COUNT(DISTINCT DATE(completed_at)) INTO week_completion_count
        FROM public.completed_exercises ce
        WHERE ce.user_id = target_user_id
          AND DATE(ce.completed_at) >= current_week_start
          AND DATE(ce.completed_at) <= current_week_start + 6;
        
        -- Calculate percentage (cap at 100%)
        week_percentage := LEAST(100, ROUND((week_completion_count::NUMERIC / weekly_goal::NUMERIC) * 100, 1));
        
        -- Add to array only if week starts in this month
        IF current_week_start >= month_start THEN
          week_percentages := array_append(week_percentages, week_percentage);
        END IF;
      END IF;
    END IF;
    
    -- Move to next week
    current_week_start := current_week_start + 7;
  END LOOP;
  
  RETURN week_percentages;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_exercise_goal_completion(target_user_id uuid, target_month date DEFAULT CURRENT_DATE)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  completion_percentages NUMERIC[];
BEGIN
  -- Calculate the completion percentages
  completion_percentages := public.calculate_exercise_goal_completion(target_user_id, target_month);
  
  -- Update or insert the record in user_program_tracking
  -- Since user_program_tracking is per assessment, we'll update all active programs for this user
  UPDATE public.user_program_tracking
  SET 
    exercise_goal_completion = completion_percentages,
    updated_at = NOW()
  WHERE user_id = target_user_id
    AND program_status = 'active';
  
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_all_exercise_goal_completions(target_month date DEFAULT CURRENT_DATE)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_record RECORD;
BEGIN
  -- Loop through all users who have active programs and weekly goals
  FOR user_record IN 
    SELECT DISTINCT upt.user_id
    FROM public.user_program_tracking upt
    INNER JOIN public.user_goals ug ON ug.user_id = upt.user_id
    WHERE upt.program_status = 'active'
      AND ug.goal_type = 'weekly_exercise'
  LOOP
    -- Update each user's completion percentages
    PERFORM public.update_exercise_goal_completion(user_record.user_id, target_month);
  END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.sync_program_tracking()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
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
 SET search_path TO 'public'
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

CREATE OR REPLACE FUNCTION public.update_department_pain_trends()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  partner_record RECORD;
  dept_record RECORD;
  current_avg numeric;
  previous_avg numeric;
  trend_dir text;
BEGIN
  -- Loop through all B2B partners
  FOR partner_record IN 
    SELECT DISTINCT b2b_partner FROM hr_managers WHERE b2b_partner IS NOT NULL
  LOOP
    -- Calculate current averages for this partner's departments
    FOR dept_record IN 
      SELECT * FROM calculate_department_avg_pain_level(partner_record.b2b_partner)
      WHERE avg_pain_level IS NOT NULL
    LOOP
      current_avg := dept_record.avg_pain_level;
      
      -- Get previous day's average
      SELECT avg_pain_level INTO previous_avg
      FROM department_pain_trends
      WHERE department_id = dept_record.department_id 
        AND calculated_date = CURRENT_DATE - INTERVAL '1 day'
      ORDER BY calculated_date DESC
      LIMIT 1;
      
      -- Determine trend direction
      IF previous_avg IS NULL THEN
        trend_dir := 'no_change';
      ELSIF current_avg > previous_avg THEN
        trend_dir := 'increase';
      ELSIF current_avg < previous_avg THEN
        trend_dir := 'decrease';
      ELSE
        trend_dir := 'no_change';
      END IF;
      
      -- Insert or update today's record
      INSERT INTO department_pain_trends (
        department_id, 
        b2b_partner_id, 
        avg_pain_level, 
        trend_direction,
        calculated_date
      )
      VALUES (
        dept_record.department_id,
        partner_record.b2b_partner,
        current_avg,
        trend_dir,
        CURRENT_DATE
      )
      ON CONFLICT (department_id, calculated_date)
      DO UPDATE SET
        avg_pain_level = EXCLUDED.avg_pain_level,
        trend_direction = EXCLUDED.trend_direction,
        created_at = now();
    END LOOP;
  END LOOP;
END;
$function$;