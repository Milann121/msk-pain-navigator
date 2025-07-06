-- Drop the existing problematic RLS policy
DROP POLICY IF EXISTS "Users can view departments of their company" ON company_departments;

-- Create a simplified RLS policy that only uses user_profiles
CREATE POLICY "Users can view departments of their company" 
ON company_departments 
FOR SELECT 
USING (
  b2b_partner_id IN (
    SELECT b2b_partner_id 
    FROM user_profiles 
    WHERE user_id = auth.uid() 
      AND b2b_partner_id IS NOT NULL
  )
);