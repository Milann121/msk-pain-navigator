
-- First, let's add any missing columns from active_profiles to user_profiles
-- The active_profiles table has: id, created_at, updated_at, first_name
-- The user_profiles table already has most of these fields

-- Update user_profiles to ensure we have all necessary data
-- Copy any data from active_profiles that might not be in user_profiles
INSERT INTO public.user_profiles (user_id, first_name, created_at, updated_at)
SELECT 
    ap.id as user_id,
    ap.first_name,
    ap.created_at,
    ap.updated_at
FROM public.active_profiles ap
WHERE ap.id NOT IN (SELECT user_id FROM public.user_profiles)
ON CONFLICT (user_id) DO UPDATE SET
    first_name = COALESCE(user_profiles.first_name, EXCLUDED.first_name),
    created_at = LEAST(user_profiles.created_at, EXCLUDED.created_at),
    updated_at = GREATEST(user_profiles.updated_at, EXCLUDED.updated_at);

-- For existing records in user_profiles, update first_name if it's null and active_profiles has a value
UPDATE public.user_profiles 
SET first_name = ap.first_name
FROM public.active_profiles ap
WHERE user_profiles.user_id = ap.id 
AND user_profiles.first_name IS NULL 
AND ap.first_name IS NOT NULL;

-- Drop the active_profiles table since we've merged the data
DROP TABLE public.active_profiles;
