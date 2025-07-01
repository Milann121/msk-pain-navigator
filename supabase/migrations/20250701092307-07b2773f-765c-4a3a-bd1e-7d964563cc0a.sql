
-- Add email column to store user's email address
ALTER TABLE public.user_profiles 
ADD COLUMN email TEXT;

-- Add pain_area column to track pain areas from exercise programs
ALTER TABLE public.user_profiles 
ADD COLUMN pain_area TEXT;

-- Update existing records with email addresses from auth.users
-- This will populate the email field for existing users
UPDATE public.user_profiles 
SET email = auth_users.email
FROM auth.users AS auth_users
WHERE user_profiles.user_id = auth_users.id;

-- Update existing records with pain areas from user_assessments
-- This will get the most recent pain area from active or ended programs
UPDATE public.user_profiles 
SET pain_area = latest_assessment.pain_area
FROM (
  SELECT DISTINCT ON (user_id) 
    user_id, 
    pain_area
  FROM public.user_assessments 
  ORDER BY user_id, timestamp DESC
) AS latest_assessment
WHERE user_profiles.user_id = latest_assessment.user_id;
