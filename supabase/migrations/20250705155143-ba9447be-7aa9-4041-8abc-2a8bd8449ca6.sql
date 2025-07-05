-- Add exercise_goal_completion column to user_program_tracking table
ALTER TABLE public.user_program_tracking 
ADD COLUMN exercise_goal_completion NUMERIC[];

-- Create function to calculate weekly exercise goal completion percentages
CREATE OR REPLACE FUNCTION public.calculate_exercise_goal_completion(
  target_user_id UUID,
  target_month DATE
) RETURNS NUMERIC[] 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create function to update exercise goal completion for a specific user and month
CREATE OR REPLACE FUNCTION public.update_exercise_goal_completion(
  target_user_id UUID,
  target_month DATE DEFAULT CURRENT_DATE
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create function to update all users' exercise goal completion for current month
CREATE OR REPLACE FUNCTION public.update_all_exercise_goal_completions(
  target_month DATE DEFAULT CURRENT_DATE
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;