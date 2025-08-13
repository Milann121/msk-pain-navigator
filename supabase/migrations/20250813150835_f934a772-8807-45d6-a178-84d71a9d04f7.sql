-- Update the is_valid_b2b_employee function to match by name and employee_id
CREATE OR REPLACE FUNCTION public.is_valid_b2b_employee(target_user_id uuid)
RETURNS bigint
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  partner_id bigint;
  user_email text;
  user_first_name text;
  user_last_name text;
BEGIN
  -- Get user data from auth.users and user_profiles
  SELECT au.email INTO user_email FROM auth.users au WHERE au.id = target_user_id;
  
  SELECT up.first_name, up.last_name INTO user_first_name, user_last_name 
  FROM user_profiles up WHERE up.user_id = target_user_id;
  
  IF user_email IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- First try to find by email (for already linked users)
  SELECT b2b_partner_id INTO partner_id
  FROM b2b_employees 
  WHERE email = user_email OR user_id = target_user_id
  LIMIT 1;
  
  -- If not found by email, try to match by name for linking
  IF partner_id IS NULL AND user_first_name IS NOT NULL AND user_last_name IS NOT NULL THEN
    SELECT b2b_partner_id INTO partner_id
    FROM b2b_employees 
    WHERE lower(trim(first_name)) = lower(trim(user_first_name))
      AND lower(trim(last_name)) = lower(trim(user_last_name))
      AND (email IS NULL OR email = user_email)
    LIMIT 1;
  END IF;
  
  -- If still not found, try test_2_employees table
  IF partner_id IS NULL THEN
    SELECT b2b_partner_id INTO partner_id
    FROM test_2_employees 
    WHERE email = user_email
    LIMIT 1;
  END IF;
  
  RETURN partner_id;
END;
$$;

-- Create function to link user to b2b_employee record
CREATE OR REPLACE FUNCTION public.link_user_to_b2b_employee(
  target_user_id uuid,
  employee_first_name text,
  employee_last_name text,
  employee_id_param text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_email text;
  rows_updated integer;
BEGIN
  -- Get user email
  SELECT email INTO user_email FROM auth.users WHERE id = target_user_id;
  
  IF user_email IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Try to link with b2b_employees
  UPDATE b2b_employees 
  SET 
    email = user_email,
    user_id = target_user_id,
    state = 'active',
    updated_at = now()
  WHERE lower(trim(first_name)) = lower(trim(employee_first_name))
    AND lower(trim(last_name)) = lower(trim(employee_last_name))
    AND employee_id = trim(employee_id_param)
    AND (email IS NULL OR email = user_email);
    
  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  
  RETURN rows_updated > 0;
END;
$$;

-- Create function to verify employee data matches
CREATE OR REPLACE FUNCTION public.verify_employee_data(
  employee_first_name text,
  employee_last_name text,
  employee_id_param text
)
RETURNS TABLE(b2b_partner_id bigint, b2b_partner_name text, employee_id text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT be.b2b_partner_id, be.b2b_partner_name, be.employee_id
  FROM b2b_employees be
  WHERE lower(trim(be.first_name)) = lower(trim(employee_first_name))
    AND lower(trim(be.last_name)) = lower(trim(employee_last_name))
    AND be.employee_id = trim(employee_id_param)
  LIMIT 1;
END;
$$;