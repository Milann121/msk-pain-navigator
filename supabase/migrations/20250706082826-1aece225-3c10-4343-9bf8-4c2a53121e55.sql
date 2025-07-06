-- Update user_profiles table to support new job structure
-- Add new columns for the enhanced job section
ALTER TABLE public.user_profiles 
ADD COLUMN department_id UUID REFERENCES public.company_departments(id),
ADD COLUMN job_type TEXT CHECK (job_type IN ('office work', 'manual work')),
ADD COLUMN job_properties TEXT[]; -- Array of job property names

-- Create index for better performance on department lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_department_id ON public.user_profiles(department_id);

-- Update RLS policy to allow users to see company departments they belong to
CREATE POLICY "Users can view departments of their company" ON public.company_departments
FOR SELECT TO authenticated
USING (
  b2b_partner_id IN (
    SELECT up.b2b_partner_id 
    FROM public.user_profiles up 
    WHERE up.user_id = auth.uid()
  )
);