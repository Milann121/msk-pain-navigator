-- Secure b2b verification via RPC and remove public SELECT policy
-- 1) Create secure RPC for verifying b2b employees without exposing PII
CREATE OR REPLACE FUNCTION public.verify_b2b_employee(
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
    FROM public.b2b_employees be
    WHERE be.b2b_partner_name = _b2b_partner_name
      AND be.employee_id = _employee_id
      AND be.state = 'active'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_b2b_employee(text, text) TO anon, authenticated;

-- 2) Create secure RPC for employer name suggestions from b2b_employees
CREATE OR REPLACE FUNCTION public.search_b2b_employer_names(
  _query text,
  _limit integer DEFAULT 10
)
RETURNS TABLE(name text)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT DISTINCT be.b2b_partner_name AS name
  FROM public.b2b_employees be
  WHERE be.b2b_partner_name ILIKE '%' || _query || '%'
  ORDER BY name
  LIMIT _limit;
$$;

GRANT EXECUTE ON FUNCTION public.search_b2b_employer_names(text, integer) TO anon, authenticated;

-- 3) Create secure RPC to update b2b employee contact info after verification
CREATE OR REPLACE FUNCTION public.update_b2b_employee_contact(
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
  UPDATE public.b2b_employees be
  SET 
    email = _email,
    state = 'active',
    updated_at = now(),
    user_id = COALESCE(_user_id, be.user_id)
  WHERE be.b2b_partner_name = _b2b_partner_name
    AND be.employee_id = _employee_id
    AND (
      be.email IS NULL OR be.email = _email
    )
    AND be.state <> 'active';
  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_b2b_employee_contact(text, text, text, uuid) TO anon, authenticated;

-- 4) Drop overly permissive public SELECT policy on b2b_employees
DROP POLICY IF EXISTS "Allow B2B employee verification" ON public.b2b_employees;