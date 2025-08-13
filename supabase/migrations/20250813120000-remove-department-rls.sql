-- Drop existing policy on company_departments
DROP POLICY IF EXISTS "Users can view departments of their company"
  ON public.company_departments;

-- Disable row level security entirely
ALTER TABLE public.company_departments DISABLE ROW LEVEL SECURITY;
