
-- Allow unauthenticated users to verify their employee/company during signup
GRANT EXECUTE ON FUNCTION public.verify_b2b_employee(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_test2_employee(text, text) TO anon, authenticated;
