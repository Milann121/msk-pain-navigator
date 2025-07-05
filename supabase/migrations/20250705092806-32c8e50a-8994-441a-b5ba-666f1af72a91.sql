-- Backfill user_program_tracking table with existing user_assessments data
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
  program_started_at,
  program_ended_at,
  created_at,
  updated_at
)
SELECT 
  ua.user_id,
  be.id as b2b_employee_id,
  ua.id as assessment_id,
  CASE 
    WHEN ua.program_ended_at IS NOT NULL THEN 'ended'::public.program_status
    ELSE 'active'::public.program_status
  END as program_status,
  ua.pain_area,
  ua.primary_differential,
  ua.primary_mechanism,
  ua.sin_group,
  ua.intial_pain_intensity as initial_pain_level,
  COALESCE(ua.program_start_date::timestamp with time zone, ua.timestamp) as program_started_at,
  ua.program_ended_at,
  ua.timestamp as created_at,
  COALESCE(ua.program_ended_at, ua.timestamp) as updated_at
FROM public.user_assessments ua
LEFT JOIN auth.users au ON ua.user_id = au.id
LEFT JOIN public.b2b_employees be ON be.email = au.email
ON CONFLICT (assessment_id) DO NOTHING;