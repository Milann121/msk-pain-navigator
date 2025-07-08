-- Drop the existing year_birth column from user_profiles
ALTER TABLE public.user_profiles 
DROP COLUMN IF EXISTS year_birth;

-- Recreate the year_birth column with proper constraints
ALTER TABLE public.user_profiles 
ADD COLUMN year_birth INTEGER;

-- Add a check constraint to ensure reasonable birth years
ALTER TABLE public.user_profiles 
ADD CONSTRAINT check_year_birth_range 
CHECK (year_birth IS NULL OR (year_birth >= 1900 AND year_birth <= EXTRACT(year FROM CURRENT_DATE)));

-- Add a comment for clarity
COMMENT ON COLUMN public.user_profiles.year_birth IS 'Year of birth for the user (4-digit year)';