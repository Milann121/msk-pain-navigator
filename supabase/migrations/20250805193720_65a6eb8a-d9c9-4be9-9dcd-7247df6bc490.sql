-- Fix the security issue by setting search_path for the function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';