-- Move data from old columns to new columns and clean up
-- Copy job data to job_type where job_type is null
UPDATE public.user_profiles 
SET job_type = job
WHERE job IS NOT NULL AND job_type IS NULL;

-- Convert job_subtype comma-separated strings to job_properties arrays
UPDATE public.user_profiles 
SET job_properties = string_to_array(job_subtype, ', ')
WHERE job_subtype IS NOT NULL 
  AND job_subtype != '' 
  AND (job_properties IS NULL OR array_length(job_properties, 1) IS NULL);

-- Drop the old columns
ALTER TABLE public.user_profiles 
DROP COLUMN IF EXISTS job;

ALTER TABLE public.user_profiles 
DROP COLUMN IF EXISTS job_subtype;