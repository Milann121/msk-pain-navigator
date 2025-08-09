-- Backfill favorite_activities.pain_area from historical user_assessments.favorite_activities
-- Matches on (user_id, activity) and prefers the most recent assessment
-- Idempotent: only fills rows where pain_area IS NULL

-- Parse favorite activities from assessments into rows and pick latest per user/activity
WITH parsed AS (
  SELECT 
    ua.user_id,
    LOWER(TRIM(elem->>'activity')) AS activity,
    LOWER(TRIM(COALESCE(
      elem->>'pain_area',
      elem->>'painArea',
      elem->>'body_area',
      elem->>'bodyArea',
      elem->>'targetArea'
    ))) AS pain_area,
    ua.timestamp
  FROM public.user_assessments ua
  CROSS JOIN LATERAL jsonb_array_elements(ua.favorite_activities) AS elem
  WHERE ua.favorite_activities IS NOT NULL
    AND jsonb_typeof(ua.favorite_activities) = 'array'
), latest AS (
  SELECT DISTINCT ON (user_id, activity)
    user_id,
    activity,
    pain_area
  FROM parsed
  WHERE activity IS NOT NULL AND pain_area IS NOT NULL AND pain_area <> ''
  ORDER BY user_id, activity, timestamp DESC
)
UPDATE public.favorite_activities fa
SET pain_area = latest.pain_area,
    updated_at = NOW()
FROM latest
WHERE fa.user_id = latest.user_id
  AND LOWER(fa.activity) = latest.activity
  AND fa.pain_area IS NULL;