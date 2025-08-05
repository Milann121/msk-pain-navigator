-- Create function to sync B2B employee data to user_profiles when state becomes active
CREATE OR REPLACE FUNCTION public.sync_b2b_to_user_profiles()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if state changed to 'active'
  IF NEW.state = 'active' AND (OLD.state IS NULL OR OLD.state != 'active') THEN
    -- Insert or update user_profiles with B2B employee data
    INSERT INTO public.user_profiles (
      user_id,
      email,
      first_name,
      last_name,
      b2b_partner_name,
      employee_id,
      created_at,
      updated_at
    )
    SELECT 
      au.id as user_id,
      NEW.email,
      NEW.first_name,
      NEW.last_name,
      NEW.b2b_partner_name,
      NEW.employee_id,
      NOW(),
      NOW()
    FROM auth.users au
    WHERE au.email = NEW.email
    ON CONFLICT (user_id) 
    DO UPDATE SET
      email = EXCLUDED.email,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      b2b_partner_name = EXCLUDED.b2b_partner_name,
      employee_id = EXCLUDED.employee_id,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for b2b_employees table
DROP TRIGGER IF EXISTS trigger_sync_b2b_to_user_profiles ON public.b2b_employees;
CREATE TRIGGER trigger_sync_b2b_to_user_profiles
  AFTER UPDATE ON public.b2b_employees
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_b2b_to_user_profiles();

-- Create trigger for test_2_employees table (since the code also checks this table)
DROP TRIGGER IF EXISTS trigger_sync_test2_to_user_profiles ON public.test_2_employees;
CREATE TRIGGER trigger_sync_test2_to_user_profiles
  AFTER UPDATE ON public.test_2_employees
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_b2b_to_user_profiles();