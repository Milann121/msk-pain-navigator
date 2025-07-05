-- Update user_program_tracking with existing follow-up pain levels
UPDATE public.user_program_tracking 
SET pain_level_followup = latest_followup.pain_level
FROM (
  SELECT DISTINCT ON (fr.assessment_id) 
    fr.assessment_id,
    fr.pain_level
  FROM public.follow_up_responses fr
  ORDER BY fr.assessment_id, fr.created_at DESC
) AS latest_followup
WHERE user_program_tracking.assessment_id = latest_followup.assessment_id;

-- For ended programs, also set pain_level_ended to the latest follow-up response
UPDATE public.user_program_tracking 
SET pain_level_ended = latest_followup.pain_level
FROM (
  SELECT DISTINCT ON (fr.assessment_id) 
    fr.assessment_id,
    fr.pain_level
  FROM public.follow_up_responses fr
  ORDER BY fr.assessment_id, fr.created_at DESC
) AS latest_followup
WHERE user_program_tracking.assessment_id = latest_followup.assessment_id
AND user_program_tracking.program_status = 'ended'
AND user_program_tracking.pain_level_ended IS NULL;