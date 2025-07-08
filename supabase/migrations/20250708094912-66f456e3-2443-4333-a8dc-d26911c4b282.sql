-- Change age column to year_birth in user_profiles table
ALTER TABLE public.user_profiles 
RENAME COLUMN age TO year_birth;

-- Update the column comment for clarity
COMMENT ON COLUMN public.user_profiles.year_birth IS 'Year of birth for the user';