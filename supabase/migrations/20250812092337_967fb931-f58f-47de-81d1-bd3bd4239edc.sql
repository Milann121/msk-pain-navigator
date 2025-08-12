
-- 1) Ensure RLS is enabled and enforced on sensitive medical tables
ALTER TABLE public.orebro_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orebro_responses FORCE ROW LEVEL SECURITY;

ALTER TABLE public.msk_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.msk_profiles FORCE ROW LEVEL SECURITY;

-- 2) Remove HR direct SELECT policies on raw medical data
--    This blocks per-employee health record access for HR, preserving privacy.
DROP POLICY IF EXISTS "HR managers can view their company's employee OREBRO responses" 
  ON public.orebro_responses;

DROP POLICY IF EXISTS "HR can access own company's MSK profiles" 
  ON public.msk_profiles;

-- 3) Ensure HR can still access anonymized, department-level summaries via SECURITY DEFINER functions
--    These functions already enforce HR role and company scoping internally.
GRANT EXECUTE ON FUNCTION public.hr_get_orebro_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION public.hr_get_msk_summary() TO authenticated;

-- Notes:
-- - End-users retain their existing SELECT/INSERT/UPDATE policies for their own rows in these tables.
-- - HR still retains access to all other non-medical tables/views as currently configured.
-- - The summary functions are the supported HR access path for medical KPIs at department level.
