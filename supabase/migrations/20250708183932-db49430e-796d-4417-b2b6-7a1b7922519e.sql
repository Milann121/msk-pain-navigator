-- Fix RLS policy issues with user_profiles triggers by making functions SECURITY DEFINER
-- This allows the functions to execute with elevated privileges and bypass RLS when appropriate

-- Update insert_into_b2b_employees function to be SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.insert_into_b2b_employees()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $$
DECLARE
  partner_name text;
BEGIN
  -- Only sync if b2b_partner_id is set
  IF NEW.b2b_partner_id IS NOT NULL THEN
    -- Get the partner name from B2B_partners table
    SELECT name INTO partner_name 
    FROM public."B2B_partners" 
    WHERE id = NEW.b2b_partner_id;
    
    -- Insert or update in b2b_employees table
    INSERT INTO public.b2b_employees (
      created_at, 
      updated_at, 
      state, 
      b2b_partner_id, 
      b2b_partner_name,
      employee_id, 
      email, 
      first_name, 
      last_name
    )
    VALUES (
      NOW(), 
      NOW(), 
      'active', 
      NEW.b2b_partner_id, 
      partner_name,
      NEW.employee_id, 
      NEW.email, 
      NEW.first_name, 
      NEW.last_name
    )
    ON CONFLICT (employee_id, b2b_partner_name) 
    DO UPDATE SET
      updated_at = NOW(),
      email = EXCLUDED.email,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      state = 'active';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Update update_b2b_partner_id function to be SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.update_b2b_partner_id()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $$
BEGIN
    UPDATE user_profiles
    SET b2b_partner_id = (
        SELECT b2b_partner_id 
        FROM b2b_employees 
        WHERE b2b_employees.user_id = NEW.user_id
        LIMIT 1
    )
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$;