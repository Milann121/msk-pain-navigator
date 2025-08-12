
-- Fix verification to allow signup pre-activation and robust matching

CREATE OR REPLACE FUNCTION public.verify_b2b_employee(_b2b_partner_name text, _employee_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.b2b_employees be
    WHERE be.employee_id = trim(_employee_id)
      AND lower(be.b2b_partner_name) = lower(trim(_b2b_partner_name))
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.verify_test2_employee(_b2b_partner_name text, _employee_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.test_2_employees t2
    WHERE t2.employee_id = trim(_employee_id)
      AND lower(t2.b2b_partner_name) = lower(trim(_b2b_partner_name))
  );
END;
$function$;

-- Ensure verification is callable during signup
GRANT EXECUTE ON FUNCTION public.verify_b2b_employee(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_test2_employee(text, text) TO anon, authenticated;
