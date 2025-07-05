-- Populate exercise_goal_completion column with existing data
-- Update completion percentages for current month
SELECT public.update_all_exercise_goal_completions(CURRENT_DATE);

-- Update completion percentages for previous months where there's exercise data
DO $$
DECLARE
  month_date DATE;
  min_completion_date DATE;
  max_completion_date DATE;
BEGIN
  -- Find the date range of existing completed exercises
  SELECT 
    DATE_TRUNC('month', MIN(completed_at))::DATE,
    DATE_TRUNC('month', MAX(completed_at))::DATE
  INTO min_completion_date, max_completion_date
  FROM public.completed_exercises;
  
  -- If we have exercise data, process each month
  IF min_completion_date IS NOT NULL THEN
    month_date := min_completion_date;
    
    -- Loop through each month from earliest to latest
    WHILE month_date <= max_completion_date LOOP
      -- Update completion percentages for this month
      PERFORM public.update_all_exercise_goal_completions(month_date);
      
      -- Move to next month
      month_date := (DATE_TRUNC('month', month_date) + INTERVAL '1 month')::DATE;
    END LOOP;
  END IF;
END $$;