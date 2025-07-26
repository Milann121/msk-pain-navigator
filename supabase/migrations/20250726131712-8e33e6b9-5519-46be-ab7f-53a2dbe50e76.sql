-- Update existing user_profiles records with missing B2B data
UPDATE public.user_profiles 
SET 
  b2b_partner_id = be.b2b_partner_id,
  b2b_partner_name = be.b2b_partner_name,
  employee_id = be.employee_id,
  updated_at = NOW()
FROM public.b2b_employees be
WHERE user_profiles.user_id = be.user_id
  AND user_profiles.b2b_partner_id IS NULL;

-- Update from test_2_employees for any remaining records
UPDATE public.user_profiles 
SET 
  b2b_partner_id = te.b2b_partner_id,
  b2b_partner_name = te.b2b_partner_name,
  employee_id = te.employee_id,
  updated_at = NOW()
FROM public.test_2_employees te
WHERE user_profiles.email = te.email
  AND user_profiles.b2b_partner_id IS NULL;