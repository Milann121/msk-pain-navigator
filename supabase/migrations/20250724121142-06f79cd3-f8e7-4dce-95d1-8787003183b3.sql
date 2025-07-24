-- Fix remaining database functions with search_path vulnerabilities

CREATE OR REPLACE FUNCTION public.calculate_weekly_completion_percentage(target_user_id uuid, week_start_date date, week_end_date date)
 RETURNS numeric
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  weekly_goal INTEGER;
  unique_exercise_days INTEGER;
  completion_percentage NUMERIC;
BEGIN
  -- Get the user's weekly exercise goal
  SELECT weekly_exercises_goal INTO weekly_goal
  FROM public.user_goals 
  WHERE user_id = target_user_id 
    AND goal_type = 'weekly_exercise'
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If no goal set, return NULL
  IF weekly_goal IS NULL OR weekly_goal = 0 THEN
    RETURN NULL;
  END IF;
  
  -- Count unique days with exercise completions in this week
  SELECT COUNT(DISTINCT DATE(clicked_at)) INTO unique_exercise_days
  FROM public.exercise_completion_clicks
  WHERE user_id = target_user_id
    AND is_active = true
    AND DATE(clicked_at) >= week_start_date
    AND DATE(clicked_at) <= week_end_date;
  
  -- Calculate percentage (cap at 100%)
  completion_percentage := LEAST(100, ROUND((unique_exercise_days::NUMERIC / weekly_goal::NUMERIC) * 100, 1));
  
  RETURN completion_percentage;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_weekly_goals_on_exercise_completion()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  exercise_month DATE;
  prev_month DATE;
BEGIN
  -- Get the month of the exercise completion
  exercise_month := DATE_TRUNC('month', NEW.clicked_at::DATE)::DATE;
  prev_month := (exercise_month - INTERVAL '1 month')::DATE;
  
  -- Update current month
  PERFORM public.update_weekly_exercise_goals_for_month(NEW.user_id, exercise_month);
  
  -- Also update previous month (to handle fifth week logic)
  PERFORM public.update_weekly_exercise_goals_for_month(NEW.user_id, prev_month);
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_weekly_exercise_goals_for_month(target_user_id uuid, target_month_year date)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  week_start DATE;
  week_end DATE;
  week_num INTEGER;
  completion_pct NUMERIC;
  first_week_pct NUMERIC := NULL;
  second_week_pct NUMERIC := NULL;
  third_week_pct NUMERIC := NULL;
  fourth_week_pct NUMERIC := NULL;
  fifth_week_pct NUMERIC := NULL;
BEGIN
  -- Calculate first day of month
  target_month_year := DATE_TRUNC('month', target_month_year)::DATE;
  
  -- Find the first Sunday of the month (or the Sunday before)
  week_start := target_month_year - EXTRACT(DOW FROM target_month_year)::INTEGER;
  IF week_start > target_month_year THEN
    week_start := week_start - 7;
  END IF;
  
  -- Process up to 5 weeks
  FOR i IN 1..5 LOOP
    week_end := week_start + 6;
    
    -- Check if this week belongs to this month
    week_num := public.get_week_of_month(week_start, target_month_year);
    
    IF week_num IS NOT NULL THEN
      -- Calculate completion percentage for this week
      completion_pct := public.calculate_weekly_completion_percentage(
        target_user_id, 
        week_start, 
        week_end
      );
      
      -- Assign to appropriate week variable
      CASE week_num
        WHEN 1 THEN first_week_pct := completion_pct;
        WHEN 2 THEN second_week_pct := completion_pct;
        WHEN 3 THEN third_week_pct := completion_pct;
        WHEN 4 THEN fourth_week_pct := completion_pct;
        WHEN 5 THEN fifth_week_pct := completion_pct;
      END CASE;
    END IF;
    
    -- Move to next week (Sunday to Sunday)
    week_start := week_start + 7;
  END LOOP;
  
  -- Upsert the record
  INSERT INTO public.user_weekly_exercise_goals (
    user_id,
    goal_type,
    month_year,
    first_month_week,
    second_month_week,
    third_month_week,
    fourth_month_week,
    fifth_month_week,
    updated_at
  )
  VALUES (
    target_user_id,
    'weekly_exercise',
    target_month_year,
    first_week_pct,
    second_week_pct,
    third_week_pct,
    fourth_week_pct,
    fifth_week_pct,
    now()
  )
  ON CONFLICT (user_id, month_year, goal_type)
  DO UPDATE SET
    first_month_week = EXCLUDED.first_month_week,
    second_month_week = EXCLUDED.second_month_week,
    third_month_week = EXCLUDED.third_month_week,
    fourth_month_week = EXCLUDED.fourth_month_week,
    fifth_month_week = EXCLUDED.fifth_month_week,
    updated_at = now();
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_b2b_partner_id()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    UPDATE user_profiles
    SET b2b_partner_id = (
        SELECT b2b_partner_id 
        FROM b2b_employees 
        WHERE b2b_employees.user_id = NEW.user_id
        LIMIT 1
    )
    WHERE id = NEW.id;

    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.populate_weekly_exercise_goals_for_user(target_user_id uuid, start_month date DEFAULT NULL::date, end_month date DEFAULT NULL::date)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_month DATE;
  goal_created_date DATE;
BEGIN
  -- Get when the user first set their goal
  SELECT DATE_TRUNC('month', created_at)::DATE INTO goal_created_date
  FROM public.user_goals
  WHERE user_id = target_user_id AND goal_type = 'weekly_exercise'
  ORDER BY created_at ASC
  LIMIT 1;
  
  -- If no goal found, exit
  IF goal_created_date IS NULL THEN
    RETURN;
  END IF;
  
  -- Set default date range
  start_month := COALESCE(start_month, goal_created_date);
  end_month := COALESCE(end_month, DATE_TRUNC('month', CURRENT_DATE)::DATE);
  
  -- Loop through each month and populate data
  current_month := start_month;
  WHILE current_month <= end_month LOOP
    PERFORM public.update_weekly_exercise_goals_for_month(target_user_id, current_month);
    current_month := current_month + INTERVAL '1 month';
  END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.populate_all_weekly_exercise_goals()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_record RECORD;
BEGIN
  -- Loop through all users who have weekly exercise goals
  FOR user_record IN 
    SELECT DISTINCT user_id
    FROM public.user_goals
    WHERE goal_type = 'weekly_exercise'
  LOOP
    PERFORM public.populate_weekly_exercise_goals_for_user(user_record.user_id);
  END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.calculate_department_avg_pain_level(target_b2b_partner_id bigint)
 RETURNS TABLE(department_id uuid, department_name text, avg_pain_level numeric, employee_count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  WITH department_employees AS (
    SELECT 
      cd.id as dept_id,
      cd.department_name as dept_name,
      up.user_id
    FROM company_departments cd
    LEFT JOIN user_profiles up ON cd.id = up.department_id
    WHERE cd.b2b_partner_id = target_b2b_partner_id
  ),
  active_programs_pain AS (
    SELECT 
      de.dept_id,
      de.dept_name,
      upt.user_id,
      upt.assessment_id,
      COALESCE(
        -- First try to get the latest follow-up response for this specific program
        (SELECT fr.pain_level 
         FROM follow_up_responses fr 
         WHERE fr.user_id = upt.user_id 
           AND fr.assessment_id = upt.assessment_id
         ORDER BY fr.created_at DESC 
         LIMIT 1),
        -- Fall back to initial pain level for this program
        upt.initial_pain_level
      ) as program_pain_level
    FROM department_employees de
    INNER JOIN user_program_tracking upt ON de.user_id = upt.user_id
    WHERE upt.program_status = 'active'
      AND de.user_id IS NOT NULL
  )
  SELECT 
    app.dept_id,
    app.dept_name,
    ROUND(AVG(app.program_pain_level), 2) as avg_pain,
    COUNT(DISTINCT app.user_id) as emp_count
  FROM active_programs_pain app
  WHERE app.program_pain_level IS NOT NULL
  GROUP BY app.dept_id, app.dept_name
  
  UNION ALL
  
  -- Include departments with no active programs or no pain data
  SELECT 
    cd.id,
    cd.department_name,
    NULL::numeric,
    COUNT(DISTINCT up.user_id)
  FROM company_departments cd
  LEFT JOIN user_profiles up ON cd.id = up.department_id
  WHERE cd.b2b_partner_id = target_b2b_partner_id
    AND cd.id NOT IN (
      SELECT app.dept_id FROM active_programs_pain app WHERE app.program_pain_level IS NOT NULL GROUP BY app.dept_id
    )
  GROUP BY cd.id, cd.department_name;
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_psfs_reminder_due(user_id_param uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
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