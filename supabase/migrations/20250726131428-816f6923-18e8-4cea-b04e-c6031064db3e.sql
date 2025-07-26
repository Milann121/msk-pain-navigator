-- Create trigger to automatically populate user_profiles with B2B data
CREATE OR REPLACE FUNCTION public.sync_user_profile_b2b_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  b2b_emp_record RECORD;
  test_emp_record RECORD;
BEGIN
  -- Try to find B2B employee record by user_id first
  SELECT * INTO b2b_emp_record 
  FROM public.b2b_employees 
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);
  
  -- If not found by user_id, try by email
  IF NOT FOUND THEN
    SELECT * INTO b2b_emp_record 
    FROM public.b2b_employees 
    WHERE email = COALESCE(NEW.email, OLD.email);
  END IF;
  
  -- If still not found, try test_2_employees table by user_id
  IF NOT FOUND THEN
    SELECT * INTO test_emp_record 
    FROM public.test_2_employees 
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);
  END IF;
  
  -- If not found by user_id, try by email in test_2_employees
  IF NOT FOUND AND test_emp_record IS NULL THEN
    SELECT * INTO test_emp_record 
    FROM public.test_2_employees 
    WHERE email = COALESCE(NEW.email, OLD.email);
  END IF;
  
  -- Update user_profiles with B2B data if found
  IF b2b_emp_record IS NOT NULL THEN
    -- Update from b2b_employees table
    UPDATE public.user_profiles
    SET 
      b2b_partner_id = b2b_emp_record.b2b_partner_id,
      b2b_partner_name = b2b_emp_record.b2b_partner_name,
      employee_id = b2b_emp_record.employee_id,
      updated_at = NOW()
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);
    
  ELSIF test_emp_record IS NOT NULL THEN
    -- Update from test_2_employees table
    UPDATE public.user_profiles
    SET 
      b2b_partner_id = test_emp_record.b2b_partner_id,
      b2b_partner_name = test_emp_record.b2b_partner_name,
      employee_id = test_emp_record.employee_id,
      updated_at = NOW()
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS sync_b2b_data_on_user_profile_change ON public.user_profiles;
DROP TRIGGER IF EXISTS sync_b2b_data_on_b2b_employee_change ON public.b2b_employees;
DROP TRIGGER IF EXISTS sync_b2b_data_on_test_employee_change ON public.test_2_employees;

-- Create triggers to sync B2B data automatically
CREATE TRIGGER sync_b2b_data_on_user_profile_change
  AFTER INSERT OR UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_profile_b2b_data();

CREATE TRIGGER sync_b2b_data_on_b2b_employee_change
  AFTER UPDATE ON public.b2b_employees
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_profile_b2b_data();

CREATE TRIGGER sync_b2b_data_on_test_employee_change
  AFTER UPDATE ON public.test_2_employees
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_user_profile_b2b_data();

-- Update existing user_profiles records that are missing B2B data
DO $$
DECLARE
  profile_record RECORD;
  b2b_emp_record RECORD;
  test_emp_record RECORD;
BEGIN
  FOR profile_record IN 
    SELECT user_id, email 
    FROM public.user_profiles 
    WHERE (b2b_partner_id IS NULL OR employee_id IS NULL)
      AND (user_id IS NOT NULL OR email IS NOT NULL)
  LOOP
    -- Try to find B2B employee record by user_id first
    SELECT * INTO b2b_emp_record 
    FROM public.b2b_employees 
    WHERE user_id = profile_record.user_id;
    
    -- If not found by user_id, try by email
    IF NOT FOUND THEN
      SELECT * INTO b2b_emp_record 
      FROM public.b2b_employees 
      WHERE email = profile_record.email;
    END IF;
    
    -- If still not found, try test_2_employees table by user_id
    IF NOT FOUND THEN
      SELECT * INTO test_emp_record 
      FROM public.test_2_employees 
      WHERE user_id = profile_record.user_id;
    END IF;
    
    -- If not found by user_id, try by email in test_2_employees
    IF NOT FOUND AND test_emp_record IS NULL THEN
      SELECT * INTO test_emp_record 
      FROM public.test_2_employees 
      WHERE email = profile_record.email;
    END IF;
    
    -- Update user_profiles with B2B data if found
    IF b2b_emp_record IS NOT NULL THEN
      UPDATE public.user_profiles
      SET 
        b2b_partner_id = b2b_emp_record.b2b_partner_id,
        b2b_partner_name = b2b_emp_record.b2b_partner_name,
        employee_id = b2b_emp_record.employee_id,
        updated_at = NOW()
      WHERE user_id = profile_record.user_id;
      
    ELSIF test_emp_record IS NOT NULL THEN
      UPDATE public.user_profiles
      SET 
        b2b_partner_id = test_emp_record.b2b_partner_id,
        b2b_partner_name = test_emp_record.b2b_partner_name,
        employee_id = test_emp_record.employee_id,
        updated_at = NOW()
      WHERE user_id = profile_record.user_id;
    END IF;
  END LOOP;
END;
$$;