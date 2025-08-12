-- Grant execute permissions for verification/search RPCs to anon and authenticated
GRANT EXECUTE ON FUNCTION public.verify_b2b_employee(_b2b_partner_name text, _employee_id text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_test2_employee(_b2b_partner_name text, _employee_id text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.search_b2b_employer_names(_query text, _limit integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.search_test2_employer_names(_query text, _limit integer) TO anon, authenticated;

-- Restrict sensitive update RPCs to authenticated only
REVOKE ALL ON FUNCTION public.update_b2b_employee_contact(_b2b_partner_name text, _employee_id text, _email text, _user_id uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_b2b_employee_contact(_b2b_partner_name text, _employee_id text, _email text, _user_id uuid) TO authenticated;

REVOKE ALL ON FUNCTION public.update_test2_employee_contact(_b2b_partner_name text, _employee_id text, _email text, _user_id uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_test2_employee_contact(_b2b_partner_name text, _employee_id text, _email text, _user_id uuid) TO authenticated;