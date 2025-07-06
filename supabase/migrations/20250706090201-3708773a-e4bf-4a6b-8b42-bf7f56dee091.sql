-- First, convert existing job values to match the constraint
UPDATE public.user_profiles 
SET job = CASE 
  WHEN job IN ('sedavá práca', 'desk work', 'Desk work') THEN 'office work'
  WHEN job IN ('manuálna práca', 'manual work', 'Manual work') THEN 'manual work'
  ELSE job
END
WHERE job IS NOT NULL;

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