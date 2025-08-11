-- Secure RPCs for test_2_employees and tighten RLS
-- 1) Create secure RPC for verifying test employees without exposing PII
CREATE OR REPLACE FUNCTION public.verify_test2_employee(
  _b2b_partner_name text,
  _employee_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.test_2_employees t2
    WHERE t2.b2b_partner_name = _b2b_partner_name
      AND t2.employee_id = _employee_id
      AND t2.state = 'active'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_test2_employee(text, text) TO anon, authenticated;

-- 2) Create secure RPC to update contact details after verification
--    Restrict updates: only when record isn't already active or email is unset/matches,
--    and always by exact company+employee_id match
CREATE OR REPLACE FUNCTION public.update_test2_employee_contact(
  _b2b_partner_name text,
  _employee_id text,
  _email text,
  _user_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  rows_updated integer;
BEGIN
  UPDATE public.test_2_employees t2
  SET 
    email = _email,
    state = 'active',
    updated_at = now(),
    user_id = COALESCE(_user_id, t2.user_id)
  WHERE t2.b2b_partner_name = _b2b_partner_name
    AND t2.employee_id = _employee_id
    AND (
      t2.email IS NULL OR t2.email = _email
    )
    AND t2.state <> 'active';
  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_test2_employee_contact(text, text, text, uuid) TO anon, authenticated;

-- 3) Create secure RPC for employer name suggestions from test_2_employees
CREATE OR REPLACE FUNCTION public.search_test2_employer_names(
  _query text,
  _limit integer DEFAULT 10
)
RETURNS TABLE(name text)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT DISTINCT t2.b2b_partner_name AS name
  FROM public.test_2_employees t2
  WHERE t2.b2b_partner_name ILIKE '%' || _query || '%'
  ORDER BY name
  LIMIT _limit;
$$;

GRANT EXECUTE ON FUNCTION public.search_test2_employer_names(text, integer) TO anon, authenticated;

-- 4) Drop overly permissive RLS policies on test_2_employees
DROP POLICY IF EXISTS "Allow test_2 employee verification" ON public.test_2_employees;
DROP POLICY IF EXISTS "Allow test_2 employee state updates" ON public.test_2_employees;