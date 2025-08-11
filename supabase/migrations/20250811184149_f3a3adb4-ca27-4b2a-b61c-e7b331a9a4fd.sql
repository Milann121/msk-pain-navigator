-- Harden hr_managers column-level security for password hashes
-- 1) Revoke column-level SELECT/UPDATE on password_hash from anon/authenticated
REVOKE SELECT (password_hash) ON public.hr_managers FROM anon, authenticated;
REVOKE UPDATE (password_hash) ON public.hr_managers FROM anon, authenticated;

-- 2) Grant column-level access only to service_role (for admin/maintenance needs)
GRANT SELECT (password_hash) ON public.hr_managers TO service_role;
GRANT UPDATE (password_hash) ON public.hr_managers TO service_role;