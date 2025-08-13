-- Create enhanced verification function that matches by name and employee ID
CREATE OR REPLACE FUNCTION public.verify_employee_by_name_and_id(
  _first_name text,
  _last_name text, 
  _employee_id text,
  _b2b_partner_name text
)
RETURNS TABLE(
  employee_record_id uuid,
  b2b_partner_id bigint,
  b2b_partner_name text,
  employee_id text,
  source_table text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- First try b2b_employees table
  RETURN QUERY
  SELECT 
    be.id as employee_record_id,
    be.b2b_partner_id,
    be.b2b_partner_name,
    be.employee_id,
    'b2b_employees'::text as source_table
  FROM public.b2b_employees be
  WHERE lower(trim(be.first_name)) = lower(trim(_first_name))
    AND lower(trim(be.last_name)) = lower(trim(_last_name))
    AND be.employee_id = trim(_employee_id)
    AND lower(be.b2b_partner_name) = lower(trim(_b2b_partner_name))
  LIMIT 1;
  
  -- If not found, try test_2_employees table
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      t2.id as employee_record_id,
      t2.b2b_partner_id,
      t2.b2b_partner_name,
      t2.employee_id,
      'test_2_employees'::text as source_table
    FROM public.test_2_employees t2
    WHERE lower(trim(t2.first_name)) = lower(trim(_first_name))
      AND lower(trim(t2.last_name)) = lower(trim(_last_name))
      AND t2.employee_id = trim(_employee_id)
      AND lower(t2.b2b_partner_name) = lower(trim(_b2b_partner_name))
    LIMIT 1;
  END IF;
END;
$function$;

-- Create function to link verified employee to user
CREATE OR REPLACE FUNCTION public.link_verified_employee_to_user(
  _employee_record_id uuid,
  _source_table text,
  _user_id uuid DEFAULT auth.uid(),
  _user_email text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  current_email text;
  rows_updated integer;
BEGIN
  -- Get current user email if not provided
  IF _user_email IS NULL THEN
    SELECT email INTO current_email FROM auth.users WHERE id = _user_id;
  ELSE
    current_email := _user_email;
  END IF;
  
  IF current_email IS NULL OR _user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Update the appropriate table based on source
  IF _source_table = 'b2b_employees' THEN
    UPDATE public.b2b_employees
    SET 
      email = current_email,
      user_id = _user_id,
      state = 'active',
      updated_at = now()
    WHERE id = _employee_record_id
      AND (email IS NULL OR email = current_email)
      AND (user_id IS NULL OR user_id = _user_id);
      
    GET DIAGNOSTICS rows_updated = ROW_COUNT;
    
  ELSIF _source_table = 'test_2_employees' THEN
    UPDATE public.test_2_employees
    SET 
      email = current_email,
      state = 'active',
      updated_at = now()
    WHERE id = _employee_record_id
      AND (email IS NULL OR email = current_email);
      
    GET DIAGNOSTICS rows_updated = ROW_COUNT;
  ELSE
    RETURN FALSE;
  END IF;
  
  RETURN rows_updated > 0;
END;
$function$;