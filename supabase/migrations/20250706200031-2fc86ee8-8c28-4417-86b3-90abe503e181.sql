-- Add unique constraint on user_id column in user_profiles table
-- This is required for upsert operations to work properly
ALTER TABLE public.user_profiles 
ADD CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id);