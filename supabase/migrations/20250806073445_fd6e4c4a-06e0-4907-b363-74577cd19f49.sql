-- Add default_language column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN default_language text;