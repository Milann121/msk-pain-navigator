-- Rename columns and convert job_subtype data to array format
-- First, rename the columns
ALTER TABLE public.user_profiles 
RENAME COLUMN job TO job_type;

-- Add a temporary array column for job properties
ALTER TABLE public.user_profiles 
ADD COLUMN job_properties_temp TEXT[];

-- Convert comma-separated job_subtype strings to arrays
UPDATE public.user_profiles 
SET job_properties_temp = string_to_array(job_subtype, ', ')
WHERE job_subtype IS NOT NULL AND job_subtype != '';

-- Drop the old job_subtype column
ALTER TABLE public.user_profiles 
DROP COLUMN job_subtype;

-- Rename the temporary column to job_properties
ALTER TABLE public.user_profiles 
RENAME COLUMN job_properties_temp TO job_properties;