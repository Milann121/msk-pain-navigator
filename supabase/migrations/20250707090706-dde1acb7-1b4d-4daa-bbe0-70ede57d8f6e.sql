-- Step 2: Create New Weekly Exercise Goal Tracking Table
CREATE TABLE public.user_weekly_exercise_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_type TEXT NOT NULL DEFAULT 'weekly_exercise',
  month_year DATE NOT NULL, -- First day of the month being tracked
  first_month_week NUMERIC,
  second_month_week NUMERIC,
  third_month_week NUMERIC,
  fourth_month_week NUMERIC,
  fifth_month_week NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, month_year, goal_type)
);

-- Enable RLS
ALTER TABLE public.user_weekly_exercise_goals ENABLE ROW LEVEL SECURITY;

-- Step 5: Set Up Row Level Security
CREATE POLICY "Users can view their own weekly exercise goals" 
ON public.user_weekly_exercise_goals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weekly exercise goals" 
ON public.user_weekly_exercise_goals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weekly exercise goals" 
ON public.user_weekly_exercise_goals 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Step 3: Implement Week Calculation Logic
CREATE OR REPLACE FUNCTION public.get_week_of_month(target_date DATE, target_month_year DATE)
RETURNS INTEGER
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  first_monday DATE;
  days_diff INTEGER;
  week_number INTEGER;
BEGIN
  -- Get the first day of the target month
  first_monday := DATE_TRUNC('month', target_month_year)::DATE;
  
  -- Find the first Monday of the month (or the Monday before if month doesn't start on Monday)
  first_monday := first_monday - EXTRACT(DOW FROM first_monday)::INTEGER + 1;
  IF first_monday > DATE_TRUNC('month', target_month_year)::DATE THEN
    first_monday := first_monday - 7;
  END IF;
  
  -- Calculate which week the target date falls into
  days_diff := target_date - first_monday;
  week_number := (days_diff / 7) + 1;
  
  -- Handle fifth week logic: if week spans months, it belongs to the previous month
  IF week_number = 5 AND target_date >= DATE_TRUNC('month', target_month_year + INTERVAL '1 month')::DATE THEN
    -- This is actually the first week of next month, return NULL for this month
    RETURN NULL;
  END IF;
  
  -- If the date is before the target month, it might be a fifth week of previous month
  IF target_date < DATE_TRUNC('month', target_month_year)::DATE THEN
    RETURN 5; -- Fifth week of previous month
  END IF;
  
  RETURN LEAST(week_number, 5);
END;
$$;

-- Function to calculate weekly completion percentage
CREATE OR REPLACE FUNCTION public.calculate_weekly_completion_percentage(
  target_user_id UUID,
  week_start_date DATE,
  week_end_date DATE
)
RETURNS NUMERIC
LANGUAGE plpgsql
STABLE SECURITY DEFINER
AS $$
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
$$;

-- Step 4: Create Real-time Update Functions
CREATE OR REPLACE FUNCTION public.update_weekly_exercise_goals_for_month(
  target_user_id UUID,
  target_month_year DATE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
  
  -- Find the first Monday of the month (or the Monday before)
  week_start := target_month_year - EXTRACT(DOW FROM target_month_year)::INTEGER + 1;
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
    
    -- Move to next week
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
$$;

-- Function to update weekly goals when exercises are completed
CREATE OR REPLACE FUNCTION public.update_weekly_goals_on_exercise_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create trigger for real-time updates
CREATE TRIGGER trigger_update_weekly_goals_on_exercise_completion
  AFTER INSERT OR UPDATE ON public.exercise_completion_clicks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_weekly_goals_on_exercise_completion();

-- Step 6: Create Population Logic - Function to populate historical data
CREATE OR REPLACE FUNCTION public.populate_weekly_exercise_goals_for_user(
  target_user_id UUID,
  start_month DATE DEFAULT NULL,
  end_month DATE DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Function to populate all users' weekly exercise goals
CREATE OR REPLACE FUNCTION public.populate_all_weekly_exercise_goals()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Add updated_at trigger
CREATE TRIGGER update_weekly_exercise_goals_updated_at
  BEFORE UPDATE ON public.user_weekly_exercise_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();