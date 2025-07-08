-- Fix RLS policy issue for user_profiles updates by B2B employees
-- The HR manager policy was causing conflicts during upsert operations

-- Drop the problematic HR manager policy that references b2b_employees
DROP POLICY IF EXISTS "HR managers can view their company's employee profiles" ON public.user_profiles;

-- Recreate the HR manager policy with better isolation to avoid RLS conflicts during upserts
CREATE POLICY "HR managers can view their company's employee profiles" 
ON public.user_profiles 
FOR SELECT 
USING (
  is_hr_manager(auth.uid()) 
  AND employee_id IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM b2b_employees be 
    WHERE be.employee_id = user_profiles.employee_id 
    AND be.b2b_partner_id = get_user_b2b_partner_id(auth.uid())
  )
);