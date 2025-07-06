-- Drop the existing RLS policy that only checks user_profiles
DROP POLICY IF EXISTS "Users can view departments of their company" ON public.company_departments;

-- Create an updated RLS policy that checks all three possible sources for b2b_partner_id
CREATE POLICY "Users can view departments of their company" 
ON public.company_departments
FOR SELECT 
USING (
  b2b_partner_id IN (
    -- Check user_profiles table
    SELECT up.b2b_partner_id
    FROM public.user_profiles up
    WHERE up.user_id = auth.uid() AND up.b2b_partner_id IS NOT NULL
    
    UNION
    
    -- Check b2b_employees table based on user email
    SELECT be.b2b_partner_id
    FROM public.b2b_employees be
    WHERE be.email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    ) AND be.b2b_partner_id IS NOT NULL
    
    UNION
    
    -- Check test_2_employees table based on user email
    SELECT te.b2b_partner_id
    FROM public.test_2_employees te
    WHERE te.email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    ) AND te.b2b_partner_id IS NOT NULL
  )
);