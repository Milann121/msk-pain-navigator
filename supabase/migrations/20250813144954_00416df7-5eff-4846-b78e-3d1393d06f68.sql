-- Create security definer function to check if user is a valid B2B employee
CREATE OR REPLACE FUNCTION public.is_valid_b2b_employee(target_user_id uuid)
RETURNS bigint
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  partner_id bigint;
  user_email text;
BEGIN
  -- Get user email
  SELECT email INTO user_email FROM auth.users WHERE id = target_user_id;
  
  IF user_email IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- First try to find in b2b_employees table
  SELECT b2b_partner_id INTO partner_id
  FROM b2b_employees 
  WHERE email = user_email OR user_id = target_user_id
  LIMIT 1;
  
  -- If not found, try test_2_employees table
  IF partner_id IS NULL THEN
    SELECT b2b_partner_id INTO partner_id
    FROM test_2_employees 
    WHERE email = user_email
    LIMIT 1;
  END IF;
  
  RETURN partner_id;
END;
$$;

-- Add new RLS policy for company_departments to allow B2B employees to view their company departments
CREATE POLICY "B2B employees can view their company departments" 
ON company_departments 
FOR SELECT 
TO authenticated
USING (
  b2b_partner_id = public.is_valid_b2b_employee(auth.uid()) AND
  public.is_valid_b2b_employee(auth.uid()) IS NOT NULL
);