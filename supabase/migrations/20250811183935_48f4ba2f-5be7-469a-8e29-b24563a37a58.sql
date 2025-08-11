-- Secure HR managers table: remove public read and add minimal verification RPC

-- 1) Minimal, non-PII verification RPC (boolean only)
CREATE OR REPLACE FUNCTION public.verify_hr_manager(
  _email text,
  _manager_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.hr_managers hm
    WHERE hm.email = _email
      AND hm.manager_id = _manager_id
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_hr_manager(text, text) TO anon, authenticated;

-- 2) Drop overly permissive public SELECT policy on hr_managers
DROP POLICY IF EXISTS "Allow HR manager verification" ON public.hr_managers;