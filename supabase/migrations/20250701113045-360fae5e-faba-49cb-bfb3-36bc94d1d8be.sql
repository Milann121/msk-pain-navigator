
-- First, add the b2b_partner_id column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS b2b_partner_id bigint REFERENCES public."B2B_partners"(id);

-- Add employee_id column to user_profiles (needed for the sync)
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS employee_id text;

-- Add pain level columns to user_profiles for tracking
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS pain_level_initial integer;

ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS pain_level_followup integer;

-- Create the function to sync data to b2b_employees
CREATE OR REPLACE FUNCTION public.insert_into_b2b_employees()
RETURNS TRIGGER AS $$
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
      last_name, 
      pain_leve_initial, 
      pain_level_followup, 
      pain_area
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
      NEW.last_name, 
      NEW.pain_level_initial, 
      NEW.pain_level_followup, 
      NEW.pain_area
    )
    ON CONFLICT (employee_id, b2b_partner_name) 
    DO UPDATE SET
      updated_at = NOW(),
      email = EXCLUDED.email,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      pain_leve_initial = EXCLUDED.pain_leve_initial,
      pain_level_followup = EXCLUDED.pain_level_followup,
      pain_area = EXCLUDED.pain_area,
      state = 'active';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for INSERT operations
CREATE OR REPLACE TRIGGER sync_b2b_employees_insert
  AFTER INSERT ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.insert_into_b2b_employees();

-- Create trigger for UPDATE operations
CREATE OR REPLACE TRIGGER sync_b2b_employees_update
  AFTER UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.insert_into_b2b_employees();

-- Add unique constraint to b2b_employees to prevent duplicates (without IF NOT EXISTS)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'unique_employee_partner'
  ) THEN
    ALTER TABLE public.b2b_employees 
    ADD CONSTRAINT unique_employee_partner 
    UNIQUE (employee_id, b2b_partner_name);
  END IF;
END $$;
