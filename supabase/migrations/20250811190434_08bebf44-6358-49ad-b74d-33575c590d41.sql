-- 1) Drop overly permissive UPDATE policy on b2b_employees
DROP POLICY IF EXISTS "Allow B2B employee state updates" ON public.b2b_employees;

-- 2) Harden update_b2b_employee_contact to bind to caller (ignore client-supplied email/user_id)
CREATE OR REPLACE FUNCTION public.update_b2b_employee_contact(
  _b2b_partner_name text,
  _employee_id text,
  _email text DEFAULT NULL,
  _user_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  rows_updated integer;
  current_uid uuid := auth.uid();
  current_email text;
BEGIN
  IF current_uid IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT email INTO current_email FROM auth.users WHERE id = current_uid;

  UPDATE public.b2b_employees be
  SET 
    email = COALESCE(be.email, current_email),
    state = 'active',
    updated_at = now(),
    user_id = COALESCE(be.user_id, current_uid)
  WHERE be.b2b_partner_name = _b2b_partner_name
    AND be.employee_id = _employee_id
    AND be.state <> 'active'
    AND (be.email IS NULL OR be.email = current_email)
    AND (be.user_id IS NULL OR be.user_id = current_uid);

  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated > 0;
END;
$$;

-- Restrict function execution
REVOKE EXECUTE ON FUNCTION public.update_b2b_employee_contact(text, text, text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_b2b_employee_contact(text, text, text, uuid) TO authenticated;

-- 3) Harden update_test2_employee_contact similarly
CREATE OR REPLACE FUNCTION public.update_test2_employee_contact(
  _b2b_partner_name text,
  _employee_id text,
  _email text DEFAULT NULL,
  _user_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  rows_updated integer;
  current_uid uuid := auth.uid();
  current_email text;
BEGIN
  IF current_uid IS NULL THEN
    RETURN FALSE;
  END IF;

  SELECT email INTO current_email FROM auth.users WHERE id = current_uid;

  UPDATE public.test_2_employees t2
  SET 
    email = COALESCE(t2.email, current_email),
    state = 'active',
    updated_at = now(),
    user_id = COALESCE(t2.user_id, current_uid)
  WHERE t2.b2b_partner_name = _b2b_partner_name
    AND t2.employee_id = _employee_id
    AND t2.state <> 'active'
    AND (t2.email IS NULL OR t2.email = current_email)
    AND (t2.user_id IS NULL OR t2.user_id = current_uid);

  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated > 0;
END;
$$;

-- Restrict function execution
REVOKE EXECUTE ON FUNCTION public.update_test2_employee_contact(text, text, text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_test2_employee_contact(text, text, text, uuid) TO authenticated;

-- 4) Add SET search_path TO 'public' on SECURITY DEFINER functions missing it
CREATE OR REPLACE FUNCTION public.update_weekly_goal_completion(target_user_id uuid, target_week_start date, target_week_end date)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    user_weekly_goal INTEGER;
    completed_exercises INTEGER;
    goal_achieved BOOLEAN;
BEGIN
    -- Get user's current weekly goal
    SELECT weekly_exercises_goal INTO user_weekly_goal
    FROM public.user_goals
    WHERE user_id = target_user_id 
      AND goal_type = 'weekly_exercise'
    ORDER BY created_at DESC
    LIMIT 1;
    
    -- If no goal set, exit
    IF user_weekly_goal IS NULL THEN
        RETURN;
    END IF;
    
    -- Count unique days with exercise completions in this week
    SELECT COUNT(DISTINCT DATE(clicked_at)) INTO completed_exercises
    FROM public.exercise_completion_clicks
    WHERE user_id = target_user_id
      AND is_active = true
      AND DATE(clicked_at) >= target_week_start
      AND DATE(clicked_at) <= target_week_end;
    
    -- Determine if goal was met
    goal_achieved := completed_exercises >= user_weekly_goal;
    
    -- Upsert the completion record with conflict resolution
    INSERT INTO public.weekly_goal_completions (
        user_id,
        week_start_date,
        week_end_date,
        goal_target,
        exercises_completed,
        goal_met,
        updated_at
    ) VALUES (
        target_user_id,
        target_week_start,
        target_week_end,
        user_weekly_goal,
        completed_exercises,
        goal_achieved,
        now()
    )
    ON CONFLICT (user_id, week_start_date, week_end_date)
    DO UPDATE SET
        goal_target = EXCLUDED.goal_target,
        exercises_completed = EXCLUDED.exercises_completed,
        goal_met = EXCLUDED.goal_met,
        updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.update_all_weekly_goal_completions(target_week_start date DEFAULT NULL::date)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    user_record RECORD;
    week_start DATE;
    week_end DATE;
BEGIN
    -- Default to current week if not specified (Monday to Sunday)
    IF target_week_start IS NULL THEN
        week_start := DATE_TRUNC('week', CURRENT_DATE)::DATE + INTERVAL '1 day'; -- Monday
    ELSE
        week_start := target_week_start;
    END IF;
    
    week_end := week_start + INTERVAL '6 days'; -- Sunday
    
    -- Process all users with weekly exercise goals
    FOR user_record IN 
        SELECT DISTINCT user_id
        FROM public.user_goals
        WHERE goal_type = 'weekly_exercise'
    LOOP
        PERFORM public.update_weekly_goal_completion(
            user_record.user_id,
            week_start,
            week_end
        );
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION public.populate_weekly_exercise_goals_for_user(target_user_id uuid, start_month date DEFAULT NULL::date, end_month date DEFAULT NULL::date)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'first_name', ''));
  RETURN new;
END;
$$;

-- 5) Scope leaderboard to caller's company (if available)
CREATE OR REPLACE FUNCTION public.get_community_leaderboard(limit_param integer DEFAULT 100, offset_param integer DEFAULT 0)
RETURNS TABLE(
  user_id uuid,
  first_name text,
  company_name text,
  job_type text,
  exercises_completed_count bigint,
  programs_completed_count bigint,
  rank bigint
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_partner_id bigint := public.get_user_b2b_partner_id(auth.uid());
BEGIN
  RETURN QUERY
  WITH activity AS (
    SELECT 
      up.user_id,
      coalesce(up.first_name, '') as first_name,
      coalesce(up.b2b_partner_name, '') as company_name,
      coalesce(up.job_type, '') as job_type,
      up.b2b_partner_id as partner_id,
      coalesce((select count(*) from public.completed_exercises ce where ce.user_id = up.user_id), 0) as exercises_completed_count,
      coalesce((select count(*) from public.user_program_tracking upt where upt.user_id = up.user_id and upt.program_status = 'ended'), 0) as programs_completed_count
    from public.user_profiles up
    where up.user_id is not null
  )
  SELECT 
    a.user_id,
    a.first_name,
    a.company_name,
    a.job_type,
    a.exercises_completed_count,
    a.programs_completed_count,
    dense_rank() over (order by a.exercises_completed_count desc, a.programs_completed_count desc, a.first_name asc) as rank
  FROM activity a
  WHERE (current_partner_id IS NULL OR a.partner_id = current_partner_id)
  ORDER BY 7 asc
  LIMIT limit_param OFFSET offset_param;
END;
$$;